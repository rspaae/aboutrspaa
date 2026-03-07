import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RSPAA | Creative Developer & Designer",
  description:
    "Portfolio of RSPAA — Full-stack developer crafting stunning, interactive digital experiences with modern web technologies.",
  keywords: ["portfolio", "developer", "web development", "react", "next.js", "full-stack"],
  authors: [{ name: "RSPAA" }],
  openGraph: {
    title: "RSPAA | Creative Developer & Designer",
    description: "Full-stack developer crafting stunning, interactive digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        style={{
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
