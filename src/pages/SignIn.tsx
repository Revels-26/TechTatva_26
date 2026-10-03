import { useState } from "react";
import type { FormEvent } from "react";
import { BrutFooter, BrutNav, BrutPage, Button } from "../components/Brut";

// Login page (Figma "D3 Login"). The sign-in itself is handled by the separate
// registration system this site links out to, so there is no backend call here.
export default function SignIn({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Per-viewer convenience flag read by the Events page to unlock the event list.
    try {
      window.localStorage.setItem("tt26-signed-in", "1");
    } catch {
      // Storage can be blocked; the events page then stays locked.
    }
    onNavigate("events");
  };

  const labelClass =
    "font-roboto-mono text-[11px] font-bold leading-normal tracking-[1.1px] text-brut-ink uppercase whitespace-nowrap";
  const fieldClass =
    "w-full border-2 border-brut-ink bg-white px-3 py-3 font-inter text-[16px] leading-normal text-brut-ink placeholder:text-[#8d887b] focus:outline-none";

  return (
    <BrutPage>
      <BrutNav onNavigate={onNavigate} />

      <main className="flex w-full justify-center px-4 pt-[30px] pb-[60px] lg:px-14 lg:pt-[70px] lg:pb-[140px]">
        <div className="relative flex w-full max-w-[560px] flex-col items-start gap-[18px] border-3 border-brut-ink bg-brut-cream px-5 pt-11 pb-8 drop-shadow-[9px_9px_0px_#12110f] lg:px-9">
          <div className="absolute top-[-19px] left-[19px] bg-brut-ink px-3 py-1">
            <p className="font-roboto-mono text-[11px] font-bold leading-normal tracking-[1.1px] whitespace-nowrap text-brut-cream uppercase">
              Welcome back
            </p>
          </div>

          <h1 className="font-anton text-[64px] leading-[0.95] whitespace-nowrap text-brut-ink uppercase [text-shadow:4px_0px_0px_#ff2d55,-4px_0px_0px_#00b8d9] lg:text-[90px]">
            Log in
          </h1>

          <p className="font-inter text-[16px] leading-normal text-[#3c3a33]">
            Use your college ID or your email. Events are only shown to registered travellers.
          </p>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-[18px]">
            <div className="flex w-full flex-col gap-[6px]">
              <label htmlFor="signin-identity" className={labelClass}>
                College ID or email
              </label>
              <input
                id="signin-identity"
                type="text"
                autoComplete="username"
                placeholder="CS2024-001"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="flex w-full flex-col gap-[6px]">
              <label htmlFor="signin-password" className={labelClass}>
                Password
              </label>
              <div className="flex w-full items-center gap-3 border-2 border-brut-ink bg-white px-3 py-3 focus-within:outline-none">
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent font-inter text-[16px] leading-normal text-brut-ink placeholder:text-[#8d887b] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="shrink-0 cursor-pointer font-roboto-mono text-[12px] font-bold text-[#6b675c] uppercase"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex w-full [&>button]:w-full">
              <Button variant="ink" type="submit">
                Log in
              </Button>
            </div>
          </form>

          <p className="font-inter text-[15px] leading-normal whitespace-nowrap text-[#6b675c]">
            No account yet?{" "}
            <button
              type="button"
              onClick={() => onNavigate("signup")}
              className="cursor-pointer font-bold text-brut-ink underline"
            >
              Register
            </button>
          </p>
        </div>
      </main>

      <BrutFooter />
    </BrutPage>
  );
}
