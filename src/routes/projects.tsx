import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "motion/react";
import { ArrowUpRight, ArrowRight, X } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";

// ─── Project data using uploaded images ───────────────────────────────────────
const newProjects = [
  {
    slug: "golden-hour-living",
    title: "Golden Hour Living Room",
    type: "Home Interiors",
    location: "Boat Club, Chennai",
    year: "2025",
    image: "/uploads/81121318-a144-415a-8916-cdbebaec19f6.jpeg",
    desc: "A warm, layered living room anchored by a marble TV wall and fluted wood panel with cove-lit false ceiling.",
    tags: ["Living Room", "Cove Ceiling", "Marble"],
  },
  {
    slug: "burgundy-kitchen",
    title: "Burgundy Kitchen",
    type: "Modular Kitchens",
    location: "Anna Nagar, Chennai",
    year: "2025",
    image: "/uploads/ae0859de-5581-4801-9dd6-b760b21eb8ff.jpeg",
    desc: "Deep plum lacquer lowers set against crisp shaker uppers with glass display cabinets and under-cabinet lighting.",
    tags: ["Modular Kitchen", "Lacquer", "Glass Cabinets"],
  },
  {
    slug: "nordic-living-dining",
    title: "Nordic Living & Dining",
    type: "Apartment Interiors",
    location: "Nungambakkam, Chennai",
    year: "2025",
    image: "/uploads/c4ad8b4b-704c-49a8-b646-8cb2385e5079.jpeg",
    desc: "A clean-lined open-plan combining a display cabinet, fluted TV unit and Scandi dining nook in warm white tones.",
    tags: ["Open Plan", "TV Unit", "Dining"],
  },
  {
    slug: "founders-studio",
    title: "Founder's Studio",
    type: "Office Interiors",
    location: "Kilpauk, Chennai",
    year: "2024",
    image: "/uploads/0d1348c3-d7a4-4b55-b7a5-b208a21f3bac.jpeg",
    desc: "A moody private office with toile mural wall, leather seating and bespoke ceiling detail.",
    tags: ["Office", "Mural Wall", "Dark Palette"],
  },
  {
    slug: "cream-island-kitchen",
    title: "Cream Island Kitchen",
    type: "Modular Kitchens",
    location: "ECR, Chennai",
    year: "2025",
    image: "/uploads/e3e544c7-72fa-4c8e-934f-59ded2f19a1e.jpeg",
    desc: "Floor-to-ceiling cream gloss cabinetry with a statement marble backsplash and bar-stool island.",
    tags: ["Island Kitchen", "Marble", "Gloss"],
  },
  {
    slug: "parisian-lounge",
    title: "Parisian Lounge",
    type: "Home Interiors",
    location: "Adyar, Chennai",
    year: "2024",
    image: "/uploads/f9aaf95a-a6e6-42fd-9113-610cf13a4946.jpeg",
    desc: "Panelled walls in warm bone with a globe floor lamp and graphic circular rug — a Parisian pied-à-terre sensibility.",
    tags: ["Panel Walls", "Living Room", "Eclectic"],
  },
  {
    slug: "forest-mural-sitting",
    title: "Forest Mural Sitting Room",
    type: "Home Interiors",
    location: "Besant Nagar, Chennai",
    year: "2024",
    image: "/uploads/e73d1b2c-0719-4488-8863-95050bd5135b.jpeg",
    desc: "A watercolour forest mural anchors a free-spirited seating arrangement in earthy terracotta and ivory.",
    tags: ["Mural", "Living Room", "Earthy"],
  },
  {
    slug: "walnut-bedroom",
    title: "Walnut Bedroom",
    type: "Bedroom Interiors",
    location: "Mylapore, Chennai",
    year: "2024",
    image: "/uploads/08be7433-090e-4d09-8357-6751d48eb849.jpeg",
    desc: "Rich walnut veneer bed frame and wardrobes glow under warm cove lighting and venetian-blind dusk.",
    tags: ["Bedroom", "Walnut", "Cove Lighting"],
  },
  {
    slug: "slatted-tv-kitchen",
    title: "Slatted Partition Living",
    type: "Apartment Interiors",
    location: "Tambaram, Chennai",
    year: "2024",
    image: "/uploads/308e9415-f98b-412b-925d-b8ad73ca9e33.jpeg",
    desc: "A full-height slatted timber partition delineates the living and kitchen zones with golden warmth.",
    tags: ["Partition", "Timber Slats", "Open Plan"],
  },
  {
    slug: "monochrome-tv-wall",
    title: "Monochrome TV Wall",
    type: "Home Interiors",
    location: "Velachery, Chennai",
    year: "2023",
    image: "/uploads/59261038-de62-4f61-be1d-ed80dceed2f9.jpeg",
    desc: "Floating shelves with display lighting flank a wall-mounted TV in a balanced marble-finish interior.",
    tags: ["TV Unit", "Floating Shelves", "Minimal"],
  },
  {
    slug: "classic-contemporary-home",
    title: "Classic Contemporary Home",
    type: "Home Interiors",
    location: "Kotturpuram, Chennai",
    year: "2025",
    image: "/uploads/189a5f18-c697-4ead-8705-831891628dce.JPG",
    desc: "A harmonious blend of classic and contemporary design featuring plush seating, a sleek TV unit, and subtle gold accents.",
    tags: ["Contemporary", "Living Room", "Gold Accents"],
  },
  {
    slug: "serene-minimalist-lounge",
    title: "Serene Minimalist Lounge",
    type: "Apartment Interiors",
    location: "Alwarpet, Chennai",
    year: "2025",
    image: "/uploads/5f01e54c-e8b3-492e-b670-9351e05cfbfa.JPG",
    desc: "A calming minimalist lounge characterized by neutral tones, soft textures, and a custom fluted wood TV console.",
    tags: ["Minimalist", "Fluted Wood", "Neutral Tones"],
  },
  {
    slug: "urban-chic-living",
    title: "Urban Chic Living",
    type: "Home Interiors",
    location: "T Nagar, Chennai",
    year: "2025",
    image: "/uploads/8a5598b8-eb9b-49e9-9395-bff739436936.JPG",
    desc: "A sophisticated urban living area with a statement marble accent wall, elegant lighting, and rich fabric upholstery.",
    tags: ["Urban Chic", "Marble Wall", "Elegant Lighting"],
  },
  {
    slug: "modern-transitional-space",
    title: "Modern Transitional Space",
    type: "Apartment Interiors",
    location: "Poe's Garden, Chennai",
    year: "2025",
    image: "/uploads/acd9d584-f486-460a-870d-ae88aa8eeddb.JPG",
    desc: "An inviting transitional living room that balances modern clean lines with traditional warmth, featuring a bespoke media unit.",
    tags: ["Transitional", "Bespoke", "Living Room"],
  },
  {
    slug: "luxe-monochromatic-suite",
    title: "Luxe Monochromatic Suite",
    type: "Home Interiors",
    location: "Nandanam, Chennai",
    year: "2025",
    image: "/uploads/db649237-5bd4-499a-b73b-ada56f82c613.JPG",
    desc: "A luxurious monochromatic setting with textured wall panels, a sleek console, and carefully curated ambient lighting.",
    tags: ["Monochromatic", "Textured Panels", "Luxe"],
  },
];

