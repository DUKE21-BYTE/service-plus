import { z } from "zod";

// --- Business ---
export const businessSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters").max(100),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number"),
  industry: z.enum(["HVAC", "PLUMBING", "ROOFING", "ELECTRICAL", "LANDSCAPING", "OTHER"]),
  address: z.string().max(200).optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

// --- Review Request ---
export const reviewRequestSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  customerPhone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number"),
  customerEmail: z.string().email("Invalid email").optional().or(z.literal("")),
});

// --- Booking ---
export const bookingSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerPhone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  serviceType: z.string().min(2).max(100),
  scheduledAt: z.string().datetime(),
  notes: z.string().max(500).optional(),
});

// --- Automation Config ---
export const automationConfigSchema = z.object({
  type: z.enum(["MISSED_CALL_TEXTBACK", "REVIEW_REQUEST", "BOOKING_CONFIRMATION", "FOLLOW_UP_SEQUENCE"]),
  enabled: z.boolean(),
  config: z.record(z.unknown()),
});

// Types inferred from schemas
export type BusinessInput = z.infer<typeof businessSchema>;
export type ReviewRequestInput = z.infer<typeof reviewRequestSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type AutomationConfigInput = z.infer<typeof automationConfigSchema>;
