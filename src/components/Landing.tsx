import type { ReactNode } from "react";
import { AppNav, Button, BrutFooter, BrutPage, ConcentricRings, SectionHead } from "./Brut";
import { Reveal } from "./Reveal";
import { Documents, Faq, SocialTrending, PhotoGallery, SponsorsMatrix } from "./LandingSections";
// TODO: Gallery, Legacy and Sponsors are commented out until their design is finished.
// import { Gallery, Legacy, Sponsors } from "./LandingSections";
import { openRegistration } from "../lib/navigation";
import { Hero } from "./Hero";
import { ContactUs } from "./ContactUs";

type Props = {
  onNavigate: (page: string) => void;
};

const ComboCard = ({
  title,
  body,
  label,
  artClass,
  image,
  rings,
}: {
  title: string;
  body?: string;
  label: string;
  artClass?: string;
  image?: string;
  rings?: boolean;
}) => (
  <div
    className="flex flex-col gap-5 border-3 border-brut-ink bg-white p-[18px] lg:flex-1 lg:flex-row lg:items-center"
    style={{ boxShadow: "8px 8px 0px 0px #12110f" }}
  >
    <div className="relative h-[150px] w-full shrink-0 overflow-hidden border-3 border-brut-ink bg-brut-paper lg:h-[200px] lg:w-[220px]">
      {image ? (
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
      ) : rings ? (
        <ConcentricRings />
      ) : (
        <div className={`absolute inset-0 ${artClass}`} />
      )}
      <span className="absolute bottom-3 left-4 font-anton text-[40px] leading-[0.95] text-[#f1f4ee] uppercase [-webkit-text-stroke:2px_#12110f] lg:left-2.5">
        {label}
      </span>
    </div>
    <div className="flex w-full min-w-0 flex-col gap-2.5 lg:flex-1">
      <p className="font-anton text-[34px] leading-[0.95] text-brut-ink uppercase">{title}</p>
      {body && <p className="font-inter text-[15px] leading-normal text-brut-body">{body}</p>}
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
        label="FLAGSHIP"
        image="/assets/combo/flagship-merch.png"
      />
      <ComboCard
        title="Conclave + Merch"
        label="CONCLAVE"
        image="/assets/merch/astronaut.png"
      />
    </div>
  </section>
);

const PassCard = ({
  name,
  artClass,
  image,
  label,
  body,
  action,
}: {
  name: string;
  artClass?: string;
  image?: string;
  label: string;
  body?: string;
  action: ReactNode;
}) => (
  <div
    className="flex w-full max-w-[460px] flex-col gap-3.5 border-3 border-brut-ink bg-white p-[18px] lg:w-[460px]"
    style={{ boxShadow: "8px 8px 0px 0px #12110f" }}
  >
    <div className="relative h-[230px] w-full overflow-hidden border-3 border-brut-ink bg-brut-paper">
      {image ? (
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
      ) : (
        artClass && <div className={`absolute inset-0 ${artClass}`} />
      )}
      <span className="absolute bottom-2 left-4 font-anton text-[56px] leading-[0.95] text-[#f1f4ee] uppercase [-webkit-text-stroke:2px_#12110f] lg:left-[22px]">
        {label}
      </span>
    </div>
    <p className="font-anton text-[40px] leading-[0.95] text-brut-ink uppercase">{name}</p>
    {body && <p className="font-inter text-[15px] leading-normal text-brut-body">{body}</p>}
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
        image="/assets/passes/general.png"
        label="General"
        action={
          <>
            <Button variant="cream" onClick={() => onNavigate("events")}>View events</Button>
            <Button variant="blue" onClick={openRegistration}>Purchase pass</Button>
          </>
        }
      />
      <PassCard
        name="Flagship pass"
        image="/assets/passes/flagship.png"
        label="Flagship"
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
  image,
  label,
  title,
  body,
  primary,
  primaryAction,
  secondary,
  secondaryAction,
}: {
  reverse?: boolean;
  artClass?: string;
  image?: string;
  label: string;
  title: string;
  body?: string;
  primary: string;
  primaryAction: () => void;
  secondary: string;
  secondaryAction: () => void;
}) => (
  <div
    className={`flex w-full flex-col gap-5 border-3 border-brut-ink bg-white p-[18px] lg:items-center ${
      reverse ? "lg:flex-row-reverse" : "lg:flex-row"
    }`}
    style={{ boxShadow: "8px 8px 0px 0px #12110f" }}
  >
    <div className="relative h-[150px] w-full shrink-0 overflow-hidden border-3 border-brut-ink bg-brut-paper lg:h-[200px] lg:w-[220px]">
      {image ? (
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
      ) : (
        <div className={`absolute inset-0 ${artClass}`} />
      )}
      <span className="absolute bottom-3 left-4 font-anton text-[40px] leading-[0.95] text-[#f1f4ee] uppercase [-webkit-text-stroke:2px_#12110f] lg:left-2.5">
        {label}
      </span>
    </div>
    <div className="flex w-full min-w-0 flex-col gap-2.5 lg:flex-1">
      <p className="font-anton text-[44px] leading-[0.95] text-brut-ink uppercase">{title}</p>
      {body && <p className="font-inter text-[15px] leading-normal text-brut-body">{body}</p>}
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
        image="/assets/passes/conclave.png"
        title="Conclave pass"
        primary="View lineup"
        primaryAction={() => onNavigate("speakers")}
        secondary="Purchase pass"
        secondaryAction={openRegistration}
      />
      <WideCard
        reverse
        label="MERCH"
        image="/assets/combo/general-merch.png"
        title="Merchandise"
        primary="View merch"
        primaryAction={openRegistration}
        secondary="Purchase merch"
        secondaryAction={openRegistration}
      />
    </div>
  </section>
);

const Landing = ({ onNavigate }: Props) => (
  <BrutPage>
    <AppNav onNavigate={onNavigate} page="home" overlay />
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
    <PhotoGallery />
    <SponsorsMatrix />
    {/* <Gallery /> */}
    {/* <Legacy /> */}
    {/* <Sponsors /> */}
    <SocialTrending />
    <Documents />
    <ContactUs />
    <Faq />
    <BrutFooter />
  </BrutPage>
);

export default Landing;
