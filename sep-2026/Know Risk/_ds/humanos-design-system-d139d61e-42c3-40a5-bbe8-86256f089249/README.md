# Humanos Design System

**Humanos is the Risk Network for AI. One Risk API lets organizations reduce the operational risk of AI, and generates risk intelligence for insurers, auditors, compliance teams, regulators, and enterprise systems.**

As AI agents begin acting across organizations, every one of those parties needs the same thing: a shared, independent record of what happened, whether it was in bounds, and whether it can be evaluated for risk after the fact. Humanos is the infrastructure layer underneath — critical, neutral, permanent, engineered for regulated industries, not another AI product.

The product is not a UI; it is risk infrastructure. The design system's job is to make risk legible and to make the network — never AI itself — the visual center of the brand.

**This is not an AI-startup aesthetic.** Sit between Stripe, Cloudflare, Visa, Bloomberg, Chainalysis, Vanta, Persona, and Notabene — never OpenAI, Anthropic, Cursor, Vercel, or Lovable. No glowing gradients, no floating glass cards, no generic neural-network art, no sci-fi visuals. Every surface should feel engineered, precise, and permanent — critical infrastructure for regulated industries, not a demo.

## The positioning (do not water down)

Humanos provides one product: the **Risk API**. Through it, the Risk Network turns runtime evidence into two outcomes:

- **Risk Controls** (free) — help organizations operate AI safely, in real time.
- **Risk Intelligence** (paid) — help external organizations evaluate AI risk: insurers pricing it, auditors verifying it, regulators overseeing it.

Humanos is not an AI product and is never the hero of its own imagery — the network is. Think Bloomberg terminal meets Stripe infrastructure, not an AI-startup demo.

### The architecture this system communicates

```
      Humans + Organizations + AI Agents
                        ↓
                 Runtime Evidence
                        ↓
                   Risk Network
                        ↓
                    Risk API
                        ↓
        ┌──────────────┴──────────────┐
   Risk Controls (free)          Risk Intelligence (paid)
   operate AI safely             evaluate AI risk
```

The network is the center of the product. Every organization, human, and agent feeds it Runtime Evidence; the Risk API is the only way in or out.

---

## Sources

This system was built from:
- **Written brand + product definition** provided directly by the founder (the full extended guideline appears later in this document).
- **Logo set** provided as SVG + PNG pairs in `assets/`: `logo-mark-{black,white}.svg` (three bars, the canonical icon) and `logo-wordmark-{black,white}.svg` (mark + "Humanos" text).
- **Developer docs** at `https://humanos.mintlify.app/` — the source of truth for product vocabulary (VIA Protocol, Mandates, PoAI, Requests, DIDs, VCs). Marked as work-in-progress; the `verify` function is not yet documented.
- No production codebase or Figma was provided yet. The UI kit in this repo is an expert's **first interpretation of the brand spec + public docs**, not a recreation of the shipped product. Flag anything that diverges so we can correct.

---

## Product vocabulary (from the dev docs — use these terms exactly)

