import { InvoiceList } from "@/features/billing/components/invoice-list";

export const metadata = { title: "Invoices" };

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[16px] leading-[24px] font-semibold text-black">
        Invoices
      </h1>
      <InvoiceList />
    </div>
  );
}
