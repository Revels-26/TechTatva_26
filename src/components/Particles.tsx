import { useState } from "react";

interface ParticlesProps {
  count?: number;
  className?: string;
}

const Particles = ({ count = 50, className = "" }: ParticlesProps) => {
  // Lazy initializer: runs once per mount, not on every render.
  const [dots] = useState(() =>
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      opacity: Math.random() * 0.6 + 0.3,
    }))
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#f0f7ff]"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
