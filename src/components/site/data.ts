import kitchen from "@/assets/project-kitchen.jpg";
import bedroom from "@/assets/project-bedroom.jpg";
import villa from "@/assets/project-villa.jpg";
import office from "@/assets/project-office.jpg";
import wardrobe from "@/assets/project-wardrobe.jpg";
import dining from "@/assets/project-dining.jpg";

// Service Backgrounds
import sHome from "@/assets/service-home.png";
import sApartment from "@/assets/service-apartment.png";
import sVilla from "@/assets/service-villa.png";
import sKitchen from "@/assets/service-kitchen.png";
import sOffice from "@/assets/service-office.png";
import sCommercial from "@/assets/service-commercial.png";
import sRenovation from "@/assets/service-renovation.png";
import sWardrobe from "@/assets/service-wardrobe.png";
import sCeiling from "@/assets/service-ceiling.png";

export const projects = [
  { slug: "marble-light-residence", title: "Marble & Light Residence", type: "Luxury Villa", location: "ECR, Pollachi", image: villa, year: "2025" },
  { slug: "linen-and-oak-apartment", title: "Linen & Oak Apartment", type: "Apartment Interiors", location: "Anna Nagar, Pollachi", image: bedroom, year: "2025" },
  { slug: "the-brass-kitchen", title: "The Brass Kitchen", type: "Modular Kitchen", location: "Boat Club, Pollachi", image: kitchen, year: "2024" },
  { slug: "founders-study", title: "Founder's Study", type: "Office Interiors", location: "Nungambakkam, Pollachi", image: office, year: "2024" },
  { slug: "the-walnut-wardrobe", title: "The Walnut Wardrobe", type: "Custom Furniture", location: "Adyar, Pollachi", image: wardrobe, year: "2024" },
  { slug: "plaster-and-pendant", title: "Plaster & Pendant", type: "Home Interiors", location: "Besant Nagar, Pollachi", image: dining, year: "2023" },
];

export const services = [
  { title: "Home Interiors", desc: "End-to-end interior design for thoughtful homes.", image: sHome },
  { title: "Apartment Interiors", desc: "Considered layouts that elevate urban living.", image: sApartment },
  { title: "Luxury Villas", desc: "Architectural interiors for landmark residences.", image: sVilla },
  { title: "Modular Kitchens", desc: "Bespoke kitchens engineered for everyday rituals.", image: sKitchen },
  { title: "Office Interiors", desc: "Workspaces that quietly express your brand.", image: sOffice },
  { title: "Commercial Spaces", desc: "Hospitality and retail with editorial polish.", image: sCommercial },
  { title: "Renovation Works", desc: "Restoring spaces with discipline and craft.", image: sRenovation },
  { title: "TV Units & Wardrobes", desc: "Built-ins detailed to the millimeter.", image: sWardrobe },
  { title: "False Ceilings", desc: "Light, line and shadow, choreographed.", image: sCeiling },
  { title: "Custom Furniture", desc: "Pieces made in our workshop, just for you.", image: sHome },
];

export const process = [
  { n: "01", title: "Consultation", desc: "We listen, walk the site and define an intent." },
  { n: "02", title: "Space Planning", desc: "Layouts that serve light, flow and ritual." },
  { n: "03", title: "3D Visualization", desc: "See your home before a single line is drawn." },
  { n: "04", title: "Material Selection", desc: "A curated palette of stone, wood and metal." },
  { n: "05", title: "Execution", desc: "Our craftspeople build to atelier standards." },
  { n: "06", title: "Final Handover", desc: "A complete home, styled and ready to live in." },
];

export const stats = [
  { n: 30, suffix: "+", label: "Projects Completed" },
  { n: 2, suffix: "", label: "Years of Practice" },
  { n: 25, suffix: "+", label: "Happy Clients" },
  { n: 22, suffix: "", label: "Design Experts" },
];

export const testimonials = [
  { name: "Aarthi & Vikram", project: "Luxury Villa, ECR", quote: "CoreLine read our family like a book and translated it into a home that feels effortless. Every detail breathes." },
  { name: "Karthik R.", project: "Apartment, Anna Nagar", quote: "The restraint of the palette, the precision of the joinery — it is a study in quiet luxury." },
  { name: "Meera Suresh", project: "Modular Kitchen, Boat Club", quote: "A kitchen we actually live in. Brass, marble and warm wood, balanced with rare confidence." },
];
