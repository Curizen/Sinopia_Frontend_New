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
  // Use getSetCookie() to properly get all Set-Cookie headers as an array
  // This is the correct way to handle multiple cookies from the external API
  const setCookieHeaders = externalResponse.headers.getSetCookie?.();
  
  if (setCookieHeaders && setCookieHeaders.length > 0) {
    // Set each cookie individually to preserve all cookies
    res.setHeader("Set-Cookie", setCookieHeaders);
    console.log("[DEBUG] Forwarding cookies:", setCookieHeaders.length, "cookies");
  } else {
    // Fallback for older Node.js versions - try raw header
    const rawHeader = externalResponse.headers.get("set-cookie");
    if (rawHeader) {
      // Split by comma but be careful with expires dates that contain commas
      const cookies = rawHeader.split(/,(?=\s*[^;=]+=[^;]*(?:;|$))/);
      if (cookies.length > 0) {
        res.setHeader("Set-Cookie", cookies);
        console.log("[DEBUG] Forwarding cookies (fallback):", cookies.length, "cookies");
      }
    }
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
    // Helper to clear ALL cookies from the request - parse cookie header and expire each one
    const clearAllCookiesFromRequest = () => {
      const cookieHeader = req.headers.cookie || '';
      const cookieNames = cookieHeader.split(';')
        .map(cookie => cookie.trim().split('=')[0])
        .filter(name => name.length > 0);
      
      // Clear each cookie found in the request with multiple path combinations
      const paths = ['/', '/api', ''];
      cookieNames.forEach(cookieName => {
        paths.forEach(path => {
          res.clearCookie(cookieName, { path: path || '/' });
        });
      });
      
      // Also explicitly clear known session cookies with various options
      const knownCookies = ['accessToken', 'refreshToken', 'ip_address', 'session', 'sessionId', 'connect.sid'];
      knownCookies.forEach(cookieName => {
        res.clearCookie(cookieName, { path: '/' });
        res.clearCookie(cookieName, { path: '/api' });
        // Set expired cookie as backup
        res.cookie(cookieName, '', { 
          expires: new Date(0), 
          path: '/',
          httpOnly: true,
        });
      });
      
      console.log("[DEBUG] Logout - Cleared cookies from request:", cookieNames.join(', '));
      console.log("[DEBUG] Logout - Also cleared known cookies:", knownCookies.join(', '));
    };

    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      console.log("[DEBUG] Logout - Calling external API with cookies:", getClientCookies(req));
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/logout/`, {
        method: "POST",
        headers,
      });
      
      // Forward any Set-Cookie headers from external API (which should clear their cookies)
      forwardCookies(response, res);
      
      // ALWAYS clear all cookies from request regardless of external API result
      clearAllCookiesFromRequest();
      
      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: "Logged out" };
      }
      console.log("[DEBUG] Logout - External API Response:", JSON.stringify(data));
      
      // Return success - user is logged out on our side regardless of external API
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout proxy error:", error);
      // Still clear cookies even on error
      clearAllCookiesFromRequest();
      res.status(200).json({ message: "Logged out successfully" });
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

  // Skills API proxy - Get all skills for current user
  app.get("/api/skills", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      console.log("[DEBUG] GET /api/skills - Fetching skills from external API");
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/skills/`, {
        method: "GET",
        headers,
      });
      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] GET /api/skills - Response:", JSON.stringify(data, null, 2));
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Get skills proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to get skills" });
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
      
      // Transform frontend format to backend format
      // Frontend: skill_type "technical" or "soft" → Backend: "technical_skills" or "soft_skills"
      // Frontend: level "Advanced" → Backend: "advanced" (lowercase)
      const transformedBody = {
        ...req.body,
        skill_type: req.body.skill_type === 'soft' ? 'soft_skills' : 'technical_skills',
        level: req.body.level?.toLowerCase() || 'intermediate',
      };
      
      console.log("[DEBUG] POST /api/skills - Original body:", JSON.stringify(req.body));
      console.log("[DEBUG] POST /api/skills - Transformed body:", JSON.stringify(transformedBody));
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/skills/`, {
        method: "POST",
        headers,
        body: JSON.stringify(transformedBody),
      });
      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] POST /api/skills - Response:", JSON.stringify(data));
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
      
      // Transform frontend format to backend format
      const transformedBody = {
        ...req.body,
        skill_type: req.body.skill_type === 'soft' ? 'soft_skills' : 'technical_skills',
        level: req.body.level?.toLowerCase() || 'intermediate',
      };
      
      console.log("[DEBUG] PUT /api/skills - Original body:", JSON.stringify(req.body));
      console.log("[DEBUG] PUT /api/skills - Transformed body:", JSON.stringify(transformedBody));
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/skills/${req.params.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(transformedBody),
      });
      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] PUT /api/skills - Response:", JSON.stringify(data));
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

  // Profile API proxy - Get current user profile
  app.get("/api/profile/me", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      console.log("[DEBUG] GET /api/profile/me");

      const response = await fetch(`${EXTERNAL_API_BASE}/api/profile/me`, {
        method: "GET",
        headers,
      });

      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] GET /api/profile/me - Response status:", response.status);
      console.log("[DEBUG] GET /api/profile/me - Response:", JSON.stringify(data, null, 2));
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Get profile proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to fetch profile" });
    }
  });

  // Profile API proxy - Update (for Personal Info and Bio)
  // Uses POST method with trailing slash as required by backend
  app.post("/api/profile", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = { 
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      // Validate and trim website URL if provided
      const body = { ...req.body };
      if (body.website) {
        body.website = body.website.trim();
        // Validate website starts with https://
        if (body.website && !body.website.startsWith('https://')) {
          res.status(400).json({ 
            status: "error", 
            message: "Website must start with https://" 
          });
          return;
        }
      }
      
      console.log("[DEBUG] POST /api/profile - Request body:", JSON.stringify(body, null, 2));
      
      // Note: External API requires trailing slash on /api/profile/
      const response = await fetch(`${EXTERNAL_API_BASE}/api/profile/`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] POST /api/profile - Response status:", response.status);
      console.log("[DEBUG] POST /api/profile - Response:", JSON.stringify(data, null, 2));
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

  // Get single use case by ID
  app.get("/api/use-case/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      console.log("[DEBUG] GET /api/use-case/" + id);

      const response = await fetch(`${EXTERNAL_API_BASE}/api/use-case/${id}`, {
        method: "GET",
        headers,
      });

      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] GET /api/use-case/" + id + " - Response status:", response.status);
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Get use case by ID proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to fetch use case" });
    }
  });

  // Get user's use cases
  app.get("/api/use-case/my-usecases", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      console.log("[DEBUG] GET /api/use-case/my-usecases");

      const response = await fetch(`${EXTERNAL_API_BASE}/api/use-case/my-usecases`, {
        method: "GET",
        headers,
      });

      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] GET /api/use-case/my-usecases - Response status:", response.status);
      console.log("[DEBUG] GET /api/use-case/my-usecases - Response data:", JSON.stringify(data, null, 2));
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Get use cases proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to fetch use cases" });
    }
  });

  // Use Case Analysis endpoint
  app.post("/api/use-case/analysis", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      console.log("[DEBUG] POST /api/use-case/analysis - Body:", JSON.stringify(req.body, null, 2));

      const response = await fetch(`${EXTERNAL_API_BASE}/api/use-case/analysis`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.body),
      });

      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] POST /api/use-case/analysis - Response status:", response.status);
      console.log("[DEBUG] POST /api/use-case/analysis - Response data:", JSON.stringify(data, null, 2));
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Use case analysis proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to analyze use case" });
    }
  });

  // Use Case File Analysis endpoint (for PDF/DOC uploads)
  app.post("/api/use-case/analysis-file", upload.single('file'), async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({ status: "error", message: "Authorization required" });
      }

      if (!req.file) {
        return res.status(400).json({ status: "error", message: "No file uploaded" });
      }

      console.log("[DEBUG] POST /api/use-case/analysis-file - File:", req.file.originalname, req.file.mimetype, req.file.size);

      // Create FormData for forwarding to external API
      const formData = new FormData();
      const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
      formData.append('file', blob, req.file.originalname);

      const response = await fetch(`${EXTERNAL_API_BASE}/api/use-case/analysis-file`, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Cookie": getClientCookies(req),
        },
        body: formData,
      });

      console.log("[DEBUG] POST /api/use-case/analysis-file - Response status:", response.status);
      
      forwardCookies(response, res);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("[DEBUG] POST /api/use-case/analysis-file - Error:", errorText);
        try {
          const errorJson = JSON.parse(errorText);
          return res.status(response.status).json(errorJson);
        } catch {
          return res.status(response.status).json({ status: "error", message: errorText || "File analysis failed" });
        }
      }

      const data = await response.json();
      console.log("[DEBUG] POST /api/use-case/analysis-file - Response data:", JSON.stringify(data, null, 2));
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Use case file analysis proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to analyze file" });
    }
  });

  // Get user's offers
  app.get("/api/offers/my-offers", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      console.log("[DEBUG] GET /api/offers/my-offers");

      const response = await fetch(`${EXTERNAL_API_BASE}/api/offers/my-offers`, {
        method: "GET",
        headers,
      });

      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] GET /api/offers/my-offers - Response status:", response.status);
      console.log("[DEBUG] GET /api/offers/my-offers - Response data:", JSON.stringify(data, null, 2));
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Get offers proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to fetch offers" });
    }
  });

  // Get offer by ID
  app.get("/api/offers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      console.log("[DEBUG] GET /api/offers/" + id);

      const response = await fetch(`${EXTERNAL_API_BASE}/api/offers/${id}`, {
        method: "GET",
        headers,
      });

      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] GET /api/offers/" + id + " - Response status:", response.status);
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Get offer by ID proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to fetch offer" });
    }
  });

  // Accept offer
  app.post("/api/offers/:id/accept", async (req, res) => {
    try {
      const { id } = req.params;
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      console.log("[DEBUG] POST /api/offers/" + id + "/accept");

      const response = await fetch(`${EXTERNAL_API_BASE}/api/offers/${id}/accept`, {
        method: "POST",
        headers,
      });

      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] POST /api/offers/" + id + "/accept - Response status:", response.status);
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Accept offer proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to accept offer" });
    }
  });

  // Reject offer
  app.post("/api/offers/:id/reject", async (req, res) => {
    try {
      const { id } = req.params;
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      console.log("[DEBUG] POST /api/offers/" + id + "/reject");

      const response = await fetch(`${EXTERNAL_API_BASE}/api/offers/${id}/reject`, {
        method: "POST",
        headers,
      });

      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] POST /api/offers/" + id + "/reject - Response status:", response.status);
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Reject offer proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to reject offer" });
    }
  });

  // Use Case Creation endpoint
  app.post("/api/use-case", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Cookie": getClientCookies(req),
      };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }

      console.log("[DEBUG] POST /api/use-case - Body:", JSON.stringify(req.body, null, 2));

      const response = await fetch(`${EXTERNAL_API_BASE}/api/use-case`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.body),
      });

      forwardCookies(response, res);
      const data = await response.json();
      console.log("[DEBUG] POST /api/use-case - Response status:", response.status);
      console.log("[DEBUG] POST /api/use-case - Response data:", JSON.stringify(data, null, 2));
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Use case creation proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to create use case" });
    }
  });

  // Chat webhook proxy for AI assistant
  app.post("/api/chat/webhook", async (req, res) => {
    try {
      // Hardcoded webhook URLs (no environment variables needed)
      const GIVER_WEBHOOK_URL = "https://sinopia.app.n8n.cloud/webhook/Chatbot_SkillGiver";
      const SEARCHER_WEBHOOK_URL = "https://sinopia.app.n8n.cloud/webhook/Skill_Searcher_chatbot";
      
      const { role, user_id, skill_searcher_id, message } = req.body;
      
      // Validate required message field
      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ status: "error", message: "Message is required" });
      }

      // Select webhook URL and construct payload based on role
      let webhookUrl: string;
      let webhookPayload: Record<string, unknown>;
      
      if (role === 'skill_searcher') {
        webhookUrl = SEARCHER_WEBHOOK_URL;
        webhookPayload = {
          skill_searcher_id: skill_searcher_id || null,
          message: message.trim(),
        };
      } else {
        // Default to skill_giver format for skill_giver, guest, or unknown roles
        webhookUrl = GIVER_WEBHOOK_URL;
        webhookPayload = {
          user_id: user_id || null,
          message: message.trim(),
        };
        if (role !== 'skill_giver') {
          console.warn("[DEBUG] Unknown role, defaulting to skill_giver webhook:", role);
        }
      }

      console.log("[DEBUG] POST /api/chat/webhook - Role:", role, "URL:", webhookUrl);
      console.log("[DEBUG] POST /api/chat/webhook - Payload:", JSON.stringify(webhookPayload, null, 2));

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[DEBUG] Chat webhook error:", errorText);
        return res.status(response.status).json({ status: "error", message: "Chat service error" });
      }

      const data = await response.json();
      console.log("[DEBUG] Chat webhook response:", JSON.stringify(data, null, 2));
      res.status(200).json(data);
    } catch (error) {
      console.error("Chat webhook proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to process chat message" });
    }
  });

  return httpServer;
}
