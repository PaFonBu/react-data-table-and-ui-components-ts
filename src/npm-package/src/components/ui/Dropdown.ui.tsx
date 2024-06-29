import { useEffect, useRef, useState } from "react";
import { Button } from "./Button.ui";

export const Dropdown: React.FC<DropdownProps> = ({
  buttonContent,
  buttonSize = "md",
  options,
  defaultSelectedOption,
  styles,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<number>(
    defaultSelectedOption ?? 0
  );

  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  useEffect(() => {
    // Invoke Function onClick outside of element
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className={`relative ${styles?.container ?? ""}`}>
      <Button
        className={`block ${styles?.button ?? ""}`}
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        size={buttonSize}
      >
        {buttonContent}
      </Button>
      {isDropdownVisible && (
        <ul
          className={`
          absolute
          p-1
          z-20
          right-0
          ${
            buttonSize === "sm"
              ? "top-[2.1rem]"
              : buttonSize === "md"
              ? "top-[2.6rem]"
              : "top-[3.1rem]"
          }
          rounded-lg
          shadow
          bg-red-400
          ${styles?.dropdown ?? ""}`}
        >
          {options.map(({ label, onClick }, index) => (
            <li
              key={index}
              className={`
                px-2
                cursor-pointer
                ${selectedOption === index ? "bg-red-500" : "bg-red-400"}
                hover:bg-red-500
                rounded-lg
                whitespace-nowrap
                ${styles?.option ?? ""}`}
              onClick={() => {
                onClick();
                setSelectedOption(index);
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface DropdownProps {
  buttonContent: JSX.Element;
  buttonSize?: "sm" | "md" | "lg";
  options: { label: string; onClick: () => void }[];
  defaultSelectedOption?: number;
  styles?: {
    container?: string;
    button?: string;
    dropdown?: string;
    option?: string;
  };
}
