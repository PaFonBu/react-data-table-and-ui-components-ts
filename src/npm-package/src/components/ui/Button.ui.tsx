import styled from "styled-components";
import { DefaultComponentProps } from "../../ts/interfaces/global.interface";
import { colors } from "../../colors";

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  size,
  disabled,
  outline,
  ...props
}) => (
  <StyledButton
    className={`
        ${variant ? `${variant} ` : "primary "}
        ${outline ? "outline " : ""}
        ${size ? `${size} ` : "md "}
        ${disabled ? "disabled " : ""}
        ${className ?? ""}
      `}
    disabled={disabled}
    {...props}
  >
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 0.5rem;
  font-weight: 700;
  &:hover {
    ${(props) => (props.disabled ? "" : "filter: brightness(1.25);")}
  }
  &:active {
    ${(props) => (props.disabled ? "" : "filter: brightness(0.25);")}
  }
  &.sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
    height: 2rem;
  }
  &.md {
    font-size: 1rem;
    line-height: 1.5rem;
    height: 2.5rem;
  }
  &.lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
    height: 52px;
  }
  &.primary {
    background-color: var(--primary-color, ${colors.primary});
    color: var(--text-color, ${colors.text});
    border: solid 2px var(--primary-color, ${colors.primary});
  }
  &.primary.outline {
    background-color: inherit;
    color: var(--primary-light-color, ${colors.primaryLight});
    border: solid 2px var(--primary-light-color, ${colors.primaryLight});
  }
  &.secondary {
    background-color: var(--secondary-color, ${colors.secondary});
    color: var(--text-dark-color, ${colors.textDark});
    border: solid 2px var(--secondary-color, ${colors.secondary});
  }
  &.secondary.outline {
    background-color: inherit;
    color: var(--secondary-light-color, ${colors.secondaryLight});
    border: solid 2px var(--secondary-light-color, ${colors.secondaryLight});
  }
  &.tertiary {
    background-color: var(--tertiary-color, ${colors.tertiary});
    color: var(--text-color, ${colors.text});
    border: solid 2px var(--tertiary-color, ${colors.tertiary});
  }
  &.tertiary.outline {
    background-color: inherit;
    color: var(--tertiary-light-color, ${colors.tertiaryLight});
    border: solid 2px var(--tertiary-light-color, ${colors.tertiaryLight});
  }
  &.success {
    background-color: var(--success-color, ${colors.success});
    color: var(--text-dark-color, ${colors.textDark});
    border: solid 2px var(--success-color, ${colors.success});
  }
  &.success.outline {
    background-color: inherit;
    color: var(--success-light-color, ${colors.successLight});
    border: solid 2px var(--success-light-color, ${colors.successLight});
  }
  &.info {
    background-color: var(--info-color, ${colors.info});
    color: var(--text-dark-color, ${colors.textDark});
    border: solid 2px var(--info-color, ${colors.info});
  }
  &.info.outline {
    background-color: inherit;
    color: var(--info-light-color, ${colors.infoLight});
    border: solid 2px var(--info-light-color, ${colors.infoLight});
  }
  &.warning {
    background-color: var(--warning-color, ${colors.warning});
    color: var(--text-dark-color, ${colors.textDark});
    border: solid 2px var(--warning-color, ${colors.warning});
  }
  &.warning.outline {
    background-color: inherit;
    color: var(--warning-color, ${colors.warning});
    border: solid 2px var(--warning-light-color, ${colors.warningLight});
  }
  &.danger {
    background-color: var(--danger-color, ${colors.danger});
    color: var(--text-dark-color, ${colors.textDark});
    border: solid 2px var(--danger-color, ${colors.danger});
  }
  &.danger.outline {
    background-color: inherit;
    color: var(--danger-light-color, ${colors.dangerLight});
    border: solid 2px var(--danger-light-color, ${colors.dangerLight});
  }
  &.disabled {
    background-color: var(--gray-color, ${colors.gray});
    color: var(--text-color, ${colors.text});
    border: solid 2px var(--danger-gray, ${colors.gray});
  }
  &.disabled.outline {
    background-color: inherit;
    color: var(--gray-color, ${colors.gray});
    border: solid 2px var(--gray-color, ${colors.gray});
  }
`;

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
