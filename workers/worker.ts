export default {
  async fetch(request, env) {
    try {
      if (request.method === "POST" && new URL(request.url).pathname === "/api/subscribe") {
        const { email } = await request.json();
        if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
          return new Response("Invalid email", { status: 400 });
        }
        await env.DB.prepare("INSERT INTO emails (email) VALUES (?)").bind(email).run();
        return new Response("OK");
      } else if (request.method === "GET" && new URL(request.url).pathname === "/api/test-db") {
        if (env.DB) {
          return new Response("D1 binding exists!");
        } else {
          return new Response("D1 binding missing!", { status: 500 });
        }
      }
      return new Response("Not found", { status: 404 });
    } catch (err) {
      return new Response("Worker error: " + (err?.message || err), { status: 500 });
    }
  }
};