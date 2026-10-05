import type { ReactNode } from "react";
import { AppNav, Button, BrutFooter, BrutPage, ConcentricRings, SectionHead, scrollToId } from "./Brut";
import { Reveal } from "./Reveal";
import { Documents, Faq, SocialTrending } from "./LandingSections";
// TODO: Gallery, Legacy and Sponsors are commented out until their design is finished.
// import { Gallery, Legacy, Sponsors } from "./LandingSections";
import { openRegistration } from "../lib/navigation";

type Props = {
  onNavigate: (page: string) => void;
};

// Offset colours used across the page 3 screens: blue, green, yellow.
const BLUE = "#59a7ff";
const GREEN = "#2db84d";

const Planet = () => (
  <div className="lp-float relative aspect-square w-full max-w-[330px] lg:w-[484px] lg:max-w-none">
    <div className="absolute top-[16.36%] left-[16.36%] size-[67.27%] overflow-hidden rounded-full border-4 border-brut-ink bg-brut-cream shadow-[10px_10px_0px_0px_#12110f]">
      <img src="/assets/landing/bb2fc.svg" alt="" className="absolute -top-[1.2%] -left-[1.2%] w-[99%] max-w-none" />
      <img src="/assets/landing/fec67.svg" alt="" className="absolute top-[11.8%] left-[15.8%] w-[15%] max-w-none" />
      <img src="/assets/landing/5597e.svg" alt="" className="absolute top-[48.8%] left-[43.8%] w-1/2 max-w-none mix-blend-multiply" />
    </div>
    <div className="absolute top-[16.6%] -left-[0.74%] flex h-[66.7%] w-[101.5%] items-center justify-center">
      <img src="/assets/landing/48e41.svg" alt="" className="w-[96.6%] max-w-none -rotate-[24deg]" />
    </div>
    <img src="/assets/landing/61216.svg" alt="" className="absolute top-[30%] left-[80%] size-[7.27%] max-w-none" />
  </div>
);

const Hero = () => (
  <section className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[30px] px-4 pt-[50px] pb-10 lg:flex-row lg:px-14 lg:pb-20">
    <div className="flex w-full flex-col items-start gap-5 lg:w-[700px] lg:shrink-0">
      <div className="border-3 border-brut-ink bg-brut-cream px-3 py-1.5 drop-shadow-[5px_5px_0px_#2db84d]">
        <p className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] whitespace-nowrap text-brut-ink uppercase">14 - 17 Oct 2026</p>
      </div>
      <h1 className="font-anton text-[clamp(110px,14.58vw,210px)] leading-[0.88] whitespace-nowrap text-brut-ink uppercase">
        Tech
        <br />
        Tatva
      </h1>
      <p className="max-w-[640px] font-inter text-[18px] leading-normal text-brut-body">
        Four days across the TechTatva 26: talks, machines, design, business and culture. Pick your passes, then your universes.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button variant="ink" large onClick={() => scrollToId("lp-passes")}>Buy passes</Button>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
          <span className="text-[#1f5fd6]">4</span> days
        </span>
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
          <span className="text-[#1f5fd6]">14</span> events
        </span>
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
          <span className="text-[#1f5fd6]">5</span> universes
        </span>
      </div>
    </div>
    <Planet />
  </section>
);

const ComboCard = ({
  title,
  body,
  label,
  artClass,
  rings,
  shadow,
}: {
  title: string;
  body: string;
  label: string;
  artClass?: string;
  rings?: boolean;
  shadow: string;
}) => (
  <div
    className="flex flex-col gap-5 border-3 border-brut-ink bg-white p-[18px] lg:flex-1 lg:flex-row lg:items-center"
    style={{ boxShadow: `8px 8px 0px 0px ${shadow}` }}
  >
    <div className="relative h-[150px] w-full shrink-0 overflow-hidden border-3 border-brut-ink bg-brut-paper lg:h-[200px] lg:w-[220px]">
      {rings ? <ConcentricRings /> : <div className={`absolute inset-0 ${artClass}`} />}
      <span className="absolute bottom-3 left-4 font-anton text-[40px] leading-[0.95] text-[#f1f4ee] uppercase [-webkit-text-stroke:2px_#12110f] lg:left-2.5">
        {label}
      </span>
    </div>
    <div className="flex w-full min-w-0 flex-col gap-2.5 lg:flex-1">
      <p className="font-anton text-[34px] leading-[0.95] text-brut-ink uppercase">{title}</p>
      <p className="font-inter text-[15px] leading-normal text-brut-body">{body}</p>
      <div className="flex">
        <Button variant="blue" onClick={openRegistration}>Buy combo</Button>
      </div>
    </div>
  </div>
);

const ComboOffers = () => (
  <section className="mx-auto w-full max-w-[1440px] px-4 lg:px-14">
    <SectionHead>
      Combo <span className="text-[#1f5fd6]">offers</span>
    </SectionHead>
    <div className="flex flex-col gap-10 pb-5 lg:flex-row">
      <ComboCard
        title="Flagship + Merch"
        body="A Flagship pass with the TechTatva 26 merch pack. One purchase, everything in it."
        label="FLAG"
        rings
        shadow={BLUE}
      />
      <ComboCard
        title="Conclave + Merch"
        body="A Conclave pass with the TechTatva 26 merch pack. The evening talks and acts, plus the merch."
        label="CONCLAVE"
        artClass="lp-pattern-zig"
        shadow={GREEN}
      />
    </div>
  </section>
);

