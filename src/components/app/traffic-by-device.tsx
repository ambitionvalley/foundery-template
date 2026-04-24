// Traffic by Device — 6-bar vertical chart using the Foundry secondary
// palette (cyan/mint/black/blue/purple/green). 0–30K axis, values are
// template-data; fork-owners replace with real device metrics.
const BARS: { label: string; value: number; color: string }[] = [
  { label: "Linux", value: 8, color: "#a0bce8" },
  { label: "Mac", value: 16, color: "#6be6d3" },
  { label: "iOS", value: 16, color: "#000000" },
  { label: "Windows", value: 22, color: "#7dbbff" },
  { label: "Android", value: 11, color: "#b899eb" },
  { label: "Other", value: 15, color: "#71dd8c" },
];

const MAX = 30;

export function TrafficByDevice() {
  const width = 400;
  const height = 220;
  const padLeft = 40;
  const padRight = 12;
  const padTop = 16;
  const padBottom = 32;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const step = plotW / BARS.length;
  const barW = 28;

  return (
    <div
      className="flex flex-col gap-4 rounded-[16px] bg-[#f7f7f8] p-6"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <h2 className="text-[14px] leading-[20px] font-semibold text-black">
        Traffic by Device
      </h2>
      <svg
        role="img"
        aria-label="Traffic by device — Linux, Mac, iOS, Windows, Android, Other"
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
      >
        {[0, 10, 20, 30].map((v) => {
          const y = padTop + plotH - (plotH * v) / MAX;
          return (
            <g key={v}>
              <line
                x1={padLeft}
                x2={padLeft + plotW}
                y1={y}
                y2={y}
                stroke="#000"
                strokeOpacity={v === 0 ? 0.15 : 0.05}
                strokeWidth={1}
              />
              <text
                x={padLeft - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="rgba(0,0,0,0.4)"
              >
                {v === 0 ? "0" : `${v}K`}
              </text>
            </g>
          );
        })}

        {BARS.map((bar, i) => {
          const cx = padLeft + step * i + step / 2;
          const h = (plotH * bar.value) / MAX;
          const y = padTop + plotH - h;
          return (
            <g key={bar.label}>
              <rect
                x={cx - barW / 2}
                y={y}
                width={barW}
                height={h}
                rx={6}
                fill={bar.color}
              />
              <text
                x={cx}
                y={height - 10}
                textAnchor="middle"
                fontSize="11"
                fill="rgba(0,0,0,0.6)"
              >
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
