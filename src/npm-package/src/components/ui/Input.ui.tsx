import styled from "styled-components";
import { Error as ErrorIcon } from "../../components/ui/icons/Error.icon";
import { colors } from "../../colors";
import { forwardRef } from "react";

export const Input: React.FC<InputProps> = forwardRef(
  ({ error, styles, label, ...props }, ref) => (
    <StyledContainer
      className={`${label ? "label " : ""}${styles?.container ?? ""}`}
    >
      <StyledInput
        ref={ref}
        className={`${label ? "label " : ""}${error ? "error " : ""}${
          styles?.input ?? ""
        }`}
        placeholder=""
        maxLength={999}
        {...props}
      />
      {!!label && (
        <StyledLabel
          className={`${error ? "error " : ""}${styles?.label ?? ""}`}
        >
          {label}
        </StyledLabel>
      )}
      {!!error && <StyledIcon className={`${label ? "label " : ""}`} />}
      {!!error && (
        <StyledError className={`${styles?.error ?? ""}`}>{error}</StyledError>
      )}
    </StyledContainer>
  )
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

  &.error {
    top: 34% !important;
  }
`;

const StyledError = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  padding-right: 0.5rem;
  padding-left: 0.5rem;

  background-color: var(--background-color, inherit);

  bottom: -0.5rem;

  z-index: 10;

  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;

  border-bottom: 2px solid var(--danger-color, ${colors.danger});

  text-align: end;
  font-size: 0.75rem;
  line-height: 1rem;

  color: var(--danger-color, ${colors.danger});

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  pointer-events: none;
`;

const StyledIcon = styled(ErrorIcon)`
  box-sizing: border-box;
  position: absolute;
  color: var(--danger-color, ${colors.danger});

  z-index: 10;

  top: 4px;
  inset-inline-end: 0.625rem;

  cursor: text;
  pointer-events: none;
  user-select: none;

  &.label {
    top: 25%;
  }
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  background-color: var(--background-color, inherit);
  padding-top: 0.5rem;
  padding-inline-start: 0.625rem;
  padding-inline-end: 0.625rem;
  padding-bottom: 0.375rem;
  border-radius: 0.5rem;
  color: var(--text-color, ${colors.text});
  font-size: 1rem;
  line-height: 1.5rem;
  border: 0px solid var(--secondary-color, ${colors.secondary});
  border-bottom-width: 2px;
  appearance: none;
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
    &::placeholder {
      visibility: hidden;
    }
  }
  &.error {
    padding-right: 2.5rem;
    border-bottom-width: 0px;
  }
  &:focus ~ ${StyledLabel} {
    transform: translate(0, -1rem) rotate(0) skewX(0) skewY(0) scaleX(0.85)
      scaleY(0.85);

    padding-top: 0.2rem;
    top: 27% !important;
  }
  &:disabled ~ ${StyledLabel} {
    color: var(--disabled-color, ${colors.disabled});
  }
  &:not(:placeholder-shown) ~ ${StyledLabel} {
    transform: translate(0, -1rem) rotate(0) skewX(0) skewY(0) scaleX(0.85)
      scaleY(0.85);

    padding-top: 0.2rem;
    top: 27% !important;
  }
`;

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string | null;
  label?: string;
  styles?: InputStyles;
}

export interface InputStyles {
  container?: string;
  input?: string;
  error?: string;
  label?: string;
}
