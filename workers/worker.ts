export default {
  async fetch(request, env) {
    if (request.method === "POST" && new URL(request.url).pathname === "/api/subscribe") {
      const { email } = await request.json();
      if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        return new Response("Invalid email", { status: 400 });
      }
      await env.DB.prepare("INSERT INTO emails (email) VALUES (?)").bind(email).run();
      return new Response("OK");
    }
    return new Response("Not found", { status: 404 });
  }
};