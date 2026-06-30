import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";
import { copy, sectionIntros } from "@/content/site-copy";

export function WhyHandmade({ image }: { image?: string }) {
  const intro = sectionIntros.whyHandmade;
  return (
    <section className="py-20 md:py-28">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={intro?.eyebrow ?? "Why handmade matters"}
          title={intro?.title ?? "Made by hand, never duplicated"}
          subhead={intro?.subhead}
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {image && (
            <Reveal direction="right" className="order-2 lg:order-1">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-deep">
                <Image
                  src={image}
                  alt="A handmade sea glass piece catching the light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}

          <div className="order-1 flex flex-col gap-8 lg:order-2">
            {copy.whyHandmade.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="flex gap-5">
                  <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 font-display text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-deepsea">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
