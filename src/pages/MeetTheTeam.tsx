import { useState } from "react";
import { TEAM_SECTIONS, type TeamMember } from "../data/team";
import { AppNav, BrutFooter, BrutPage, SectionHead } from "../components/Brut";
import { InstagramIcon, LinkedinIcon } from "../components/SocialIcons";

// ID-card style from the M# team page: dark card, lanyard clip, slight 3D tilt that follows the cursor.
const TeamCard = ({ member }: { member: TeamMember }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
  };

  return (
    <div className="[perspective:1000px] py-3" onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
      <div
        className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-3 text-white shadow-[6px_6px_0px_0px_#0B3566] transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${-tilt.y * 14}deg) rotateY(${tilt.x * 14}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="mx-auto mb-2 h-1.5 w-12 rounded-full border border-white/10 bg-zinc-800" />

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/5 bg-zinc-900">
          {member.photo ? (
            <img src={member.photo} alt={member.name} loading="lazy" className="size-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0B3566] to-zinc-900 font-anton text-[64px] text-[#84d0fc]">
              {member.name.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-70" />
        </div>

        <div className="mt-3 px-1 py-2 text-center">
          <h3 className="break-words font-inter text-sm font-bold tracking-wide sm:text-base">{member.name}</h3>
          {member.designation && (
            <p className="mt-0.5 break-words font-inter text-[11px] font-medium text-[#84d0fc] sm:text-xs">{member.designation}</p>
          )}
          <div className="mt-2 flex items-center justify-center gap-4">
            {member.instagram ? (
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on Instagram`} className="text-zinc-400 transition-colors hover:text-[#84d0fc]">
                <InstagramIcon className="h-4 w-4" />
              </a>
            ) : (
              <InstagramIcon className="h-4 w-4 text-zinc-700" />
            )}
            {member.linkedin ? (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className="text-zinc-400 transition-colors hover:text-[#84d0fc]">
                <LinkedinIcon className="h-4 w-4" />
              </a>
            ) : (
              <LinkedinIcon className="h-4 w-4 text-zinc-700" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MeetTheTeam = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <BrutPage>
    <AppNav onNavigate={onNavigate} page="meettheteam" />
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-20 lg:px-14">
      <h1 className="pt-[50px] font-anton text-[clamp(52px,5.84vw,84px)] leading-[0.95] text-brut-ink uppercase lg:pt-20">
        Meet the <span className="text-[#1f5fd6]">team</span>
      </h1>

      {TEAM_SECTIONS.map((section) => (
        <section key={section.title}>
          <div className="text-center">
            <SectionHead>{section.title}</SectionHead>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6">
            {section.members.map((member) => (
              <div key={member.name} className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] lg:max-w-[300px]">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
    <BrutFooter />
  </BrutPage>
);

export default MeetTheTeam;
