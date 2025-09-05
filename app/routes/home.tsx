import type { Route } from "./+types/home";
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
    <div className="home-background">
      <Welcome message={loaderData.message} />
    </div>
  );
}
