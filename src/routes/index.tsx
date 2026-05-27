import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-living.jpg";
import aboutImg from "@/assets/about-studio.jpg";
import { Reveal } from "@/components/site/Reveal";
import { projects, services, process, stats, testimonials } from "@/components/site/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CoreLine Interiors — Luxury Interior Designers in Chennai" },
      { name: "description", content: "Crafting elegant, editorial homes, villas and commercial spaces. CoreLine Interiors is a luxury interior design studio based in Chennai." },
      { property: "og:title", content: "CoreLine Interiors — Luxury Interior Designers in Chennai" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "InteriorDesignBusiness",
        name: "CoreLine Interiors",
        description: "Luxury interior design studio in Chennai.",
        areaServed: "Chennai",
        priceRange: "$$$",
      }),
    }],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.45, 0.75]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] w-full overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img
            src={heroImg}
            alt="Luxury interior living room with floor-to-ceiling windows at golden hour"
            className="h-full w-full object-cover animate-live-zoom"
            width={1920}
            height={1280}
            fetchPriority="high"
          />
        </motion.div>
        <motion.div
          style={{ opacity: overlay }}
          className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/20 to-charcoal/80"
        />

        <div className="relative z-10 container-luxe flex h-full flex-col justify-end pb-24 md:pb-32">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="eyebrow text-cream/80"
          >
            CoreLine Interiors — Est. 2024
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-5xl font-display text-5xl leading-[1.02] text-cream md:text-7xl lg:text-[5.5rem]"
          >
            Crafting elegant spaces<br />
            <em className="text-accent not-italic font-normal">that feel like home.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-8 max-w-xl text-base text-cream/75 leading-relaxed"
          >
            A Chennai-based interior design studio shaping homes, villas and commercial
            spaces with restraint, craft and quiet luxury.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-5"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center justify-center gap-3 bg-cream px-7 py-4 text-xs tracking-[0.22em] uppercase text-charcoal transition-all hover:bg-accent hover:text-cream"
            >
              View Projects <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 border border-cream/60 px-7 py-4 text-xs tracking-[0.22em] uppercase text-cream transition-all hover:bg-cream hover:text-charcoal"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 right-6 z-10 hidden md:block text-cream/60 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-bottom-right"
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-background">
        <div className="container-luxe grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-4 md:py-20">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center md:text-left">
              <div className="font-display text-5xl md:text-6xl text-foreground">
                {s.n}<span className="text-accent">{s.suffix}</span>
              </div>
              <div className="mt-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 md:py-40">
        <div className="container-luxe">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 mb-16 md:mb-24">
            <Reveal className="md:col-span-5">
              <span className="eyebrow">What We Do</span>
              <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05]">
                Considered design,<br /><em className="text-accent not-italic">end to end.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="md:col-span-6 md:col-start-7 self-end">
              <p className="text-base leading-relaxed text-muted-foreground">
                From a single bespoke wardrobe to the full architecture of a luxury villa,
                we work across the spectrum of interior design with the same discipline,
                detail and care.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-border border-y">
            {services.slice(0, 9).map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.08} className="group relative overflow-hidden border-border sm:border-r lg:border-r last:border-r-0">
                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 z-10 bg-background/80 group-hover:bg-background/10 transition-colors duration-500" />
                
                <div className="relative z-20 p-8 md:p-12 h-full flex flex-col justify-between min-h-[320px]">
                  <div className="text-xs tracking-[0.3em] uppercase text-accent font-medium">0{i + 1}</div>
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl transition-colors group-hover:text-foreground">{s.title}</h3>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-secondary py-28 md:py-40">
        <div className="container-luxe">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
            <Reveal>
              <span className="eyebrow">Selected Work</span>
              <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05]">Recent projects</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <Link to="/projects" className="link-underline inline-flex items-center gap-2 text-sm tracking-wide">
                View all projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {projects.slice(0, 5).map((p, i) => {
              const layouts = [
                "md:col-span-7",
                "md:col-span-5",
                "md:col-span-5",
                "md:col-span-7",
                "md:col-span-12",
              ];
              const heights = [
                "aspect-[4/5] md:aspect-[5/6]",
                "aspect-[4/5] md:aspect-[4/5]",
                "aspect-[4/5] md:aspect-[4/5]",
                "aspect-[4/5] md:aspect-[5/6]",
                "aspect-[16/9] md:aspect-[21/9]",
              ];
              return (
                <Reveal key={p.slug} delay={(i % 2) * 0.1} className={layouts[i]}>
                  <Link to="/projects" className="group block">
                    <div className={`img-zoom relative ${heights[i]} overflow-hidden bg-muted`}>
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-cream">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <div className="text-[10px] tracking-[0.3em] uppercase text-cream/70">{p.type}</div>
                            <div className="mt-2 font-display text-2xl md:text-3xl">{p.title}</div>
                            <div className="mt-1 text-xs text-cream/70">{p.location}</div>
                          </div>
                          <div className="hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/60 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                            <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-28 md:py-40">
        <div className="container-luxe grid gap-12 md:grid-cols-12 md:gap-20 items-center">
          <Reveal className="md:col-span-6">
            <div className="img-zoom aspect-[4/5] overflow-hidden">
              <img src={aboutImg} alt="CoreLine studio" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="md:col-span-6">
            <Reveal>
              <span className="eyebrow">The Studio</span>
              <h2 className="mt-5 font-display text-3xl md:text-5xl leading-[1.08]">
                A practice built on <em className="text-accent not-italic">restraint, craft</em> and an obsession with detail.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Over the past 2 years, CoreLine has designed homes, villas and workplaces across
                South India. We work with a small, devoted team of architects, designers and
                craftspeople — and we work slowly, on purpose.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Link to="/about" className="mt-10 inline-flex items-center gap-2 link-underline text-sm tracking-wide">
                More about CoreLine <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-foreground text-background py-28 md:py-40">
        <div className="container-luxe">
          <Reveal>
            <span className="eyebrow">Our Process</span>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl">
              Six steps, from <em className="text-accent not-italic">first conversation</em> to keys in hand.
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

      {/* TESTIMONIALS */}
      <section className="py-28 md:py-40">
        <div className="container-luxe">
          <Reveal>
            <span className="eyebrow">Kind Words</span>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl">
              From the people who live in our work.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="h-full border-t border-foreground/20 pt-8">
                  <div className="text-accent text-sm tracking-[0.3em]">★★★★★</div>
                  <blockquote className="mt-6 font-display text-2xl leading-snug">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-10 text-sm">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-muted-foreground text-xs mt-1 tracking-wide">{t.project}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-secondary py-28 md:py-40">
        <div className="container-luxe text-center">
          <Reveal>
            <span className="eyebrow">Begin</span>
            <h2 className="mt-6 font-display text-4xl md:text-7xl leading-[1.02] max-w-4xl mx-auto">
              Let's design a home that <em className="text-accent not-italic">feels like yours.</em>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-muted-foreground">
              Schedule a private consultation with our design principals.
            </p>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-5">
              <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-foreground px-8 py-4 text-xs tracking-[0.22em] uppercase text-background hover:bg-accent">
                Book Consultation <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a href="https://wa.me/916383620372" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 border border-foreground px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-foreground hover:text-background">
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