| Term | Meaning |
|---|---|
| **Risk Network** | The overall system: every human, organization, and AI agent whose runtime activity feeds evidence in, and every insurer, auditor, compliance team, regulator, and enterprise system that draws risk intelligence out. Humanos is neutral infrastructure the network runs through, not a party to any transaction. |
| **Risk API** | The single interface into the network. `POST /risk` — one call in, a Decision and a Runtime Trust Proof out. |
| **Runtime Evidence** | The raw input layer: every recorded agent action, identity check, and policy evaluation across the network — what the Risk API is built on top of. |
| **Risk Controls** | The free, operational output of the Risk API — KYA, Delegated Authority, Runtime Policy enforcement — how an organization keeps its own AI inside bounds in real time. |
| **Risk Intelligence** | The paid output of the Risk API — risk scores, Risk Scorecards, and reports sold to insurers, auditors, compliance teams, and regulators evaluating AI they don't operate themselves. |
| **KYA** (Know Your Agent) | Identity verification for an autonomous participant — who the agent is, cryptographically. The agent-identity analog of KYC. |
| **VIA** (Verifiable Intent Authorization) | The open-source protocol Humanos implements. Humanos → VIA as Auth0 → OAuth. |
| **Delegated Authority** | The provable link from an agent to the human or organization it represents, and the scope of what it may do on their behalf. |
| **Mandate** | A standing authority record: what an agent may do, under what conditions, for how long. Revocable any time. One structure that carries Delegated Authority + Runtime Policy. |
| **Runtime Policy** | The machine-evaluated constraints checked at the moment of the call — limits, scope, time windows, counterparties. Distinct from the standing Mandate: policies are evaluated live, every call. |
| **Runtime Trust Proof** / **Execution Evidence** | *(previously "Verifiable Presentation / VP" in the W3C spec)* A cryptographic receipt of a single risk decision — allowed, denied, blocked, expired, or out of scope. Verifiable by anyone, forever. Returned by `humanos.risk()`. |
| **Decision** | The runtime result of one Risk API call: **ALLOW** or **DENY**. Always paired with a Risk Score and a Runtime Trust Proof. |
| **Risk Scorecard** | A single-glance summary of every Risk Controls check evaluated for a given agent or organization, each shown pass/fail, rolled into one risk score. |
| **Insurance Attestation** | A future Risk Intelligence input: a third-party insurer's backing of an agent's actions up to a stated limit. Modeled the same way as any other Risk Controls check. |
| **PoAI** (Proof of Authorized Intent) | The underlying protocol concept for what a Runtime Trust Proof represents. Internal / protocol-facing term; in product UI and marketing, say **Proof**. |
| **Humanos Intelligence** | The adaptive layer that auto-resolves routine actions in scope and escalates anomalies to a human. |
| **Request** | A bundle of authorizations sent to one or more humans through a secure link — the human-facing on-ramp for capturing Delegated Authority and Runtime Policy. Types: **e-Sign, Form, Consent, Payment, Policy** (see next table). |
| **Policy** | *(previously the inner "mandate" type inside a Request)* A signed standing ruleset — the human signs once, Humanos enforces against every subsequent action. |
| **Verification** | The *act* of checking. `humanos.risk(action)` runs every Risk Controls check against one action; it resolves to a Decision plus a Runtime Trust Proof. |
| **DID** | W3C Decentralized Identifier. Every entity in the network — agent, system, org, human — has one. |
| **VC** | W3C Verifiable Credential (v2.0). Every authorization is encapsulated as one. |
| **Base URL** | `https://api.humanos.tech` *(migration in progress — docs still reference `api.humanos.id`; use `.tech` for all new work)* |

### Request types — the five things a human can authorize

| Type | Asks the human to… | Produces |
|---|---|---|
| **e-Sign** | review and sign a PDF | Signed PDF + Proof |
| **Form** | complete a structured form | Form record + Proof |
| **Consent** | approve a consent item (optionally embedding external resources) | Consent record + Proof |
| **Payment** | authorize a transfer or settlement | Payment authorization + Proof |
| **Policy** | sign a ruleset that governs future automated actions | **Mandate** + Proof |

> A **Policy** is the signed ruleset. A **Mandate** is the standing authority record that results from signing it. They are not the same thing — a Policy is the *act and contract*; a Mandate is the *record*.

---

## Index (what's in this folder)

