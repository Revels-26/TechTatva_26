import type { ReactNode } from "react";
import { Button, BrutFooter, BrutNav, BrutPage, ConcentricRings, SectionHead, scrollToId } from "./Brut";

type Props = {
  onNavigate: (page: string) => void;
};

const Planet = () => (
  <div className="relative aspect-square w-full max-w-[330px] lg:w-[484px] lg:max-w-none">
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

const Hero = ({ onNavigate }: Props) => (
  <section className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[30px] px-4 pt-[50px] pb-10 lg:flex-row lg:px-14 lg:pb-20">
    <div className="flex w-full flex-col items-start gap-5 lg:w-[700px] lg:shrink-0">
      <div className="border-3 border-brut-ink bg-brut-cream px-3 py-1.5 drop-shadow-[5px_5px_0px_#ff2d55]">
        <p className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] whitespace-nowrap text-brut-ink uppercase">14 - 16 Oct 2026</p>
      </div>
      <h1 className="font-anton text-[clamp(110px,14.58vw,210px)] leading-[0.88] whitespace-nowrap text-brut-ink uppercase lp-glitch-hero">
        Tech
        <br />
        Tatva
      </h1>
      <p className="max-w-[640px] font-inter text-[18px] leading-normal text-brut-body">
        Three days across the TechTatva 26: talks, machines, design, business and culture. Pick your passes, then your universes.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button variant="ink" large onClick={() => scrollToId("lp-passes")}>Buy passes</Button>
        <Button variant="cream" large onClick={() => onNavigate("signup")}>Register</Button>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
          <span className="text-brut-red">3</span> days
        </span>
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
          <span className="text-brut-red">14</span> events
        </span>
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
          <span className="text-brut-red">5</span> universes
        </span>
      </div>
    </div>
    <Planet />
  </section>
);

