export const USER_ROLES = {
  SKILL_GIVER: 'skill_giver',
  SKILL_SEARCHER: 'skill_searcher',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const PROJECT_STATUS = {
  DRAFT: 'draft',
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS];

export const OFFER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;

export type OfferStatus = typeof OFFER_STATUS[keyof typeof OFFER_STATUS];

export const CONTRACT_STATUS = {
  DRAFT: 'draft',
  SENT: 'sent',
  SIGNED: 'signed',
} as const;

export type ContractStatus = typeof CONTRACT_STATUS[keyof typeof CONTRACT_STATUS];

export const INVOICE_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
} as const;

export type InvoiceStatus = typeof INVOICE_STATUS[keyof typeof INVOICE_STATUS];

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];
