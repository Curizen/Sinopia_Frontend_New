import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

const JWT_SECRET = process.env.JWT_SECRET || "sinopia_secret_key_change_in_production";
const SALT_ROUNDS = 10;

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

interface AuthRequest extends Request {
  userId?: string;
  userRole?: "skill_giver" | "skill_searcher";
}

function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    req.userId = decoded.userId;
    req.userRole = decoded.role as "skill_giver" | "skill_searcher";
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ================== AUTH ROUTES ==================
  app.post("/api/auth/register", upload.single("cv"), async (req: Request, res: Response) => {
    try {
      const { email, password, role, firstName, lastName } = req.body;
      
      if (!email || !password || !role) {
        return res.status(400).json({ error: "Email, password, and role are required" });
      }
      
      if (!["skill_giver", "skill_searcher"].includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
      
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const cvUrl = req.file ? `/uploads/${req.file.filename}` : null;
      
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        role,
        firstName: firstName || null,
        lastName: lastName || null,
        cvUrl,
      });
      
      if (role === "skill_giver") {
        await storage.createSkillGiverProfile({ userId: user.id });
      } else {
        await storage.createSkillSearcherProfile({ userId: user.id });
      }
      
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
      
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          cvUrl: user.cvUrl,
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
      
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          cvUrl: user.cvUrl,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/auth/me", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        cvUrl: user.cvUrl,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // ================== PROFILE ROUTES ==================
  app.get("/api/profile", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      let profile = null;
      if (user.role === "skill_giver") {
        profile = await storage.getSkillGiverProfile(req.userId!);
      } else {
        profile = await storage.getSkillSearcherProfile(req.userId!);
      }
      
      res.json({ user, profile });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ error: "Failed to get profile" });
    }
  });

  app.patch("/api/profile", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const { userUpdates, profileUpdates } = req.body;
      
      if (userUpdates) {
        await storage.updateUser(req.userId!, userUpdates);
      }
      
      if (profileUpdates) {
        if (user.role === "skill_giver") {
          await storage.updateSkillGiverProfile(req.userId!, profileUpdates);
        } else {
          await storage.updateSkillSearcherProfile(req.userId!, profileUpdates);
        }
      }
      
      const updatedUser = await storage.getUser(req.userId!);
      let updatedProfile = null;
      if (user.role === "skill_giver") {
        updatedProfile = await storage.getSkillGiverProfile(req.userId!);
      } else {
        updatedProfile = await storage.getSkillSearcherProfile(req.userId!);
      }
      
      res.json({ user: updatedUser, profile: updatedProfile });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // ================== PROJECT ROUTES ==================
  app.get("/api/projects", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const projects = await storage.getProjects(req.userId!);
      res.json(projects);
    } catch (error) {
      console.error("Get projects error:", error);
      res.status(500).json({ error: "Failed to get projects" });
    }
  });

  app.get("/api/projects/open", async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getAllOpenProjects();
      res.json(projects);
    } catch (error) {
      console.error("Get open projects error:", error);
      res.status(500).json({ error: "Failed to get open projects" });
    }
  });

  app.get("/api/projects/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Get project error:", error);
      res.status(500).json({ error: "Failed to get project" });
    }
  });

  app.post("/api/projects", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const { title, description, budget, deadline, skills, status } = req.body;
      
      if (!title || !description || budget === undefined || !deadline) {
        return res.status(400).json({ error: "Title, description, budget, and deadline are required" });
      }
      
      const project = await storage.createProject({
        title,
        description,
        budget: Number(budget),
        deadline,
        skills: skills || [],
        status: status || "open",
        ownerId: req.userId!,
      });
      
      res.status(201).json(project);
    } catch (error) {
      console.error("Create project error:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      if (project.ownerId !== req.userId) {
        return res.status(403).json({ error: "Not authorized" });
      }
      
      const updated = await storage.updateProject(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Update project error:", error);
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      if (project.ownerId !== req.userId) {
        return res.status(403).json({ error: "Not authorized" });
      }
      
      await storage.deleteProject(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete project error:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // ================== OFFER ROUTES ==================
  app.get("/api/offers", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const offers = await storage.getOffersByUser(req.userId!);
      
      const enrichedOffers = await Promise.all(offers.map(async (offer) => {
        const project = await storage.getProject(offer.projectId);
        const fromUser = await storage.getUser(offer.fromUserId);
        return {
          ...offer,
          projectTitle: project?.title || "Unknown Project",
          fromUserName: fromUser ? `${fromUser.firstName || ""} ${fromUser.lastName || ""}`.trim() || fromUser.email : "Unknown",
        };
      }));
      
      res.json(enrichedOffers);
    } catch (error) {
      console.error("Get offers error:", error);
      res.status(500).json({ error: "Failed to get offers" });
    }
  });

  app.post("/api/offers", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const { projectId, toUserId, amount, message } = req.body;
      
      if (!projectId || !toUserId || amount === undefined) {
        return res.status(400).json({ error: "ProjectId, toUserId, and amount are required" });
      }
      
      const offer = await storage.createOffer({
        projectId,
        fromUserId: req.userId!,
        toUserId,
        amount: Number(amount),
        message,
      });
      
      await storage.createNotification({
        userId: toUserId,
        title: "New Offer Received",
        message: `You have received a new offer for $${amount}`,
        type: "info",
        link: `/offers`,
      });
      
      res.status(201).json(offer);
    } catch (error) {
      console.error("Create offer error:", error);
      res.status(500).json({ error: "Failed to create offer" });
    }
  });

  app.patch("/api/offers/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const offer = await storage.getOffer(req.params.id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }
      
      if (offer.toUserId !== req.userId && offer.fromUserId !== req.userId) {
        return res.status(403).json({ error: "Not authorized" });
      }
      
      const updated = await storage.updateOffer(req.params.id, req.body);
      
      if (req.body.status === "accepted") {
        const project = await storage.getProject(offer.projectId);
        await storage.updateProject(offer.projectId, { 
          status: "in_progress",
          assigneeId: offer.fromUserId 
        });
        
        await storage.createContract({
          projectId: offer.projectId,
          clientId: offer.toUserId,
          freelancerId: offer.fromUserId,
          amount: offer.amount,
          startDate: new Date().toISOString().split("T")[0],
          endDate: project?.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        });
        
        await storage.createNotification({
          userId: offer.fromUserId,
          title: "Offer Accepted",
          message: "Your offer has been accepted!",
          type: "success",
          link: `/projects/${offer.projectId}`,
        });
      } else if (req.body.status === "rejected") {
        await storage.createNotification({
          userId: offer.fromUserId,
          title: "Offer Rejected",
          message: "Unfortunately, your offer was not accepted.",
          type: "warning",
        });
      }
      
      res.json(updated);
    } catch (error) {
      console.error("Update offer error:", error);
      res.status(500).json({ error: "Failed to update offer" });
    }
  });

  // ================== CONTRACT ROUTES ==================
  app.get("/api/contracts", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const contracts = await storage.getContractsByUser(req.userId!);
      
      const enrichedContracts = await Promise.all(contracts.map(async (contract) => {
        const project = await storage.getProject(contract.projectId);
        const client = await storage.getUser(contract.clientId);
        const freelancer = await storage.getUser(contract.freelancerId);
        return {
          ...contract,
          projectTitle: project?.title || "Unknown Project",
          clientName: client ? `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.email : "Unknown",
          freelancerName: freelancer ? `${freelancer.firstName || ""} ${freelancer.lastName || ""}`.trim() || freelancer.email : "Unknown",
        };
      }));
      
      res.json(enrichedContracts);
    } catch (error) {
      console.error("Get contracts error:", error);
      res.status(500).json({ error: "Failed to get contracts" });
    }
  });

  app.patch("/api/contracts/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const contract = await storage.getContract(req.params.id);
      if (!contract) {
        return res.status(404).json({ error: "Contract not found" });
      }
      
      if (contract.clientId !== req.userId && contract.freelancerId !== req.userId) {
        return res.status(403).json({ error: "Not authorized" });
      }
      
      const updated = await storage.updateContract(req.params.id, req.body);
      
      if (req.body.status === "signed") {
        const otherPartyId = contract.clientId === req.userId ? contract.freelancerId : contract.clientId;
        await storage.createNotification({
          userId: otherPartyId,
          title: "Contract Signed",
          message: "The contract has been signed!",
          type: "success",
          link: `/contracts`,
        });
      }
      
      res.json(updated);
    } catch (error) {
      console.error("Update contract error:", error);
      res.status(500).json({ error: "Failed to update contract" });
    }
  });

  // ================== INVOICE ROUTES ==================
  app.get("/api/invoices", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const invoices = await storage.getInvoicesByUser(req.userId!);
      
      const enrichedInvoices = await Promise.all(invoices.map(async (invoice) => {
        const project = await storage.getProject(invoice.projectId);
        return {
          ...invoice,
          projectTitle: project?.title || "Unknown Project",
        };
      }));
      
      res.json(enrichedInvoices);
    } catch (error) {
      console.error("Get invoices error:", error);
      res.status(500).json({ error: "Failed to get invoices" });
    }
  });

  app.post("/api/invoices", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const { projectId, amount, dueDate } = req.body;
      
      if (!projectId || amount === undefined || !dueDate) {
        return res.status(400).json({ error: "ProjectId, amount, and dueDate are required" });
      }
      
      const invoice = await storage.createInvoice({
        projectId,
        amount: Number(amount),
        dueDate,
      });
      
      res.status(201).json(invoice);
    } catch (error) {
      console.error("Create invoice error:", error);
      res.status(500).json({ error: "Failed to create invoice" });
    }
  });

  app.patch("/api/invoices/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const invoice = await storage.getInvoice(req.params.id);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      
      const updated = await storage.updateInvoice(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      console.error("Update invoice error:", error);
      res.status(500).json({ error: "Failed to update invoice" });
    }
  });

  // ================== PAYMENT ROUTES ==================
  app.get("/api/payments", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const invoices = await storage.getInvoicesByUser(req.userId!);
      const allPayments = [];
      
      for (const invoice of invoices) {
        const invoicePayments = await storage.getPaymentsByInvoice(invoice.id);
        const project = await storage.getProject(invoice.projectId);
        for (const payment of invoicePayments) {
          allPayments.push({
            ...payment,
            projectTitle: project?.title || "Unknown Project",
          });
        }
      }
      
      res.json(allPayments);
    } catch (error) {
      console.error("Get payments error:", error);
      res.status(500).json({ error: "Failed to get payments" });
    }
  });

  app.post("/api/payments", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const { invoiceId, amount, method } = req.body;
      
      if (!invoiceId || amount === undefined || !method) {
        return res.status(400).json({ error: "InvoiceId, amount, and method are required" });
      }
      
      const payment = await storage.createPayment({
        invoiceId,
        amount: Number(amount),
        date: new Date().toISOString().split("T")[0],
        method,
      });
      
      await storage.updateInvoice(invoiceId, { 
        status: "paid", 
        paidDate: new Date().toISOString().split("T")[0] 
      });
      
      res.status(201).json(payment);
    } catch (error) {
      console.error("Create payment error:", error);
      res.status(500).json({ error: "Failed to create payment" });
    }
  });

  // ================== NOTIFICATION ROUTES ==================
  app.get("/api/notifications", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const notifications = await storage.getNotifications(req.userId!);
      res.json(notifications);
    } catch (error) {
      console.error("Get notifications error:", error);
      res.status(500).json({ error: "Failed to get notifications" });
    }
  });

  app.patch("/api/notifications/:id/read", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const notification = await storage.markNotificationRead(req.params.id);
      res.json(notification);
    } catch (error) {
      console.error("Mark notification read error:", error);
      res.status(500).json({ error: "Failed to mark notification as read" });
    }
  });

  app.post("/api/notifications/read-all", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      await storage.markAllNotificationsRead(req.userId!);
      res.json({ success: true });
    } catch (error) {
      console.error("Mark all notifications read error:", error);
      res.status(500).json({ error: "Failed to mark all notifications as read" });
    }
  });

  // Serve uploaded files
  app.use("/uploads", (req, res, next) => {
    const filePath = path.join(uploadsDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ error: "File not found" });
    }
  });

  return httpServer;
}
