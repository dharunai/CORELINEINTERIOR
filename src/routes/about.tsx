import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImg from "@/assets/about-studio.jpg";
import { Reveal } from "@/components/site/Reveal";
import { process, stats } from "@/components/site/data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CoreLine Interior" },
      { name: "description", content: "Meet CoreLine Interior, a Pollachi luxury interior design studio with over a decade of work in homes, villas and commercial spaces." },
      { property: "og:title", content: "About CoreLine Interior" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="pt-40 pb-20 md:pt-52 md:pb-32">
        <div className="container-luxe">
          <Reveal>
            <span className="eyebrow">About the Studio</span>
            <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[1.02] max-w-5xl">
              A quiet practice<br />
              <em className="text-accent not-italic">obsessed with craft.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-luxe grid gap-12 md:grid-cols-12 md:gap-20">
          <Reveal className="md:col-span-6">
            <div className="img-zoom aspect-[4/5] overflow-hidden">
              <img src={aboutImg} alt="CoreLine studio" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="md:col-span-6 space-y-10 md:pt-12">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl leading-snug">
                Founded in 2024, CoreLine designs homes, villas and workplaces that quietly elevate the way people live.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground leading-relaxed">
                We believe a great interior is felt before it is seen. Light, proportion,
                material and a sense of stillness — these are the tools of our trade. Our
                work draws from architectural restraint, editorial photography and the
                slow craft traditions of South India.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground leading-relaxed">
                CoreLine is small by design. Every project is led personally by one of our
                principals, supported by a tight team of architects, interior designers and
                in-house craftspeople. We take on a limited number of commissions each
                year so each can receive the attention it deserves.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container-luxe grid gap-12 md:grid-cols-12 md:gap-20 items-center">
          <Reveal className="md:col-span-5 md:col-start-2">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              {/* Note: object-top or object-center can be adjusted depending on the face position in the image */}
              <img src="/ceo.jpg" alt="Mr. Lalprasath - CEO and Founder" loading="lazy" className="h-full w-full object-cover object-top" />
            </div>
          </Reveal>
          <div className="md:col-span-5 space-y-6">
            <Reveal>
              <span className="eyebrow">Leadership</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.1]">
                Meet Mr. Lalprasath
              </h2>
              <div className="text-accent text-xs tracking-[0.2em] uppercase mt-3">CEO & Founder</div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground leading-relaxed mt-6">
                With a profound passion for design and spatial dynamics, Lalprasath founded CoreLine Interior with a singular vision: to craft environments that inspire and elevate everyday living. His approach blends timeless aesthetics with meticulous functionality.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground leading-relaxed">
                Under his leadership, CoreLine has grown into one of Pollachi's most sought-after luxury interior design studios. Lalprasath is deeply involved in every project, ensuring an unwavering commitment to quality, bespoke craftsmanship, and a deeply personalized client experience.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mt-12 md:mt-24 border-y border-border/60 bg-background">
        <div className="container-luxe grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-4 md:py-20">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="font-display text-5xl md:text-6xl">
                {s.n}<span className="text-accent">{s.suffix}</span>
              </div>
              <div className="mt-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28 md:py-40 bg-foreground text-background">
        <div className="container-luxe">
          <Reveal>
            <span className="eyebrow">Our Process</span>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl">
              How we design, build and hand over a CoreLine home.
            </h2>
          </Reveal>
          <div className="mt-20 grid gap-px bg-background/10 md:grid-cols-3">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={(i % 3) * 0.08} className="bg-foreground">
                <div className="p-8 md:p-10 h-full">
                  <div className="font-display text-5xl text-accent">{p.n}</div>
                  <div className="mt-8 font-display text-2xl">{p.title}</div>
                  <p className="mt-3 text-sm text-background/65 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-luxe text-center">
          <Reveal>
            <Link to="/contact" className="inline-flex items-center gap-3 border border-foreground px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-foreground hover:text-background">
              Start a Project <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
