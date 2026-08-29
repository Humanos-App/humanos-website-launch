import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // The /v2 rebrand previews are static Claude Design exports generated
        // into public/v2/<slug>/index.html by `npm run sync:v2`. Next serves
        // public/ files at their literal path only, so map the clean URL onto
        // the index.html. Runs after the filesystem check, so real assets under
        // /v2/_shared/ are served directly and never hit this rule.
        source: "/v2/:slug",
        destination: "/v2/:slug/index.html",
      },
    ];
  },
  async redirects() {
    return [
      {
        // Canonicalize the apex (humanos.tech) → www, EXCEPT anything under
        // /.well-known/ — the did:web document (did:web:humanos.tech) must be
        // served DIRECTLY on the apex with 200, never redirected, or strict
        // did:web resolvers fail.
        //
        // IMPORTANT: this only takes effect once the apex is a *served* domain
        // in Vercel → Settings → Domains. While the apex is configured there as
        // "Redirect to www.humanos.tech", that edge redirect runs before the app
        // and shadows this rule (the request never reaches Next).
        source: "/:path((?!\\.well-known).*)",
        has: [{ type: "host", value: "humanos.tech" }],
        destination: "https://www.humanos.tech/:path",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
