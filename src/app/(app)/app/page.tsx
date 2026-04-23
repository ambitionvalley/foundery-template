import { Card } from "@/components/common/card";

export default function AppPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[14px] leading-[20px] text-black/60">
        Replace this with your app.
      </p>
      <div className="flex flex-wrap gap-4">
        <Card count={3} />
        <Card count={3} />
        <Card count={3} />
      </div>
    </div>
  );
}
