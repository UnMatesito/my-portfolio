import type { Metadata } from "next";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import Providers from "./providers";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mateosuarez.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mateo Suarez - Software Developer Portfolio",
    template: "%s | Mateo Suarez",
  },
  description:
    "Portfolio of Mateo Suarez, a passionate software developer specializing in React, Next.js, Three.js, and full-stack development. Explore my projects and skills.",
  keywords: [
    "Mateo Suarez",
    "portfolio",
    "software developer",
    "React",
    "Next.js",
    "Three.js",
    "TypeScript",
    "full-stack developer",
    "web developer",
    "Argentina",
  ],
  authors: [{ name: "Mateo Suarez" }],
  creator: "Mateo Suarez",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mateo Suarez Portfolio",
    title: "Mateo Suarez - Software Developer Portfolio",
    description:
      "Portfolio of Mateo Suarez, a passionate software developer specializing in React, Next.js, Three.js, and full-stack development.",
    images: [
      {
        url: "/img/me.jpg",
        width: 600,
        height: 600,
        alt: "Mateo Suarez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mateo Suarez - Software Developer Portfolio",
    description:
      "Portfolio of Mateo Suarez, a passionate software developer specializing in React, Next.js, Three.js, and full-stack development.",
    images: ["/img/me.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mateo Suarez",
    url: siteUrl,
    jobTitle: "Software Developer",
    description:
      "Passionate software developer specializing in React, Next.js, Three.js, and full-stack development.",
    sameAs: [
      "https://github.com/UnMatesito",
      "https://www.linkedin.com/in/msuarez1905/",
      "https://www.instagram.com/msuarez_1905",
      "https://discord.gg/esMcqQm6",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Three.js",
      "Node.js",
      "Python",
      "PHP",
      "Laravel",
      "Flask",
      "PostgreSQL",
      "MongoDB",
      "Docker",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`antialiased ${workSans.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
