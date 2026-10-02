const About = () => {
  return (
    <section id="about" className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-24">
        {/* About */}
        <div
          data-aos="fade-up"
          className="flex flex-col items-center gap-10 md:flex-row md:gap-24"
        >
          <div className="flex h-56 w-56 shrink-0 items-center justify-center rounded-full border border-[rgba(2,37,84,0.12)] bg-white p-8 shadow-[0_12px_32px_rgba(2,37,84,0.15)] sm:h-72 sm:w-72 md:h-[220px] md:w-[220px] lg:h-[260px] lg:w-[260px]">
            <img
              src="/assets/hero/logo.png"
              alt="TechTatva '26"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-1 flex-col items-start gap-4 text-left">
            <p className="font-label text-[9px] uppercase tracking-[1.62px] text-[#004aad]">
              About us
            </p>
            <p className="font-display text-5xl font-semibold text-[#022554] sm:text-6xl">
              TechTatva &apos;26
            </p>
            <div className="h-[2px] w-18 rounded-full bg-[linear-gradient(90deg,#6ff4fa_0%,#5e17eb_33%,#ffaa06_66%,#00bf63_100%)]" />
            <p className="text-base leading-relaxed text-[rgba(2,37,84,0.84)]">
              TechTatva is the annual technical fest of Manipal Institute of Technology,
              bringing together technology, innovation and competition on a common
              platform. From robotics and automobiles to artificial intelligence,
              cybersecurity, quantitative finance, biomedical challenges, electronics,
              astronomy and strategic simulations, TechTatva &apos;26 brings together
              diverse forms of technological thinking.
            </p>
            <p className="text-base leading-relaxed text-[rgba(2,37,84,0.84)]">
              This year, 16 categories and 34 events unfold across four alternate
              realities: worlds built around different forces, challenges and
              possibilities.
            </p>
          </div>
        </div>

        {/* Our Legacy */}
        <div
          data-aos="fade-up"
          className="flex flex-col items-center gap-10 md:flex-row-reverse md:gap-24"
        >
          <div className="flex h-56 w-56 shrink-0 items-center justify-center rounded-full border border-[rgba(2,37,84,0.12)] bg-white p-8 shadow-[0_12px_32px_rgba(2,37,84,0.15)] sm:h-72 sm:w-72 md:h-[220px] md:w-[220px] lg:h-[260px] lg:w-[260px]">
            <img
              src="/assets/about/mit-crest.png"
              alt="MIT Manipal crest"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-1 flex-col items-start gap-4 text-left">
            <p className="font-label text-[9px] uppercase tracking-[1.62px] text-[#004aad]">
              Manipal Institute of Technology
            </p>
            <p className="font-display text-5xl font-semibold text-[#022554] sm:text-6xl">
              Our Legacy
            </p>
            <div className="h-[2px] w-18 rounded-full bg-[linear-gradient(90deg,#6ff4fa_0%,#5e17eb_33%,#ffaa06_66%,#00bf63_100%)]" />
            <p className="text-base leading-relaxed text-[rgba(2,37,84,0.84)]">
              Since time immemorial, TechTatva has been consistently a massive success.
              The campus hosts a plethora of events, each catering to its own audience,
              letting every participant hone their skills and put them to the test.
            </p>
            <p className="text-base leading-relaxed text-[rgba(2,37,84,0.84)]">
              MIT Manipal encourages communication with students from all over the
              country and unity of thought, a festival that celebrates unity among
              students across the country. [Needed: legacy facts — founding year, past
              editions]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
