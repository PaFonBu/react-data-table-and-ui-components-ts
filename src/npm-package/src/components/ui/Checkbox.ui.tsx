import styled from "styled-components";
import { InputProps } from "./Input.ui";

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  containerClassName,
  type,
  ...props
}) => {
  return (
    <div className={`flex gap-2 items-center ${containerClassName ?? ""}`}>
      {label}
      <StyledCheckbox
        className={`shrink-0 h-8 w-8  ${className ?? ""}`}
        type={type ?? "checkbox"}
        {...props}
      />
    </div>
  );
};

const StyledCheckbox = styled.input`
  clip-path: circle(46% at 50% 50%);
`;

interface CheckboxProps extends InputProps {
  label?: string;
  containerClassName?: string;
  type?: "checkbox" | "radial";
}
