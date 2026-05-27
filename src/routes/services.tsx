import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/components/site/data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CoreLine Interiors" },
      { name: "description", content: "Home interiors, modular kitchens, villa interiors, office and commercial design, custom furniture and renovation by CoreLine Interiors, Chennai." },
      { property: "og:title", content: "Services — CoreLine Interiors" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <section className="pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="container-luxe">
          <Reveal>
            <span className="eyebrow">Services</span>
            <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[1.02] max-w-5xl">
              The full breadth of <em className="text-accent not-italic">interior design.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-2xl text-muted-foreground leading-relaxed">
              From a single bespoke wardrobe to the architecture of an entire villa,
              every commission is led by the same studio principles — restraint, craft
              and a long view of how a space will age.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="container-luxe">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.05}>
              <Link
                to="/contact"
                className="group relative flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-border py-10 md:py-12 overflow-hidden transition-colors hover:bg-card"
              >
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none">
                  <img src={s.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="relative z-10 flex items-baseline gap-8 md:gap-12">
                  <span className="text-xs tracking-[0.2em] text-accent w-10">0{i + 1}</span>
                  <h2 className="font-display text-3xl md:text-5xl">{s.title}</h2>
                </div>
                <div className="relative z-10 flex items-center justify-between md:gap-12 md:max-w-md md:flex-1">
                  <p className="text-sm text-muted-foreground md:text-right max-w-md">{s.desc}</p>
                  <ArrowUpRight className="hidden md:block h-5 w-5 text-foreground/60 transition-all group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28 md:py-40 text-center">
        <div className="container-luxe">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl mx-auto">
              Have a space in mind? <em className="text-accent not-italic">Let's talk.</em>
            </h2>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-foreground px-8 py-4 text-xs tracking-[0.22em] uppercase text-background hover:bg-accent">
              Book Consultation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
