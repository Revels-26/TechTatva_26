import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { AppNav, BrutFooter, BrutPage, scrollToId } from "../components/Brut";

// Registration page (Figma "D3 Registration" frames: desktop 1440, success 1440, mobile 390).
// UI only: no backend call. Submitting the form shows the success state.

type FormState = {
  fullName: string;
  collegeId: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
};

const EMPTY_FORM: FormState = {
  fullName: "",
  collegeId: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
};

const UNIVERSES = [
  { n: 1, year: "1st year" },
  { n: 2, year: "2nd year" },
  { n: 3, year: "3rd year" },
  { n: 4, year: "4th year" },
];

const TICKER_TEXT =
  "ONE ACCOUNT // THREE DAYS // EVERY CLUB'S EVENTS // MEANWHILE, IN ANOTHER UNIVERSE... // ".repeat(4);


// Barcode bars, one class string per bar (kept as literals so Tailwind picks them up).
const STUB_BARS = [
  "w-[3.5px]", "w-[1.5px]", "w-[2.5px]", "w-[3.5px]", "w-[2.5px]",
  "w-[2.5px]", "w-[3.5px]", "w-[3.5px]", "w-[2.5px]",
];
const CARD_BARS = [
  "w-px", "w-[2px]", "w-[3px]", "w-[2px]", "w-[2px]", "w-[2px]", "w-[3px]", "w-[2px]", "w-[3px]", "w-[3px]",
  "w-[2px]", "w-px", "w-px", "w-[2px]", "w-[2px]", "w-px", "w-[2px]", "w-px", "w-[2px]", "w-[3px]",
  "w-[3px]", "w-[3px]", "w-px", "w-[3px]", "w-px", "w-[3px]", "w-[2px]", "w-[3px]", "w-px", "w-px",
];

const inputClass =
  "w-full border-2 border-brut-ink bg-white p-3 font-inter text-[16px] text-brut-ink placeholder:text-[#8d887b] focus:outline-none focus:drop-shadow-[4px_4px_0px_#ff2d55]";

const solidButtonClass =
  "inline-flex cursor-pointer items-center justify-center border-3 border-brut-ink bg-brut-ink px-[22px] py-[13px] font-anton text-[22px] leading-[0.95] tracking-[1.76px] whitespace-nowrap uppercase text-brut-cream drop-shadow-[6px_6px_0px_#59a7ff]";

// Image pair: the mobile artwork at <lg, the desktop artwork at lg and up.
const ArtImg = ({ m, d, className }: { m: string; d: string; className: string }) => (
  <>
    <img src={`/assets/landing/${m}.svg`} alt="" aria-hidden="true" className={`${className} lg:hidden`} />
    <img src={`/assets/landing/${d}.svg`} alt="" aria-hidden="true" className={`${className} hidden lg:block`} />
  </>
);

const Bars = ({ bars, heightClass, className = "" }: { bars: string[]; heightClass: string; className?: string }) => (
  <div className={`flex shrink-0 items-start ${className}`}>
    {bars.map((w, i) => (
      <div key={i} className={`${w} ${heightClass} shrink-0 bg-brut-ink`} />
    ))}
  </div>
);

const Field = ({ id, label, children }: { id: string; label: string; children: ReactNode }) => (
  <div className="flex min-w-0 flex-col gap-1.5">
    <label htmlFor={id} className="font-roboto-mono text-[11px] font-bold tracking-[1.1px] text-brut-ink uppercase">
      {label}
    </label>
    {children}
  </div>
);

