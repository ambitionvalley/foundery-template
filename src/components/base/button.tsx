import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant = "filled" | "outline" | "gray" | "borderless";

export type ButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children"
> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  /** Override the size-default border radius. Use when matching designs that specify a specific rounding. */
  radius?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
};

type SizeSpec = {
  minSide: number;
  padX: number;
  padY: number;
  radius: number;
  gap: number;
  textPx: number;
  textLh: number;
  iconPx: number;
};

const SIZE_SPEC: Record<ButtonSize, SizeSpec> = {
  small: { minSide: 24, padX: 12, padY: 4, radius: 12, gap: 4, textPx: 12, textLh: 16, iconPx: 12 },
  medium: { minSide: 36, padX: 16, padY: 8, radius: 16, gap: 8, textPx: 14, textLh: 20, iconPx: 16 },
  large: { minSide: 48, padX: 20, padY: 12, radius: 20, gap: 8, textPx: 16, textLh: 24, iconPx: 20 },
};

function variantClasses(
  variant: ButtonVariant,
  disabled: boolean,
): string {
  if (disabled) {
    // All disabled buttons collapse to the same muted gray frame;
    // the inner content renders at opacity 10%.
    return "bg-black/[0.04] text-black cursor-not-allowed";
  }
  switch (variant) {
    case "filled":
      return "bg-black text-white hover:bg-[#333] active:bg-[#1a1a1a]";
    case "outline":
      return "border-[0.5px] border-black/10 bg-transparent text-black hover:bg-black/[0.04] active:bg-black/[0.08]";
    case "gray":
      return "bg-black/[0.04] text-black hover:bg-black/[0.08] active:bg-black/[0.12]";
    case "borderless":
      return "bg-transparent text-black hover:bg-black/[0.04] active:bg-black/[0.08]";
  }
}

/**
 * Button — primary interaction primitive.
 *
 * @example
 *   <Button>Save</Button>
 *   <Button variant="outline" leftIcon={<Icon />}>Edit</Button>
 *   <Button size="small" variant="gray" leftIcon={<Icon />} aria-label="More" />
 */
export function Button({
  size = "medium",
  variant = "filled",
  radius,
  leftIcon,
  rightIcon,
  children,
  className,
  type = "button",
  disabled = false,
  style,
  ...rest
}: ButtonProps) {
  const spec = SIZE_SPEC[size];
  const hasText = children !== undefined && children !== null && children !== false && children !== "";

  const baseClasses =
    "inline-flex shrink-0 items-center justify-center font-normal transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#adadfb] focus-visible:ring-offset-2";

  const wrapperStyle: CSSProperties = {
    minHeight: spec.minSide,
    minWidth: spec.minSide,
    paddingInline: spec.padX,
    paddingBlock: spec.padY,
    borderRadius: radius ?? spec.radius,
    gap: spec.gap,
    fontSize: spec.textPx,
    lineHeight: `${spec.textLh}px`,
    fontFeatureSettings: "'ss01' 1, 'cv01' 1",
    ...style,
  };

  const slotStyle: CSSProperties = { width: spec.iconPx, height: spec.iconPx };
  const contentOpacity = disabled ? "opacity-10" : "";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses(variant, disabled)} ${className ?? ""}`}
      style={wrapperStyle}
      {...rest}
    >
      {leftIcon && (
        <span
          aria-hidden
          className={`inline-flex shrink-0 items-center justify-center ${contentOpacity}`}
          style={slotStyle}
        >
          {leftIcon}
        </span>
      )}
      {hasText && (
        <span
          className={`inline-flex items-center justify-center whitespace-nowrap ${contentOpacity}`}
        >
          {children}
        </span>
      )}
      {rightIcon && (
        <span
          aria-hidden
          className={`inline-flex shrink-0 items-center justify-center ${contentOpacity}`}
          style={slotStyle}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
}
