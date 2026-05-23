import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SocialAI — AI Social Media Automation Platform",
  description:
    "Automate your social media with AI-powered captions, scheduling, DM replies, and analytics across Instagram, LinkedIn, X, Facebook, and TikTok.",
  keywords: [
    "social media automation",
    "AI caption generator",
    "content scheduling",
    "Instagram automation",
    "LinkedIn automation",
  ],
  authors: [{ name: "SocialAI" }],
  openGraph: {
    title: "SocialAI — AI Social Media Automation",
    description: "Automate your social media with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