```
README.md                  — you are here
SKILL.md                   — agent-skill wrapper for reuse in Claude Code
colors_and_type.css        — CSS variables: colors, type, spacing, radii, elevation, motion
assets/
  logo-mark-black.svg      — three-bar mark, black (primary)
  logo-mark-white.svg      — three-bar mark, chalk (for dark surfaces)
  logo-wordmark-black.svg  — mark + "Humanos" wordmark, black
  logo-wordmark-white.svg  — mark + "Humanos" wordmark, chalk
  (PNG equivalents of each)
preview/                   — design-system preview cards

## Components

Exported, importable components (`<Name>.jsx` + `<Name>.d.ts`, in `ui_kits/humanos-app/`), compiled into the shared bundle and readable via `window.<Namespace>`:

- **App** — assembled Mandate Console shell (sidebar + routing + sample state)
- **Sidebar** — brand bar, view nav, recent-mandates list with status pills
- **Dashboard** — KPI strip, verification-volume chart, outcome donuts, activity log
- **AgentConsole** — the `POST /risk` console: paste an action, watch it resolve to ALLOW / DENY with a Proof
- **Mark** — the three-bar brand glyph
- **Button** — primary/secondary/signal/danger/ghost variants
- **StatusPill** — Authorized/Executing/Pending/Rejected/Revoked status chip
- **Label** — uppercase small field label
- **KV** — key/value record row (mono value)
- **FieldRow** — labelled input row
- **Signature** — the "Assessed by Humanos" mark + ID chip

ui_kits/
  humanos-app/             — UI kit: Mandate Console + agent verification + issue mandate

New, network-centric preview cards (added as the brand evolved from authorization-first to
verification-network-first — see "The risk network diagram" and "API / developer
visual language" above):
  preview/network-verification-graph.html   — the hub-and-spoke network diagram
  preview/api-verify-request.html           — POST /risk request → response, Stripe-style
  preview/components-identity-cards.html    — Agent / Organization / Human identity records
  preview/components-trust-scorecard.html   — Risk Intelligence Outputs evaluated pass/fail at a glance
  preview/components-verification-chain.html— chained Verification Receipts / evidence trail
```

---

## 1. Core principle

Humanos is not a UI product. It is a source of truth for authorization. Every element in the interface must communicate one of:

1. **This action was allowed.**
2. **This action was not allowed.**
3. **This decision is verifiable and auditable.**

Every visual choice reinforces **determinism, traceability, trust.**

---

## 2. Visual philosophy

> Everything → Risk Network → Runtime Trust

The old model read *Human → Mandate → Verification → Execution* — a linear approval chain with a human at the head. That no longer reflects the company. Agents, organizations, humans, banks, insurers, and payment processors all connect to the **same network**; the network evaluates Risk Intelligence Outputs and returns Runtime Trust to whichever caller asked. No single trust signal — including human authorization — sits at the center. The network does.

Visually this means: replace linear left-to-right approval sequences with **hub-and-spoke or graph compositions** — many participants connecting into one verification core, one result flowing back out. Keep the graph abstract and geometric (nodes as hairline-bordered rects or dots, edges as 1px lines) — never a literal illustration, never a mascot, never a human figure.

The three design goals — in order — are:

1. **Authoritative.** No hedging, no softening, no "success!" language.
2. **Precise.** Every claim is anchored to an ID, a timestamp, a scope.
3. **Permanent.** Records read as settled facts, not ephemeral UI state.
4. **Neutral.** The network is infrastructure, not a participant. It never reads as a company vouching for someone — it reads as a protocol returning a fact.

---

## CONTENT FUNDAMENTALS

### Voice

The voice is that of a **neutral oracle**. Not a cheerful assistant, not a compliance officer, not marketing. It speaks as a ledger speaks: short declarative statements, every noun grounded to a record.

- **Person.** Third-person for system events; second-person ("you") only when addressing the human in a decision moment. First-person plural ("we") is banned — there is no "we" in an authorization layer.
- **Tense.** Past tense for anything that happened (*Signed. Verified. Anchored.*). Present tense for the decision itself (*Authorized. Not authorized.*). Future tense only for validity windows (*Valid until…*).
- **Casing.** Sentence case for UI copy. `Mandate` `Subject` `Action` `Constraint` `Validity` are treated as proper terms — capitalized when used as field labels.
- **Numbers.** Always literal. `€10,000`, not "ten thousand". Timestamps are ISO-like: `2026-06-01`, `2026-06-01T14:22:07Z`. IDs are hex, truncated with a trailing ellipsis: `0xA13F…`.
- **Emoji.** Never. Emoji soften outcomes and Humanos does not soften outcomes. Substitute: the mark (✔ / ✖) only, in the indigo/rose signal colors. Unicode checkmark and cross are acceptable UI characters — nothing else.
- **Exclamation points.** Never.

