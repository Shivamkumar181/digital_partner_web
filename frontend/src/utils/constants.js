export const API_URL =
  import.meta.env.VITE_API_URL || "https://digital-partner-backend.onrender.com/api";

export const PROJECT_CATEGORIES = [
  "web development",
  "mobile development",
  "design",
  "writing",
  "marketing",
  "other",
];

export const CONTRIBUTION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  PAID: "paid",
};

export const PROJECT_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const USER_ROLES = {
  CLIENT: "client",
  FREELANCER: "freelancer",
};
