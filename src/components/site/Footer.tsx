import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-foreground text-background">
      <div className="container-luxe py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-tight">CoreLine Interiors</div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-background/70">
            A luxury interior design studio crafting refined homes, villas and commercial
            spaces with a quiet, enduring sense of beauty.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm text-background/70">
            <a href="tel:+919000000000" className="link-underline inline-flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent" /> +91 90000 00000
            </a>
            <a href="mailto:studio@coreline.in" className="link-underline inline-flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent" /> studio@coreline.in
            </a>
            <span className="inline-flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent" /> Chennai, India
            </span>
          </div>
        </div>

        <div>
          <div className="eyebrow mb-6">Studio</div>
          <ul className="space-y-3 text-sm text-background/70">
            <li><Link to="/about" className="link-underline">About</Link></li>
            <li><Link to="/services" className="link-underline">Services</Link></li>
            <li><Link to="/projects" className="link-underline">Projects</Link></li>
            <li><Link to="/contact" className="link-underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-6">Follow</div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-background/70 link-underline"
          >
            <Instagram className="h-4 w-4 text-accent" /> @coreline.interiors
          </a>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-luxe py-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-background/50">
          <span>© {new Date().getFullYear()} CoreLine Interiors. All rights reserved.</span>
          <span className="tracking-[0.2em] uppercase">Crafted with intention</span>
        </div>
      </div>
    </footer>
  );
}
