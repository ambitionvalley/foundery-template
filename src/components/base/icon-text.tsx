import type { ReactNode } from "react";

export type IconTextProps = {
  /** The icon slot — typically an Icon primitive or SVG. */
  icon?: ReactNode;
  /** Text label. Kept flexible (string or ReactNode) so chips with badges still work. */
  children?: ReactNode;
  /** Stack children vertically instead of inline. */
  vertical?: boolean;
  /** Place icon after the text (right / bottom depending on orientation). */
  flip?: boolean;
  className?: string;
};

/**
 * IconText — composition primitive pairing an icon slot with a text label.
 * Shares 14/20 Inter Regular typography and the design-system 8px gap.
 *
 * @example
 *   <IconText icon={<Icon size={16} />}>Starred</IconText>
 *   <IconText icon={<Icon size={16} />} flip>Open</IconText>
 *   <IconText icon={<Icon size={16} />} vertical>Save</IconText>
 */
export function IconText({
  icon,
  children,
  vertical = false,
  flip = false,
  className,
}: IconTextProps) {
  const layout = vertical
    ? "flex-col items-start justify-center"
    : "flex-wrap content-center items-center";

  return (
    <div
      className={`flex gap-[8px] rounded-[12px] ${layout} ${className ?? ""}`}
    >
      {!flip && icon && (
        <span className="inline-flex shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      {children !== undefined && children !== null && children !== false && (
        <span
          className="flex flex-col items-start justify-center rounded-[12px] text-[14px] leading-[20px] font-normal text-black"
          style={{ fontFeatureSettings: "'ss01' 1, 'cv01' 1" }}
        >
          {children}
        </span>
      )}
      {flip && icon && (
        <span className="inline-flex shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
    </div>
  );
}
