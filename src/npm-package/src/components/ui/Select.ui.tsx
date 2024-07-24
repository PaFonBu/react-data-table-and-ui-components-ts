import styled from "styled-components";
import { CaretDown } from "./icons/CaretDown.icon";
import { colors } from "../../colors";

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  styles,
  ...props
}) => (
  <StyledContainer
    className={`${label ? "label " : ""} ${styles?.container ?? ""}`}
  >
    <StyledSelect
      className={`${label ? "label " : ""} ${styles?.select ?? ""}`}
      {...props}
    >
      {options.map((option, index) => (
        <StyledOption
          className={`${styles?.option ?? ""}`}
          key={index}
          value={option.value}
        >
          {option.label}
        </StyledOption>
      ))}
    </StyledSelect>
    {label && (
      <StyledLabel className={`${styles?.label ?? ""}`}>{label}</StyledLabel>
    )}
    <StyledIcon className={`${label ? "label " : ""}${styles?.icon ?? ""}`} />
  </StyledContainer>
);

const StyledContainer = styled.div`
  position: relative;
  height: 2.5rem;
  background-color: inherit;
  &.label {
    height: 3.25rem;
  }
`;

const StyledLabel = styled.label`
  box-sizing: border-box;
  position: absolute;
  color: var(--gray-color, ${colors.gray});
  padding-top: 0;
  font-size: 1rem;
  line-height: 1.5rem;

  z-index: 10;

  transition-duration: 300ms;
  transform: translate(0, 0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);

  top: 27% !important;

  inset: 0px;
  inset-inline-start: 0.625rem;
  transform-origin: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  pointer-events: none;
  cursor: text;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
`;

const StyledIcon = styled(CaretDown)`
  box-sizing: border-box;
  position: absolute;
  fill: var(--gray-color, ${colors.gray});
  cursor: text;
  pointer-events: none;
  user-select: none;
  z-index: 10;
  top: 9px;
  inset-inline-end: 0.625rem;
  &.label {
    top: 21px;
  }
`;

const StyledOption = styled.option`
  box-sizing: border-box;
  color: var(--text-color, ${colors.text});
  background-color: var(--background-color, ${colors.background});
`;

const StyledSelect = styled.select`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--background-color, inherit);
  padding-top: 0.5rem;
  padding-inline-start: 0.625rem;
  padding-inline-end: 2.5rem;
  padding-bottom: 0.375rem;
  border-radius: 0.5rem;
  color: var(--text-color, ${colors.text});
  font-size: 1rem;
  line-height: 1.5rem;
  border: 0px solid var(--secondary-color, ${colors.secondary});
  border-bottom-width: 2px;
  appearance: none;
  cursor: pointer;
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 0 rgb(59 130 246 / 0.5);
    border-color: var(--primary-color, ${colors.primary});
  }
  &:disabled {
    color: var(--disabled-color, ${colors.disabled});
    border-color: var(--disabled-color, ${colors.disabled});
  }
  &.label {
    padding-top: 1.45rem;
    padding-bottom: 0.175rem;
  }
  &:focus ~ ${StyledLabel} {
    transform: translate(0, -1rem) rotate(0) skewX(0) skewY(0) scaleX(0.85)
      scaleY(0.85);

    padding-top: 0.2rem;
    top: 27% !important;
  }
  &:focus ~ ${StyledIcon} {
    fill: var(--primary-color, ${colors.primary});
  }
  &:disabled ~ ${StyledLabel} {
    color: var(--disabled-color, ${colors.disabled});
  }
  &:disabled ~ ${StyledIcon} {
    color: var(--disabled-color, ${colors.disabled});
  }
  &:not(:placeholder-shown) ~ ${StyledLabel} {
    transform: translate(0, -1rem) rotate(0) skewX(0) skewY(0) scaleX(0.85)
      scaleY(0.85);

    padding-top: 0.2rem;
    top: 27% !important;
  }
`;

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: { value: string | number; label: string }[];
  label?: string;
  styles?: SelectStyles;
}

export interface SelectStyles {
  container?: string;
  select?: string;
  label?: string;
  option?: string;
  icon?: string;
}
