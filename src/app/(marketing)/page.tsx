import { BrandLogo } from "@/components/brand/brand-logo";
import { brand } from "@/config/brand";

export default function LandingPage() {
  return (
    <section className="grid min-h-[60vh] place-items-center p-8">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <BrandLogo priority />
        <h1 className="text-[48px] leading-[56px] font-semibold text-black">
          {brand.name}
        </h1>
        <p className="text-[14px] leading-[20px] text-black/60">
          {brand.description}
        </p>
        <p className="mt-4 text-[12px] leading-[16px] text-black/40">
          Replace this with your product&apos;s landing page.
        </p>
      </div>
    </section>
  );
}
