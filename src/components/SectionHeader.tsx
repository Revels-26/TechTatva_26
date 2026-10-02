import Sparkle from "./Sparkle";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

const SectionHeader = ({ eyebrow, title, description, className = "" }: SectionHeaderProps) => {
  return (
    <div
      data-aos="fade-up"
      className={`mx-auto flex max-w-3xl flex-col items-center gap-4 text-center ${className}`}
    >
      <div className="flex items-center gap-2">
        <Sparkle size={14} color="#004aad" />
        <p className="font-label text-[9px] uppercase tracking-[1.62px] text-[#004aad]">
          {eyebrow}
        </p>
      </div>

      <h2 className="font-display text-4xl font-semibold tracking-[-0.36px] text-[#022554] sm:text-5xl md:text-6xl">
        {title}
      </h2>

      <div className="h-[2px] w-24 rounded-full bg-[linear-gradient(90deg,#6ff4fa_0%,#5e17eb_33%,#ffaa06_66%,#00bf63_100%)]" />

      {description && (
        <p className="text-base leading-relaxed text-[rgba(2,37,84,0.84)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
