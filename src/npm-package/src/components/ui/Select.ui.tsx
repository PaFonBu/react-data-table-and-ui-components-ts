import { CaretDown } from "./icons/CaretDown.icon";

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  styles,
  ...props
}) => (
  <div
    className={`
      relative ${label ? "h-[52px]" : "h-10"} ${styles?.container ?? ""}`}
  >
    <select
      className={`
          block
          rounded-lg
          ps-2.5 pe-10 pb-1.5 ${label ? "pt-5" : "pt-2"}
          w-full
          text-md text-slate-200 disabled:text-slate-300
          bg-inherit
          border-0 border-b-2 border-slate-200 focus:border-red-400
          disabled:border-slate-400
          appearance-none
          focus:outline-none focus:ring-0
          peer
          ${styles?.select ?? ""}`}
      {...props}
    >
      {options.map((option, index) => (
        <option
          className={`
            text-slate-200
            bg-slate-700
            ${styles?.option ?? ""}`}
          key={index}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
    {label && (
      <label
        className={`
          absolute
          text-md text-slate-400 peer-disabled:text-slate-500
          scale-75
          cursor-text
          pt-1
          z-10 origin-[0] start-2.5 top-[27%]
          -translate-y-4
          pointer-events-none
          select-none
          font-bold
          ${styles?.label ?? ""}`}
      >
        {label}
      </label>
    )}
    <CaretDown
      className={`
        absolute
        !fill-slate-400 peer-disabled:!fill-slate-500
        cursor-text
        z-10 ${label ? "top-[21px]" : "top-[9px]"} end-2.5
        pointer-events-none
        peer-focus:!fill-red-400
        select-none`}
    />
  </div>
);

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: { value: string | number; label: string }[];
  label?: string;
  styles?: {
    container?: string;
    select?: string;
    label?: string;
    option?: string;
  };
}