### Decision words (use these)

| ✅ Use | ❌ Don't use |
|---|---|
| Authorized | Approved, OK'd, Completed, Done |
| Not authorized | Failed, Denied (softens) |
| Rejected | Error, Problem |
| Blocked | Stopped, Paused |
| Pending | Loading, Waiting |
| Recorded | Saved |
| Signed | Submitted |
| Verified | Checked, Validated |
| Anchored | Finalized, Locked |
| Proof | Receipt, Confirmation, Attestation, VP |
| Verification | Check, Lookup |
| Mandate | Permission, Approval record |
| Policy | Rule set, Agreement, Config |
| Subject | User, Account holder |
| Constraint | Rule, Limit |
| Scope | Permissions, Access |

**Proof vs PoAI vs Verification — when to use each**

- **Verification** = the *act*. "`humanos.risk()` runs a Verification."
- **Proof** = the *object it returns*. "Every Verification emits a Proof."
- **PoAI** (Proof of Authorized Intent) = the *protocol-level term*. Use only in VIA / developer / technical-whitepaper contexts. In product UI and marketing copy, always say **Proof**.

### Length and rhythm

- **Buttons:** one verb, one noun maximum. `Authorize`, `Reject`, `Revoke mandate`, `Request signature`. Never `Go`, `Continue`, `Learn more`.
- **Microcopy:** facts only. A row reads `Signed by Elena Ruiz · 2026-04-21 · Paris` — never `Great, your signature is in!`
- **Marketing copy** (landing, hero) uses the same voice, just with more air. Short sentences. One idea per line. No adjectives for products; only for the guarantee.

### Examples (lifted directly from the spec)

> **Agent:** transfer €5,000
> → Risk Controls evaluating…
> ✔ Allowed
> Mandate: `0xA13F…`
> Valid until: 2026-06-01

> Mandate ID: `0xA13F…`
> Subject: User
> Action: Transfer Funds
> Limit: €10,000
> Valid Until: 2026-06-01
> Status: Authorized

> Assessed by Humanos

---

## VISUAL FOUNDATIONS

### Colors (one meaning per color)

| Token | Hex | Role |
|---|---|---|
| `--hm-authority` | `#111111` | Ink. Primary text, dark surfaces, finality. |
| `--hm-clarity` | `#F4F3EF` | Page. The default light surface — warm off-white, never pure white. |
| `--hm-humanity` | `#E4D8C8` | Warm beige. Reserved for **verified identity** — the surface behind a resolved KYA / human / organization identity record. It no longer denotes "the human layer" specifically; it denotes *an identity the network has verified*, whether that identity is a human, an org, or an agent's principal. Use it sparingly — it should read as an accent inside a machine-layer page, not as a full competing surface. |
| `--hm-verification` | `#4B49CA` | Indigo. A verified/authorized result. Also the focus ring color. |
| `--hm-execution` | `#7978E9` | Lighter indigo. An action currently executing. |
| `--hm-pending` | `#7DA0FA` | Blue. Awaiting a decision. |
| `--hm-rejection` | `#F3797E` | Rose. Rejected, blocked, not authorized. |

