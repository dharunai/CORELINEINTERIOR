import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/918870981415?text=Hi%20CoreLine%2C%20I'd%20like%20to%20discuss%20an%20interior%20project."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-foreground/10 transition-transform hover:scale-105 hover:shadow-xl"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
