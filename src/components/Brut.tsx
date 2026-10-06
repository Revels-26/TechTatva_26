import { useEffect, useState, type ReactNode } from "react";
import { SITE } from "../config/site";
import { goToPage, openRegistration } from "../lib/navigation";
import { Reveal } from "./Reveal";

// Shared building blocks for the TT26 Figma design (Page 2 of "TT26 Landing Page").

// TechTatva logo, served from /public. Change this path if the logo file moves.
export const TECHTATVA_LOGO = "/assets/hero/logo.png";
const LOGO_MIT = "/assets/logo/mit-logo.png";
const LOGO_MAHE = "/assets/logo/mahe-logo.png";
const LOGO_SC = "/assets/logo/sc-logo.png";

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

// Passes jumps to the landing page section from any page. Timetable is its own page.
// Desktop shows the links in a row. Below lg they move into a drawer behind the menu button.
export const AppNav = ({
  onNavigate,
  page,
  overlay = false,
}: {
  onNavigate: (page: string) => void;
  page: string;
  // Overlay: transparent bar drawn over a dark hero, with light text.
  overlay?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const goSection = (id: string) => {
    if (page === "home") {
      scrollToId(id);
      return;
    }
    onNavigate("home");
    window.setTimeout(() => scrollToId(id), 60);
  };

  const links = [
    { label: "Home", current: page === "home", onClick: () => onNavigate("home") },
    { label: "Events", current: false, onClick: () => goSection("lp-passes") },
    { label: "Timetable", current: page === "timetable", onClick: () => onNavigate("timetable") },
    { label: "Conclave", current: page === "speakers", onClick: () => onNavigate("speakers") },
  ];

  const tabClass = (current: boolean) =>
    `cursor-pointer px-4 py-2 font-inter text-[15px] font-semibold leading-normal whitespace-nowrap ${
      overlay
        ? current
          ? "border-2 border-brut-cream bg-brut-cream text-brut-ink drop-shadow-[4px_4px_0px_#59a7ff]"
          : "text-brut-cream hover:underline"
        : current
          ? "border-2 border-brut-ink bg-brut-ink text-brut-cream drop-shadow-[4px_4px_0px_#59a7ff]"
          : "text-brut-ink hover:underline"
    }`;

  const loginClass = `cursor-pointer border-2 px-4 py-2 font-inter text-[15px] font-semibold leading-normal whitespace-nowrap drop-shadow-[4px_4px_0px_#59a7ff] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
    overlay ? "border-brut-cream bg-brut-cream text-brut-ink" : "border-brut-ink bg-brut-ink text-brut-cream"
  }`;

  const iconColor = overlay ? "text-brut-cream" : "text-brut-ink";
  // Over the dark hero the logos show as white silhouettes; elsewhere they keep their colours.
  const logoTone = overlay ? "brightness-0 invert" : "";

  return (
    <>
      <header
        className={`flex items-center justify-between gap-x-4 px-4 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-14 lg:py-4 ${
          overlay
            ? "absolute inset-x-0 top-0 z-20 bg-transparent"
            : "relative z-10 border-b-3 border-brut-ink bg-[rgba(255,255,255,0.85)]"
        }`}
      >
        <div className="flex items-center justify-self-start">
          <span className="hidden items-center gap-3 lg:flex">
            <img src={LOGO_MIT} alt="" className={`h-9 w-auto max-w-none ${logoTone}`} />
            <img src={LOGO_SC} alt="" className={`h-9 w-auto max-w-none ${logoTone}`} />
          </span>
          <span className="flex items-center gap-2 lg:hidden">
            <img src={LOGO_MAHE} alt="" className={`h-9 w-auto max-w-none ${logoTone}`} />
            <img src={LOGO_SC} alt="" className={`h-9 w-auto max-w-none ${logoTone}`} />
          </span>
        </div>

        <nav aria-label="Main" className="hidden items-center gap-1 justify-self-center lg:flex">
          {links.map((link) => (
            <button
              key={link.label}
              type="button"
              aria-current={link.current ? "page" : undefined}
              className={tabClass(link.current)}
              onClick={link.onClick}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button type="button" onClick={openRegistration} className={`hidden justify-self-end lg:inline-flex ${loginClass}`}>
          Login
        </button>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
          className={`flex size-11 cursor-pointer flex-col items-center justify-center gap-[6px] lg:hidden ${iconColor}`}
        >
          <span className="block h-[2px] w-6 bg-current" />
          <span className="block h-[2px] w-6 bg-current" />
          <span className="block h-[2px] w-6 bg-current" />
        </button>
      </header>

      {/* Mobile and tablet drawer. Slides in from the right; closes on backdrop, Escape or a link. */}
      <div
        id="site-drawer"
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[#01112b]/70 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute top-0 right-0 flex h-full w-[min(86vw,360px)] flex-col gap-8 border-l-3 border-brut-cream/30 bg-[#022554] px-6 py-6 shadow-[-12px_0_40px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <img src={TECHTATVA_LOGO} alt="" className="h-9 w-auto max-w-none brightness-0 invert" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex size-11 cursor-pointer items-center justify-center font-anton text-[32px] leading-none text-brut-cream"
            >
              ×
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((link) => (
              <button
                key={link.label}
                type="button"
                aria-current={link.current ? "page" : undefined}
                onClick={() => {
                  setOpen(false);
                  link.onClick();
                }}
                className={`cursor-pointer border-b border-brut-cream/15 py-4 text-left font-anton text-[28px] leading-none uppercase ${
                  link.current ? "text-[#84d0fc]" : "text-brut-cream hover:text-[#84d0fc]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openRegistration();
            }}
            className="mt-auto cursor-pointer border-2 border-brut-cream bg-brut-cream px-4 py-3 font-anton text-[20px] tracking-[1.2px] text-brut-ink uppercase drop-shadow-[4px_4px_0px_#59a7ff]"
          >
            Login
          </button>
        </aside>
      </div>
    </>
  );
};

export const BrutFooter = () => {
  const links = [
    { label: "Rulebook", href: SITE.downloads.rulebook },
  ];
  return (
    <footer className="flex flex-col gap-8 overflow-hidden bg-brut-ink px-4 py-10 text-brut-cream lg:grid lg:grid-cols-3 lg:items-center lg:gap-6 lg:px-14 lg:py-12">
      <address className="flex flex-col gap-2 border-l-3 border-[#84d0fc] pl-4 not-italic">
        <span className="font-roboto-mono text-[11px] font-bold tracking-[0.66px] text-[#84d0fc] uppercase">Location</span>
        <span className="font-anton text-[22px] leading-[1.05] tracking-[0.5px] uppercase">Manipal Institute of Technology</span>
        <span className="font-inter text-[14px] leading-normal text-brut-cream/70">MAHE, Manipal, Karnataka 576104</span>
      </address>

      <p className="text-center font-anton text-[clamp(48px,7vw,104px)] leading-[0.9] whitespace-nowrap text-brut-cream/15 uppercase">
        TechTatva 26
      </p>

      <div className="flex flex-wrap gap-x-[22px] gap-y-2 font-inter text-[15px] leading-normal font-medium whitespace-nowrap lg:justify-end">
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:text-brut-pink">
            {l.label}
          </a>
        ))}
        <button type="button" onClick={() => goToPage("meettheteam")} className="cursor-pointer hover:text-brut-pink">
          Meet the team
        </button>
      </div>
    </footer>
  );
};

// Page wrapper: printed paper background with the grid texture behind the content.
export const BrutPage = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-screen w-full overflow-hidden bg-[#E8F1FB] font-inter text-brut-ink">
    {/* One grid image, zoomed to cover the page so the wave runs continuously. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[url(/assets/grid.png)] bg-fixed bg-cover bg-center bg-no-repeat"
    />
    <div className="relative">{children}</div>
  </div>
);
