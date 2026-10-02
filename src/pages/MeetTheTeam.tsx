import { CONVENERS, DEVELOPERS, type TeamMember } from "../data/team";
import { InstagramIcon, LinkedinIcon } from "../components/SocialIcons";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TeamCard = ({ member }: { member: TeamMember }) => (
  <div
    data-aos="fade-up"
    className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center"
  >
    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10 font-display text-xl text-cyan-300">
      {initials(member.name)}
    </div>
    <h3 className="font-display text-sm font-semibold text-white">{member.name}</h3>
    <p className="mt-1 text-xs text-gray-500">{member.role}</p>
    <div className="mt-3 flex gap-3">
      {member.instagram && (
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on Instagram`}
          className="text-gray-500 hover:text-cyan-300"
        >
          <InstagramIcon className="h-4 w-4" />
        </a>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="text-gray-500 hover:text-cyan-300"
        >
          <LinkedinIcon className="h-4 w-4" />
        </a>
      )}
    </div>
  </div>
);

const MeetTheTeam = () => {
  return (
    <div className="min-h-screen w-full bg-[#05070d] pb-24 pt-32">
      <section className="mx-auto max-w-6xl px-6">
        <div data-aos="fade-up" className="text-center">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Meet the Team
          </h1>
          <p className="mt-4 text-gray-400">
            Placeholder roster — swap in the real organizing committee.
          </p>
        </div>

        <h2 className="mt-16 text-center font-display text-xl font-semibold text-white">
          Conveners
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {CONVENERS.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        <h2 className="mt-16 text-center font-display text-xl font-semibold text-white">
          Developers
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3">
          {DEVELOPERS.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MeetTheTeam;
