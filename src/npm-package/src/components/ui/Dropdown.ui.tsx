import { useEffect, useRef, useState } from "react";
import { Button } from "./Button.ui";
import styled from "styled-components";
import { colors } from "../../colors";

export const Dropdown: React.FC<DropdownProps> = ({
  buttonContent,
  buttonSize = "md",
  buttonOutline = false,
  options,
  position = "bottom-right",
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
    <StyledContainer ref={ref} className={`${styles?.container ?? ""}`}>
      <StyledButton
        styles={{ button: styles?.button ?? "" }}
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        size={buttonSize}
        outline={buttonOutline}
      >
        {buttonContent}
      </StyledButton>
      {isDropdownVisible && (
        <StyledList
          className={`${buttonSize} ${position} ${styles?.dropdown ?? ""}`}
        >
          {options.map(({ label, onClick }, index) => (
            <StyledListItem
              key={index}
              className={`
                ${selectedOption === index ? "selected " : ""}
                ${styles?.option ?? ""}
              `}
              onClick={() => {
                onClick();
                setSelectedOption(index);
              }}
            >
              {label}
            </StyledListItem>
          ))}
        </StyledList>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const StyledButton = styled(Button)`
  box-sizing: border-box;
  display: block;
`;

const StyledList = styled.ul`
  box-sizing: border-box;
  position: absolute;
  padding: 0.25rem;
  z-index: 20;
  margin: 0;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  background-color: var(--primary-color, ${colors.primary});
  color: var(--text-color, ${colors.text});
  font-size: 1rem;
  line-height: 1.5rem;
  &.sm.top-right {
    bottom: 2.2rem;
    left: 0;
  }
  &.md.top-right {
    bottom: 2.7rem;
    left: 0;
  }
  &.lg.top-right {
    bottom: 3.5rem;
    left: 0;
  }
  &.sm.bottom-right {
    top: 2.2rem;
    left: 0;
  }
  &.md.bottom-right {
    top: 2.7rem;
    left: 0;
  }
  &.lg.bottom-right {
    top: 3.5rem;
    left: 0;
  }
  &.sm.top-left {
    bottom: 2.2rem;
    right: 0;
  }
  &.md.top-left {
    bottom: 2.7rem;
    right: 0;
  }
  &.lg.top-left {
    bottom: 3.5rem;
    right: 0;
  }
  &.sm.bottom-left {
    top: 2.2rem;
    right: 0;
  }
  &.md.bottom-left {
    top: 2.7rem;
    right: 0;
  }
  &.lg.bottom-left {
    top: 3.5rem;
    right: 0;
  }
`;

const StyledListItem = styled.li`
  box-sizing: border-box;
  display: block;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  cursor: pointer;
  background-color: var(--primary-color, ${colors.primary});
  border-radius: 0.5rem;
  white-space: nowrap;
  &selected {
    background-color: var(--primary-light-color, ${colors.secondary});
    color: var(--primary-color, ${colors.primary});
  }
  &:hover {
    background-color: var(--primary-light-color, ${colors.secondary});
    color: var(--primary-color, ${colors.primary});
  }
`;

interface DropdownProps {
  buttonContent: JSX.Element | string;
  buttonSize?: "sm" | "md" | "lg";
  buttonOutline?: true | false;
  options: { label: string; onClick: () => void }[];
  defaultSelectedOption?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  styles?: DropdownStyles;
}

export interface DropdownStyles {
  container?: string;
  button?: string;
  dropdown?: string;
  option?: string;
}
