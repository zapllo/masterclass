import type { Metadata } from "next";
import { Instrument_Sans, Outfit } from "next/font/google";
import "./globals.css";
import TrackingScripts from "@/components/TrackingScripts";

const instrumentSans = Outfit({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Masterclass - How to manage your team with Zapllo's AI Co-Manager",
  description: "Join Zapllo's AI Co-Manager masterclass to learn how to effectively manage your team using AI-powered tools. Enhance productivity and streamline workflows with expert guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-instrument-sans), sans-serif' }}
      >
        <TrackingScripts />
        {children}
      </body>
    </html>
  );
}
