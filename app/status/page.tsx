import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Status",
  description:
    "Current operational status of the Humanos platform: application, API, dashboard and documentation.",
  alternates: { canonical: "/status" },
};

const LAST_UPDATED = "2026-08-24";

type Component = {
  name: string;
  description: string;
  status: "operational" | "degraded" | "outage" | "maintenance";
};

const COMPONENTS: Component[] = [
  {
    name: "Application",
    description: "app.humanos.id — identity verification and credential flows",
    status: "operational",
  },
  {
    name: "Public API",
    description: "api.humanos.id — REST API and webhooks",
    status: "operational",
  },
  {
    name: "Website",
    description: "www.humanos.tech",
    status: "operational",
  },
  {
    name: "Documentation",
    description: "docs.humanos.tech — guides and API reference",
    status: "operational",
  },
];

const STATUS_LABEL: Record<Component["status"], string> = {
  operational: "Operational",
  degraded: "Degraded performance",
  outage: "Outage",
  maintenance: "Under maintenance",
};

const STATUS_COLOR: Record<Component["status"], string> = {
  operational: "#0a7d2c",
  degraded: "#b45309",
  outage: "#b91c1c",
  maintenance: "#1a4d8f",
};

const allOperational = COMPONENTS.every((c) => c.status === "operational");

export default function StatusPage() {
  return (
    <main className="legal">
      <div className="wrap">
        <div className="legal__inner">
          <p className="legal__eyebrow">System status · updated {LAST_UPDATED}</p>
          <h1 className="legal__title">Humanos System Status</h1>

          <p
            className="legal__lede"
            style={{
              borderLeft: `4px solid ${allOperational ? "#0a7d2c" : "#b45309"}`,
              paddingLeft: "1rem",
            }}
          >
            {allOperational
              ? "All systems operational."
              : "Some systems are experiencing issues — see below."}
          </p>

          <h2 className="legal__h2">Components</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {COMPONENTS.map((c) => (
              <li
                key={c.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "1rem",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid rgba(128,128,128,0.25)",
                }}
              >
                <span>
                  <strong>{c.name}</strong>
                  <br />
                  <span style={{ opacity: 0.7, fontSize: "0.9em" }}>
                    {c.description}
                  </span>
                </span>
                <strong style={{ color: STATUS_COLOR[c.status], whiteSpace: "nowrap" }}>
                  {STATUS_LABEL[c.status]}
                </strong>
              </li>
            ))}
          </ul>

          <h2 className="legal__h2">Incident history</h2>
          <p>
            No incidents reported since this page was launched in August 2026.
            Past incidents and their resolutions will be listed here.
          </p>

          <h2 className="legal__h2">Scheduled maintenance</h2>
          <p>No maintenance is currently scheduled.</p>

          <h2 className="legal__h2">How this page works</h2>
          <p>
            Our systems are monitored continuously by automated infrastructure
            and application alerting. This page is updated by the team when an
            incident or maintenance window affects customers, and again when it
            is resolved. If you are seeing a problem that is not reflected
            here, email{" "}
            <a href="mailto:support@humanos.tech">support@humanos.tech</a> and
            we will look at it right away. You can also write to the same
            address to be notified about incidents by email.
          </p>
        </div>
      </div>
    </main>
  );
}
