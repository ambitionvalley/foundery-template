// Marketing & SEO — 892x280 block. 12 columns, each rendered as 8
// stacked 21px segments of the same colour separated by 1px gaps —
// Figma's distinctive "barcode" chart style. Colours cycle through the
// Foundry secondary palette every 6 bars.
const PALETTE = [
  "#A0BCE8", // pale blue
  "#6BE6D3", // mint
  "#000000", // black
  "#7DBBFF", // blue
  "#B899EB", // purple
  "#71DD8C", // green
] as const;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

const SEGMENTS = 8;
// Values (in thousands) per month; drives the tooltip and the gap at
// the top of the column. Column 4 is intentionally shorter per the
// Figma. Fork-owners replace with real telemetry.
const VALUES: number[] = [24, 22, 26, 18, 22, 24, 22, 24, 26, 24, 22, 20];
const MAX = 30;

export function MarketingAndSeo() {
  return (
    <div
      className="flex flex-col gap-4 rounded-[20px] bg-[#f9f9fa] p-6"
      style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
    >
      <h2 className="text-[14px] leading-[20px] font-semibold text-black">
        Marketing &amp; SEO
      </h2>
      <div className="flex gap-4">
        <div className="flex w-6 shrink-0 flex-col justify-between pt-4 pb-7 text-[12px] leading-[16px] text-black/40">
          <span>30K</span>
          <span>20K</span>
          <span>10K</span>
          <span>0</span>
        </div>
        <div className="relative flex flex-1 flex-col">
          <div
            aria-hidden
            className="absolute inset-x-0 top-4 bottom-7 flex flex-col justify-between"
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-px w-full bg-black"
                style={{ opacity: i === 3 ? 0.1 : 0.04 }}
              />
            ))}
          </div>
          <ul className="relative flex flex-1 items-end justify-between gap-2 pb-7">
            {VALUES.map((value, i) => {
              const color = PALETTE[i % PALETTE.length];
              const barH = (value / MAX) * 168;
              return (
                <li
                  key={MONTHS[i]}
                  className="flex flex-1 flex-col items-center justify-end gap-1"
                >
                  <span className="flex h-4 items-center justify-center rounded-[12px] bg-black/80 px-1 text-[12px] leading-[16px] font-medium text-white">
                    {value}K
                  </span>
                  <div
                    className="flex w-7 flex-col-reverse gap-px overflow-hidden rounded-[4px]"
                    style={{ height: barH }}
                    aria-label={`${MONTHS[i]}: ${value}K`}
                  >
                    {Array.from({ length: SEGMENTS }).map((_, s) => (
                      <span
                        key={s}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 flex text-[12px] leading-[16px] text-black/40"
          >
            {MONTHS.map((m) => (
              <span key={m} className="flex-1 text-center">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
