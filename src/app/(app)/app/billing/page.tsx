import { PaymentMethod } from "@/features/billing/components/payment-method";
import { SubscriptionCard } from "@/features/billing/components/subscription-card";

export const metadata = { title: "Billing" };

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[16px] leading-[24px] font-semibold text-black">
        Billing
      </h1>
      <SubscriptionCard />
      <PaymentMethod />
    </div>
  );
}
