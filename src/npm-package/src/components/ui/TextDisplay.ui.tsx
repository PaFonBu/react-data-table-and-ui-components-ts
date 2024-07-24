import styled from "styled-components";
import { colors } from "../../colors";

export const TextDisplay: React.FC<TextDisplayProps> = ({
  label,
  value,
  styles,
}) => (
  <StyledContainer
    className={`${label ? "label " : ""}${styles?.container ?? ""}`}
  >
    <StyledValue className={`${label ? "label " : ""}${styles?.value ?? ""}`}>
      {value}
    </StyledValue>
    {!!label && (
      <StyledLabel
        className={`
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
      </StyledLabel>
    )}
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

const StyledValue = styled.div`
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
  border: 0px solid var(--gray-color, ${colors.gray});
  border-bottom-width: 2px;
  appearance: none;

  &.label {
    padding-top: 1.45rem;
    padding-bottom: 0.175rem;
  }
`;

const StyledLabel = styled.div`
  box-sizing: border-box;
  position: absolute;
  color: var(--gray-color, ${colors.gray});
  padding-top: 0.2rem;
  font-size: 1rem;
  line-height: 1.5rem;

  z-index: 10;

  transition-duration: 300ms;
  transform: translate(0, -1rem) rotate(0) skewX(0) skewY(0) scaleX(0.85)
    scaleY(0.85);

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

interface TextDisplayProps {
  label?: string;
  value?: string | number | null;
  styles?: TextDisplayStyles;
}

export interface TextDisplayStyles {
  container?: string;
  value?: string;
  label?: string;
}
