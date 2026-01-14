import * as React from "react";
import type { SVGProps } from "react";
const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 21 20"
    {...props}
  >
    <path
      fill="#F50000"
      fillRule="evenodd"
      d="M8.524 3.66c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.333-.213 2.98-1.742 2.98H4.688c-1.53 0-2.494-1.647-1.744-2.98l5.58-9.92Zm2.743 9.9a1 1 0 1 1-1.999 0 1 1 0 0 1 2 0Zm-1-8a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgWarning;
