import { useState, type FormEvent } from "react";
import { SITE } from "../config/site";
import { CONTACT_GROUPS } from "../data/contacts";
import { Button, SectionHead } from "./Brut";
import { Reveal } from "./Reveal";

const cardClass = "flex flex-col gap-5 border-3 border-brut-ink bg-white p-6 lg:p-8";
const cardShadow = { boxShadow: "8px 8px 0px 0px #12110f" };
const inputClass =
  "w-full border-3 border-brut-ink bg-white px-4 py-3 font-inter text-[15px] text-brut-ink placeholder:text-brut-body/60 focus:outline-none focus:bg-[#E8F1FB]";
const labelClass = "font-roboto-mono text-[12px] font-bold tracking-[0.6px] text-brut-ink uppercase";

// Mail: the form opens the visitor's mail app with the message filled in, addressed to the team.
const MailCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email and message.");
      return;
    }
    setError(null);
    const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`;
    const subject = `TechTatva '26 enquiry from ${name.trim()}`;
    window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className={`${cardClass} justify-center text-center`} style={cardShadow}>
      <div>
        <p className={labelClass}>Mail us</p>
        <p className="mt-2 font-anton text-[30px] leading-[1] text-brut-ink uppercase">{SITE.contactEmail}</p>
      </div>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        {error && (
          <p className="border-3 border-brut-ink bg-[#fff1f1] px-4 py-2 text-center font-inter text-[14px] text-brut-ink">{error}</p>
        )}
        <input className={inputClass} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={inputClass} type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder="How can we help?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-center">
          <Button variant="blue" type="submit">Send email</Button>
        </div>
      </form>
    </div>
  );
};

// Phone directory: the numbers appear here once they are added to src/data/contacts.ts.
const PhoneCard = () => (
  <div className={cardClass} style={cardShadow}>
    <div>
      <p className={labelClass}>Phone directory</p>
      <p className="mt-2 font-anton text-[30px] leading-[1] text-brut-ink uppercase">On-ground help</p>
    </div>
    {CONTACT_GROUPS.length === 0 ? (
      <p className="font-inter text-[15px] leading-normal text-brut-body">Contact numbers are coming soon.</p>
    ) : (
      <div className="grid gap-5 sm:grid-cols-2">
        {CONTACT_GROUPS.map((group) => (
          <div key={group.team} className="flex flex-col gap-2">
            <p className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] text-[#1f5fd6] uppercase">{group.team}</p>
            {group.people.map((person) => (
              <a
                key={person.phone}
                href={`tel:${person.phone.replace(/\s+/g, "")}`}
                className="flex flex-col border-3 border-brut-ink bg-[#E8F1FB] px-3.5 py-2.5 hover:bg-[#59a7ff]/30"
              >
                <span className="font-inter text-[15px] font-semibold text-brut-ink">{person.name}</span>
                <span className="font-inter text-[14px] text-brut-body">{person.phone}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    )}
  </div>
);

export const ContactUs = () => (
  <Reveal>
    <section className="mx-auto w-full max-w-[1440px] px-4 lg:px-14">
      <SectionHead>
        Contact <span className="text-[#1f5fd6]">us</span>
      </SectionHead>
      <div className="grid gap-10 pb-[50px] lg:grid-cols-2 lg:pb-[80px]">
        <MailCard />
        <PhoneCard />
      </div>
    </section>
  </Reveal>
);
