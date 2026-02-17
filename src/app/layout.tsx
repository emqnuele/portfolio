
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Background from "@/components/ui/Background";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = "https://emanuelefaraci.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Emanuele Faraci · Portfolio",
    template: "%s | Emanuele Faraci",
  },
  description:
    "Portfolio of Emanuele Faraci — fullstack developer and automation builder across Next.js, Python, AI agents, and bot workflows.",
  keywords: [
    "Emanuele Faraci",
    "software developer",
    "fullstack developer",
    "React",
    "Next.js",
    "Python",
    "AI automations",
    "Telegram bots",
    "portfolio",
    "Modena",
    "creative coder",
    "computer science",
    "web developer Italy",
  ],
  authors: [{ name: "Emanuele Faraci", url: siteUrl }],
  creator: "Emanuele Faraci",
  publisher: "Emanuele Faraci",
  applicationName: "Emanuele Faraci Portfolio",
  referrer: "no-referrer-when-downgrade",
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.ico",
    apple: "/icon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "emanuelefaraci.com",
    title: "Emanuele Faraci · Portfolio",
    description:
      "Portfolio of Emanuele Faraci — fullstack developer and automation builder across Next.js, Python, AI agents, and bot workflows.",
    images: [
      {
        url: "/me.png",
        width: 1200,
        height: 630,
        alt: "Emanuele Faraci – fullstack developer and automation builder",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@emqnuele",
    creator: "@emqnuele",
    title: "Emanuele Faraci · Portfolio",
    description:
      "Portfolio of Emanuele Faraci — fullstack developer and automation builder across Next.js, Python, AI agents, and bot workflows.",
    images: [
      {
        url: "/me.png",
        alt: "Emanuele Faraci – fullstack developer and automation builder",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#050507",
    "color-scheme": "dark",
    "geo.region": "IT-MO",
    "geo.placename": "Modena",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#050507" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Emanuele Faraci",
              jobTitle: "Fullstack Developer & Automation Builder",
              description:
                "Independent developer building with Next.js, Python, and AI workflows for async teams.",
              url: siteUrl,
              image: `${siteUrl}/me.png`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Modena",
                addressCountry: "IT",
              },
              email: "mailto:hey@emanuelefaraci.com",
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Python",
                "FastAPI",
                "AI Agents",
                "Telegram Bots",
                "Machine Learning",
                "Web Development",
              ],
              sameAs: [
                "https://github.com/emqnuele",
                "https://t.me/emqnuele",
                "https://x.com/emqnuele",
                "mailto:hey@emanuelefaraci.com",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Emanuele Faraci Portfolio",
              url: siteUrl,
              inLanguage: "en-US",
              description:
                "Portfolio of Emanuele Faraci — fullstack developer and automation builder across Next.js, Python, AI agents, and bot workflows.",
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Background />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
