import { features } from "@/features/marketing/content";

export function FeaturesGrid() {
  return (
    <section className="grid grid-cols-1 gap-6 py-12 sm:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex flex-col gap-2 rounded-[16px] border-[0.5px] border-black/10 p-6"
        >
          <h3 className="text-[18px] font-semibold text-black">
            {feature.title}
          </h3>
          <p className="text-[14px] leading-[20px] text-black/60">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
}
