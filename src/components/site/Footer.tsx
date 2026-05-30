import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-foreground text-background">
      <div className="container-luxe py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <img src="/src/assets/logo.png" alt="CoreLine Interior" className="h-16 w-auto" />
            <div className="flex flex-col -space-y-1">
              <span className="font-display text-2xl tracking-tight text-background">CoreLine</span>
              <span className="eyebrow text-xs tracking-[0.2em] text-background/70">Interior</span>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-background/70">
            A luxury interior design studio crafting refined homes, villas and commercial
            spaces with a quiet, enduring sense of beauty.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm text-background/70">
            <a href="tel:+916383620372" className="link-underline inline-flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent" />
              <span>+91 63836 20372</span>
            </a>
            <a href="https://wa.me/916383620372" target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-accent" />
              <span>WhatsApp +91 63836 20372</span>
            </a>
            <a href="mailto:studio@coreline.in" className="link-underline inline-flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent" />
              <span>studio@coreline.in</span>
            </a>
            <span className="inline-flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent" />
              <span>Pollachi</span>
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
        <div className="container-luxe py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8 text-xs text-background/50">
          <div className="flex flex-col gap-2">
            <span className="tracking-wide">© {new Date().getFullYear()} CoreLine Interior. All rights reserved.</span>
            <span className="max-w-sm mt-1 leading-relaxed opacity-80">
              Crafting digital experiences with the same restraint, craft, and obsession to detail as physical spaces.
            </span>
          </div>
          
          <div className="flex flex-col gap-2 md:items-end md:text-right">
            <span className="inline-flex flex-wrap md:justify-end items-center gap-x-4 gap-y-2 tracking-[0.18em] uppercase">
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
                className="inline-flex items-center gap-1 link-underline hover:text-background transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5 text-accent" />
                <span>LinkedIn</span>
              </a>
            </span>

            <span className="max-w-sm mt-1 leading-relaxed opacity-80 normal-case tracking-normal">
              At TheGenWorks, we blend creativity, automation, and AI to help businesses scale faster, save time, and connect smarter. Our mission is to make innovation practical and powerful.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
