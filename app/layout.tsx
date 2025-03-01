// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LafeAINet Dashboard | Network Intelligence for Timor-Leste",
  description:
    "Real-time network quality analytics and visualization platform for Timor-Leste telecommunications infrastructure",
  keywords:
    "network quality, Timor-Leste, connectivity, telecommunications, analytics, dashboard",
  authors: [{ name: "LafeAINet" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
