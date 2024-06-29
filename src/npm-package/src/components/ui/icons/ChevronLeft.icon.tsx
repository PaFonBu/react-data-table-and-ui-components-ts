import { SVGProps } from "react";

export const ChevronLeft: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1.5em"
    width="1.5em"
    {...props}
  >
    <path d="M13.293 6.293L7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
  </svg>
);
