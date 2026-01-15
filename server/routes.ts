import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";

const EXTERNAL_API_BASE = process.env.EXTERNAL_API_URL || "https://sinopia.eu";

// Configure multer for memory storage (we'll forward the file to external API)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

function forwardCookies(externalResponse: Response, res: any) {
  const setCookieHeader = externalResponse.headers.get("set-cookie");
  if (setCookieHeader) {
    res.setHeader("Set-Cookie", setCookieHeader);
  }
}

function getClientCookies(req: any): string {
  const cookies = req.headers.cookie;
  return cookies || "";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/users/register", async (req, res) => {
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cookie": getClientCookies(req),
        },
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Register proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to connect to authentication server" });
    }
  });

  app.post("/api/users/verify-register-otp", async (req, res) => {
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/verify-register-otp`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cookie": getClientCookies(req),
        },
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Verify OTP proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to connect to authentication server" });
    }
  });

  app.post("/api/users/login", async (req, res) => {
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cookie": getClientCookies(req),
        },
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] Login API response from sinopia.eu:", JSON.stringify(data, null, 2));
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Login proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to connect to authentication server" });
    }
  });

  app.post("/api/users/forgot-password", async (req, res) => {
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/forgot-password`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cookie": getClientCookies(req),
        },
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Forgot password proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to connect to authentication server" });
    }
  });

  app.post("/api/users/verify-forgot-password-otp", async (req, res) => {
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/verify-forgot-password-otp`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cookie": getClientCookies(req),
        },
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Verify forgot password OTP proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to connect to authentication server" });
    }
  });

  app.post("/api/users/reset-password", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/reset-password`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Reset password proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to connect to authentication server" });
    }
  });

  app.post("/api/users/logout", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/logout`, {
        method: "POST",
        headers,
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Logout proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to connect to authentication server" });
    }
  });

  // Certificates API proxy - Create
  app.post("/api/certificates", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/certificates`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Add certificate proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to add certificate" });
    }
  });

  // Certificates API proxy - Update
  app.put("/api/certificates/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/certificates/${req.params.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Update certificate proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to update certificate" });
    }
  });

  // Certificates API proxy - Delete
  app.delete("/api/certificates/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/certificates/${req.params.id}`, {
        method: "DELETE",
        headers,
      });
      forwardCookies(response, res);
      
      if (response.status === 204) {
        res.status(204).send();
      } else {
        const data = await response.json();
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error("Delete certificate proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to delete certificate" });
    }
  });

  // Education API proxy - Create
  app.post("/api/education", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/education`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Add education proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to add education" });
    }
  });

  // Education API proxy - Update
  app.put("/api/education/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/education/${req.params.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Update education proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to update education" });
    }
  });

  // Education API proxy - Delete
  app.delete("/api/education/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/education/${req.params.id}`, {
        method: "DELETE",
        headers,
      });
      forwardCookies(response, res);
      
      if (response.status === 204) {
        res.status(204).send();
      } else {
        const data = await response.json();
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error("Delete education proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to delete education" });
    }
  });

  // Experience API proxy - Create
  app.post("/api/experience", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/experience`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Add experience proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to add experience" });
    }
  });

  // Experience API proxy - Update
  app.put("/api/experience/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/experience/${req.params.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Update experience proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to update experience" });
    }
  });

  // Experience API proxy - Delete
  app.delete("/api/experience/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/experience/${req.params.id}`, {
        method: "DELETE",
        headers,
      });
      forwardCookies(response, res);
      
      if (response.status === 204) {
        res.status(204).send();
      } else {
        const data = await response.json();
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error("Delete experience proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to delete experience" });
    }
  });

  // Projects API proxy - Create
  app.post("/api/projects", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      // Map frontend field names to API field names
      const apiBody = {
        project_name: req.body.name,
        description: req.body.description,
        technologies: req.body.technologies,
        duration: req.body.duration,
        project_url: req.body.project_url,
      };
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/personal-projects`, {
        method: "POST",
        headers,
        body: JSON.stringify(apiBody),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Add project proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to add project" });
    }
  });

  // Projects API proxy - Update
  app.put("/api/projects/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      // Map frontend field names to API field names
      const apiBody = {
        project_name: req.body.name,
        description: req.body.description,
        technologies: req.body.technologies,
        duration: req.body.duration,
        project_url: req.body.project_url,
      };
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/personal-projects/${req.params.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(apiBody),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Update project proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to update project" });
    }
  });

  // Projects API proxy - Delete
  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/personal-projects/${req.params.id}`, {
        method: "DELETE",
        headers,
      });
      forwardCookies(response, res);
      
      if (response.status === 204) {
        res.status(204).send();
      } else {
        const data = await response.json();
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error("Delete project proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to delete project" });
    }
  });

  // Skills API proxy - Add
  app.post("/api/skills", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/skills`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Add skill proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to add skill" });
    }
  });

  // Skills API proxy - Update
  app.put("/api/skills/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/skills/${req.params.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Update skill proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to update skill" });
    }
  });

  // Skills API proxy - Delete
  app.delete("/api/skills/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/skills/${req.params.id}`, {
        method: "DELETE",
        headers,
      });
      forwardCookies(response, res);
      
      if (response.status === 204) {
        res.status(204).send();
      } else {
        const data = await response.json();
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error("Delete skill proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to delete skill" });
    }
  });

  // Profile API proxy - Update (for Personal Info and Bio)
  app.put("/api/profile", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      console.log("[DEBUG] PUT /api/profile - Request body:", JSON.stringify(req.body, null, 2));
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/profile`, {
        method: "PUT",
        headers,
        body: JSON.stringify(req.body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] PUT /api/profile - Response:", JSON.stringify(data, null, 2));
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Update profile proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to update profile" });
    }
  });

  // CV Upload API proxy - Upload and extract with AI
  app.post("/api/upload-cv", upload.single('cvFile'), async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const file = req.file;
      
      if (!file) {
        res.status(400).json({ status: "error", message: "No file uploaded" });
        return;
      }
      
      console.log("[DEBUG] POST /api/upload-cv - File:", file.originalname, "Size:", file.size);
      
      // Create FormData to forward to external API
      const formData = new FormData();
      const blob = new Blob([file.buffer], { type: file.mimetype });
      formData.append('cvFile', blob, file.originalname);
      
      const headers: Record<string, string> = {
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/upload-cv`, {
        method: "POST",
        headers,
        body: formData,
      });
      
      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] POST /api/upload-cv - Response status:", response.status);
      console.log("[DEBUG] POST /api/upload-cv - Response data:", JSON.stringify(data, null, 2));
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Upload CV proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to upload CV" });
    }
  });

  return httpServer;
}
