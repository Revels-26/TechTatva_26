import type { ReactNode } from "react";
import { SITE } from "../config/site";

// Shared building blocks for the TT26 Figma design (Page 2 of "TT26 Landing Page").

// TechTatva logo, served from /public. Change this path if the logo file moves.
export const TECHTATVA_LOGO = "/assets/hero/logo.png";

export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "ink" | "cream" | "red";
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
    ink: "bg-brut-ink text-brut-cream drop-shadow-[6px_6px_0px_#ff2d55]",
    cream: "bg-brut-cream text-brut-ink drop-shadow-[6px_6px_0px_#12110f]",
    red: "bg-brut-red text-white drop-shadow-[6px_6px_0px_#12110f]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center border-3 border-brut-ink font-anton uppercase leading-[0.95] whitespace-nowrap tracking-[1.44px] disabled:cursor-not-allowed disabled:opacity-50 ${
        large ? "px-7 py-4 text-[22px] tracking-[1.76px]" : "px-5 py-3 text-[18px]"
      } ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export const SectionHead = ({ id, children }: { id?: string; children: ReactNode }) => (
  <h2
    id={id}
    className="scroll-mt-6 pt-[50px] pb-[22px] font-anton text-[clamp(52px,5.84vw,84px)] leading-[0.95] text-brut-ink uppercase lp-glitch lg:pt-20"
  >
    {children}
  </h2>
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

export type NavProps = {
  onNavigate: (page: string) => void;
  // On the landing page these scroll to sections; elsewhere they go back to the landing page.
  onSection?: (id: string) => void;
};

export const BrutNav = ({ onNavigate, onSection }: NavProps) => {
  const linkClass =
    "rounded-[30px] px-4 py-[7px] font-inter text-[15px] font-semibold leading-normal whitespace-nowrap text-brut-ink hover:bg-brut-ink hover:text-brut-cream";
  const section = (id: string) => (onSection ? () => onSection(id) : () => onNavigate("home"));
  return (
    <header className="relative z-10 flex justify-center px-3 pt-5 lg:px-14">
      <nav className="flex w-full items-center justify-between rounded-[40px] border-3 border-brut-ink bg-brut-paper px-3.5 py-2.5 drop-shadow-[5px_5px_0px_#12110f]">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex cursor-pointer items-center"
        >
          <img src={TECHTATVA_LOGO} alt="TechTatva 26" className="h-9 w-auto max-w-none lg:h-11" />
        </button>
        <div className="hidden items-center gap-1.5 lg:flex">
          <button type="button" className={linkClass} onClick={section("lp-passes")}>Passes</button>
          <button type="button" className={linkClass} onClick={() => onNavigate("events")}>Events</button>
          <button type="button" className={linkClass} onClick={section("lp-schedule")}>Schedule</button>
          <button type="button" className={linkClass} onClick={() => onNavigate("speakers")}>Conclave</button>
          <button type="button" className={linkClass} onClick={() => onNavigate("signup")}>Register</button>
        </div>
        <button
          type="button"
          onClick={() => onNavigate("signin")}
          className="cursor-pointer rounded-[30px] border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-inter text-[14px] font-bold leading-normal text-brut-ink"
        >
          Log in
        </button>
      </nav>
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
