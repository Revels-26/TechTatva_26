import { useState, type ReactNode } from "react";
import { SITE } from "../config/site";
import { FAQS, GALLERY, LEGACY_STATS, SOCIAL_POSTS, SPONSOR_TIERS } from "../data/landing";
import { Button, SectionHead } from "./Brut";
import { InstagramIcon } from "./SocialIcons";
import { Reveal } from "./Reveal";
import { shadowFor } from "../lib/shadows";


// Shared wrapper so every section lines up with the header and footer gutters.
const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-[1440px] scroll-mt-6 px-4 pb-5 lg:px-14 ${className}`}>{children}</section>
);

export const Legacy = () => (
  <Reveal>
    <Container>
      <SectionHead>
        TechTatva 26 <span className="text-[#1f5fd6]">our legacy</span>
      </SectionHead>
      <div className="flex flex-col gap-8 pb-[50px] lg:flex-row lg:items-stretch lg:gap-12 lg:pb-[80px]">
        <div
          className="flex w-full items-center justify-center border-3 border-brut-ink bg-white p-8 lg:w-[420px] lg:shrink-0"
          style={{ boxShadow: `10px 10px 0px 0px ${shadowFor("legacy crest")}` }}
        >
          <img src="/assets/about/mit-crest.png" alt="MIT Manipal crest" className="h-auto w-[220px] lg:w-[280px]" />
        </div>
        <div className="flex min-w-0 flex-col gap-6 lg:flex-1">
          <p className="font-inter text-[17px] leading-relaxed text-brut-body">
            Placeholder history copy. TechTatva started as a space for students at MIT Manipal to build, compete and
            argue about technology. Each edition has added new universes, bigger events and more of the campus.
          </p>
          <p className="font-inter text-[17px] leading-relaxed text-brut-body">
            This edition carries that forward: machines, code, design, business and culture under one roof for four days.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {LEGACY_STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1 border-3 border-brut-ink bg-brut-cream p-4"
                style={{ boxShadow: `6px 6px 0px 0px ${shadowFor(s.label)}` }}
              >
                <span className="font-anton text-[56px] leading-[0.9] text-brut-ink">{s.value}</span>
                <span className="font-roboto-mono text-[11px] font-bold tracking-[0.6px] text-brut-body uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  </Reveal>
);

export const Gallery = () => (
  <Reveal>
    <Container>
      <SectionHead>
        Gallery <span className="text-[#1f5fd6]">from before</span>
      </SectionHead>
      <div className="grid grid-cols-2 gap-5 pb-[50px] lg:grid-cols-5 lg:pb-[80px]">
        {GALLERY.map((g, i) => (
          <figure
            key={g.src}
            className={`flex flex-col border-3 border-brut-ink bg-white p-2.5 ${i === 0 ? "col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
            style={{ boxShadow: `6px 6px 0px 0px ${shadowFor(g.caption)}` }}
          >
            <div className={`relative overflow-hidden border-2 border-brut-ink bg-brut-paper ${i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-square"}`}>
              <img src={g.src} alt={g.caption} loading="lazy" className="absolute inset-0 size-full object-cover" />
            </div>
            <figcaption className="pt-2.5 font-anton text-[22px] leading-[1] text-brut-ink uppercase">{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Container>
  </Reveal>
);

export const Sponsors = () => (
  <Reveal>
    <Container>
      <SectionHead>
        Our <span className="text-[#1f5fd6]">sponsors</span>
      </SectionHead>
      <div className="flex flex-col gap-8 pb-[50px] lg:pb-[80px]">
        {SPONSOR_TIERS.map((tier) => (
          <div key={tier.tier} className="flex flex-col gap-3">
            <p className="font-roboto-mono text-[12px] font-bold tracking-[0.72px] text-[#1f5fd6] uppercase">{tier.tier}</p>
            <div className="flex flex-wrap gap-4">
              {tier.names.map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex min-h-[90px] min-w-[200px] flex-1 items-center justify-center border-3 border-brut-ink bg-white px-6 py-4 text-center"
                  style={{ boxShadow: `5px 5px 0px 0px ${shadowFor(name + i)}` }}
                >
                  <span className="font-anton text-[24px] leading-[1] text-brut-ink uppercase">{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-4">
          <p className="font-inter text-[15px] text-brut-body">Interested in sponsoring TechTatva 26?</p>
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="border-2 border-brut-ink bg-brut-cream px-4 py-2 font-roboto-mono text-[12px] font-bold text-brut-ink uppercase drop-shadow-[4px_4px_0px_#12110f] hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Email the team
          </a>
        </div>
      </div>
    </Container>
  </Reveal>
);

export const SocialTrending = () => (
  <Reveal>
    <Container>
      <div className="text-center">
        <SectionHead>
          Trending <span className="text-[#1f5fd6]">on socials</span>
        </SectionHead>
      </div>
      <div className="flex flex-col gap-10 pb-[50px] lg:pb-[80px]">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {SOCIAL_POSTS.map((post, i) => (
            <a
              key={post.src}
              href={SITE.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative block border-3 border-brut-ink bg-white"
              style={{
                boxShadow: `6px 6px 0px 0px ${shadowFor(post.src)}`,
                transform: `rotate(${[-3, 2, -2, 3][i]}deg)`,
              }}
            >
              <div className="aspect-square overflow-hidden border-b-3 border-brut-ink bg-brut-paper">
                <img
                  src={post.src}
                  alt={post.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="flex items-center gap-2 px-3 py-2.5 font-roboto-mono text-[12px] font-bold text-brut-ink uppercase">
                <InstagramIcon className="size-4" />
                Post {i + 1}
              </span>
            </a>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={SITE.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="border-3 border-brut-ink bg-brut-ink px-5 py-3 font-anton text-[18px] tracking-[1.44px] text-brut-cream uppercase drop-shadow-[6px_6px_0px_#59a7ff] hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </Container>
  </Reveal>
);

const DocCard = ({
  title,
  body,
  href,
  shadow,
  viewLabel,
  downloadLabel,
}: {
  title: string;
  body: string;
  href: string;
  shadow: string;
  viewLabel?: string;
  downloadLabel: string;
}) => (
  <div
    className="flex flex-1 flex-col gap-4 border-3 border-brut-ink bg-white p-6"
    style={{ boxShadow: `8px 8px 0px 0px ${shadow}` }}
  >
    <p className="font-anton text-[40px] leading-[0.95] text-brut-ink uppercase">{title}</p>
    <p className="font-inter text-[15px] leading-normal text-brut-body">{body}</p>
    <div className="mt-auto flex flex-wrap gap-3 pt-2">
      {viewLabel && (
        <a href={href} target="_blank" rel="noreferrer">
          <Button variant="blue">{viewLabel}</Button>
        </a>
      )}
      <a href={href} download>
        <Button variant={viewLabel ? "cream" : "blue"}>{downloadLabel}</Button>
      </a>
    </div>
  </div>
);

export const Documents = () => (
  <Reveal>
    <Container>
      <SectionHead>
        Rulebook <span className="text-[#1f5fd6]">&amp; brochure</span>
      </SectionHead>
      <div className="flex flex-col gap-10 pb-[50px] lg:flex-row lg:pb-[80px]">
        <DocCard
          title="Rulebook"
          body="Every event's rules, judging criteria and team limits in one document. Read it before you register a team."
          href={SITE.downloads.rulebook}
          shadow={shadowFor("Rulebook")}
          downloadLabel="Download rulebook"
        />
        <DocCard
          title="Brochure"
          body="An overview of TechTatva 26, its universes, passes and what to expect across the four days."
          href={SITE.downloads.brochure}
          shadow={shadowFor("Brochure")}
          downloadLabel="Download brochure"
        />
      </div>
    </Container>
  </Reveal>
);

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Reveal>
      <Container>
        <SectionHead>
          Questions, <span className="text-[#1f5fd6]">answered</span>
        </SectionHead>
        <div className="flex flex-col gap-4 pb-[50px] lg:pb-[80px]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="border-3 border-brut-ink bg-white"
                style={{ boxShadow: `6px 6px 0px 0px ${isOpen ? "#59a7ff" : "#12110f"}` }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-anton text-[22px] leading-[1.05] text-brut-ink uppercase lg:text-[26px]">{item.q}</span>
                  <span className="font-anton text-[30px] leading-none text-brut-ink" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="border-t-2 border-brut-ink px-5 py-4 font-inter text-[15px] leading-relaxed text-brut-body">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Reveal>
  );
};
