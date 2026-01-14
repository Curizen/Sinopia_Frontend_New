import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const EXTERNAL_API_BASE = process.env.EXTERNAL_API_URL || "https://sinopia.eu";

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

  return httpServer;
}
