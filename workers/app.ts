import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://findsnow.ai",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response("ok", { headers: CORS_HEADERS });
    }

    if (request.method === "POST" && url.pathname === "/api/subscribe") {
      try {
        const { email } = await request.json();
        if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
          return new Response("Invalid email", {
            status: 400,
            headers: CORS_HEADERS,
          });
        }
        await env.DB.prepare("INSERT INTO emails (email) VALUES (?)").bind(email).run();
        return new Response("OK", { headers: CORS_HEADERS });
      } catch (err) {
        return new Response("Worker error: " + (err?.message || err), {
          status: 500,
          headers: CORS_HEADERS,
        });
      }
    }
    // All other requests go to your app
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
