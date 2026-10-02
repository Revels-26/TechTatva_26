import { Download } from "lucide-react";
import { NAV_LINKS, SITE } from "../config/site";
import Button from "./Button";
import { InstagramIcon, XIcon, YoutubeIcon } from "./SocialIcons";

interface FooterProps {
  hideContactSection?: boolean;
  onNavigate?: (page: string) => void;
}

const FOLLOW_LINKS = [
  { icon: XIcon, href: SITE.socials.twitter, label: "Twitter" },
  { icon: InstagramIcon, href: SITE.socials.instagram, label: "Instagram" },
  { icon: YoutubeIcon, href: SITE.socials.youtube, label: "YouTube" },
];

const Footer = ({ hideContactSection = false, onNavigate }: FooterProps) => {
  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden border-t border-[rgba(181,240,255,0.6)] bg-[#01112b] px-6 pt-20 md:px-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <div className="flex flex-col flex-wrap gap-12 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col items-start gap-4">
            <img src="/assets/hero/logo.png" alt={SITE.name} className="h-14 w-28 object-contain" />
            <p className="text-base leading-relaxed text-white/80">
              The annual technical fest of Manipal Institute of Technology. Four
              realities. Sixteen categories. One timeline.
            </p>
            <p className="font-label text-[11px] uppercase tracking-[1.54px] text-[#b5f0ff]">
              Think. Build. Decode. Compete.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <p className="font-label text-[9px] uppercase tracking-[1.62px] text-[#b5f0ff]">
              Explore
            </p>
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  if (link.anchor) {
                    document.querySelector(link.anchor)?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onNavigate?.(link.page);
                  }
                }}
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("meettheteam")}
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                Meet the Team
              </button>
            )}
          </div>

          {!hideContactSection && (
            <div className="flex max-w-xs flex-col items-start gap-4">
              <p className="font-label text-[9px] uppercase tracking-[1.62px] text-[#b5f0ff]">
                Contact
              </p>
              {SITE.contactGroups.map((group) => (
                <div key={group.title} className="flex flex-col gap-0.5">
                  <p className="text-sm text-white/80">{group.title}</p>
                  {group.people.map((person) => (
                    <a
                      key={person.name}
                      href={`tel:${person.phone.replace(/\s/g, "")}`}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {person.name} — {person.phone}
                    </a>
                  ))}
                </div>
              ))}
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-white/80">Queries &amp; Grievances</p>
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {SITE.contactEmail}
                </a>
              </div>
            </div>
          )}

          <div className="flex flex-col items-start gap-3">
            <p className="font-label text-[9px] uppercase tracking-[1.62px] text-[#b5f0ff]">
              Follow
            </p>
            {FOLLOW_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-[#f0f7ff] transition-colors hover:text-[#b5f0ff]"
              >
                <Icon className="h-5 w-5" />
                {label}
              </a>
            ))}
            <Button
              href={SITE.downloads.brochure}
              variant="secondary"
              size="sm"
              icon={<Download size={16} />}
            >
              Rulebook
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[rgba(240,247,255,0.12)] py-5 text-xs font-medium tracking-[0.12px] text-white/64 sm:flex-row sm:items-center sm:justify-between">
          <p>TECH TATVA 2026 · Manipal Institute of Technology</p>
          <p>Designed by Chipsy IT Services Pvt. Ltd.</p>
        </div>
      </div>

      <p className="relative select-none bg-[linear-gradient(to_bottom,#deebfa_0%,#153d79_100%)] bg-clip-text text-center font-display text-[18vw] font-semibold leading-[0.85] tracking-[-0.02em] text-transparent sm:text-[160px]">
        TechTatva
      </p>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_bottom,rgba(1,17,43,0)_0%,#01112b_100%)]" />
    </footer>
  );
};

export default Footer;
