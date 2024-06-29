import { SVGProps } from "react";

export const DoubleChevronLeft: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1.5em"
    width="1.5em"
    {...props}
  >
    <path d="M12.707 7.707l-1.414-1.414L5.586 12l5.707 5.707 1.414-1.414L8.414 12z" />
    <path d="M16.293 6.293L10.586 12l5.707 5.707 1.414-1.414L13.414 12l4.293-4.293z" />
  </svg>
);
