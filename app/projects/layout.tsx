import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects",
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
