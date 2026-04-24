import type {
  ChangeEventHandler,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";

export type InputLayout =
  | "1-row"
  | "2-row-vertical"
  | "2-row-horizontal"
  | "textarea";

export type InputSize = "sm" | "lg";

export type InputState = "default" | "hover" | "focus";

type FormControlProps = {
  /** HTML input type. When any form prop is provided, Input renders a real <input>. */
  type?: HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  maxLength?: number;
  required?: boolean;
  id?: string;
  "aria-label"?: string;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export type InputProps = FormControlProps & {
  /** Visual layout for the design-showcase (no-form) mode. */
  layout?: InputLayout;
  /** Size variant. `sm` = 44px (default, matches /design showcase). `lg` = 56px (auth forms). */
  size?: InputSize;
  state?: InputState;
  /** Label shown in 2-row showcase layouts. Ignored in form-control mode. */
  title?: ReactNode;
  /** Text rendered inside the field (showcase mode). Ignored in form-control mode. */
  children?: ReactNode;
  /** Character-count suffix for textarea (showcase mode). */
  counter?: ReactNode;
  className?: string;
};

const TEXT_STYLE = { fontFeatureSettings: "'ss01' 1, 'cv01' 1" as const };

function borderClass(state: InputState) {
  if (state === "default") return "border-black/20";
  return "border-black/40";
}

function ResizeCorner() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M12 6 V12 H6"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9 L9 12"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Input — the text-entry primitive for both design showcase and real forms.
 *
 * Showcase mode (no form props) renders a static visual scaffold — four
 * layouts × three states. Use `layout`, `state`, `title`, `children` (value),
 * `counter` (textarea).
 *
 * Form-control mode — triggered when ANY of `placeholder`, `name`, `value`,
 * `defaultValue`, or `onChange` is set — renders a real <input> element.
 * Two sizes: `sm` (44px, default) and `lg` (56px, 18/28 typography — matches
 * the Figma auth forms).
 *
 * @example
 *   // Showcase
 *   <Input>Jane</Input>
 *   <Input layout="2-row-vertical" title="Email">jane@example.com</Input>
 *
 * @example
 *   // Form
 *   <Input size="lg" type="email" name="email" placeholder="Email" />
 */
export function Input({
  layout = "2-row-vertical",
  size = "sm",
  state = "default",
  title = "Title",
  children = "Text",
  counter = "0/200",
  className,
  type,
  name,
  placeholder,
  autoComplete,
  inputMode,
  pattern,
  maxLength,
  required,
  id,
  "aria-label": ariaLabel,
  defaultValue,
  value,
  onChange,
}: InputProps) {
  const isFormControl =
    placeholder !== undefined ||
    name !== undefined ||
    value !== undefined ||
    defaultValue !== undefined ||
    onChange !== undefined;

  if (isFormControl) {
    const heightClass = size === "lg" ? "h-14" : "h-11";
    const padClass = size === "lg" ? "px-5 py-4" : "px-4 py-3";
    const typoClass =
      size === "lg"
        ? "text-[18px] leading-[28px]"
        : "text-[14px] leading-[20px]";
    const placeholderClass =
      size === "lg" ? "placeholder:text-black/20" : "placeholder:text-black/40";

    return (
      <div
        className={`relative flex w-full items-center overflow-hidden rounded-[16px] border-[0.5px] border-black/20 bg-white/80 ${padClass} ${heightClass} focus-within:border-black/40 ${className ?? ""}`}
      >
        <input
          type={type ?? "text"}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          pattern={pattern}
          maxLength={maxLength}
          required={required}
          id={id}
          aria-label={ariaLabel}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          className={`min-w-0 flex-1 bg-transparent ${typoClass} text-black outline-none ${placeholderClass}`}
          style={TEXT_STYLE}
        />
      </div>
    );
  }

  const border = borderClass(state);
  const focusShadow =
    state === "focus" ? "shadow-[0_0_0_4px_rgba(0,0,0,0.04)]" : "";

  const base = `relative inline-flex w-[120px] overflow-clip rounded-[16px] border-[0.5px] border-solid bg-white/80 px-[16px] py-[12px] ${border} ${focusShadow} ${className ?? ""}`;

  const titleEl = (
    <span
      className="text-[12px] leading-[16px] font-normal whitespace-nowrap text-black/40"
      style={TEXT_STYLE}
    >
      {title}
    </span>
  );

  const valueEl = (
    <span
      className="text-[14px] leading-[20px] font-normal text-black"
      style={TEXT_STYLE}
    >
      {children}
    </span>
  );

  if (layout === "2-row-vertical") {
    return (
      <div className={`${base} flex-col items-start justify-center gap-[4px]`}>
        <span className="w-full">{titleEl}</span>
        <span className="w-full">{valueEl}</span>
      </div>
    );
  }

  if (layout === "2-row-horizontal") {
    return (
      <div className={`${base} items-center gap-[8px]`}>
        <span className="shrink-0">{titleEl}</span>
        <span className="min-w-px flex-1 text-right">
          <span
            className="text-[14px] leading-[20px] font-normal text-black"
            style={TEXT_STYLE}
          >
            {children}
          </span>
        </span>
      </div>
    );
  }

  if (layout === "1-row") {
    return (
      <div className={`${base} flex-col items-start justify-center`}>
        <span className="w-full">{valueEl}</span>
      </div>
    );
  }

  // textarea
  return (
    <div className={`${base} flex-col items-start`}>
      <span className="w-full">{valueEl}</span>
      <span className="absolute right-[-0.5px] bottom-[3.5px] inline-flex items-center gap-[8px] pr-[0.5px]">
        <span
          className="text-right text-[12px] leading-[16px] font-normal whitespace-nowrap text-black/20"
          style={TEXT_STYLE}
        >
          {counter}
        </span>
        <ResizeCorner />
      </span>
    </div>
  );
}