const Hero = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-[30px] px-4 pt-5 pb-10 lg:flex-row lg:items-center lg:gap-10 lg:px-14 lg:pt-10 lg:pb-[60px]">
    <div className="flex w-full flex-col items-start gap-5 lg:w-[720px] lg:shrink-0">
      <div className="inline-flex border-3 border-brut-ink bg-brut-cream px-3 py-1.5 drop-shadow-[5px_5px_0px_#2db84d]">
        <p className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] whitespace-nowrap text-brut-ink uppercase">
          Meanwhile, in another universe...
        </p>
      </div>
      <h1 className="font-anton text-[76px] leading-[0.92] text-brut-ink uppercase lg:text-[142px]">
        <span className="block">You join</span>
        <span className="block">the</span>
        <span className="block">Tatverse</span>
      </h1>
      <p className="bg-[rgba(239,236,226,0.9)] px-2.5 py-2 font-inter text-[16px] leading-normal text-[#2c2a25] lg:text-[18px]">
        Create your account once. Pick the universe you belong to. After you log in, choose which events to join across the TechTatva 26.
      </p>
      <div className="flex flex-wrap items-center gap-5">
        <button
          type="button"
          onClick={() => scrollToId("register")}
          className="inline-flex cursor-pointer items-center justify-center border-3 border-brut-ink bg-brut-ink px-7 py-4 font-anton text-[22px] leading-[0.95] tracking-[1.76px] whitespace-nowrap uppercase text-brut-cream drop-shadow-[6px_6px_0px_#59a7ff] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          Register now
        </button>
        <button
          type="button"
          onClick={() => onNavigate("signin")}
          className="cursor-pointer font-inter text-[15px] font-bold text-brut-ink underline underline-offset-4"
        >
          Already a member? Log in
        </button>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
          <span className="text-[#1f5fd6]">1</span> account
        </span>
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
          <span className="text-[#1f5fd6]">3</span> days
        </span>
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
          <span className="text-[#1f5fd6]">Every</span> club's events
        </span>
      </div>
    </div>

    {/* Planet, ring, moon and ticket. Positions are percentages of the art box, so it scales with the breakpoint. */}
    <div className="relative aspect-[358/320] w-full max-w-[358px] lg:aspect-[500/480] lg:max-w-[500px] lg:shrink-0">
      <div className="absolute top-0 left-[5.6%] aspect-square w-[76.8%] lg:left-[4%] lg:w-[83.6%]">
        <div className="absolute top-[16.36%] left-[16.36%] aspect-square w-[67.27%] overflow-hidden rounded-full border-4 border-brut-ink bg-brut-cream shadow-[10px_10px_0px_0px_#12110f]">
          <ArtImg m="4edb6" d="70295" className="absolute -top-[1.42%] -left-[1.42%] w-[100.4%] max-w-none" />
          <ArtImg m="c5a02" d="6658e" className="absolute top-[11.6%] left-[15.6%] w-[15%] max-w-none" />
          <ArtImg m="61957" d="9e4b2" className="absolute top-[48.6%] left-[43.6%] w-1/2 max-w-none mix-blend-multiply" />
        </div>
        <div className="absolute -left-[0.74%] top-[16.64%] flex h-[66.7%] w-[101.5%] items-center justify-center">
          <ArtImg m="f6fe2" d="c57e7" className="w-[96.6%] max-w-none -rotate-[24deg]" />
        </div>
        <ArtImg m="8d137" d="82e23" className="absolute top-[30%] left-[80%] w-[7.27%] max-w-none" />
      </div>

      <div className="absolute top-[81.7%] left-[66%] flex -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] items-start border-3 border-brut-ink bg-brut-cream drop-shadow-[7px_7px_0px_#12110f]">
        <div className="flex w-[179px] flex-col items-start gap-1 p-[11px] whitespace-nowrap uppercase lg:w-[265px] lg:p-[17px]">
          <p className="font-roboto-mono text-[9.2px] font-bold tracking-[1.3px] text-[#c8102e] lg:text-[13.6px] lg:tracking-[1.9px]">
            Admit one
          </p>
          <div className="font-anton text-[34.5px] leading-[0.95] text-brut-ink [text-shadow:2px_0px_0px_#ff2d55,-2px_0px_0px_#00b8d9] lg:text-[51px]">
            <p>Tech</p>
            <p>Tatva</p>
          </div>
          <p className="font-roboto-mono text-[9px] font-bold text-[#6b675c] lg:text-[12.24px]">2026 // 14-16 Oct</p>
        </div>
        <div className="flex w-[51px] flex-col items-center justify-center self-stretch border-l-[3px] border-dashed border-brut-ink p-[7px] lg:w-[75px] lg:p-[10px]">
          <Bars bars={STUB_BARS} heightClass="h-[64px] lg:h-[95px]" className="gap-0.5" />
        </div>
      </div>
    </div>
  </section>
);

