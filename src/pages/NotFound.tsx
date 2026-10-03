import { BrutFooter, BrutNav, BrutPage, Button } from "../components/Brut";

interface NotFoundProps {
  onNavigate: (page: string) => void;
}

const NotFound = ({ onNavigate }: NotFoundProps) => (
  <BrutPage>
    <BrutNav onNavigate={onNavigate} />
    <main className="mx-auto flex min-h-[70vh] w-full max-w-[1440px] flex-col items-start justify-center gap-5 px-4 py-20 lg:px-14">
      <p className="font-anton text-[clamp(120px,22vw,300px)] leading-[0.85] text-brut-ink lp-glitch-hero">404</p>
      <p className="font-anton text-[clamp(36px,4vw,56px)] leading-[0.95] text-brut-ink uppercase">This page doesn't exist.</p>
      <p className="max-w-[560px] font-inter text-[18px] leading-normal text-brut-body">
        The page you were looking for has moved, or never existed. Head back to the landing page to find your way.
      </p>
      <Button variant="ink" large onClick={() => onNavigate("home")}>Back to home</Button>
    </main>
    <BrutFooter />
  </BrutPage>
);

export default NotFound;
