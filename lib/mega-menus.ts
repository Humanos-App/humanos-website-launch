export type MegaItem = {
  title: string;
  sub?: string;
  href: string;
};

export type MegaGroup = {
  /** Sub-section header within a column. Omit for flat columns. */
  label?: string;
  items: MegaItem[];
};

export type MegaColumn = {
  label: string;
  /** Flat list of items. Use either `items` OR `groups`, not both. */
  items?: MegaItem[];
  /** Grouped items with optional sub-headers. */
  groups?: MegaGroup[];
};

export type MegaMenu = {
  key: string;
  columns: MegaColumn[];
};

export const PLATFORM_MENU: MegaMenu = {
  key: "platform",
  columns: [
    {
      label: "Primitives",
      items: [
        { title: "Mandates", sub: "Standing authority records", href: "#" },
        { title: "Requests", sub: "Capture human intent", href: "#" },
        { title: "Execution Receipts", sub: "Independently verifiable", href: "#" },
        { title: "Verification", sub: "humanos.verify()", href: "#" },
      ],
    },
    {
      label: "Request types",
      items: [
        { title: "e-Sign", sub: "Review and sign a PDF", href: "#" },
        { title: "Form", sub: "Structured submission", href: "#" },
        { title: "Consent", sub: "Approve a consent item", href: "#" },
        { title: "Payment", sub: "Authorize a transfer", href: "#" },
        { title: "Policy", sub: "Sign a ruleset", href: "#" },
      ],
    },
    {
      label: "Platform",
      items: [
        { title: "Mandate Console", sub: "Operator UI", href: "#" },
        {
          title: "Humanos Intelligence",
          sub: "Adaptive auto-approval",
          href: "#",
        },
        { title: "Audit ledger", sub: "Anchored receipt history", href: "#" },
      ],
    },
    {
      label: "Protocol",
      items: [
        { title: "VIA Protocol", sub: "Open standard · W3C VC 2.0", href: "#" },
        { title: "DIDs", sub: "Decentralized identity", href: "#" },
      ],
    },
  ],
};

export const DEVELOPERS_MENU: MegaMenu = {
  key: "developers",
  columns: [
    {
      label: "Start",
      items: [
        {
          title: "Get API keys",
          sub: "Create production credentials",
          href: "https://app.humanos.id",
        },
        {
          title: "Quickstart",
          sub: "5-minute integration",
          href: "https://docs.humanos.id/essentials/quick-start",
        },
        {
          title: "Dashboard",
          sub: "Manage mandates & receipts",
          href: "https://app.humanos.id",
        },
        {
          title: "API reference",
          sub: "All endpoints & types",
          href: "https://docs.humanos.id",
        },
        {
          title: "VIA",
          sub: "Open verification protocol",
          href: "#",
        },
      ],
    },
    {
      label: "SDKs",
      items: [
        {
          title: "TypeScript",
          sub: "npm install humanos",
          href: "https://www.npmjs.com/package/humanos",
        },
        {
          title: "Python",
          sub: "pip install humanos",
          href: "https://pypi.org/project/humanos/",
        },
        {
          title: "C#",
          sub: "dotnet add Humanos",
          href: "https://www.nuget.org/packages/Humanos",
        },
      ],
    },
    {
      label: "Orchestration",
      groups: [
        {
          items: [
            {
              title: "n8n",
              sub: "Drop verify() into workflows",
              href: "#",
            },
            {
              title: "Zapier",
              sub: "Trigger-based automation",
              href: "#",
            },
          ],
        },
        {
          label: "Skills",
          items: [
            { title: "LLM 1", sub: "Coming soon", href: "#" },
            { title: "LLM 2", sub: "Coming soon", href: "#" },
            { title: "LLM …", sub: "Coming soon", href: "#" },
          ],
        },
      ],
    },
    {
      label: "Core",
      items: [
        {
          title: "humanos.verify()",
          sub: "Verify before execution",
          href: "https://docs.humanos.id/api-reference/2026-05-17/credentials/verify-vp",
        },
        {
          title: "Requesting approvals",
          sub: "Capture approval at runtime",
          href: "https://docs.humanos.id/api-reference/2026-05-17/requests/create-request",
        },
        {
          title: "Revocation",
          sub: "Invalidate credentials",
          href: "https://docs.humanos.id/api-reference/2026-05-17/credentials/revoke-credential",
        },
        {
          title: "Webhooks",
          sub: "Event-driven integration",
          href: "https://docs.humanos.id/essentials/webhooks-intro",
        },
      ],
    },
  ],
};

export const USE_CASES_MENU: MegaMenu = {
  key: "use-cases",
  columns: [
    {
      label: "By industry",
      items: [
        { title: "Agentic finance", sub: "Capital allocation by AI", href: "#" },
        { title: "Trading", sub: "Pre-trade authorization", href: "#" },
        { title: "Treasury", sub: "Programmable approvals", href: "#" },
        { title: "Healthcare", sub: "Consent at execution time", href: "#" },
      ],
    },
    {
      label: "By role",
      items: [
        { title: "Engineering", href: "#" },
        { title: "Compliance", href: "#" },
        { title: "Security", href: "#" },
        { title: "Product", href: "#" },
      ],
    },
    {
      label: "By pattern",
      items: [
        { title: "Agent delegation", href: "#" },
        { title: "Multi-party approval", href: "#" },
        { title: "Standing policies", href: "#" },
      ],
    },
    {
      label: "Customers",
      items: [
        { title: "Numo — banking", href: "/case-studies/numo" },
        { title: "Ralio — operations", href: "/case-studies/ralio" },
        { title: "DataWhisper — regulated AI", href: "/case-studies/datawhisper" },
        { title: "Lusíadas — healthcare", href: "/case-studies/lusiadas" },
        { title: "All case studies", href: "/case-studies" },
      ],
    },
  ],
};
