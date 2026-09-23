import type { Metadata } from "next";
import { WORK_INDEX } from "@/lib/content";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { PageHeader, SectionHead } from "@/components/Section";
import { WorkIndex } from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description: WORK_INDEX.lede,
  alternates: { canonical: "/work" },
};

export default function Work() {
  return (
    <>
      <PageHeader crumb={WORK_INDEX.title} title={WORK_INDEX.headline} lede={WORK_INDEX.lede} />
      <section className="px-6 pb-24 sm:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <WorkIndex />
        </div>
      </section>
      <section id="capabilities" className="scroll-mt-20 bg-surface px-6 py-24 sm:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            eyebrow="By capability"
            title="Or start from the kind of problem you have."
            lede="Each page explains the area in plain terms, then links the projects and blueprints that go deeper."
          />
          <CapabilityGrid />
        </div>
      </section>
    </>
  );
}
