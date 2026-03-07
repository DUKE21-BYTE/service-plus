export type ApiResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type Plan = "STARTER" | "GROWTH" | "PRO";

export type Industry =
  | "HVAC"
  | "PLUMBING"
  | "ROOFING"
  | "ELECTRICAL"
  | "LANDSCAPING"
  | "OTHER";

export type AutomationType =
  | "MISSED_CALL_TEXTBACK"
  | "REVIEW_REQUEST"
  | "BOOKING_CONFIRMATION"
  | "FOLLOW_UP_SEQUENCE";

export type NavItem = {
  label: string;
  href: string;
  icon?: string;
};

export type PricingTier = {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlight?: boolean;
  cta: string;
};

export type DashboardStats = {
  missedCalls: number;
  textsSent: number;
  reviewRequests: number;
  bookings: number;
  conversionRate: number;
};
