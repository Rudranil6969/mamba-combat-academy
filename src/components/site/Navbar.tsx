import { useEffect, useState } from "react";
import { Instagram, Menu, X } from "lucide-react";
import { INSTAGRAM, LOGO, NAV } from "@/data/site";

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Mamba Combat Academy home">
      <img src={LOGO} alt="" width={size} height={size} className="shrink-0 rounded-full object-cover ring-1 ring-primary/40" style={{ width: size, height: size }} />
      <span className="truncate text-base font-bold tracking-wide sm:text-lg">
        <span className="text-primary">MAMBA</span> COMBAT ACADEMY
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent"}`}>
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{n.label}</a>
          ))}
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram @mamba_combat" className="text-muted-foreground transition-colors hover:text-primary"><Instagram className="h-5 w-5" /></a>
          <a href="#contact" className="btn-primary !px-5 !py-2.5 text-sm">Book Your First Class</a>
        </div>
        <button className="rounded-full p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border px-5 pb-6 lg:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-border py-4 text-lg">{n.label}</a>
          ))}
          <div className="mt-5 flex items-center gap-3">
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary flex-1">Book Your First Class</a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="btn-ghost !px-4"><Instagram className="h-5 w-5" /></a>
          </div>
        </div>
      )}
    </header>
  );
}
