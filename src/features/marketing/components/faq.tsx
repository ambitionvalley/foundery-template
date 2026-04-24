import { faq } from "@/features/marketing/content";

export function Faq() {
  if (faq.length === 0) {
    return (
      <section className="py-12 text-center">
        <p className="text-[14px] leading-[20px] text-black/40">
          Replace with FAQ entries.
        </p>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-4 py-12">
      {faq.map((item) => (
        <details
          key={item.question}
          className="group rounded-[12px] border-[0.5px] border-black/10 p-4"
        >
          <summary className="cursor-pointer text-[14px] leading-[20px] font-semibold text-black">
            {item.question}
          </summary>
          <p className="mt-2 text-[14px] leading-[20px] text-black/60">
            {item.answer}
          </p>
        </details>
      ))}
    </section>
  );
}
