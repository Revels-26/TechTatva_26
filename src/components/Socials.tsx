import SectionHeader from "./SectionHeader";
import { SITE } from "../config/site";
import { InstagramIcon, XIcon, YoutubeIcon } from "./SocialIcons";

const POSTS = [
  { src: "/assets/socials/post-1.png", rotate: "rotate-[4deg]" },
  { src: "/assets/socials/post-2.png", rotate: "-rotate-2" },
  { src: "/assets/socials/post-3.png", rotate: "rotate-2" },
  { src: "/assets/socials/post-4.png", rotate: "-rotate-4" },
];

const SOCIAL_LINKS = [
  { icon: YoutubeIcon, href: SITE.socials.youtube, label: "YouTube" },
  { icon: InstagramIcon, href: SITE.socials.instagram, label: "Instagram" },
  { icon: XIcon, href: SITE.socials.twitter, label: "Twitter" },
];

const Socials = () => {
  return (
    <section className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10">
        <SectionHeader eyebrow="What's trending" title="Follow TechTatva" />

        <div className="flex flex-wrap items-center justify-center gap-6 py-6 sm:gap-4">
          {POSTS.map((post, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className={`${post.rotate} flex w-[260px] flex-col gap-3 rounded-[20px] border border-[rgba(181,240,255,0.6)] bg-white p-3 shadow-[0_12px_16px_rgba(2,37,84,0.2)] transition-transform hover:scale-105 hover:rotate-0`}
            >
              <div className="h-60 w-full overflow-hidden rounded-[16px]">
                <img src={post.src} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center gap-2 px-1">
                <InstagramIcon className="h-4 w-4 text-[rgba(2,37,84,0.7)]" />
                <p className="text-xs font-medium tracking-[0.12px] text-[rgba(2,37,84,0.7)]">
                  [Needed: social feed]
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(181,240,255,0.6)] bg-[rgba(240,247,255,0.6)] px-5 py-3 font-label text-[10px] uppercase tracking-[1.2px] text-[#022554] transition-colors hover:bg-white"
            >
              {label}
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Socials;
