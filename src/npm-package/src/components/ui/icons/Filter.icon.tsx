import { SVGProps } from "react";

export const Filter: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    fill="currentColor"
    viewBox="0 0 16 16"
    height="1.5em"
    width="1.5em"
    {...props}
  >
    <path d="M6 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" />
  </svg>
);
