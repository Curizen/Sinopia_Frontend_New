import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ================== USERS ==================
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().$type<"skill_giver" | "skill_searcher">(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatar: text("avatar"),
  cvUrl: text("cv_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  skillGiverProfile: one(skillGiverProfiles, {
    fields: [users.id],
    references: [skillGiverProfiles.userId],
  }),
  skillSearcherProfile: one(skillSearcherProfiles, {
    fields: [users.id],
    references: [skillSearcherProfiles.userId],
  }),
  ownedProjects: many(projects, { relationName: "owner" }),
  assignedProjects: many(projects, { relationName: "assignee" }),
  sentOffers: many(offers, { relationName: "sender" }),
  receivedOffers: many(offers, { relationName: "receiver" }),
  notifications: many(notifications),
}));

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ================== SKILL GIVER PROFILES ==================
export const skillGiverProfiles = pgTable("skill_giver_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  bio: text("bio"),
  title: text("title"),
  hourlyRate: integer("hourly_rate"),
  skills: text("skills").array(),
  experience: jsonb("experience").$type<ExperienceItem[]>().default([]),
  education: jsonb("education").$type<EducationItem[]>().default([]),
  certifications: jsonb("certifications").$type<CertificationItem[]>().default([]),
  portfolio: jsonb("portfolio").$type<PortfolioItem[]>().default([]),
  location: text("location"),
  availability: text("availability"),
});

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  technologies: string[];
}

export const insertSkillGiverProfileSchema = createInsertSchema(skillGiverProfiles).omit({
  id: true,
});
export type InsertSkillGiverProfile = z.infer<typeof insertSkillGiverProfileSchema>;
export type SkillGiverProfile = typeof skillGiverProfiles.$inferSelect;

// ================== SKILL SEARCHER PROFILES ==================
export const skillSearcherProfiles = pgTable("skill_searcher_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  companyName: text("company_name"),
  industry: text("industry"),
  website: text("website"),
  bio: text("bio"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  location: text("location"),
});

export const insertSkillSearcherProfileSchema = createInsertSchema(skillSearcherProfiles).omit({
  id: true,
});
export type InsertSkillSearcherProfile = z.infer<typeof insertSkillSearcherProfileSchema>;
export type SkillSearcherProfile = typeof skillSearcherProfiles.$inferSelect;

// ================== PROJECTS ==================
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().$type<"draft" | "open" | "in_progress" | "completed" | "cancelled">().default("draft"),
  budget: integer("budget").notNull(),
  deadline: text("deadline").notNull(),
  skills: text("skills").array().default([]),
  stages: jsonb("stages").$type<StageItem[]>().default([]),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  assigneeId: varchar("assignee_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export interface StageItem {
  id: string;
  name: string;
  order: number;
  tasks: TaskItem[];
  progress: number;
}

export interface TaskItem {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "completed";
  dueDate?: string;
}

export const projectsRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, {
    fields: [projects.ownerId],
    references: [users.id],
    relationName: "owner",
  }),
  assignee: one(users, {
    fields: [projects.assigneeId],
    references: [users.id],
    relationName: "assignee",
  }),
  offers: many(offers),
  contracts: many(contracts),
  invoices: many(invoices),
}));

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// ================== OFFERS ==================
export const offers = pgTable("offers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull().references(() => projects.id),
  fromUserId: varchar("from_user_id").notNull().references(() => users.id),
  toUserId: varchar("to_user_id").notNull().references(() => users.id),
  status: text("status").notNull().$type<"pending" | "accepted" | "rejected">().default("pending"),
  amount: integer("amount").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const offersRelations = relations(offers, ({ one }) => ({
  project: one(projects, {
    fields: [offers.projectId],
    references: [projects.id],
  }),
  fromUser: one(users, {
    fields: [offers.fromUserId],
    references: [users.id],
    relationName: "sender",
  }),
  toUser: one(users, {
    fields: [offers.toUserId],
    references: [users.id],
    relationName: "receiver",
  }),
}));

export const insertOfferSchema = createInsertSchema(offers).omit({
  id: true,
  createdAt: true,
});
export type InsertOffer = z.infer<typeof insertOfferSchema>;
export type Offer = typeof offers.$inferSelect;

// ================== CONTRACTS ==================
export const contracts = pgTable("contracts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull().references(() => projects.id),
  clientId: varchar("client_id").notNull().references(() => users.id),
  freelancerId: varchar("freelancer_id").notNull().references(() => users.id),
  status: text("status").notNull().$type<"draft" | "sent" | "signed">().default("draft"),
  amount: integer("amount").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contractsRelations = relations(contracts, ({ one }) => ({
  project: one(projects, {
    fields: [contracts.projectId],
    references: [projects.id],
  }),
  client: one(users, {
    fields: [contracts.clientId],
    references: [users.id],
  }),
  freelancer: one(users, {
    fields: [contracts.freelancerId],
    references: [users.id],
  }),
}));

export const insertContractSchema = createInsertSchema(contracts).omit({
  id: true,
  createdAt: true,
});
export type InsertContract = z.infer<typeof insertContractSchema>;
export type Contract = typeof contracts.$inferSelect;

// ================== INVOICES ==================
export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull().references(() => projects.id),
  amount: integer("amount").notNull(),
  status: text("status").notNull().$type<"pending" | "paid" | "overdue">().default("pending"),
  dueDate: text("due_date").notNull(),
  paidDate: text("paid_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  project: one(projects, {
    fields: [invoices.projectId],
    references: [projects.id],
  }),
  payments: many(payments),
}));

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
});
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

// ================== PAYMENTS ==================
export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceId: varchar("invoice_id").notNull().references(() => invoices.id),
  amount: integer("amount").notNull(),
  date: text("date").notNull(),
  method: text("method").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  invoice: one(invoices, {
    fields: [payments.invoiceId],
    references: [invoices.id],
  }),
}));

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

// ================== NOTIFICATIONS ==================
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull().$type<"info" | "success" | "warning" | "error">().default("info"),
  read: boolean("read").notNull().default(false),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;
