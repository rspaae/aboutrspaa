import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import MouseSpotlight from "./components/MouseSpotlight";
import SmoothScroll from "./components/SmoothScroll";
import CommitStatus from "./components/CommitStatus";
import { LanguageProvider } from "./context/LanguageContext";

const outfit = Outfit({
  variable: "--font-outfit",
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
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  openGraph: {
    title: "RSPAA | Creative Developer & Designer",
    description: "Full-stack developer crafting stunning, interactive digital experiences.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050510",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased`}
        style={{
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <LanguageProvider>
          <SmoothScroll>
            <CustomCursor />
            <MouseSpotlight />
            <CommitStatus />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