**Rules**
- Color is *never* decorative. If a color appears, the viewer must be able to name the state it represents.
- The four signals have no hue siblings. There is no "warning amber" or "success green" — Humanos does not model warnings or generic success.
- Washes (8–14% opacity) are the only permitted color backgrounds, and only behind matching-state content.
- **Evolved balance:** lean harder on white space, black (`--hm-authority`) typography, and indigo (`--hm-verification`) network lines/accents. Beige (`--hm-humanity`) should occupy visibly less surface area than in the original system — it now marks one identity record among several on a page, not a whole competing layer.
- Network diagrams use `--hm-verification` (indigo) for edges/lines connecting participants to the core, `--hm-ink-3`/`--hm-line` for inactive/unverified edges, and the four signal colors only at terminal nodes (ALLOW = verification, DENY = rejection, PENDING = pending).

### Type

- **Primary:** **Inter** (Google Fonts). The committed brand face — Humanos has no foundry license, so Inter is authoritative, not a substitute. Stack: `Inter → Helvetica Neue → Helvetica → Arial`. Stylistic sets enabled globally: `ss01` (straightens `a` and `g` toward neo-grotesque), `cv11` (single-story `a`), `tnum` (tabular figures — critical for every amount, ID, and timestamp in the product).
- **Mono:** **JetBrains Mono** (Google Fonts). Used for every ID, timestamp, constraint value, and log line. Mono is a truth marker — if it's monospaced, it is machine-verifiable. Features: `zero` slashed, `ss01`.
- **Hierarchy** (from the brand spec, implemented 1:1 in `colors_and_type.css`):
  - Hero 48 / 600
  - Section 32–40 / 600
  - Title 20–24 / 500–600
  - Body 16–18 / 400
  - Label 12–14 / 500 (ALL CAPS, tracked +0.04em)

### Spacing (generous by principle)

The brand rule is "Large spacing (80px+)" for section separation. In practice: `--sp-9` (80px) between narrative sections; `--sp-10` (120px) between hero and first content; `--sp-5`/`--sp-6` (24–32px) inside record cards. Spacing — not color, not borders — is the primary separator.

### Backgrounds

- No gradients. No hero illustrations. No stock photography.
- Full-bleed **flat color fields** only. A page is either `--hm-clarity` (default), `--hm-authority` (inverse, for final receipts and proofs), or `--hm-humanity` (the human layer — signature capture, consent screens).
- **No repeating textures or patterns.** A decision surface cannot carry ornament.
- Photography, when used, is **never hero-scale.** It appears small, inside a record card, representing a person or place — cool-neutral, full-color, un-manipulated. Treat a photo the way you'd treat an ID scan: evidence, not decoration.

### Animation

- Short, deterministic, no bounce. `--dur-fast 120ms`, `--dur-base 180ms`, `--dur-slow 260ms`.
- Easing: `cubic-bezier(0.2, 0, 0, 1)` standard; `cubic-bezier(0.4, 0, 1, 1)` for exits.
- The **only** signature motion is the verification tick: indigo stroke drawing in ~260ms when a mandate resolves to Authorized. Nothing else bounces, elastics, or overshoots. The system is not delighted; it is correct.

### Hover / press states

- **Hover:** text links and tertiary buttons tint to `--hm-verification` (indigo). Primary (dark) buttons reduce surface to 92% luminance (`rgb(40,40,40)` effective). Records hover up to `--elev-active`. No opacity changes — opacity reads as "provisional" and contradicts the brand.
- **Press:** primary buttons darken to full `#000`. Secondary buttons invert (dark fill, chalk text). No scale transforms — Humanos does not squish.
- **Disabled:** `--hm-ink-4` text, no background. Disabled means "this action is currently not authorized to even attempt," which is information, not a gray wash.

### Borders

- Hairline only, **1px**, color `--hm-line` (`#DDD9D0`). Stronger is `--hm-line-strong` (`#C9C4B7`) for card division inside a record.
- Records are bordered on the bottom (`border-bottom: 1px solid var(--hm-line)`) to read as ledger rows. Full 4-side borders only on standalone cards.
- On dark surfaces, use `--hm-line-dark` (`#2A2A28`).

### Shadows (depth = "stacked layers of truth")

Four and only four levels, each with a meaning:

