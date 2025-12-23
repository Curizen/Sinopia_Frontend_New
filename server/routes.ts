import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const EXTERNAL_API_BASE = "http://sinopi.eu";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/users/register", async (req, res) => {
    try {
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
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
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/reset-password`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.body),
      });
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
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
      
      const response = await fetch(`${EXTERNAL_API_BASE}/api/users/logout`, {
        method: "POST",
        headers,
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Logout proxy error:", error);
      res.status(500).json({ status: "error", message: "Failed to connect to authentication server" });
    }
  });

  return httpServer;
}
