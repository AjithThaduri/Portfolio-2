import type { Metadata } from "next";
import { OPEN_SOURCE, SITE } from "@/lib/content";
import { RepoGrid } from "@/components/RepoGrid";
import { Button, PageHeader, Section, SectionHead } from "@/components/Section";

export const metadata: Metadata = {
  title: "Open source",
  description: OPEN_SOURCE.lede,
  alternates: { canonical: "/open-source" },
};

export default function OpenSource() {
  return (
    <>
      <PageHeader crumb={OPEN_SOURCE.title} title={OPEN_SOURCE.headline} lede={OPEN_SOURCE.lede}>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={SITE.github} external>
            My GitHub
          </Button>
          <Button href="/blueprints" variant="ghost">
            Read the blueprints
          </Button>
        </div>
      </PageHeader>

      <section className="px-6 pb-24 sm:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <RepoGrid repos={OPEN_SOURCE.mine} featured />
        </div>
      </section>

      <Section tone="surface">
        <SectionHead eyebrow="Also on my GitHub" title="Research code worth knowing." lede={OPEN_SOURCE.hostedIntro} />
        <RepoGrid repos={OPEN_SOURCE.hosted} />
      </Section>

      <Section>
        <SectionHead eyebrow="Projects I rely on" title="Worth your attention." lede={OPEN_SOURCE.relyIntro} />
        <RepoGrid repos={OPEN_SOURCE.rely} />
      </Section>
    </>
  );
}
