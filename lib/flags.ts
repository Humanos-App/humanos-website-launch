/**
 * Site feature switches.
 *
 * SDK_PROMPT_PILL — the floating "Click to know your agent's Risk Score"
 * pill that copies an SDK setup prompt. Off until the Agent SDK is live;
 * it gates both copies: the chrome's FloatingRiskBar (app/layout.tsx) and
 * the homepage design's own [data-pill] (hidden via body[data-sdk-pill]).
 */
export const SDK_PROMPT_PILL = false;
