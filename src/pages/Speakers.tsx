import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Mic2 } from "lucide-react";
import { saveEmail } from "../utils/notifyMe";

// Flip to false once a real speaker lineup is confirmed — the card grid below is
// ready to go, it just needs real names/photos swapped in.
export const SHOW_COMING_SOON = true;

const PLACEHOLDER_SPEAKERS = [
  { name: "Speaker Name", role: "Keynote Speaker", day: "Day 1" },
  { name: "Speaker Name", role: "Industry Expert", day: "Day 1" },
  { name: "Speaker Name", role: "Keynote Speaker", day: "Day 2" },
  { name: "Speaker Name", role: "Panelist", day: "Day 2" },
];

const Speakers = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotifySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    const result = saveEmail("speakers", email.trim());
    setIsSubmitting(false);

    if (result === "duplicate") {
      toast("You're already on the list!", { icon: "ℹ️" });
    } else {
      toast.success("You'll be notified when speakers are announced!");
      setEmail("");
    }
  };

  if (SHOW_COMING_SOON) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#05070d] px-6 pt-24 text-center">
        <Mic2 className="mb-6 text-cyan-400" size={40} />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
          Coming Soon
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
          Keynote Speakers
        </h1>
        <p className="mt-4 max-w-md text-gray-400">
          Our speaker lineup is still being finalized. Drop your email and we'll let
          you know the moment it's announced.
        </p>

        <form
          onSubmit={handleNotifySubmit}
          className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 hover:bg-cyan-400 disabled:opacity-60"
          >
            Notify Me
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#05070d] pb-24 pt-32">
      <section className="mx-auto max-w-6xl px-6">
        <div data-aos="fade-up" className="text-center">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Keynote Speakers
          </h1>
          <p className="mt-4 text-gray-400">Placeholder lineup — swap in real speakers.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLACEHOLDER_SPEAKERS.map((speaker, i) => (
            <div
              key={i}
              data-aos="fade-up"
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10 font-display text-xl text-cyan-300">
                {speaker.name.charAt(0)}
              </div>
              <h3 className="font-display text-sm font-semibold text-white">
                {speaker.name}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{speaker.role}</p>
              <span className="mt-3 rounded-full bg-white/5 px-3 py-1 text-[10px] text-gray-400">
                {speaker.day}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Speakers;
