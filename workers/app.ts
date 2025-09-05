import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/favicon.ico") {
      // Serve the favicon from your assets
      return fetch("/favicon.ico", request);
    }
    if (request.method === "POST" && url.pathname === "/api/subscribe") {
      try {
        const { email } = await request.json();
        if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
          return new Response("Invalid email", { status: 400 });
        }
        await env.DB.prepare("INSERT INTO emails (email) VALUES (?)").bind(email).run();
        return new Response("OK");
      } catch (err) {
        return new Response("Worker error: " + (err?.message || err), { status: 500 });
      }
    }
    // All other requests go to your app
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
