import { useState, type FormEvent } from "react";
import { CheckCircle2, Instagram, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { ADDRESS, AGE_GROUPS, EMAIL, INSTAGRAM, MAP_QUERY, PHONE } from "@/data/site";
import { Logo } from "./Navbar";
import { Reveal, SectionHead } from "./Sections";

type Errors = Partial<Record<"name" | "email" | "phone" | "age", string>>;

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const errs: Errors = {};
    if (v("name").length < 2) errs.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) errs.email = "Please enter a valid email address.";
    if (v("phone") && !/^[+\d][\d\s-]{7,}$/.test(v("phone"))) errs.phone = "Please enter a valid phone number.";
    if (!v("age")) errs.age = "Please select an age group.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // Ready to connect to an email/backend service.
    setSent(true);
    e.currentTarget.reset();
  }

  const label = "mb-2 block text-sm font-medium";
  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-err`} className="mt-2 text-sm text-destructive">{errors[k]}</p>;

  return (
    <section id="contact" className="scroll-mt-20 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead eyebrow="Contact" lead="Join The" accent="Academy" sub="Ready to take the first step? Drop us a message or visit us in person." />
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card p-7 sm:p-10">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center" role="status">
                  <CheckCircle2 className="h-16 w-16 text-primary" />
                  <h3 className="mt-6 text-2xl font-bold">Message received!</h3>
                  <p className="mt-3 text-muted-foreground">Thanks for reaching out. We'll get back to you soon.</p>
                  <button onClick={() => setSent(false)} className="btn-ghost mt-8">Send another message</button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="name" className={label}>Full Name</label>
                    <input id="name" name="name" placeholder="John Doe" className="field" aria-invalid={!!errors.name} aria-describedby="name-err" />
                    {err("name")}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={label}>Email Address</label>
                      <input id="email" name="email" type="email" placeholder="john@example.com" className="field" aria-invalid={!!errors.email} aria-describedby="email-err" />
                      {err("email")}
                    </div>
                    <div>
                      <label htmlFor="phone" className={label}>Phone Number</label>
                      <input id="phone" name="phone" type="tel" placeholder="+91 XXX XXX XXXX" className="field" aria-invalid={!!errors.phone} aria-describedby="phone-err" />
                      {err("phone")}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="age" className={label}>Age Group</label>
                    <select id="age" name="age" defaultValue="" className="field" aria-invalid={!!errors.age} aria-describedby="age-err">
                      <option value="" disabled>Select Age Group</option>
                      {AGE_GROUPS.map((a) => <option key={a}>{a}</option>)}
                    </select>
                    {err("age")}
                  </div>
                  <div>
                    <label htmlFor="message" className={label}>Message</label>
                    <textarea id="message" name="message" rows={4} placeholder="Tell us about your fitness goals..." className="field resize-y" />
                  </div>
                  <button type="submit" className="btn-primary w-full">Send Message</button>
                </form>
              )}
            </div>
          </Reveal>
          <Reveal delay={150} className="flex flex-col gap-6">
            <div className="relative min-h-80 flex-1 overflow-hidden rounded-3xl border border-border">
              <iframe title="Mamba Combat Academy location" src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 grayscale-[30%]" />
            </div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <ul className="space-y-4">
                <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{ADDRESS}</span></li>
                <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /><a href={`tel:${PHONE.replace(/\s/g, "")}`} className="hover:text-primary">{PHONE}</a></li>
                <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-primary" /><a href={`mailto:${EMAIL}`} className="hover:text-primary">{EMAIL}</a></li>
              </ul>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`} target="_blank" rel="noreferrer" className="btn-ghost mt-6 w-full sm:w-auto"><Navigation className="h-4 w-4" /> Get Directions</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">© {new Date().getFullYear()} Mamba Combat Academy. Be Better Every Single Day.</p>
        </div>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn-ghost self-start sm:self-auto"><Instagram className="h-5 w-5" /> @mamba_combat</a>
      </div>
    </footer>
  );
}
