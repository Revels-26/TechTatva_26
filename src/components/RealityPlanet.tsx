interface RealityPlanetProps {
  name: string;
  domain: string;
  size: number;
  glow: string;
  baseImage: string;
  accentImage: string;
  gradient: string;
  className?: string;
}

const RealityPlanet = ({
  name,
  domain,
  size,
  glow,
  baseImage,
  accentImage,
  gradient,
  className = "",
}: RealityPlanetProps) => {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className="relative overflow-hidden rounded-full"
        style={{ width: size, height: size, background: gradient, boxShadow: `0 0 16px ${glow}` }}
      >
        <img
          src={baseImage}
          alt=""
          className="absolute inset-[-16%] h-[132%] w-[132%] object-cover opacity-85 mix-blend-screen"
        />
        <img
          src={accentImage}
          alt=""
          className="absolute inset-[16%] h-[68%] w-[68%] object-contain mix-blend-screen"
        />
      </div>
      <div className="flex flex-col items-center gap-1 text-center uppercase">
        <p className="font-label text-[11px] tracking-[1.54px] text-[#f0f7ff]">{name}</p>
        <p className="font-label text-[9px] tracking-[1.62px] text-white/64">{domain}</p>
      </div>
    </div>
  );
};

export default RealityPlanet;
