export type MaskProps = {
  /** Size in pixels (square). */
  size?: number;
  className?: string;
};

/**
 * Mask — a soft pastel gradient block used as a placeholder, avatar stand-in,
 * or decorative surface. Uses the SnowUI spec: rounded-16 with a lilac →
 * periwinkle vertical gradient (20% → 50% opacity).
 *
 * @example
 *   <Mask />
 *   <Mask size={120} />
 */
export function Mask({ size = 80, className }: MaskProps) {
  return (
    <div
      aria-hidden
      className={`rounded-[16px] bg-gradient-to-b from-[rgba(215,208,255,0.2)] to-[rgba(203,221,255,0.5)] ${className ?? ""}`}
      style={{ width: size, height: size }}
    />
  );
}
