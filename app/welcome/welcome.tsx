import React, { useState } from "react";
import "./welcome.css";
import logoDark from "./finsnowai_dark_txt.svg";

export function Welcome({ message }: { message: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | string>(null);
  const [showInput, setShowInput] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    
    try {
      const response = await fetch('https://findsnowai.ludwig-ehlert.workers.dev/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include', // Required for Cloudflare Access
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setStatus('Thank you for signing up!');
        setEmail('');
      } else {
        const error = await response.json();
        setStatus(error.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setStatus('Network error. Please try again.');
    }
  }

  return (
    <main className="welcome-main">
      <img
        src={logoDark}
        alt="FindSnowAI Logo"
        className="logo-img"
      />
      <div className="welcome-container">
        <nav className="welcome-box">
          <div className="welcome-grid">
            <div className="welcome-grid-text">
              <p className="welcome-desc">
                You love long days on nordic skis? You are excited about trying out new tracks? <br />
                We have just the right challenge for you this winter in Switzerlands nordic tracks.
              </p>
              <div className="welcome-steps-row">
                <div className="welcome-step-box">
                  <span className="welcome-step-title">
                    <span className="hex-number" style={{ position: "relative" }}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="rgba(255,255,255,0.2)"
                        style={{ filter: "drop-shadow(0 2px 6px rgba(255,255,255,0.9))" }}
                      >
                        <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" />
                      </svg>
                      <span className="hex-number-text">1</span>
                    </span>
                  </span>
                  <p className="welcome-step-desc">
                    Sign up and connect your Strava account.
                  </p>
                </div>
                <div className="welcome-step-box">
                  <span className="welcome-step-title">
                    <span className="hex-number" style={{ position: "relative" }}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="rgba(255,255,255,0.2)"
                        style={{ filter: "drop-shadow(0 2px 6px rgba(255,255,255,0.9))" }}
                      >
                        <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" />
                      </svg>
                      <span className="hex-number-text">2</span>
                    </span>
                  </span>
                  <p className="welcome-step-desc">
                    Go skiing! For the entire season, only your longest activity will count for each skiing area.
                  </p>
                </div>
                <div className="welcome-step-box">
                  <span className="welcome-step-title">
                    <span className="hex-number" style={{ position: "relative" }}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="rgba(255,255,255,0.2)"
                        style={{ filter: "drop-shadow(0 2px 6px rgba(255,255,255,0.9))" }}
                      >
                        <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" />
                      </svg>
                      <span className="hex-number-text">3</span>
                    </span>
                  </span>
                  <p className="welcome-step-desc">
                    Check back regularly to see where you are on the leaderboard.
                  </p>
                </div>
              </div>
            </div>
            <div className="welcome-grid-signup">
              <p className="welcome-desc">
                As you can see, the idea is to encourage you to collect big days in many different locations. We are still in the middle of setting everything up. <br />  Sign up below to get notified when we launch.
              </p>
              {!showInput ? (
                <button
                  className="welcome-btn"
                  onClick={() => setShowInput(true)}
                >
                  Sign Up
                </button>
              ) : (
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
                    Submit
                  </button>
                </form>
              )}
              {status && (
                <p className="welcome-status">{status}</p>
              )}
              {message && (
                <ul>
                  <li className="welcome-message">{message}</li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </main>
  );
}
