import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "This page contains my contact information, including email, phone number and social media links. Feel free to reach out to me for any inquiries or collaborations!",
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
