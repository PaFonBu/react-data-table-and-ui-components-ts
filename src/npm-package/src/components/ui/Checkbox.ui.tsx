import styled from "styled-components";
import { colors } from "../../colors";

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  styles,
  ...props
}) => (
  <StyledContainer
    className={`${props.disabled ? "disabled " : ""}${styles?.container ?? ""}`}
  >
    {label}
    <StyledInput
      className={`${styles?.checkbox ?? ""}`}
      {...props}
      type="checkbox"
    />
    <StyledCheck viewBox="0 0 16 16">
      <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
    </StyledCheck>
  </StyledContainer>
);

const StyledContainer = styled.label`
  position: relative;
  display: inline-block;
  width: fit-content;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  color: var(--text-color, ${colors.text});
  &.disabled {
    color: var(--disabled-color, ${colors.disabled});
  }
`;

const StyledCheck = styled.svg`
  position: absolute;
  width: 2rem;
  height: 2rem;
  border: solid 2px var(--secondary-color, ${colors.secondary});
  background: var(--background-color, inherit);
  top: 0;
  inset-inline-end: 0px;
  border-radius: 0.5rem;
  fill: transparent;
  user-select: none;
`;

const StyledInput = styled.input`
  clip-path: circle(46% at 50% 50%);
  flex-shrink: 0;
  height: 2rem;
  width: 2rem;
  margin: 2px;
  opacity: 0;
  z-index: -1;
  &:checked ~ ${StyledCheck} {
    background: var(--primary-color, ${colors.primary});
    fill: var(--text-color, ${colors.text});
    border: solid 2px var(--primary-color, ${colors.primary});
  }
  &:disabled ~ ${StyledCheck} {
    pointer-events: none;
    opacity: 0.6;
  }
  &:hover&:not(:disabled) ~ ${StyledCheck} {
    filter: brightness(1.25);
  }
`;

interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  styles?: {
    container?: string;
    checkbox?: string;
  };
}