// ─── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// ─── Magnetic cursor dot ──────────────────────────────────────────────────────
function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={dot}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-3 w-3 rounded-full bg-accent mix-blend-difference transition-transform duration-100 ease-out hidden md:block"
    />
  );
}

// ─── Parallax project card ────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  layout,
  onClick,
}: {
  project: (typeof newProjects)[0];
  index: number;
  layout: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Dynamically assign aspect ratio based on column span to accommodate landscape images properly
  let aspectClass = "aspect-[4/5]"; // default portrait
  if (layout.includes("col-span-12")) aspectClass = "aspect-[21/9] md:aspect-[21/9]";
  else if (layout.includes("col-span-8") || layout.includes("col-span-7")) aspectClass = "aspect-[4/3] md:aspect-[16/9]";
  else if (layout.includes("col-span-6")) aspectClass = "aspect-[4/3] md:aspect-[3/2]";
  else aspectClass = "aspect-[4/3] md:aspect-[4/5]"; // Mobile landscape, desktop portrait

  return (
    <motion.div
      ref={ref}
      className={layout}
      custom={index % 3}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      <div onClick={onClick} className="group block cursor-pointer">
        {/* Image with parallax */}
        <div className={`relative overflow-hidden ${aspectClass} bg-muted`}>
          <motion.div style={{ y: yImg }} className="absolute inset-[-6%] h-[112%] w-full">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-105"
            />
          </motion.div>

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

          {/* Tags strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
            className="absolute top-5 left-5 flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 bg-black/40 text-white/80 backdrop-blur-sm border border-white/10"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Hover arrow */}
          <div className="absolute bottom-6 right-6 h-10 w-10 rounded-full border border-white/60 flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>

          {/* Year badge */}
          <div className="absolute top-5 right-5 text-[10px] tracking-[0.25em] text-white/50 uppercase">
            {project.year}
          </div>
        </div>

        {/* Text */}
        <div className="mt-5 space-y-1.5">
          <div className="text-[10px] tracking-[0.3em] uppercase text-accent">{project.type}</div>
          <h3 className="font-display text-2xl md:text-3xl link-underline inline-block leading-tight">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-sm">
            {project.desc}
          </p>
          <div className="text-xs text-muted-foreground/70 pt-1">{project.location}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Featured hero card (first project) ──────────────────────────────────────
function FeaturedCard({ project, onClick }: { project: (typeof newProjects)[0]; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="md:col-span-12 mb-4"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div onClick={onClick} className="group block cursor-pointer">
        <div className="relative overflow-hidden aspect-[21/9] bg-muted">
          <motion.div style={{ y: yImg }} className="absolute inset-[-5%] h-[110%] w-full">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.9 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((t) => (
                  <span key={t} className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 bg-white/10 text-white/70 backdrop-blur-sm border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-accent mb-2">{project.type}</div>
              <h3 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-2xl">
                {project.title}
              </h3>
              <p className="mt-4 max-w-lg text-white/65 text-sm leading-relaxed">{project.desc}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/60 border-b border-white/20 pb-px group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                View Project <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          </div>
          <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] text-white/40 uppercase">
            {project.year}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Animated count-up ticker ─────────────────────────────────────────────────
function Ticker({ n, suffix }: { n: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1400;
    const tick = 16;
    const steps = dur / tick;
    const inc = n / steps;
    const id = setInterval(() => {
      start += inc;
      if (start >= n) { setVal(n); clearInterval(id); }
      else setVal(Math.floor(start));
    }, tick);
    return () => clearInterval(id);
  }, [inView, n]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Route ────────────────────────────────────────────────────────────────────
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
  const allProjects = newProjects;
  const types = useMemo(() => ["All", ...Array.from(new Set(allProjects.map((p) => p.type)))], []);
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<(typeof newProjects)[0] | null>(null);
  const filtered = filter === "All" ? allProjects : allProjects.filter((p) => p.type === filter);
  const [featured, ...rest] = filtered;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "18%"]);

  // Layout alternation for the grid
  const gridLayouts = [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-4",
    "md:col-span-8",
    "md:col-span-6",
    "md:col-span-6",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-12",
  ];

  return (
    <>
      {/* ── Hero strip ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-40 pb-0 md:pt-52 overflow-hidden">
        {/* Faint background shimmer */}
        <motion.div
          style={{ y: heroY }}
          className="pointer-events-none absolute -top-32 -right-40 w-[700px] h-[700px] rounded-full bg-accent/5 blur-[120px]"
        />

        <div className="container-luxe relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="eyebrow"
          >
            Selected Work · {allProjects.length} Projects
          </motion.span>

          <div className="overflow-hidden mt-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-8xl lg:text-[9rem] leading-[0.95] max-w-5xl"
            >
              Projects.
            </motion.h1>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-border/40 pt-8 text-sm"
          >
            {[
              { n: 30, suffix: "+", label: "Completed" },
              { n: 2, suffix: "yrs", label: "Practice" },
              { n: 25, suffix: "+", label: "Happy Clients" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-display text-3xl text-foreground">
                  <Ticker n={s.n} suffix={s.suffix} />
                </span>
                <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Filter pills */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap gap-2 md:gap-3"
          >
            {types.map((t, i) => (
              <motion.button
                key={t}
                custom={i}
                variants={fadeUp}
                onClick={() => setFilter(t)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 ${filter === t
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:border-foreground"
                  }`}
              >
                {t}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Projects grid ──────────────────────────────────────────────── */}
      <section className="pb-32 md:pb-48 pt-16">
        <div className="container-luxe">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Featured card — first result */}
              {featured && filter === "All" && (
                <div className="grid grid-cols-1 md:grid-cols-12 mb-16">
                  <FeaturedCard project={featured} onClick={() => setSelectedProject(featured)} />
                </div>
              )}

              {/* Masonry-style grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 md:gap-y-20">
                {(filter === "All" ? rest : filtered).map((p, i) => (
                  <ProjectCard
                    key={p.slug}
                    project={p}
                    index={i}
                    layout={gridLayouts[i % gridLayouts.length]}
                    onClick={() => setSelectedProject(p)}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA strip ──────────────────────────────────────────────────── */}
      <section className="bg-foreground text-background py-24 md:py-32 overflow-hidden relative">
        {/* Subtle background texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "24px 24px" }}
        />
        <div className="container-luxe relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">Begin</span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl mx-auto">
              Have a space in mind?{" "}
              <em className="text-accent not-italic">Let's shape it together.</em>
            </h2>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-5">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 bg-cream text-charcoal px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-accent hover:text-cream transition-colors"
              >
                Book Consultation <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/916383620372"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-cream/40 px-8 py-4 text-xs tracking-[0.22em] uppercase hover:bg-cream/10 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Project Detail Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] bg-background overflow-hidden flex flex-col md:flex-row shadow-[0_0_80px_-15px_rgba(0,0,0,0.5)] border border-border"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-colors text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-2/3 h-[45vh] md:h-full relative bg-muted/30">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-contain p-4 md:p-12"
                />
              </div>

              {/* Info Section */}
              <div className="w-full md:w-1/3 p-8 md:p-12 overflow-y-auto bg-foreground/5 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border/50">
                <div className="text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{selectedProject.type}</div>
                <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6">{selectedProject.title}</h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>{selectedProject.desc}</p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-border/50 grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1">Location</div>
                    <div className="text-sm font-medium">{selectedProject.location}</div>
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-1">Year</div>
                    <div className="text-sm font-medium">{selectedProject.year}</div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-3">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-border/50 bg-background text-muted-foreground shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
