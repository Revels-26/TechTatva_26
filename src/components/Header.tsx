import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "../config/site";

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Header = ({ activePage, onNavigate }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const goHome = () => {
    setMenuOpen(false);
    if (activePage === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onNavigate("home");
    }
  };

  const handleNavClick = (link: (typeof NAV_LINKS)[number]) => {
    setMenuOpen(false);

    if (link.anchor) {
      if (activePage === "home") {
        document.querySelector(link.anchor)?.scrollIntoView({ behavior: "smooth" });
      } else {
        onNavigate("home");
        setTimeout(() => {
          document.querySelector(link.anchor!)?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
      return;
    }

    onNavigate(link.page);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[rgba(240,247,255,0.12)] bg-[rgba(2,37,84,0.72)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
        <button type="button" onClick={goHome} className="h-10 w-20 shrink-0">
          <img
            src="/assets/hero/logo.png"
            alt={`${SITE.name} ${SITE.edition}`}
            className="h-full w-full object-contain"
          />
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link)}
              className={`rounded-full px-5 py-3 font-label text-[11px] uppercase tracking-[1.54px] transition-colors ${
                activePage === link.page && !link.anchor
                  ? "text-[#b5f0ff]"
                  : "text-white/80 hover:text-[#b5f0ff]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#"
            className="rounded-full px-5 py-3 font-label text-[10px] uppercase tracking-[1.2px] text-[#b5f0ff] transition-colors hover:text-white"
          >
            Log in
          </a>
          <a
            href={SITE.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#f0f7ff] px-5 py-3 font-label text-[10px] uppercase tracking-[1.2px] text-[#022554] transition-transform hover:scale-105"
          >
            Register
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-white md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-[rgba(240,247,255,0.12)] bg-[rgba(2,37,84,0.95)] px-5 pb-5 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link)}
              className="py-2 text-left font-label text-[11px] uppercase tracking-[1.54px] text-white/80 hover:text-[#b5f0ff]"
            >
              {link.label}
            </button>
          ))}
          <a
            href={SITE.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#f0f7ff] px-5 py-3 text-center font-label text-[10px] uppercase tracking-[1.2px] text-[#022554]"
          >
            Register
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
