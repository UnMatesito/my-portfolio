import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "This page contains information about me, including my background, skills and experience. Feel free to learn more about me and my journey as a developer!",
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
