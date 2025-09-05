import React, { useState } from "react";
import "./welcome.css";
import logoDark from "./finsnowai_dark_txt.svg";
import logoLight from "./finsnowai_light_txt.svg";

export function Welcome({ message }: { message: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | string>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const res = await fetch("https://findsnowai.ludwig-ehlert.workers.dev/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setStatus("Thank you for signing up!");
    else setStatus("Invalid email or error. Try again.");
  }

  return (
    <main className="welcome-main">
      <div className="welcome-container">
        <img
          src={logoLight}
          alt="FindSnowAI Logo"
          className="logo-img light"
        />
        <img
          src={logoDark}
          alt="FindSnowAI Logo"
          className="logo-img dark"
        />
        <nav className="welcome-box">
          <p className="welcome-title">
            Find Snow Challenge
          </p>
          <p className="welcome-desc">
            You love long days on nordic skis? You are excited about trying out new tracks? We have just the right challenge for you this winter.<br /><br />
            How will it work?
          </p>
          <ol className="numbered-list">
            <li>Connect your Strava account.</li>
            <li>Go skiing! For the entire season, only your longest activity will count per skiing area.</li>
            <li>Check back regularly to see where you are on the leaderboard.</li>
          </ol>
          <p className="welcome-desc">
            Sign up below to get notified when we launch.
          </p>
          <form className="welcome-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              className="welcome-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="welcome-btn"
            >
              Sign Up
            </button>
          </form>
          {status && (
            <p className="welcome-status">{status}</p>
          )}
          {message && (
            <ul>
              <li className="welcome-message">{message}</li>
            </ul>
          )}
        </nav>
      </div>
      <link rel="icon" href="/favicon.ico" />
    </main>
  );
}
