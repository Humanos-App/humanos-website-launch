export const INDUSTRIES = [
  "Financial services",
  "Banking",
  "Insurance",
  "Healthcare",
  "Technology / SaaS",
  "AI / Autonomous agents",
  "Government / Public sector",
  "Retail / E-commerce",
  "Other",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const VERIFICATION_VOLUMES = [
  "< 1K / month",
  "1K – 10K / month",
  "10K – 100K / month",
  "100K – 1M / month",
  "1M+ / month",
  "Not sure yet",
] as const;

export type VerificationVolume = (typeof VERIFICATION_VOLUMES)[number];
