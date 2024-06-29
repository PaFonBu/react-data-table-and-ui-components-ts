import { DefaultComponentProps } from "../../ts/interfaces/global.interface";

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  size,
  disabled,
  outline,
  ...props
}) => {
  if (disabled)
    return (
      <button
        className={`
          px-4
          rounded-lg
          font-bold
          ${!outline ? "bg-gray-400" : "border-2 border-gray-400"}
          text-gray-600 text-${size ?? "md"}
          ${size === "sm" ? "h-8" : size === "lg" ? "h-12" : "h-10"}
        ${className ?? ""}
      `}
        disabled
        {...props}
      >
        {children}
      </button>
    );

  let variantClassName: string;

  switch (variant) {
    case "primary":
      variantClassName = outline
        ? "border-2 border-red-200 text-red-200"
        : "bg-red-400 text-slate-200";
      break;
    case "secondary":
      variantClassName = outline
        ? "border-2 border-slate-200 text-slate-200"
        : "bg-slate-200 text-slate-700";
      break;
    case "tertiary":
      variantClassName = outline
        ? "border-2 border-slate-800 text-slate-800"
        : "bg-slate-700 text-slate-200";
      break;
    case "success":
      variantClassName = outline
        ? "border-2 border-teal-200 text-teal-200"
        : "bg-teal-400 text-slate-700";
      break;
    case "info":
      variantClassName = outline
        ? "border-2 border-cyan-200 text-cyan-200"
        : "bg-cyan-400 text-slate-700";
      break;
    case "warning":
      variantClassName = outline
        ? "border-2 border-amber-200 text-amber-200"
        : "bg-amber-400 text-slate-700";
      break;
    case "danger":
      variantClassName = outline
        ? "border-2 border-red-200 text-red-200"
        : "bg-red-400 text-slate-700";
      break;
    default:
      variantClassName = outline
        ? "border-2 border-red-200 text-red-200"
        : "bg-red-400 text-slate-200";
      break;
  }

  return (
    <button
      className={`
        px-4 rounded-lg font-bold
        ${variantClassName}
        hover:brightness-125
        active:brightness-75
        text-${size ?? "md"}
        ${size === "sm" ? "h-8" : size === "lg" ? "h-[52px]" : "h-10"}
        ${className ?? ""}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

interface ButtonProps
  extends DefaultComponentProps,
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "info"
    | "warning"
    | "danger";
  size?: "lg" | "md" | "sm";
  disabled?: boolean;
  outline?: boolean;
}
