import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects",
  description: "This page contains a list of my projects, including descriptions, images and technologies used. Feel free to explore and learn more about my work!",
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