| Level | Token | Meaning | Shadow |
|---|---|---|---|
| Base | `--elev-base` | System background, page. | `none` |
| Record | `--elev-record` | Machine-readable data card. | `0 1px 0 line, 0 0 0 1px 2% ink` |
| Active | `--elev-active` | A record currently under interaction. | `0 1px 2px 6% ink, 0 8px 24px -8px 12% ink` |
| Focus | `--elev-focus` | The indigo verification ring. | `0 0 0 3px 18% indigo, 0 1px 2px 8% ink` |

No blurred glow, no colored shadows except focus, no inner shadows.

### Transparency and blur

- Translucency is reserved for **ephemeral overlays only** — a verification spinner's scrim, a modal backdrop. Record content is always fully opaque. An authorization cannot be 47% true.
- Blur is **never** used in UI chrome. It is permitted once: behind a full-screen verification modal, `backdrop-filter: blur(8px)` on `rgba(17,17,17,0.4)`.

### Corner radii

- `--r-1` 2px (records, inputs, rails — the default)
- `--r-2` 4px (buttons, chips)
- `--r-3` 8px (cards that need to feel softer — rare)
- `--r-full` 999px (never; reserved for avatars only)
- **No large radii.** 16px+ rounded corners read as consumer-app friendliness and the brand is not friendly in that register.

### Cards / records

A "record" is the atomic UI element. Every record contains, at minimum:
- **Who** (subject — a name or identity ref)
- **What** (action)
- **When** (timestamp, mono)
- **Constraints** (amount, scope, time window — mono)
- **Status** (one of Authorized / Pending / Executing / Rejected / Blocked)
- **Mandate ID** (truncated hex, mono)

Records are structured, never decorative. No imagery, no icons except the status mark, no gradients. See `preview/components-mandate-record.html`.

### Human vs Machine layers — now one signal among several

This used to be the central structural motif; it's now a special case of a bigger idea. The interface still stacks two textures, but neither is the center of the product anymore — the network is:

- **Human layer** — beige (`--hm-humanity`), airy, larger type. Used specifically where a human's identity or consent is one Risk Intelligence Output being captured or displayed (e.g. a Delegated Authority record's human principal). Not the default surface for "where decisions happen" anymore.
- **Machine layer** — white (`--hm-surface-raised`) on clarity page, dense, mono-heavy, structured rows. Where every Risk Intelligence Output, Mandate, Runtime Policy, and Proof lives, regardless of whose identity it belongs to.
- **Verification connector** — a thin indigo line linking any two related records (a human identity to the agent it delegates to; a Risk Intelligence Output to the Risk API response it fed). No longer reserved for human→machine specifically — it's the general-purpose "these two things are linked in the network" connector.

### The risk network diagram (new primary motif)

The system's headline visual is now a **graph**, not a chain: multiple participant types — Agent, Organization, Human, Bank, Insurer, Enterprise, Payment processor — each rendered as a small hairline-bordered node, connected by thin lines to one central node ("Risk Network" / the Humanos mark). The center resolves outward to three terminal states: **ALLOW** (indigo), **DENY** (rose), **PROOF** (mono ink). See `preview/network-verification-graph.html`.

Rules for the graph:
- Nodes are plain rects or circles, 1px hairline border, no fill except white/clarity. No icons inside nodes beyond a short label.
- Edges are 1px lines, `--hm-line-strong` when idle, `--hm-verification` when actively resolving/verified.
- The graph is always abstract and flat — no 3D, no glow, no particle/network clichés (no floating dots-and-glow "AI network" stock imagery). It should look like a systems diagram from an infrastructure company's docs, not a marketing hero.

### API / developer visual language

Humanos increasingly presents itself the way Stripe or Cloudflare present their APIs. Recurring motifs:
- A `POST /risk` request/response pair, shown as two side-by-side mono code blocks (request → response), is a first-class visual element — usable in docs, decks, and landing sections. See `preview/api-verify-request.html`.
- JSON payloads use the same mono type and truncated-hex ID conventions as everywhere else in the brand — a Risk Intelligence Output or Proof object should look identical whether it's rendered in a UI record or a code sample.
- The response vocabulary is always `riskControls` (satisfied/blocked), `riskScore`, `decision` (`ALLOW` / `DENY`), `proof` — keep this shape consistent across all API examples so it reads as one real, factual API, not ad hoc illustrations.

