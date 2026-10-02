import type { CSSProperties } from "react";

interface SparkleProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const Sparkle = ({ size = 18, color = "#6ff4fa", className = "", style }: SparkleProps) => {
  const id = `sparkle-glow-${color.replace("#", "")}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g filter={`url(#${id})`}>
        <path
          d="M40 16L42.7153 37.2847L64 40L42.7153 42.7153L40 64L37.2847 42.7153L16 40L37.2847 37.2847L40 16Z"
          fill={color}
        />
      </g>
      <defs>
        <filter
          id={id}
          x="0"
          y="0"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur stdDeviation="8" />
          <feBlend mode="normal" in="SourceGraphic" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default Sparkle;
