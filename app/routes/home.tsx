import type { Route } from "./+types/home";
import React, { useEffect } from "react";
import { Welcome } from "../welcome/welcome";
import "./home.css";

function Snowfall() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "snowfall-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "0";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let snowflakes = Array.from({ length: 30 }, () => {
      const verticalSpeed = Math.random() * 0.3 + 0.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 0.8 + 0.2,
        d: verticalSpeed,
        dx: (Math.random() - 0.5) * verticalSpeed * 0.02, // max 1% of vertical speed
      };
    });

    function drawSnowflakes() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.97)";
      ctx.beginPath();
      for (let flake of snowflakes) {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      updateSnowflakes();
    }

    function updateSnowflakes() {
      for (let flake of snowflakes) {
        flake.x += flake.dx;
        flake.y += flake.d;
        // Wrap horizontally if out of bounds
        if (flake.x < 0) flake.x = width;
        if (flake.x > width) flake.x = 0;
        if (flake.y > height) {
          flake.x = Math.random() * width;
          flake.y = 0;
        }
      }
    }

    let animationId;
    function animate() {
      drawSnowflakes();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Find Snow" },
    { name: "description", content: "Welcome to the game!" },
  ];
}

export function loader({}: Route.LoaderArgs) {
  return { message: "" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Snowfall />
      <div className="home-background">
        <Welcome message={loaderData.message} />
      </div>
    </>
  );
}
