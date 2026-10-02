import { useState } from "react";
import { GraduationCap, Briefcase, UserRound } from "lucide-react";
import GetOtp from "../components/GetOtp";
import SignUpTypeCard from "../components/SignUpTypeCard";

interface SignUpProps {
  onNavigate: (page: string) => void;
}

type RegType = "mahe" | "non-mahe" | "faculty";

// UI-only mockup — matches Revels' step flow (type -> form -> OTP). No real
// validation or network calls; actual registration happens on a separate system.
const SignUp = ({ onNavigate }: SignUpProps) => {
  const [step, setStep] = useState<"type" | "form" | "otp">("type");
  const [regType, setRegType] = useState<RegType>("mahe");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#05070d] px-4 pt-24">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <h2 className="text-center font-display text-xl tracking-wide text-white">
          SIGN UP
        </h2>

        <div className="relative mt-6 overflow-hidden">
          {/* Step 1 — type select */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              step === "type"
                ? "translate-x-0 opacity-100"
                : "pointer-events-none absolute inset-0 -translate-x-4 opacity-0"
            }`}
          >
            <p className="mb-4 text-center text-xs text-gray-400">
              SELECT REGISTRATION TYPE
            </p>

            <div className="mb-6 grid grid-cols-3 gap-3">
              <SignUpTypeCard
                label="MIT Manipal"
                icon={<GraduationCap size={20} />}
                active={regType === "mahe"}
                onClick={() => setRegType("mahe")}
              />
              <SignUpTypeCard
                label="Other College"
                icon={<UserRound size={20} />}
                active={regType === "non-mahe"}
                onClick={() => setRegType("non-mahe")}
              />
              <SignUpTypeCard
                label="Faculty/Alumni"
                icon={<Briefcase size={20} />}
                active={regType === "faculty"}
                onClick={() => setRegType("faculty")}
              />
            </div>

            <button
              type="button"
              onClick={() => setStep("form")}
              className="w-full rounded-full bg-cyan-500 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.01] hover:bg-cyan-400 active:scale-[0.98]"
            >
              Continue
            </button>
          </div>

          {/* Step 2 — form */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              step === "form"
                ? "translate-x-0 opacity-100"
                : "pointer-events-none absolute inset-0 translate-x-4 opacity-0"
            }`}
          >
            {regType === "mahe" && (
              <input
                type="text"
                placeholder="Registration Number"
                className="mb-3 w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none"
              />
            )}
            {regType !== "mahe" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="mb-3 w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="mb-3 w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none"
                />
              </>
            )}
            <input
              type="tel"
              placeholder="Phone Number"
              className="mb-6 w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setStep("otp")}
              className="w-full rounded-full bg-cyan-500 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.01] hover:bg-cyan-400 active:scale-[0.98]"
            >
              Get OTP
            </button>
            <button
              type="button"
              onClick={() => setStep("type")}
              className="mt-3 w-full text-center text-xs text-gray-500 hover:text-gray-300"
            >
              Back
            </button>
          </div>

          {/* Step 3 — OTP */}
          <GetOtp active={step === "otp"} onBack={() => setStep("form")} />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => onNavigate("signin")}
            className="text-cyan-400 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
