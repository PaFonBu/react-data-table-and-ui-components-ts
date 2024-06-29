import styled from "styled-components";
import { Spinner as SpinnerIcon } from "./icons/Spinner.icon";

export const Spinner: React.FC<SpinnerProps> = ({
  height = "3em",
  width = "3em",
  Icon = SpinnerIcon,
}) => (
  <StyledSpinner>
    <Icon className="spin" height={height} width={width} />
  </StyledSpinner>
);

const StyledSpinner = styled.div`
  .spin {
    animation: spin 1s linear infinite;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

interface SpinnerProps {
  height?: string;
  width?: string;
  Icon?: React.FC;
}
