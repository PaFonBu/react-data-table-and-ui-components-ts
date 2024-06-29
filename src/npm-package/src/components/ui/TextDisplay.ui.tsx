export const TextDisplay: React.FC<TextDisplayProps> = ({
  label,
  value,
  containerClassName,
  textClassName,
  labelClassName,
}) => (
  <div
    className={`
      relative ${label ? "h-[52px]" : "h-10"} ${containerClassName ?? ""}`}
  >
    <div
      className={`
        block
        rounded-lg
        px-2.5 pb-1.5 ${label ? "pt-5" : "pt-2"}
        w-full
        text-md text-slate-200
        bg-inherit
        border-b-2 border-slate-400
        ${textClassName ?? ""}`}
    >
      {value}
    </div>
    {!!label && (
      <div
        className={`
          absolute
          text-md text-slate-400
          scale-75
          cursor-text
          pt-1
          z-10 origin-[0] start-2.5 top-[27%]
          -translate-y-4
          pointer-events-none
          select-none
          font-bold
          ${labelClassName ?? ""}`}
      >
        {label}
      </div>
    )}
  </div>
);

interface TextDisplayProps {
  label?: string;
  value?: string | number | null;
  containerClassName?: string;
  textClassName?: string;
  labelClassName?: string;
}
