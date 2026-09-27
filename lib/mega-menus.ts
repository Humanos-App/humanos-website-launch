export type MegaItem = {
  title: string;
  sub?: string;
  /** Optional small chip rendered before the title (e.g. "Coming soon"). */
  tag?: string;
  /** Optional icon, used by compact menus (see Navbar MegaIcon). */
  icon?: "measure" | "control" | "intelligence";
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
  /** Small dropdown anchored under its label instead of the full-width
   *  panel — for short menus like Solutions. */
  compact?: boolean;
};

export const PLATFORM_MENU: MegaMenu = {
  key: "platform",
  columns: [
    {
      label: "Primitives",
      items: [
        { title: "Mandates", sub: "Standing authority records", href: "#" },
        { title: "Requests", sub: "Capture human intent", href: "#" },
        {
          title: "Execution Receipts",
          sub: "Independently verifiable",
          href: "#",
        },
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

/**
 * Solutions — the three product pages, in story order (Measure → Control →
 * Intelligence). A compact dropdown under its label, not the full-width
 * panel Developers uses.
 */
export const SOLUTIONS_MENU: MegaMenu = {
  key: "solutions",
  compact: true,
  columns: [
    {
      label: "Solutions",
      items: [
        {
          title: "Measure Risk",
          sub: "Know the risk behind every agent",
          icon: "measure",
          href: "/measure",
        },
        {
          title: "Control Risk",
          sub: "Reduce your agents' risk",
          icon: "control",
          href: "/control",
        },
        {
          title: "Risk Intelligence",
          sub: "Build on top of agent risk",
          icon: "intelligence",
          href: "/intelligence",
        },
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
          title: "Quickstart",
          sub: "5-minute integration",
          href: "https://docs.humanos.tech/essentials/quick-start",
        },
        {
          title: "Get API key",
          sub: "Create production credentials",
          href: "https://app.humanos.tech",
        },
        {
          title: "API reference",
          sub: "Guardrails and enforcement",
          href: "https://docs.humanos.tech",
        },
        {
          title: "MCP",
          tag: "Coming soon",
          sub: "Model Context Protocol",
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
        {
          title: "Agent SDK",
          tag: "Coming soon",
          sub: "Agent risk monitoring",
          href: "#",
        },
      ],
    },
    {
      label: "Core",
      items: [
        {
          title: "humanos.verify()",
          sub: "Verify before execution",
          href: "https://docs.humanos.tech/api-reference/latest/credentials/verify-vp",
        },
        {
          title: "Requesting approvals",
          sub: "Capture approval at runtime",
          href: "https://docs.humanos.tech/api-reference/latest/requests/create-request",
        },
        {
          title: "Revocation",
          sub: "Invalidate credentials",
          href: "https://docs.humanos.tech/api-reference/latest/credentials/revoke-credential",
        },
        {
          title: "Webhooks",
          sub: "Event-driven integration",
          href: "https://docs.humanos.tech/essentials/webhooks-intro",
        },
      ],
    },
  ],
};
