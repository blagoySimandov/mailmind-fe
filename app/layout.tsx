import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MailMind - AI Email Assistant",
  description: "Intelligent email automation for modern businesses",
  icons: {
    icon: [
      {
        url: "/static/favicon.ico",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/static/favicon.ico",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
