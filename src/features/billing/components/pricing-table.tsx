import type { Plan } from "@/features/billing/types";

export type PricingTableProps = {
  plans?: Plan[];
};

export function PricingTable({ plans = [] }: PricingTableProps) {
  if (plans.length === 0) {
    return (
      <p className="text-[14px] leading-[20px] text-black/40">
        Replace with pricing plans.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="flex flex-col gap-2 rounded-[16px] border-[0.5px] border-black/10 p-6"
        >
          <h3 className="text-[18px] font-semibold">{plan.name}</h3>
          <p className="text-[14px] text-black/60">
            ${plan.priceMonthly}/month
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-[14px] text-black/80">
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