const PassCard = ({
  name,
  artClass,
  label,
  body,
  action,
  shadow,
}: {
  name: string;
  artClass: string;
  label: string;
  body: string;
  action: ReactNode;
  shadow: string;
}) => (
  <div
    className="flex w-full max-w-[460px] flex-col gap-3.5 border-3 border-brut-ink bg-white p-[18px] lg:w-[460px]"
    style={{ boxShadow: `8px 8px 0px 0px ${shadow}` }}
  >
    <div className="relative h-[230px] w-full overflow-hidden border-3 border-brut-ink bg-brut-paper">
      <div className={`absolute inset-0 ${artClass}`} />
      <span className="absolute bottom-2 left-4 font-anton text-[56px] leading-[0.95] text-[#f1f4ee] uppercase [-webkit-text-stroke:2px_#12110f] lg:left-[22px]">
        {label}
      </span>
    </div>
    <p className="font-anton text-[40px] leading-[0.95] text-brut-ink uppercase">{name}</p>
    <p className="font-inter text-[15px] leading-normal text-brut-body">{body}</p>
    <div className="flex flex-wrap gap-3">{action}</div>
  </div>
);

const EventPasses = ({ onNavigate }: Props) => (
  <section id="lp-passes" className="mx-auto w-full max-w-[1440px] scroll-mt-6 px-4 lg:px-14">
    <SectionHead>
      Event <span className="text-[#1f5fd6]">passes</span>
    </SectionHead>
    <div className="flex flex-col items-center gap-[60px] pb-5 lg:flex-row lg:justify-center">
      <PassCard
        name="General pass"
        artClass="lp-pattern-cross"
        label="General"
        body="Placeholder copy for the pass. Entry to the events listed under it."
        shadow={BLUE}
        action={
          <>
            <Button variant="cream" onClick={() => onNavigate("events")}>View events</Button>
            <Button variant="blue" onClick={openRegistration}>Purchase pass</Button>
          </>
        }
      />
      <PassCard
        name="Flagship pass"
        artClass="lp-pattern-dots"
        label="Flagship"
        body="Placeholder copy for the pass. Entry to the events listed under it."
        shadow={GREEN}
        action={
          <>
            <Button variant="cream" onClick={() => onNavigate("events")}>View events</Button>
            <Button variant="blue" onClick={openRegistration}>Purchase pass</Button>
          </>
        }
      />
    </div>
  </section>
);

const WideCard = ({
  reverse,
  artClass,
  label,
  title,
  body,
  primary,
  primaryAction,
  secondary,
  secondaryAction,
  shadow,
}: {
  reverse?: boolean;
  artClass: string;
  label: string;
  title: string;
  body: string;
  primary: string;
  primaryAction: () => void;
  secondary: string;
  secondaryAction: () => void;
  shadow: string;
}) => (
  <div
    className={`flex w-full flex-col gap-5 border-3 border-brut-ink bg-white p-[18px] lg:items-center ${
      reverse ? "lg:flex-row-reverse" : "lg:flex-row"
    }`}
    style={{ boxShadow: `8px 8px 0px 0px ${shadow}` }}
  >
    <div className="relative h-[150px] w-full shrink-0 overflow-hidden border-3 border-brut-ink bg-brut-paper lg:h-[200px] lg:w-[220px]">
      <div className={`absolute inset-0 ${artClass}`} />
      <span className="absolute bottom-3 left-4 font-anton text-[40px] leading-[0.95] text-[#f1f4ee] uppercase [-webkit-text-stroke:2px_#12110f] lg:left-2.5">
        {label}
      </span>
    </div>
    <div className="flex w-full min-w-0 flex-col gap-2.5 lg:flex-1">
      <p className="font-anton text-[44px] leading-[0.95] text-brut-ink uppercase">{title}</p>
      <p className="font-inter text-[15px] leading-normal text-brut-body">{body}</p>
      <div className="flex flex-wrap gap-3">
        <Button variant="cream" onClick={primaryAction}>{primary}</Button>
        <Button variant="blue" onClick={secondaryAction}>{secondary}</Button>
      </div>
    </div>
  </div>
);

const MorePasses = ({ onNavigate }: Props) => (
  <section id="lp-more" className="mx-auto w-full max-w-[1440px] scroll-mt-6 px-4 lg:px-14">
    <SectionHead>
      More at the <span className="text-[#1f5fd6]">Tech Tatva</span>
    </SectionHead>
    <div className="flex flex-col gap-10 pb-[50px] lg:pb-[90px]">
      <WideCard
        label="CONCLAVE"
        artClass="lp-pattern-zig"
        title="Conclave pass"
        body="Talks and a headline act on each of the three evenings."
        primary="View lineup"
        primaryAction={() => onNavigate("speakers")}
        secondary="Purchase pass"
        secondaryAction={openRegistration}
        shadow={BLUE}
      />
      <WideCard
        reverse
        label="MERCH"
        artClass="lp-pattern-cross-sm"
        title="Merchandise"
        body="Tees, posters and stickers in the printed TechTatva 26 style."
        primary="View merch"
        primaryAction={openRegistration}
        secondary="Purchase merch"
        secondaryAction={openRegistration}
        shadow={GREEN}
      />
    </div>
  </section>
);

const Landing = ({ onNavigate }: Props) => (
  <BrutPage>
    <AppNav onNavigate={onNavigate} page="home" />
    <Hero />
    <Reveal>
      <ComboOffers />
    </Reveal>
    <Reveal>
      <EventPasses onNavigate={onNavigate} />
    </Reveal>
    <Reveal>
      <MorePasses onNavigate={onNavigate} />
    </Reveal>
    {/* <Gallery /> */}
    {/* <Legacy /> */}
    {/* <Sponsors /> */}
    <SocialTrending />
    <Documents />
    <Faq />
    <BrutFooter />
  </BrutPage>
);

export default Landing;
