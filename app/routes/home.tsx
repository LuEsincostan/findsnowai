import type { Route } from "./+types/home";
import React, { useEffect } from "react";
import { Welcome } from "../welcome/welcome";
import "./home.css";

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
    <div
      className="home-background"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Welcome message={loaderData.message} />
    </div>
  );
}
