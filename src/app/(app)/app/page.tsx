import { StatCard } from "@/components/app/stat-card";

export default function AppPage() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h1
          className="text-[14px] leading-[20px] font-semibold text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Overview
        </h1>
        <button
          type="button"
          className="flex items-center gap-2 rounded-[8px] px-3 py-1.5 text-[14px] leading-[20px] text-black hover:bg-black/[0.04]"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          Today
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex gap-7">
        <StatCard label="Views" value="7,265" delta="+11.01%" tone="lilac" />
        <StatCard label="Visits" value="3,671" delta="-0.03%" />
        <StatCard label="New Users" value="256" delta="+15.03%" />
        <StatCard
          label="Active Users"
          value="2,318"
          delta="+6.08%"
          tone="blue"
        />
      </div>

      <div className="rounded-[16px] border border-dashed border-black/15 p-10 text-center text-[13px] leading-[20px] text-black/40">
        Total Users chart · Traffic widgets · Marketing &amp; SEO — fleshed out in
        Parts 6–8.
      </div>
    </div>
  );
}
