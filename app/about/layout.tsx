import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