const Ticker = () => (
  <div className="h-[46px] overflow-hidden bg-brut-ink">
    <p className="-ml-10 flex h-full items-center font-roboto-mono text-[15px] font-bold tracking-[1.2px] whitespace-nowrap text-brut-cream">
      {TICKER_TEXT}
    </p>
  </div>
);

const TravellerTab = () => (
  <span className="absolute -top-[19px] left-[19px] bg-brut-ink px-3 py-1 font-roboto-mono text-[11px] font-bold tracking-[1.1px] whitespace-nowrap text-brut-cream uppercase">
    Traveller card
  </span>
);

const RegisterForm = ({ onSubmit }: { onSubmit: (fullName: string) => void }) => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [universe, setUniverse] = useState(1);

  const update = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form.fullName);
  };

  return (
    <div className="relative flex w-full flex-col border-3 border-brut-ink bg-brut-cream px-5 pt-[38px] pb-[30px] drop-shadow-[9px_9px_0px_#59a7ff] lg:w-[580px] lg:px-[34px]">
      <TravellerTab />

      <div className="flex items-end justify-between gap-4 pb-4">
        <div className="flex min-w-0 flex-col gap-0.5 uppercase">
          <span className="font-roboto-mono text-[11px] font-bold tracking-[1.32px] text-[#6b675c]">Traveller</span>
          <span className="truncate font-anton text-[30px] leading-[0.95] text-brut-ink">
            {form.fullName.trim() || "Unnamed"}
          </span>
        </div>
        <Bars bars={CARD_BARS} heightClass="h-[34px]" className="gap-[1.5px]" />
      </div>

      <div className="w-full border-t-2 border-dashed border-brut-ink" />

      <form
        onSubmit={handleSubmit}
        className="mt-5 grid grid-cols-1 gap-x-[18px] gap-y-5 lg:grid-cols-2"
      >
        <Field id="fullName" label="Full name">
          <input
            id="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Asha Rao"
            value={form.fullName}
            onChange={update("fullName")}
            className={inputClass}
          />
        </Field>
        <Field id="collegeId" label="College ID">
          <input
            id="collegeId"
            type="text"
            required
            placeholder="CS2024-001"
            value={form.collegeId}
            onChange={update("collegeId")}
            className={inputClass}
          />
        </Field>
        <Field id="email" label="College email">
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@college.edu"
            value={form.email}
            onChange={update("email")}
            className={inputClass}
          />
        </Field>
        <Field id="phone" label="Phone">
          <input
            id="phone"
            type="tel"
            required
            autoComplete="tel"
            pattern="[0-9]{10}"
            placeholder="10 digit mobile number"
            value={form.phone}
            onChange={update("phone")}
            className={inputClass}
          />
        </Field>
        <Field id="password" label="Password">
          <div className="flex items-center justify-between gap-2 border-2 border-brut-ink bg-white p-3">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="8+ letters and digits"
              value={form.password}
              onChange={update("password")}
              className="min-w-0 flex-1 bg-transparent font-inter text-[16px] text-brut-ink placeholder:text-[#8d887b] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="shrink-0 cursor-pointer font-roboto-mono text-[12px] font-bold text-[#6b675c]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>
        <Field id="confirm" label="Confirm password">
          <input
            id="confirm"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Type it again"
            value={form.confirm}
            onChange={update("confirm")}
            className={inputClass}
          />
        </Field>

        <div className="col-span-full flex flex-col gap-2">
          <p className="flex flex-wrap items-baseline gap-x-2 font-roboto-mono text-[11px] font-bold tracking-[1.1px] text-brut-ink uppercase">
            Pick your universe
            <span className="font-inter text-[11px] font-normal tracking-normal normal-case text-[#6b675c]">
              your year of study
            </span>
          </p>
          <div className="flex gap-2.5">
            {UNIVERSES.map((u) => {
              const active = universe === u.n;
              return (
                <button
                  key={u.n}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setUniverse(u.n)}
                  className={`flex min-w-0 flex-1 cursor-pointer flex-col items-center border-2 border-brut-ink py-2 ${
                    active ? "bg-brut-ink text-brut-cream" : "bg-white text-brut-ink"
                  }`}
                >
                  <span className="font-anton text-[36px] leading-[0.95] uppercase">{u.n}</span>
                  <span className="font-roboto-mono text-[10px] font-bold">Universe {u.n}</span>
                  <span className={`font-inter text-[10px] ${active ? "text-brut-cream/80" : "text-[#6b675c]"}`}>
                    {u.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button type="submit" className={`${solidButtonClass} col-span-full w-full`}>
          Enter the TechTatva 26
        </button>
      </form>
    </div>
  );
};

const WelcomeCard = ({ name, onContinue }: { name: string; onContinue: () => void }) => {
  const firstName = name.trim().split(/\s+/)[0] ?? "";
  return (
    <div className="relative flex w-full flex-col items-center border-3 border-brut-ink bg-brut-cream px-6 pt-[54px] pb-[30px] drop-shadow-[9px_9px_0px_#12110f] lg:w-[580px] lg:px-[34px]">
      <TravellerTab />

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="inline-flex border-3 border-brut-ink bg-brut-cream px-3 py-1.5 drop-shadow-[5px_5px_0px_#2db84d]">
          <p className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] whitespace-nowrap text-brut-ink uppercase">
            You're in!
          </p>
        </div>
        <h2 className="font-anton text-[40px] leading-[0.95] text-brut-ink uppercase [text-shadow:3px_0px_0px_#ff2d55,-3px_0px_0px_#00b8d9] lg:text-[60px]">
          You joined the TechTatva 26{firstName ? `, ${firstName}` : ""}!
        </h2>
        <p className="max-w-[440px] font-inter text-[16px] leading-normal text-[#3c3a33]">
          You are now a traveller of the TechTatva 26. Next, pick the events you want to join.
        </p>
        <p className="font-roboto-mono text-[15px] font-bold whitespace-nowrap text-brut-ink">Traveller MV-02401</p>
        <button type="button" onClick={onContinue} className={`${solidButtonClass} cursor-pointer`}>
          Continue to events
        </button>
      </div>

      <div className="absolute top-[23px] right-4 -rotate-[11deg] border-4 border-[#ff2d55] bg-[rgba(255,253,247,0.7)] px-4 py-1.5 lg:right-[50px]">
        <span className="font-anton text-[30px] leading-[0.95] tracking-[3.6px] whitespace-nowrap text-[#ff2d55] uppercase">
          Joined
        </span>
      </div>
    </div>
  );
};

export default function SignUp({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  return (
    <BrutPage>
      <AppNav onNavigate={onNavigate} page="signup" />

      {!submitted && (
        <>
          <Hero onNavigate={onNavigate} />
          <Ticker />
        </>
      )}

      <section
        id="register"
        className="scroll-mt-6 mx-auto flex w-full max-w-[1440px] flex-col gap-9 px-4 py-[50px] lg:flex-row lg:items-start lg:gap-[70px] lg:px-[100px] lg:py-[90px]"
      >
        <div className="flex flex-col items-start gap-1.5">
          <p
            aria-hidden="true"
            className="font-anton text-[130px] leading-[0.95] text-[#59a7ff] uppercase drop-shadow-[4px_4px_0px_#2db84d] [-webkit-text-stroke:3px_#12110f] lg:text-[210px]"
          >
            01
          </p>
          <h2 className="font-anton text-[56px] leading-[0.95] whitespace-nowrap text-brut-ink uppercase lg:text-[72px]">
            Register
          </h2>
          <p className="max-w-[320px] bg-[rgba(239,236,226,0.9)] px-2 py-1.5 font-inter text-[16px] leading-normal text-[#3c3a33] lg:max-w-[330px]">
            One form, about a minute. Your traveller card fills in as you type.
          </p>
        </div>

        {submitted ? (
          <WelcomeCard
            name={name}
            onContinue={() => onNavigate("events")}
          />
        ) : (
          <RegisterForm
            onSubmit={(fullName) => {
              setName(fullName);
              setSubmitted(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </section>

      <BrutFooter />
    </BrutPage>
  );
}
