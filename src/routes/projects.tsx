import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { projects } from "@/components/site/data";
import { ArrowUpRight } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — CoreLine Interiors" },
      { name: "description", content: "Selected work by CoreLine Interiors: luxury villas, apartments, modular kitchens, offices and custom furniture across Chennai." },
      { property: "og:title", content: "Projects — CoreLine Interiors" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

function Projects() {
  const types = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.type)))], []);
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <section className="pt-40 pb-16 md:pt-52 md:pb-24">
        <div className="container-luxe">
          <Reveal>
            <span className="eyebrow">Selected Work</span>
            <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[1.02] max-w-5xl">
              Projects.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-16 flex flex-wrap gap-2 md:gap-3">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`text-[11px] tracking-[0.2em] uppercase px-4 py-2 border transition-all ${
                    filter === t
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="container-luxe">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-10 md:gap-y-24">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.1} className={i % 3 === 0 ? "md:mt-24" : ""}>
                <Link to="/projects" className="group block">
                  <div className="img-zoom relative aspect-[4/5] overflow-hidden bg-muted">
                    <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-accent">{p.type}</div>
                      <h3 className="mt-3 font-display text-2xl md:text-3xl link-underline inline-block">{p.title}</h3>
                      <div className="mt-1 text-sm text-muted-foreground">{p.location} · {p.year}</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 mt-3 text-foreground/60 transition-all group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
