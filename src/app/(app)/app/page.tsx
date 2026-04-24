import { MarketingAndSeo } from "@/components/app/marketing-and-seo";
import { StatCard } from "@/components/app/stat-card";
import { TotalUsersChart } from "@/components/app/total-users-chart";
import { TrafficByDevice } from "@/components/app/traffic-by-device";
import { TrafficByLocation } from "@/components/app/traffic-by-location";
import { TrafficByWebsite } from "@/components/app/traffic-by-website";

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
        <StatCard label="Views" value="7,265" delta="+11.01%" tone="blue" />
        <StatCard label="Visits" value="3,671" delta="-0.03%" tone="lilac" />
        <StatCard label="New Users" value="256" delta="+15.03%" tone="blue" />
        <StatCard
          label="Active Users"
          value="2,318"
          delta="+6.08%"
          tone="lilac"
        />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-7">
        <TotalUsersChart />
        <TrafficByWebsite />
      </div>

      <div className="grid grid-cols-2 gap-7">
        <TrafficByDevice />
        <TrafficByLocation />
      </div>

      <MarketingAndSeo />
    </div>
  );
}