const Schedule = () => {
  const days = [
    { day: "Day 1", date: "14 Oct", tone: "bg-brut-cream text-brut-ink" },
    { day: "Day 2", date: "15 Oct", tone: "bg-brut-pink text-brut-cream" },
    { day: "Day 3", date: "16 Oct", tone: "bg-brut-cream text-brut-ink" },
  ];
  return (
    <section id="lp-schedule" className="mx-auto w-full max-w-[1440px] scroll-mt-6 px-4 lg:px-14">
      <SectionHead>Schedule</SectionHead>
      <div className="grid grid-cols-1 gap-5 pb-5 uppercase md:grid-cols-3">
        {days.map((d) => (
          <div key={d.day} className={`flex flex-col gap-1 border-3 border-brut-ink p-[22px] drop-shadow-[7px_7px_0px_#12110f] ${d.tone}`}>
            <p className="font-anton text-[56px] leading-[0.95]">{d.day}</p>
            <p className="font-roboto-mono text-[14px] font-bold tracking-[0.84px]">{d.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ComboCard = ({
  title,
  body,
  price,
  label,
  artClass,
  rings,
}: {
  title: string;
  body: string;
  price: string;
  label: string;
  artClass?: string;
  rings?: boolean;
}) => (
  <div className="flex flex-col gap-5 border-3 border-brut-ink bg-brut-red p-[18px] drop-shadow-[8px_8px_0px_#12110f] lg:flex-1 lg:flex-row lg:items-center">
    <div className="relative h-[150px] w-full shrink-0 overflow-hidden border-3 border-brut-ink bg-brut-paper lg:h-[200px] lg:w-[220px]">
      {rings ? <ConcentricRings /> : <div className={`absolute inset-0 ${artClass}`} />}
      <span className="absolute bottom-3 left-4 font-anton text-[40px] leading-[0.95] text-brut-cream uppercase lp-shadow-ink lg:left-2.5">
        {label}
      </span>
    </div>
    <div className="flex w-full min-w-0 flex-col gap-2.5 lg:flex-1">
      <p className="font-anton text-[34px] leading-[0.95] text-brut-cream uppercase">{title}</p>
      <p className="font-inter text-[15px] leading-normal text-[rgba(255,253,247,0.92)]">{body}</p>
      <div className="flex">
        <Button variant="cream">{price}</Button>
      </div>
    </div>
  </div>
);

const ComboOffers = () => (
  <section className="mx-auto w-full max-w-[1440px] px-4 lg:px-14">
    <SectionHead>Combo offers</SectionHead>
    <div className="flex flex-col gap-10 pb-5 lg:flex-row">
      <ComboCard
        title="Flagship combo"
        body="Placeholder offer text. Everything in one pass, one account."
        price="Buy for 500 rupees"
        label="FLAG"
        rings
      />
      <ComboCard
        title="General combo"
        body="Placeholder offer text. Everything in one pass, one account."
        price="Buy for 200 rupees"
        label="GEN"
        artClass="lp-pattern-stripes"
      />
    </div>
  </section>
);

const PassCard = ({
  name,
  artClass,
  label,
  price,
  body,
  action,
}: {
  name: string;
  artClass: string;
  label: string;
  price: string;
  body: string;
  action: ReactNode;
}) => (
  <div className="flex w-full max-w-[460px] flex-col gap-3.5 border-3 border-brut-ink bg-brut-ink p-[18px] drop-shadow-[8px_8px_0px_#ff2d55] lg:w-[460px]">
    <div className="relative h-[230px] w-full overflow-hidden border-3 border-brut-ink bg-brut-paper">
      <div className={`absolute inset-0 ${artClass}`} />
      <span className="absolute bottom-2 left-4 font-anton text-[56px] leading-[0.95] text-brut-cream uppercase lp-shadow-ink lg:left-[22px]">
        {label}
      </span>
    </div>
    <p className="font-anton text-[40px] leading-[0.95] text-brut-cream uppercase">{name}</p>
    <p className="font-roboto-mono text-[13px] font-bold tracking-[0.78px] text-brut-cream uppercase">{price}</p>
    <p className="font-inter text-[15px] leading-normal text-[rgba(255,253,247,0.9)]">{body}</p>
    <div className="flex">{action}</div>
  </div>
);

const EventPasses = ({ onNavigate }: Props) => (
  <section id="lp-passes" className="mx-auto w-full max-w-[1440px] scroll-mt-6 px-4 lg:px-14">
    <SectionHead>Event passes</SectionHead>
    <div className="flex flex-col items-center gap-[60px] pb-5 lg:flex-row lg:justify-center">
      <PassCard
        name="General pass"
        artClass="lp-pattern-cross"
        label="General"
        price="200 rupees"
        body="Placeholder copy for the pass. Entry to the events listed under it."
        action={<Button variant="cream" onClick={() => onNavigate("events")}>View events</Button>}
      />
      <img src="/assets/landing/ea64b.svg" alt="" aria-hidden="true" className="hidden h-[90px] w-[70px] shrink-0 lg:block" />
      <PassCard
        name="Flagship pass"
        artClass="lp-pattern-dots"
        label="Flagship"
        price="500 rupees"
        body="Placeholder copy for the pass. Entry to the events listed under it."
        action={<Button variant="red" onClick={() => onNavigate("signup")}>Purchase pass</Button>}
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
}) => (
  <div
    className={`flex w-full flex-col gap-5 border-3 border-brut-ink bg-brut-ink p-[18px] drop-shadow-[8px_8px_0px_#ff2d55] lg:items-center ${
      reverse ? "lg:flex-row-reverse" : "lg:flex-row"
    }`}
  >
    <div className="relative h-[150px] w-full shrink-0 overflow-hidden border-3 border-brut-ink bg-brut-paper lg:h-[200px] lg:w-[220px]">
      <div className={`absolute inset-0 ${artClass}`} />
      <span className="absolute bottom-3 left-4 font-anton text-[40px] leading-[0.95] text-brut-cream uppercase lp-shadow-ink lg:left-2.5">
        {label}
      </span>
    </div>
    <div className="flex w-full min-w-0 flex-col gap-2.5 lg:flex-1">
      <p className="font-anton text-[44px] leading-[0.95] text-brut-cream uppercase">{title}</p>
      <p className="font-inter text-[15px] leading-normal text-[rgba(255,253,247,0.92)]">{body}</p>
      <div className="flex flex-wrap gap-3">
        <Button variant="cream" onClick={primaryAction}>{primary}</Button>
        <Button variant="red" onClick={secondaryAction}>{secondary}</Button>
      </div>
    </div>
  </div>
);

const MorePasses = ({ onNavigate }: Props) => (
  <section id="lp-more" className="mx-auto w-full max-w-[1440px] scroll-mt-6 px-4 lg:px-14">
    <SectionHead>More</SectionHead>
    <div className="flex flex-col gap-10 pb-[50px] lg:pb-[90px]">
      <WideCard
        label="CONCLAVE"
        artClass="lp-pattern-zig"
        title="Conclave pass"
        body="Talks and a headline act on each of the three evenings."
        primary="View lineup"
        primaryAction={() => onNavigate("speakers")}
        secondary="Purchase pass"
        secondaryAction={() => onNavigate("signup")}
      />
      <WideCard
        reverse
        label="MERCH"
        artClass="lp-pattern-cross-sm"
        title="Merchandise"
        body="Tees, posters and stickers in the printed TechTatva 26 style."
        primary="View merch"
        primaryAction={() => onNavigate("signup")}
        secondary="Purchase merch"
        secondaryAction={() => onNavigate("signup")}
      />
    </div>
  </section>
);

const Landing = ({ onNavigate }: Props) => (
  <BrutPage>
    <BrutNav onNavigate={onNavigate} onSection={scrollToId} />
    <Hero onNavigate={onNavigate} />
    <Schedule />
    <ComboOffers />
    <EventPasses onNavigate={onNavigate} />
    <MorePasses onNavigate={onNavigate} />
    <BrutFooter />
  </BrutPage>
);

export default Landing;
