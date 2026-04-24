import { PricingTable } from "@/features/billing/components/pricing-table";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-8 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-[32px] leading-[40px] font-semibold text-black">
          Pricing
        </h1>
        <p className="text-[14px] leading-[20px] text-black/60">
          Replace with your pricing narrative.
        </p>
      </header>
      <PricingTable />
    </section>
  );
}