### Layout rules

- Page has a **max content width of 1200px**, centered, with `--sp-7` (48px) gutters on desktop.
- No sticky chrome except the top brand bar (56px, `--hm-authority` or hairline-bordered `--hm-clarity`).
- No floating action buttons. Actions live inside records, next to the data they act on.
- Forms are vertical, one field per row, generous leading — never two-column.

### Permanence signals (always shown on a record)

- A `Mandate ID` (hex, mono, copy-on-click).
- A `Signed` timestamp and a `Valid until` timestamp.
- A `Status` pill.
- A small `Assessed by Humanos` signature element (see `preview/brand-signature.html`) on any record that has resolved to Authorized.

---

## ICONOGRAPHY

Humanos uses **almost no iconography.** This is deliberate — icons are decorative shorthand and the brand doesn't decorate. The permitted glyph set is:

1. **The mark** — the three vertical bars from the logo. Used as the sole brand icon. File: `assets/logo-mark-black.svg`. Never recolored except to `--hm-clarity` on dark surfaces. Never rotated, never animated.
2. **Status glyphs** — only two, used sparingly and never as decoration. A checkmark (✔) in `--hm-verification` for Authorized/ALLOW; a cross (✖) in `--hm-rejection` for Rejected/DENY. Not "checkmarks everywhere," and no shields or locks anywhere — trust/security clip-art reads as consumer security software, not risk infrastructure. These can be rendered as Unicode characters or as thin-stroke SVG. A pending state uses a small pulsing indigo dot, no icon.
3. **Trust/network glyphs** — a small, closed set of 1.5px stroke line icons for the new primitives, drawn in the same restrained style as the UI affordances below (never filled, never colorful, never cartoonish): identity (a small ID-card outline), delegation (two nodes joined by a line with an arrowhead), policy (a short ruled list), runtime (a clock/pulse mark), evidence (a stacked-lines/ledger mark), network (three or four small circles joined by hairlines), attestation (a small shield outline — used only for Insurance Attestation, never for general trust). One glyph = one primitive; never combine two into one icon.
4. **Minimal UI affordances** — chevron-down for expand, chevron-right for "go to record", × for dismiss, copy glyph for copying IDs. These are drawn as **1.5px stroke SVG** in the current text color. Source: **Lucide** (`https://cdn.jsdelivr.net/npm/lucide-static@latest/`). Linked from CDN; no icon font is installed. We substitute Lucide because no icon set ships with the product yet — **⚠ if Humanos has a proprietary icon set, replace.**

**Emoji.** Never. Emoji are banned from the brand everywhere — product, docs, marketing, system messages.

**Unicode as icons.** Only ✔ and ✖ for status. Never • · ‣ ▸ ★ as decoration. Directional arrows (→) are permitted as literal connectors between linked records/events (human↔machine, signal↔result), and network edges may render as plain 1px lines with no arrowhead when the relationship is bidirectional (participant↔network).

**Illustrations.** No figurative illustration, no mascots, no people-centric imagery — this hasn't changed. What's new: **abstract geometric network/graph diagrams are now a first-class, encouraged visual** (nodes + edges, per the verification-network motif above) — they are diagrams, not illustrations, and stay flat, hairline-bordered, and unornamented. Empty states remain a single line of text in `--fg-3`.

---

## Do's and Don'ts (from the brand spec)

**Do:**
- Show decisions clearly.
- Use color as state.
- Emphasize verification.

**Don't:**
- Decorate.
- Soften outcomes.
- Hide system logic.

## Final rule

> Does this interface prove what was allowed?
> If not, redesign it.
