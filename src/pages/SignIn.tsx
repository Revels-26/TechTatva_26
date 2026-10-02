import { useState } from "react";
import GetOtp from "../components/GetOtp";

interface SignInProps {
  onNavigate: (page: string) => void;
}

// UI-only mockup — no real sign-in happens here. Actual registration/auth lives on
// the separate registration system this site links out to.
const SignIn = ({ onNavigate }: SignInProps) => {
  const [step, setStep] = useState<"mobile" | "otp">("mobile");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#05070d] px-4 pt-24">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <h2 className="text-center font-display text-xl tracking-wide text-white">
          SIGN IN
        </h2>

        <div className="relative mt-6 overflow-hidden">
          <div
            className={`transition-all duration-300 ease-in-out ${
              step === "mobile"
                ? "translate-x-0 opacity-100"
                : "pointer-events-none absolute inset-0 -translate-x-4 opacity-0"
            }`}
          >
            <label className="mb-2 block text-xs text-gray-400">MOBILE NUMBER</label>
            <input
              type="tel"
              placeholder="+91 00000 00000"
              className="mb-4 w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setStep("otp")}
              className="w-full rounded-full bg-cyan-500 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.01] hover:bg-cyan-400 active:scale-[0.98]"
            >
              Sign In
            </button>
          </div>

          <GetOtp active={step === "otp"} onBack={() => setStep("mobile")} />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => onNavigate("signup")}
            className="text-cyan-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
