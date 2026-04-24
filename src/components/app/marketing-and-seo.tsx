// Marketing & SEO — bottom-row template block. The Figma frame only shows
// the section header before the fold, so this is a sensible default:
// left card shows channel mix as a stacked bar, right card surfaces four
// KPI mini-metrics. Fork-owners swap the structure once they have real
// marketing telemetry.
const CHANNELS: { label: string; pct: number; color: string }[] = [
  { label: "Organic Search", pct: 42, color: "#000000" },
  { label: "Paid Social", pct: 24, color: "#7dbbff" },
  { label: "Direct", pct: 18, color: "#71dd8c" },
  { label: "Referral", pct: 10, color: "#b899eb" },
  { label: "Other", pct: 6, color: "#a0bce8" },
];

const METRICS: { label: string; value: string; delta: string }[] = [
  { label: "Impressions", value: "248K", delta: "+4.2%" },
  { label: "Clicks", value: "18.4K", delta: "+2.6%" },
  { label: "CTR", value: "7.4%", delta: "-0.3%" },
  { label: "Avg. Position", value: "4.1", delta: "+0.4" },
];

export function MarketingAndSeo() {
  return (
    <div
      className="grid grid-cols-[3fr_2fr] gap-7"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <div className="flex flex-col gap-4 rounded-[16px] bg-[#f7f7f8] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] leading-[20px] font-semibold text-black">
            Marketing &amp; SEO
          </h2>
          <span className="text-[12px] leading-[18px] text-black/40">
            Last 30 days
          </span>
        </div>
        <div
          className="flex h-3 w-full overflow-hidden rounded-full"
          role="img"
          aria-label="Traffic channel mix"
        >
          {CHANNELS.map((channel) => (
            <span
              key={channel.label}
              className="block h-full"
              style={{
                width: `${channel.pct}%`,
                backgroundColor: channel.color,
              }}
              title={`${channel.label} — ${channel.pct}%`}
            />
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] leading-[18px] md:grid-cols-3">
          {CHANNELS.map((channel) => (
            <li
              key={channel.label}
              className="flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2 text-black/60">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: channel.color }}
                />
                {channel.label}
              </span>
              <span className="text-black">{channel.pct}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 rounded-[16px] bg-[#f7f7f8] p-6">
        <h2 className="text-[14px] leading-[20px] font-semibold text-black">
          SEO performance
        </h2>
        <ul className="grid grid-cols-2 gap-4">
          {METRICS.map((metric) => {
            const negative = metric.delta.trim().startsWith("-");
            return (
              <li
                key={metric.label}
                className="flex flex-col gap-1 rounded-[12px] bg-white p-4"
              >
                <span className="text-[12px] leading-[18px] text-black/60">
                  {metric.label}
                </span>
                <span className="text-[20px] leading-[28px] font-semibold text-black">
                  {metric.value}
                </span>
                <span
                  className={`text-[12px] leading-[18px] ${
                    negative ? "text-[#d14343]" : "text-[#2f9e6c]"
                  }`}
                >
                  {metric.delta}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
