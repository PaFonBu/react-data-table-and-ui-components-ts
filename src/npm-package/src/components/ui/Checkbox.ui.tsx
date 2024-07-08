import styled from "styled-components";

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  styles,
  type,
  ...props
}) => {
  return (
    <StyledContainer className={`${styles?.container ?? ""}`}>
      {label}
      <StyledCheckbox
        className={`${styles?.checkbox ?? ""}`}
        type={type ?? "checkbox"}
        {...props}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.label`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledCheckbox = styled.input`
  clip-path: circle(46% at 50% 50%);
  flex-shrink: 0;
  height: 2rem;
  width: 2rem;
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
  type?: "checkbox" | "radio";
}
