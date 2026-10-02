import SectionHeader from "./SectionHeader";
import FeatureCard from "./FeatureCard";
import { SITE } from "../config/site";

const COMBOS = [
  {
    id: "flagship-merch",
    media: "/assets/combo/flagship-merch.png",
    eyebrow: "Combo offer",
    title: "Flagship + Merch",
    description:
      "Get the Flagship Pass, the Proshow Pass and the Official TechTatva '26 Merchandise.",
    price: "₹500",
    actionLabel: "Buy combo",
  },
  {
    id: "general-merch",
    media: "/assets/combo/general-merch.png",
    eyebrow: "Combo offer",
    title: "General + Merch",
    description:
      "Get the General Pass, the Proshow Pass and the Official TechTatva '26 Merchandise.",
    price: "₹250",
    actionLabel: "Buy combo",
  },
];

const Combo = () => {
  return (
    <section className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-16">
        <SectionHeader eyebrow="Bundles" title="Combo Deals" />

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {COMBOS.map((combo) => (
            <FeatureCard key={combo.id} {...combo} href={SITE.registerUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Combo;
