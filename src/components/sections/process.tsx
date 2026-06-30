import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";
import { copy, sectionIntros } from "@/content/site-copy";

export function CreativeProcess() {
  const intro = sectionIntros.process;
  const steps = copy.processSteps;
  return (
    <section className="relative overflow-hidden bg-deepsea py-24 text-shell md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 rounded-full bg-ocean/20 blur-[140px]" />
      <div className="container-luxe relative">
        <SectionHeading
          eyebrow={intro?.eyebrow ?? "The creative process"}
          title={
            <span className="text-shell">{intro?.title ?? "From shoreline to wall"}</span>
          }
          subhead={
            <span className="text-shell/70">{intro?.subhead}</span>
          }
        />

        <ol className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.08}
              className="flex flex-col gap-4 rounded-2xl border border-shell/10 bg-shell/[0.04] p-8 transition-colors duration-500 hover:border-gold/30 hover:bg-shell/[0.07]"
            >
              <span className="font-display text-5xl text-gold/80">{step.step}</span>
              <h3 className="font-display text-xl text-shell">{step.title}</h3>
              <p className="text-sm leading-relaxed text-shell/65">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
