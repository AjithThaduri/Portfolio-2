import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ajiththaduri.site'),
  title: {
    default: "Ajith Thaduri | AI Engineer & Technical Consultant",
    template: "%s | Ajith Thaduri",
  },
  description: "Portfolio of Ajith Thaduri, a Senior AI/ML Engineer specializing in production-grade Generative AI, Agentic Systems, and Secure AI deployment.",
  keywords: [
    "Ajith Thaduri",
    "Ajith",
    "Thaduri",
    "Ajith AI Engineer",
    "ML Engineer",
    "Technical Consultant",
    "Generative AI",
    "Agentic AI",
    "Prompt Engineering",
    "Secure AI",
    "RAG Systems"
  ],
  authors: [{ name: "Ajith Thaduri" }],
  creator: "Ajith Thaduri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ajiththaduri.site",
    title: "Ajith Thaduri | AI/ML Engineer",
    description: "Building trustworthy, scalable, and production-grade AI systems.",
    siteName: "Ajith Thaduri Portfolio",
    images: [
      {
        url: "/og-image.jpg", // You should add an image at public/og-image.jpg later
        width: 1200,
        height: 630,
        alt: "Ajith Thaduri - AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajith Thaduri | AI Engineer",
    description: "Specializing in Agentic AI and Secure Enterprise Systems.",
    creator: "@AjithThaduri", // Replace with actual handle if available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD for Google Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ajith Thaduri",
    "url": "https://ajiththaduri.site",
    "jobTitle": "AI/ML Engineer & Technical Consultant",
    "worksFor": {
      "@type": "Organization",
      "name": "De stealth Mode Startup" // Or "Self-Employed" / "Consultant"
    },
    "sameAs": [
      "https://www.linkedin.com/in/ajiththaduri",
      "https://github.com/AjithThaduri",
      "https://twitter.com/AjithThaduri"
    ],
    "description": "ML Engineer specializing in production-grade Artificial Intelligence, Generative AI, and secure AI deployment."
  };

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
