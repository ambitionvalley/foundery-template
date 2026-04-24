import { brand } from "@/config/brand";

export const hero = {
  title: brand.name,
  subtitle: brand.description,
  ctaLabel: "Get started",
  ctaHref: "/signup",
} as const;

export const features = [
  { title: "Feature one", description: "Replace with real copy." },
  { title: "Feature two", description: "Replace with real copy." },
  { title: "Feature three", description: "Replace with real copy." },
] as const;

export const testimonials: { quote: string; author: string; role: string }[] = [];

export const faq: { question: string; answer: string }[] = [];
