import type { ReactNode } from "react";
import { SITE } from "../config/site";
import { Reveal } from "./Reveal";

// Shared building blocks for the TT26 Figma design (Page 2 of "TT26 Landing Page").

// TechTatva logo, served from /public. Change this path if the logo file moves.
export const TECHTATVA_LOGO = "/assets/hero/logo.png";

// Per-viewer convenience flag set by the sign-in flow. Read by the nav and the Events page.
const SIGNED_IN_KEY = "tt26-signed-in";

const readSignedIn = (): boolean => {
  try {
    return window.localStorage.getItem(SIGNED_IN_KEY) === "1";
  } catch {
    return false;
  }
};

export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "ink" | "cream" | "blue";
  large?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

export const Button = ({
  children,
  onClick,
  variant = "cream",
  large = false,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const variants = {
    ink: "bg-brut-ink text-brut-cream drop-shadow-[6px_6px_0px_#59a7ff]",
    cream: "bg-white text-brut-ink drop-shadow-[6px_6px_0px_#12110f]",
    blue: "bg-[#1f5fd6] text-white drop-shadow-[6px_6px_0px_#12110f]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center border-3 border-brut-ink font-anton uppercase leading-[0.95] whitespace-nowrap tracking-[1.44px] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 ${
        large ? "px-7 py-4 text-[22px] tracking-[1.76px]" : "px-5 py-3 text-[18px]"
      } ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export const SectionHead = ({ id, children }: { id?: string; children: ReactNode }) => (
  <Reveal>
    <h2
      id={id}
      className="scroll-mt-6 pt-[50px] pb-[22px] font-anton text-[clamp(52px,5.84vw,84px)] leading-[0.95] text-brut-ink uppercase lg:pt-20"
    >
      {children}
    </h2>
  </Reveal>
);

// Concentric rings used as "art" on cards. Each ring is 30px larger than the last, centred on one point.
const RING_FILES = [
  "6ad1e", "cf0e5", "3b0c7", "34df2", "eea2e", "f4b6b", "e6b2a", "7bead",
  "bd795", "ce90c", "9d16e", "bea59", "fb86f", "0755c", "353e1", "cfb2c",
  "95587", "26c05", "6fd6e", "7dbde", "61a34", "e6030", "e28ee", "debcd",
];

export const ConcentricRings = () => (
  <>
    {RING_FILES.map((file, i) => {
      const size = 16 + i * 30;
      return (
        <img
          key={file}
          src={`/assets/landing/${file}.svg`}
          alt=""
          aria-hidden="true"
          className="absolute max-w-none -translate-x-1/2 -translate-y-1/2"
          style={{ left: "28.9%", top: "70.3%", width: size, height: size }}
        />
      );
    })}
  </>
);

// The one site header, used on every page. Same tabs everywhere; the right side shows
// the traveller chip when signed in, otherwise Register and Log in.
// Section tabs (Passes, Schedule) jump to the landing page section from any page.
export const AppNav = ({ onNavigate, page }: { onNavigate: (page: string) => void; page: string }) => {
  const signedIn = readSignedIn();

  const tabClass = (current: boolean) =>
    `cursor-pointer px-4 py-2 font-inter text-[15px] font-semibold leading-normal whitespace-nowrap ${
      current
        ? "border-2 border-brut-ink bg-brut-ink text-brut-cream drop-shadow-[4px_4px_0px_#59a7ff]"
        : "text-brut-ink hover:underline"
    }`;

  const goSection = (id: string) => {
    if (page === "home") {
      scrollToId(id);
      return;
    }
    onNavigate("home");
    window.setTimeout(() => scrollToId(id), 60);
  };

  return (
    <header className="relative z-10 flex flex-wrap items-center justify-between gap-x-4 border-b-3 border-brut-ink bg-[rgba(255,255,255,0.85)] px-4 py-3 lg:px-14 lg:py-4">
      <button type="button" onClick={() => onNavigate("home")} className="flex cursor-pointer items-center">
        <img src={TECHTATVA_LOGO} alt="TechTatva 26" className="h-9 w-auto max-w-none lg:h-11" />
      </button>

      <nav aria-label="Main" className="order-last flex w-full gap-1 overflow-x-auto py-1 pr-1 lg:order-none lg:w-auto lg:overflow-visible lg:p-0">
        <button
          type="button"
          aria-current={page === "home" ? "page" : undefined}
          className={tabClass(page === "home")}
          onClick={() => onNavigate("home")}
        >
          Home
        </button>
        <button type="button" className={tabClass(false)} onClick={() => goSection("lp-passes")}>Passes</button>
        <button
          type="button"
          aria-current={page === "events" ? "page" : undefined}
          className={tabClass(page === "events")}
          onClick={() => onNavigate("events")}
        >
          Events
        </button>
        <button type="button" className={tabClass(false)} onClick={() => goSection("lp-schedule")}>Schedule</button>
        <button
          type="button"
          aria-current={page === "speakers" ? "page" : undefined}
          className={tabClass(page === "speakers")}
          onClick={() => onNavigate("speakers")}
        >
          Conclave
        </button>
      </nav>

      {signedIn ? (
        <div className="flex items-center gap-2.5 border-3 border-brut-ink bg-brut-cream px-2.5 py-1.5 drop-shadow-[4px_4px_0px_#2db84d]">
          <span className="flex size-8 items-center justify-center border-2 border-brut-ink bg-[#2db84d] font-anton text-[18px] leading-none text-brut-ink">
            A
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-inter text-[14px] font-semibold text-brut-ink">Asha Rao</span>
            <span className="font-roboto-mono text-[10px] text-[#6b675c]">ID MV-02402</span>
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate("signup")}
            aria-current={page === "signup" ? "page" : undefined}
            className={tabClass(page === "signup")}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => onNavigate("signin")}
            aria-current={page === "signin" ? "page" : undefined}
            className={tabClass(page === "signin")}
          >
            Log in
          </button>
        </div>
      )}
    </header>
  );
};

export const BrutFooter = () => {
  const links = [
    { label: "Twitter", href: SITE.socials.twitter },
    { label: "Instagram", href: SITE.socials.instagram },
    { label: "YouTube", href: SITE.socials.youtube },
    { label: "Rulebook", href: SITE.downloads.timetable },
  ];
  return (
    <footer className="bg-brut-ink text-brut-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-5 px-4 py-[26px] lg:flex-row lg:items-center lg:px-14">
        <p className="font-anton text-[28px] tracking-[1.12px] uppercase">Tech Tatva 2026</p>
        <div className="flex flex-wrap gap-[22px] font-inter text-[15px] font-medium">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:text-brut-pink">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

// Page wrapper: printed paper background with the halftone texture behind the content.
export const BrutPage = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-screen w-full overflow-hidden bg-brut-paper font-inter text-brut-ink">
    {/* Tree/halftone texture: covers the full page width at any viewport, aspect ratio preserved */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[url(/assets/landing/ffd12.svg)] bg-cover bg-top bg-no-repeat lg:bg-[url(/assets/landing/39870.svg)]"
    />
    <div className="relative">{children}</div>
  </div>
);
