import type { ReactNode } from "react";

interface SignUpTypeCardProps {
  label: string;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}

const SignUpTypeCard = ({ label, icon, active, onClick }: SignUpTypeCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-medium transition-colors ${
        active
          ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
          : "border-white/10 text-gray-400 hover:border-white/30"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
};

export default SignUpTypeCard;
