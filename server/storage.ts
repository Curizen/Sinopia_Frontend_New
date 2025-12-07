import { eq, desc, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import {
  users,
  skillGiverProfiles,
  skillSearcherProfiles,
  projects,
  offers,
  contracts,
  invoices,
  payments,
  notifications,
  type User,
  type SkillGiverProfile,
  type SkillSearcherProfile,
  type Project,
  type Offer,
  type Contract,
  type Invoice,
  type Payment,
  type Notification,
} from "@shared/schema";

type UserRole = "skill_giver" | "skill_searcher";
type ProjectStatus = "draft" | "open" | "in_progress" | "completed" | "cancelled";
type OfferStatus = "pending" | "accepted" | "rejected";
type ContractStatus = "draft" | "sent" | "signed";
type InvoiceStatus = "pending" | "paid" | "overdue";
type NotificationType = "info" | "success" | "warning" | "error";

export interface CreateUserInput {
  email: string;
  password: string;
  role: UserRole;
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string | null;
  cvUrl?: string | null;
}

export interface CreateSkillGiverProfileInput {
  userId: string;
  bio?: string | null;
  title?: string | null;
  hourlyRate?: number | null;
  skills?: string[] | null;
  location?: string | null;
  availability?: string | null;
}

export interface CreateSkillSearcherProfileInput {
  userId: string;
  companyName?: string | null;
  industry?: string | null;
  website?: string | null;
  bio?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  location?: string | null;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  status?: ProjectStatus;
  budget: number;
  deadline: string;
  skills?: string[] | null;
  ownerId: string;
  assigneeId?: string | null;
}

export interface CreateOfferInput {
  projectId: string;
  fromUserId: string;
  toUserId: string;
  status?: OfferStatus;
  amount: number;
  message?: string | null;
}

export interface CreateContractInput {
  projectId: string;
  clientId: string;
  freelancerId: string;
  status?: ContractStatus;
  amount: number;
  startDate: string;
  endDate: string;
}

export interface CreateInvoiceInput {
  projectId: string;
  amount: number;
  status?: InvoiceStatus;
  dueDate: string;
  paidDate?: string | null;
}

export interface CreatePaymentInput {
  invoiceId: string;
  amount: number;
  date: string;
  method: string;
}

export interface CreateNotificationInput {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  read?: boolean;
  link?: string | null;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: CreateUserInput): Promise<User>;
  updateUser(id: string, updates: Partial<CreateUserInput>): Promise<User | undefined>;

  getSkillGiverProfile(userId: string): Promise<SkillGiverProfile | undefined>;
  createSkillGiverProfile(profile: CreateSkillGiverProfileInput): Promise<SkillGiverProfile>;
  updateSkillGiverProfile(userId: string, updates: Partial<CreateSkillGiverProfileInput>): Promise<SkillGiverProfile | undefined>;

  getSkillSearcherProfile(userId: string): Promise<SkillSearcherProfile | undefined>;
  createSkillSearcherProfile(profile: CreateSkillSearcherProfileInput): Promise<SkillSearcherProfile>;
  updateSkillSearcherProfile(userId: string, updates: Partial<CreateSkillSearcherProfileInput>): Promise<SkillSearcherProfile | undefined>;

  getProject(id: string): Promise<Project | undefined>;
  getProjects(userId: string): Promise<Project[]>;
  getAllOpenProjects(): Promise<Project[]>;
  createProject(project: CreateProjectInput): Promise<Project>;
  updateProject(id: string, updates: Partial<CreateProjectInput>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  getOffer(id: string): Promise<Offer | undefined>;
  getOffersByUser(userId: string): Promise<Offer[]>;
  getOffersByProject(projectId: string): Promise<Offer[]>;
  createOffer(offer: CreateOfferInput): Promise<Offer>;
  updateOffer(id: string, updates: Partial<CreateOfferInput>): Promise<Offer | undefined>;

  getContract(id: string): Promise<Contract | undefined>;
  getContractsByUser(userId: string): Promise<Contract[]>;
  createContract(contract: CreateContractInput): Promise<Contract>;
  updateContract(id: string, updates: Partial<CreateContractInput>): Promise<Contract | undefined>;

  getInvoice(id: string): Promise<Invoice | undefined>;
  getInvoicesByProject(projectId: string): Promise<Invoice[]>;
  getInvoicesByUser(userId: string): Promise<Invoice[]>;
  createInvoice(invoice: CreateInvoiceInput): Promise<Invoice>;
  updateInvoice(id: string, updates: Partial<CreateInvoiceInput>): Promise<Invoice | undefined>;

  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentsByInvoice(invoiceId: string): Promise<Payment[]>;
  createPayment(payment: CreatePaymentInput): Promise<Payment>;

  getNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: CreateNotificationInput): Promise<Notification>;
  markNotificationRead(id: string): Promise<Notification | undefined>;
  markAllNotificationsRead(userId: string): Promise<void>;
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: CreateUserInput): Promise<User> {
    const [newUser] = await db.insert(users).values({
      email: user.email,
      password: user.password,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      cvUrl: user.cvUrl,
    }).returning();
    return newUser;
  }

  async updateUser(id: string, updates: Partial<CreateUserInput>): Promise<User | undefined> {
    const updateData: Record<string, unknown> = {};
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.password !== undefined) updateData.password = updates.password;
    if (updates.role !== undefined) updateData.role = updates.role;
    if (updates.firstName !== undefined) updateData.firstName = updates.firstName;
    if (updates.lastName !== undefined) updateData.lastName = updates.lastName;
    if (updates.avatar !== undefined) updateData.avatar = updates.avatar;
    if (updates.cvUrl !== undefined) updateData.cvUrl = updates.cvUrl;
    
    const [updated] = await db.update(users).set(updateData).where(eq(users.id, id)).returning();
    return updated;
  }

  async getSkillGiverProfile(userId: string): Promise<SkillGiverProfile | undefined> {
    const [profile] = await db.select().from(skillGiverProfiles).where(eq(skillGiverProfiles.userId, userId));
    return profile;
  }

  async createSkillGiverProfile(profile: CreateSkillGiverProfileInput): Promise<SkillGiverProfile> {
    const [newProfile] = await db.insert(skillGiverProfiles).values({
      userId: profile.userId,
      bio: profile.bio,
      title: profile.title,
      hourlyRate: profile.hourlyRate,
      skills: profile.skills,
      location: profile.location,
      availability: profile.availability,
    }).returning();
    return newProfile;
  }

  async updateSkillGiverProfile(userId: string, updates: Partial<CreateSkillGiverProfileInput>): Promise<SkillGiverProfile | undefined> {
    const updateData: Record<string, unknown> = {};
    if (updates.bio !== undefined) updateData.bio = updates.bio;
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.hourlyRate !== undefined) updateData.hourlyRate = updates.hourlyRate;
    if (updates.skills !== undefined) updateData.skills = updates.skills;
    if (updates.location !== undefined) updateData.location = updates.location;
    if (updates.availability !== undefined) updateData.availability = updates.availability;
    
    const [updated] = await db.update(skillGiverProfiles).set(updateData).where(eq(skillGiverProfiles.userId, userId)).returning();
    return updated;
  }

  async getSkillSearcherProfile(userId: string): Promise<SkillSearcherProfile | undefined> {
    const [profile] = await db.select().from(skillSearcherProfiles).where(eq(skillSearcherProfiles.userId, userId));
    return profile;
  }

  async createSkillSearcherProfile(profile: CreateSkillSearcherProfileInput): Promise<SkillSearcherProfile> {
    const [newProfile] = await db.insert(skillSearcherProfiles).values({
      userId: profile.userId,
      companyName: profile.companyName,
      industry: profile.industry,
      website: profile.website,
      bio: profile.bio,
      contactEmail: profile.contactEmail,
      contactPhone: profile.contactPhone,
      location: profile.location,
    }).returning();
    return newProfile;
  }

  async updateSkillSearcherProfile(userId: string, updates: Partial<CreateSkillSearcherProfileInput>): Promise<SkillSearcherProfile | undefined> {
    const updateData: Record<string, unknown> = {};
    if (updates.companyName !== undefined) updateData.companyName = updates.companyName;
    if (updates.industry !== undefined) updateData.industry = updates.industry;
    if (updates.website !== undefined) updateData.website = updates.website;
    if (updates.bio !== undefined) updateData.bio = updates.bio;
    if (updates.contactEmail !== undefined) updateData.contactEmail = updates.contactEmail;
    if (updates.contactPhone !== undefined) updateData.contactPhone = updates.contactPhone;
    if (updates.location !== undefined) updateData.location = updates.location;
    
    const [updated] = await db.update(skillSearcherProfiles).set(updateData).where(eq(skillSearcherProfiles.userId, userId)).returning();
    return updated;
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getProjects(userId: string): Promise<Project[]> {
    return db.select().from(projects)
      .where(or(eq(projects.ownerId, userId), eq(projects.assigneeId, userId)))
      .orderBy(desc(projects.createdAt));
  }

  async getAllOpenProjects(): Promise<Project[]> {
    return db.select().from(projects)
      .where(eq(projects.status, "open"))
      .orderBy(desc(projects.createdAt));
  }

  async createProject(project: CreateProjectInput): Promise<Project> {
    const [newProject] = await db.insert(projects).values({
      title: project.title,
      description: project.description,
      status: project.status || "draft",
      budget: project.budget,
      deadline: project.deadline,
      skills: project.skills || [],
      ownerId: project.ownerId,
      assigneeId: project.assigneeId,
    }).returning();
    return newProject;
  }

  async updateProject(id: string, updates: Partial<CreateProjectInput>): Promise<Project | undefined> {
    const updateData: Record<string, unknown> = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.budget !== undefined) updateData.budget = updates.budget;
    if (updates.deadline !== undefined) updateData.deadline = updates.deadline;
    if (updates.skills !== undefined) updateData.skills = updates.skills;
    if (updates.assigneeId !== undefined) updateData.assigneeId = updates.assigneeId;
    
    const [updated] = await db.update(projects).set(updateData).where(eq(projects.id, id)).returning();
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    await db.delete(projects).where(eq(projects.id, id));
    return true;
  }

  async getOffer(id: string): Promise<Offer | undefined> {
    const [offer] = await db.select().from(offers).where(eq(offers.id, id));
    return offer;
  }

  async getOffersByUser(userId: string): Promise<Offer[]> {
    return db.select().from(offers)
      .where(or(eq(offers.toUserId, userId), eq(offers.fromUserId, userId)))
      .orderBy(desc(offers.createdAt));
  }

  async getOffersByProject(projectId: string): Promise<Offer[]> {
    return db.select().from(offers)
      .where(eq(offers.projectId, projectId))
      .orderBy(desc(offers.createdAt));
  }

  async createOffer(offer: CreateOfferInput): Promise<Offer> {
    const [newOffer] = await db.insert(offers).values({
      projectId: offer.projectId,
      fromUserId: offer.fromUserId,
      toUserId: offer.toUserId,
      status: offer.status || "pending",
      amount: offer.amount,
      message: offer.message,
    }).returning();
    return newOffer;
  }

  async updateOffer(id: string, updates: Partial<CreateOfferInput>): Promise<Offer | undefined> {
    const updateData: Record<string, unknown> = {};
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.amount !== undefined) updateData.amount = updates.amount;
    if (updates.message !== undefined) updateData.message = updates.message;
    
    const [updated] = await db.update(offers).set(updateData).where(eq(offers.id, id)).returning();
    return updated;
  }

  async getContract(id: string): Promise<Contract | undefined> {
    const [contract] = await db.select().from(contracts).where(eq(contracts.id, id));
    return contract;
  }

  async getContractsByUser(userId: string): Promise<Contract[]> {
    return db.select().from(contracts)
      .where(or(eq(contracts.clientId, userId), eq(contracts.freelancerId, userId)))
      .orderBy(desc(contracts.createdAt));
  }

  async createContract(contract: CreateContractInput): Promise<Contract> {
    const [newContract] = await db.insert(contracts).values({
      projectId: contract.projectId,
      clientId: contract.clientId,
      freelancerId: contract.freelancerId,
      status: contract.status || "draft",
      amount: contract.amount,
      startDate: contract.startDate,
      endDate: contract.endDate,
    }).returning();
    return newContract;
  }

  async updateContract(id: string, updates: Partial<CreateContractInput>): Promise<Contract | undefined> {
    const updateData: Record<string, unknown> = {};
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.amount !== undefined) updateData.amount = updates.amount;
    if (updates.startDate !== undefined) updateData.startDate = updates.startDate;
    if (updates.endDate !== undefined) updateData.endDate = updates.endDate;
    
    const [updated] = await db.update(contracts).set(updateData).where(eq(contracts.id, id)).returning();
    return updated;
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
    return invoice;
  }

  async getInvoicesByProject(projectId: string): Promise<Invoice[]> {
    return db.select().from(invoices)
      .where(eq(invoices.projectId, projectId))
      .orderBy(desc(invoices.createdAt));
  }

  async getInvoicesByUser(userId: string): Promise<Invoice[]> {
    const userProjects = await this.getProjects(userId);
    const projectIds = userProjects.map(p => p.id);
    if (projectIds.length === 0) return [];
    
    const allInvoices: Invoice[] = [];
    for (const projectId of projectIds) {
      const projectInvoices = await this.getInvoicesByProject(projectId);
      allInvoices.push(...projectInvoices);
    }
    return allInvoices;
  }

  async createInvoice(invoice: CreateInvoiceInput): Promise<Invoice> {
    const [newInvoice] = await db.insert(invoices).values({
      projectId: invoice.projectId,
      amount: invoice.amount,
      status: invoice.status || "pending",
      dueDate: invoice.dueDate,
      paidDate: invoice.paidDate,
    }).returning();
    return newInvoice;
  }

  async updateInvoice(id: string, updates: Partial<CreateInvoiceInput>): Promise<Invoice | undefined> {
    const updateData: Record<string, unknown> = {};
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.amount !== undefined) updateData.amount = updates.amount;
    if (updates.dueDate !== undefined) updateData.dueDate = updates.dueDate;
    if (updates.paidDate !== undefined) updateData.paidDate = updates.paidDate;
    
    const [updated] = await db.update(invoices).set(updateData).where(eq(invoices.id, id)).returning();
    return updated;
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment;
  }

  async getPaymentsByInvoice(invoiceId: string): Promise<Payment[]> {
    return db.select().from(payments)
      .where(eq(payments.invoiceId, invoiceId))
      .orderBy(desc(payments.createdAt));
  }

  async createPayment(payment: CreatePaymentInput): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values({
      invoiceId: payment.invoiceId,
      amount: payment.amount,
      date: payment.date,
      method: payment.method,
    }).returning();
    return newPayment;
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    return db.select().from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async createNotification(notification: CreateNotificationInput): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values({
      userId: notification.userId,
      title: notification.title,
      message: notification.message,
      type: notification.type || "info",
      read: notification.read || false,
      link: notification.link,
    }).returning();
    return newNotification;
  }

  async markNotificationRead(id: string): Promise<Notification | undefined> {
    const [updated] = await db.update(notifications).set({ read: true }).where(eq(notifications.id, id)).returning();
    return updated;
  }

  async markAllNotificationsRead(userId: string): Promise<void> {
    await db.update(notifications).set({ read: true }).where(eq(notifications.userId, userId));
  }
}

export const storage = new DatabaseStorage();
