import { AppNav, BrutFooter, BrutPage, Button } from "../components/Brut";

interface ComingSoonProps {
  onNavigate: (page: string) => void;
}

// Shown in place of the registration site (login, pass and ticket purchases) until sales open.
const ComingSoon = ({ onNavigate }: ComingSoonProps) => (
  <BrutPage>
    <AppNav onNavigate={onNavigate} page="comingsoon" />
    <main className="mx-auto flex min-h-[70vh] w-full max-w-[1440px] flex-col items-start justify-center gap-5 px-4 py-20 lg:px-14">
      <div className="border-3 border-brut-ink bg-brut-cream px-3 py-1.5 drop-shadow-[5px_5px_0px_#2db84d]">
        <p className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] text-brut-ink uppercase">Coming soon</p>
      </div>
      <p className="font-anton text-[clamp(90px,16vw,220px)] leading-[0.85] text-brut-ink uppercase">
        Coming <span className="text-[#1f5fd6]">soon</span>
      </p>
      <p className="font-anton text-[clamp(36px,4vw,56px)] leading-[0.95] text-brut-ink uppercase">Login and passes open soon.</p>
      <p className="max-w-[560px] font-inter text-[18px] leading-normal text-brut-body">
        Registration and pass sales for TechTatva 26 are not open yet. Check back soon.
      </p>
      <Button variant="ink" large onClick={() => onNavigate("home")}>Back to home</Button>
    </main>
    <BrutFooter />
  </BrutPage>
);

export default ComingSoon;
