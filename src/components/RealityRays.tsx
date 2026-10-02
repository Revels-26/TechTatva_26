interface Ray {
  color: string;
  rotate: number;
  originX: string;
  originY: string;
}

const RAYS: Ray[] = [
  { color: "#6ff4fa", rotate: 22.62, originX: "0%", originY: "0%" },
  { color: "#ffaa06", rotate: 157.38, originX: "100%", originY: "0%" },
  { color: "#5e17eb", rotate: -47.29, originX: "0%", originY: "100%" },
  { color: "#00bf63", rotate: -132.71, originX: "100%", originY: "100%" },
];

const RealityRays = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {RAYS.map((ray, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 h-[4px] w-[160%] opacity-70"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${ray.color} 42%, ${ray.color} 90%, transparent 100%)`,
            transform: `translate(-50%, -50%) rotate(${ray.rotate}deg)`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
      {RAYS.map((ray, i) => (
        <div
          key={`glow-${i}`}
          className="absolute left-1/2 top-1/2 h-[90px] w-[160%] opacity-30 blur-2xl"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${ray.color} 42%, ${ray.color} 90%, transparent 100%)`,
            transform: `translate(-50%, -50%) rotate(${ray.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default RealityRays;
