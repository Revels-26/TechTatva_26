interface NotFoundProps {
  onNavigate: (page: string) => void;
}

const NotFound = ({ onNavigate }: NotFoundProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#05070d] px-6 text-center">
      <p className="font-display text-7xl font-bold text-cyan-400 sm:text-8xl">404</p>
      <p className="mt-4 text-gray-400">This page doesn't exist.</p>
      <button
        type="button"
        onClick={() => onNavigate("home")}
        className="mt-8 rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 hover:bg-cyan-400"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
