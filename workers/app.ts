import { createRequestHandler } from "react-router";
import { json } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';

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

export const action: ActionFunction = async ({ request }) => {
  // Add CORS headers to all responses
  const headers = {
    'Access-Control-Allow-Origin': 'https://findsnow.ai',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  if (request.method === 'POST') {
    try {
      const data = await request.json();
      const { email } = data;
      if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        return json({ error: 'Invalid email' }, { 
          status: 400,
          headers 
        });
      }
      await env.DB.prepare("INSERT INTO emails (email) VALUES (?)").bind(email).run();
      return json({ success: true }, { headers });
    } catch (error) {
      return json({ error: 'Failed to process signup' }, { 
        status: 400,
        headers 
      });
    }
  }

  return json({ error: 'Method not allowed' }, { 
    status: 405,
    headers 
  });
};

// All requests (including /favicon.ico) go to your app
export default {
  async fetch(request, env, ctx) {
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
