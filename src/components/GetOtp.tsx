import { useState } from "react";
import toast from "react-hot-toast";

interface GetOtpProps {
  active: boolean;
  onBack: () => void;
}

// UI-only OTP step — no real OTP is sent or verified. Registration happens on a
// separate system; this mirrors Revels' mockup flow for visual/structural parity.
const GetOtp = ({ active, onBack }: GetOtpProps) => {
  const [digits, setDigits] = useState(["", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);

    if (value && index < digits.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    toast.success("This is a UI preview — real verification happens on registration.", {
      duration: 4000,
    });
  };

  const handleResend = () => {
    toast("Resend is disabled in this preview.", { icon: "ℹ️" });
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        active
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none absolute inset-0 translate-x-4 opacity-0"
      }`}
    >
      <label className="mb-2 block text-xs text-gray-400">ENTER OTP</label>

      <div className="mb-3 flex justify-between gap-2">
        {digits.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            maxLength={1}
            inputMode="numeric"
            className="h-10 w-10 rounded-md border border-white/15 bg-white/[0.03] text-center text-sm text-white focus:border-cyan-400 focus:outline-none"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleResend}
        className="mb-4 w-full text-right text-xs text-cyan-400 hover:underline"
      >
        Resend OTP
      </button>

      <button
        type="button"
        onClick={handleVerify}
        className="w-full rounded-full bg-cyan-500 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.01] hover:bg-cyan-400 active:scale-[0.98]"
      >
        Verify OTP
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 w-full text-center text-xs text-gray-500 hover:text-gray-300"
      >
        Back
      </button>
    </div>
  );
};

export default GetOtp;
