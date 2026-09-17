import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SITE, FAQ } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Ajith Thaduri — AI Engineer, Consultant & Instructor",
    template: "%s | Ajith Thaduri",
  },
  description:
    "I build agentic AI systems, retrieval architectures and guardrail-driven LLM platforms for government, healthcare and legal environments — where the data is regulated and the output has to hold up.",
  keywords: [
    "Ajith Thaduri",
    "AI Engineer",
    "Agentic AI",
    "RAG Systems",
    "LLM Guardrails",
    "PHI Safe AI",
    "AI Consultant",
    "AI Trainer",
    "Generative AI",
    "Secure AI",
  ],
  authors: [{ name: "Ajith Thaduri" }],
  creator: "Ajith Thaduri",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: "Ajith Thaduri — AI Engineer, Consultant & Instructor",
    description:
      "Agentic systems, retrieval architectures and guardrail-driven LLM platforms, shipped into regulated environments.",
    siteName: "Ajith Thaduri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajith Thaduri — AI Engineer, Consultant & Instructor",
    description:
      "Agentic systems, retrieval architectures and guardrail-driven LLM platforms, shipped into regulated environments.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /* Structured data: a ProfilePage wrapping a Person, plus an FAQPage.
     This is what Google's Knowledge Graph and answer engines read. */
  const person = {
    "@type": "Person",
    "@id": `${SITE.url}#person`,
    name: "Ajith Thaduri",
    givenName: "Ajith",
    familyName: "Thaduri",
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    jobTitle: ["AI Engineer", "Technical Consultant", "Instructor"],
    description:
      "AI engineer, technical consultant and instructor. Builds production AI systems — agentic architectures, retrieval pipelines and self-hosted language models — for government, healthcare and legal organisations, plus AI-driven security tooling. Has taught 500+ engineers and students.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Agentic AI systems",
      "Multi-agent orchestration",
      "Retrieval-Augmented Generation (RAG)",
      "LLM guardrails and AI safety",
      "PII and PHI protection",
      "Fine-tuning (LoRA, QLoRA)",
      "Model quantization (AWQ, GPTQ, GGUF)",
      "Self-hosted inference (vLLM, llama.cpp)",
      "AI-driven penetration testing",
      "Prompt injection and AI application security",
      "Document intelligence",
      "Realtime voice agents",
      "Workflow automation (n8n)",
      "Machine learning and deep learning",
      "AI architecture consulting",
      "AI training and workshops",
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "AI Engineer",
        occupationalCategory: "15-2051.00",
        skills:
          "Agentic AI, RAG architectures, LLM guardrails, fine-tuning, quantization, self-hosted model serving",
      },
      {
        "@type": "Occupation",
        name: "Technical Consultant",
        skills:
          "AI architecture review, security and compliance design, technology selection, roadmapping",
      },
      {
        "@type": "Occupation",
        name: "Instructor",
        skills:
          "Generative AI, agentic workflows, RAG systems, practical LLM application design",
      },
    ],
    sameAs: [SITE.linkedin, SITE.github],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}#website`,
        url: SITE.url,
        name: "Ajith Thaduri",
        inLanguage: "en",
        publisher: { "@id": `${SITE.url}#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE.url}#profile`,
        url: SITE.url,
        name: "Ajith Thaduri — AI Engineer, Consultant & Instructor",
        isPartOf: { "@id": `${SITE.url}#website` },
        about: { "@id": `${SITE.url}#person` },
        mainEntity: { "@id": `${SITE.url}#person` },
      },
      person,
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}#faq`,
        isPartOf: { "@id": `${SITE.url}#profile` },
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // Resolve the theme before first paint so there is no flash.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${plexMono.variable} bg-ink text-text antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
