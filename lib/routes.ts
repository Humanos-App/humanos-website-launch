export const ROUTES = {
  home: "/",
  howItWorks: "/how-it-works",
  developers: "/developers",
  platform: "/platform",
  useCases: "/use-cases",
  pricing: "/pricing",
  trust: "/trust",
  company: "/company",
  customers: "/case-studies",
  /* The rebrand's product pages. Monitor points at v3, the current version. */
  solutions: {
    monitor: "/v2/monitor-v3",
    control: "/v2/control",
    riskIntelligence: "/v2/risk-intelligence",
  },
  caseStudies: {
    numo: "/case-studies/numo",
    ralio: "/case-studies/ralio",
  },
} as const;
