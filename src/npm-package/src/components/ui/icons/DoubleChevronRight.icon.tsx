import { SVGProps } from "react";

export const DoubleChevronRight: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"height="1.5em" width="1.5em" {...props}
  >
    <path d="M10.296 7.71L14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z" />
    <path d="M6.704 6.29L5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z" />
  </svg>
);
