import { CONVENERS, DEVELOPERS, type TeamMember } from "../data/team";
import { InstagramIcon, LinkedinIcon } from "../components/SocialIcons";
import { AppNav, BrutFooter, BrutPage, SectionHead } from "../components/Brut";
import { shadowFor } from "../lib/shadows";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TeamCard = ({ member }: { member: TeamMember }) => (
  <div
    className="flex flex-col items-center gap-3 border-3 border-brut-ink bg-brut-cream p-6 text-center"
    style={{ boxShadow: `6px 6px 0px 0px ${shadowFor(member.name)}` }}
  >
    <div className="flex size-20 items-center justify-center border-3 border-brut-ink bg-brut-red font-anton text-[26px] text-brut-cream">
      {initials(member.name)}
    </div>
    <p className="font-anton text-[22px] leading-[1] text-brut-ink uppercase">{member.name}</p>
    <p className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] text-brut-body uppercase">{member.role}</p>
    <div className="flex gap-3 text-brut-ink">
      {member.instagram && (
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on Instagram`}
          className="hover:text-brut-pink"
        >
          <InstagramIcon className="h-5 w-5" />
        </a>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="hover:text-brut-pink"
        >
          <LinkedinIcon className="h-5 w-5" />
        </a>
      )}
    </div>
  </div>
);

const MeetTheTeam = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <BrutPage>
    <AppNav onNavigate={onNavigate} page="meettheteam" />
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-20 lg:px-14">
      <h1 className="pt-[50px] font-anton text-[clamp(52px,5.84vw,84px)] leading-[0.95] text-brut-ink uppercase lp-glitch lg:pt-20">
        Meet the team
      </h1>
      <p className="mt-4 font-inter text-[18px] text-brut-body">
        Placeholder roster. Swap in the real organizing committee.
      </p>

      <SectionHead>Conveners</SectionHead>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CONVENERS.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>

      <SectionHead>Developers</SectionHead>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DEVELOPERS.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </main>
    <BrutFooter />
  </BrutPage>
);

export default MeetTheTeam;
