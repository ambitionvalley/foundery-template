// Traffic by Device — 432x280 block. Vertical bar chart with a dark
// tooltip pinned above each bar showing its value. Colours match the
// Figma secondary palette; values and axis match the 30K scale.
const BARS: { label: string; value: number; color: string }[] = [
  { label: "Linux", value: 15, color: "#A0BCE8" },
  { label: "Mac", value: 26, color: "#6BE6D3" },
  { label: "iOS", value: 19, color: "#000000" },
  { label: "Windows", value: 30, color: "#7DBBFF" },
  { label: "Android", value: 11, color: "#B899EB" },
  { label: "Other", value: 22, color: "#71DD8C" },
];

const MAX = 30;

export function TrafficByDevice() {
  return (
    <div
      className="flex flex-col gap-4 rounded-[20px] bg-[#f9f9fa] p-6"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <h2 className="text-[14px] leading-[20px] font-semibold text-black">
        Traffic by Device
      </h2>
      <div className="flex gap-4">
        <div className="flex w-6 shrink-0 flex-col justify-between pt-4 pb-7 text-[12px] leading-[16px] text-black/40">
          <span>30K</span>
          <span>20K</span>
          <span>10K</span>
          <span>0</span>
        </div>
        <div className="relative flex flex-1 flex-col">
          <div aria-hidden className="absolute inset-x-0 top-4 bottom-7 flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-px w-full bg-black"
                style={{ opacity: i === 3 ? 0.1 : 0.04 }}
              />
            ))}
          </div>
          <ul className="relative flex flex-1 items-end justify-between gap-2 pb-7">
            {BARS.map((bar) => {
              const h = (bar.value / MAX) * 168;
              return (
                <li
                  key={bar.label}
                  className="flex flex-1 flex-col items-center justify-end gap-1"
                >
                  <span className="flex h-4 items-center justify-center rounded-[12px] bg-black/80 px-1 text-[12px] leading-[16px] font-medium text-white">
                    {bar.value}K
                  </span>
                  <span
                    className="w-7 rounded-[8px]"
                    style={{ height: h, backgroundColor: bar.color }}
                    aria-label={`${bar.label}: ${bar.value}K`}
                  />
                </li>
              );
            })}
          </ul>
          <div aria-hidden className="absolute inset-x-0 bottom-0 flex text-[12px] leading-[16px] text-black/40">
            {BARS.map((bar) => (
              <span key={bar.label} className="flex-1 text-center">
                {bar.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
