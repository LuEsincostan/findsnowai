import { createRequestHandler } from "react-router";
import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

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
    // All requests (including /favicon.ico) go to your app
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;

export const action: ActionFunction = async ({ request }) => {
  // Handle CORS for preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "https://findsnow.ai",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // Handle POST request
  if (request.method === "POST") {
    try {
      const data = await request.json();
      // ...your existing email signup logic...

      return json(
        { success: true },
        {
          headers: {
            "Access-Control-Allow-Origin": "https://findsnow.ai",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      );
    } catch (error) {
      return json(
        { error: "Failed to process signup" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "https://findsnow.ai",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      );
    }
  }
};
