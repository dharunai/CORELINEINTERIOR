import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CoreLine Interiors" },
      { name: "description", content: "Schedule a private consultation with CoreLine Interiors. Luxury interior design studio based in Chennai." },
      { property: "og:title", content: "Contact CoreLine Interiors" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="pt-40 pb-12 md:pt-52 md:pb-20">
        <div className="container-luxe">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1 className="mt-6 font-display text-5xl md:text-8xl leading-[1.02] max-w-5xl">
              Let's begin a <em className="text-accent not-italic">conversation.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="container-luxe grid gap-16 md:grid-cols-12 md:gap-20">
          <Reveal className="md:col-span-5 space-y-12">
            <div>
              <div className="eyebrow mb-4">Studio</div>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                We take on a limited number of projects each year. Tell us a little about
                your space and we'll be in touch within two working days.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <a href="tel:+919000000000" className="flex items-center gap-4 link-underline">
                <Phone className="h-4 w-4 text-accent" /> +91 90000 00000
              </a>
              <a href="mailto:studio@coreline.in" className="flex items-center gap-4 link-underline">
                <Mail className="h-4 w-4 text-accent" /> studio@coreline.in
              </a>
              <div className="flex items-center gap-4">
                <MapPin className="h-4 w-4 text-accent" /> Boat Club Road, Chennai
              </div>
              <a href="https://wa.me/919000000000" target="_blank" rel="noreferrer" className="flex items-center gap-4 link-underline">
                <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp
              </a>
            </div>

            <div className="aspect-[4/3] overflow-hidden border border-border">
              <iframe
                title="CoreLine Studio location"
                src="https://www.google.com/maps?q=Chennai&output=embed"
                className="h-full w-full grayscale"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-7">
            {sent ? (
              <div className="border border-border p-10 md:p-14 text-center">
                <div className="eyebrow">Thank You</div>
                <h2 className="mt-4 font-display text-4xl">Your message is on its way.</h2>
                <p className="mt-4 text-muted-foreground">We'll be in touch within two working days.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                <Field label="Your name" name="name" required />
                <div className="grid gap-8 md:grid-cols-2">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  <Field label="Project type" name="project_type" />
                  <Field label="Approx. budget (₹)" name="budget" />
                </div>
                <div>
                  <label className="eyebrow block mb-3">Tell us about your space</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full border-b border-border bg-transparent py-3 text-base outline-none focus:border-accent transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-xs tracking-[0.22em] uppercase text-background hover:bg-accent"
                >
                  Send Enquiry <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", required = false,
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow block mb-3">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-border bg-transparent py-3 text-base outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
