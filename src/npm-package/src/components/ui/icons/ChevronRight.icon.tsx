import { SVGProps } from "react";

export const ChevronRight: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1.5em"
    width="1.5em"
    {...props}
  >
    <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
  </svg>
);
