import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

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
            <a href="tel:+916383620372" className="link-underline inline-flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent" />
              <span>+91 63836 20372</span>
            </a>
            <a href="https://wa.me/918870981415" target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-accent" />
              <span>WhatsApp +91 88709 81415</span>
            </a>
            <a href="mailto:studio@coreline.in" className="link-underline inline-flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent" />
              <span>studio@coreline.in</span>
            </a>
            <span className="inline-flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent" />
              <span>Chennai, India</span>
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
          <div className="flex flex-col gap-3 text-sm text-background/70">
            <a
              href="https://www.instagram.com/coreline_interior_06/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 link-underline"
            >
              <Instagram className="h-4 w-4 text-accent" />
              <span>@coreline_interior_06</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-luxe py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-background/50">
          <span>© {new Date().getFullYear()} CoreLine Interiors. All rights reserved.</span>
          <span className="inline-flex items-center gap-4 tracking-[0.18em] uppercase">
            <a
              href="https://thegenworks.com"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              Developed by TheGenWorks
            </a>
            <a
              href="https://www.linkedin.com/company/the-genworks"
              target="_blank"
              rel="noreferrer"
              aria-label="TheGenWorks on LinkedIn"
              className="inline-flex items-center gap-1 link-underline"
            >
              <Linkedin className="h-3.5 w-3.5 text-accent" />
              <span>LinkedIn</span>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
