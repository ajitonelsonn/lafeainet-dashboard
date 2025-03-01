// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NetDash TLS - Network Analysis Dashboard",
  description:
    "Real-time network quality analytics and visualization platform for a telecommunications company in Timor-Leste",
  keywords:
    "network quality, Timor-Leste, connectivity, telecommunications, analytics, dashboard",
  authors: [{ name: "LafeAINet" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
