import { testimonials } from "@/features/marketing/content";

export function Testimonials() {
  if (testimonials.length === 0) {
    return (
      <section className="py-12 text-center">
        <p className="text-[14px] leading-[20px] text-black/40">
          Replace with testimonials.
        </p>
      </section>
    );
  }
  return (
    <section className="grid grid-cols-1 gap-6 py-12 sm:grid-cols-2">
      {testimonials.map((t) => (
        <blockquote
          key={t.author}
          className="flex flex-col gap-2 rounded-[16px] border-[0.5px] border-black/10 p-6"
        >
          <p className="text-[14px] leading-[20px] text-black">{t.quote}</p>
          <footer className="text-[12px] leading-[16px] text-black/60">
            {t.author} — {t.role}
          </footer>
        </blockquote>
      ))}
    </section>
  );
}
