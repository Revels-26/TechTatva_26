import { ArrowUpRight } from "lucide-react";

interface FeatureCardProps {
  media: string;
  eyebrow: string;
  title: string;
  description: string;
  price?: string;
  actionLabel: string;
  href: string;
  className?: string;
}

const FeatureCard = ({
  media,
  eyebrow,
  title,
  description,
  price,
  actionLabel,
  href,
  className = "",
}: FeatureCardProps) => {
  return (
    <div
      data-aos="fade-up"
      className={`flex flex-1 flex-col overflow-hidden rounded-[20px] border border-[rgba(181,240,255,0.6)] bg-[linear-gradient(to_bottom,#153d79_0%,#022554_45%,#01112b_100%)] shadow-[0_24px_64px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="relative h-60 w-full overflow-hidden">
        <img src={media} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_bottom,rgba(1,17,43,0)_0%,#01112b_100%)]" />
      </div>

      <div className="flex flex-1 flex-col items-center gap-3 px-8 py-6 text-center">
        <p className="font-label text-[9px] uppercase tracking-[1.62px] text-[#b5f0ff]">
          {eyebrow}
        </p>
        <p className="font-display text-[28px] font-bold uppercase tracking-[0.84px] text-[#deebfa]">
          {title}
        </p>
        <div className="h-[2px] w-12 rounded-full bg-[linear-gradient(90deg,#6ff4fa_0%,#5e17eb_33%,#ffaa06_66%,#00bf63_100%)]" />
        <p className="flex-1 text-sm leading-relaxed text-white/80">{description}</p>

        <div className="flex items-center gap-4 pt-2">
          {price && (
            <p className="text-2xl font-bold tracking-[-0.12px] text-[#f0f7ff]">{price}</p>
          )}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-label text-[10px] uppercase tracking-[1.2px] text-[#b5f0ff] transition-colors hover:text-white"
          >
            {actionLabel}
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
