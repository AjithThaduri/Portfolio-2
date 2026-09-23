import type { Metadata } from "next";
import { TEACHING } from "@/lib/content";
import { PageHeader } from "@/components/Section";
import { Formats, Programmes, TeachingStats } from "@/components/Teaching";

export const metadata: Metadata = {
  title: "Teaching",
  description:
    "Hands-on workshops and multi-month programmes on generative AI, agentic workflows, RAG and guardrails — for engineering teams and technical institutes.",
  alternates: { canonical: "/teaching" },
};

export default function Teaching() {
  return (
    <>
      <PageHeader crumb={TEACHING.title} title={TEACHING.headline} lede={TEACHING.lede}>
        <TeachingStats />
      </PageHeader>
      <Programmes />
      <Formats />
    </>
  );
}
