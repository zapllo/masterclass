import type { Metadata } from "next";
import { Instrument_Sans, Outfit } from "next/font/google";
import "./globals.css";
// import TrackingScripts from "@/components/TrackingScripts";

const instrumentSans = Outfit({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Masterclass - How to manage your team with Zapllo's AI Co-Manager",
  description: "Join Zapllo's AI Co-Manager masterclass to learn how to effectively manage your team using AI-powered tools. Enhance productivity and streamline workflows with expert guidance.",
  openGraph: {
    title: "Masterclass - How to manage your team with Zapllo's AI Co-Manager",
    description: "Join Zapllo's AI Co-Manager masterclass to learn how to effectively manage your team using AI-powered tools. Enhance productivity and streamline workflows with expert guidance.",
    images: [
      {
        url: "/thumbnail.jpg", // Update this path to your actual OG image
        width: 1200,
        height: 630,
        alt: "Zapllo AI Co-Manager Masterclass",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masterclass - How to manage your team with Zapllo's AI Co-Manager",
    description: "Join Zapllo's AI Co-Manager masterclass to learn how to effectively manage your team using AI-powered tools. Enhance productivity and streamline workflows with expert guidance.",
    images: ["/thumbnail.jpg"], // Update this path to your actual OG image
  },
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
        {/* <TrackingScripts /> */}
        {children}
      </body>
    </html>
  );
}
