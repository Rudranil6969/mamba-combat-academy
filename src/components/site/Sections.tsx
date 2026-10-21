import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Clock, Dumbbell, Flame, Moon, Pause, Play, Shield, Swords, Target, Volume2, VolumeX } from "lucide-react";
import hero from "@/assets/hero.webp";
import heroMobile from "@/assets/hero-mobile.webp";
import introVideo from "@/assets/intro.mp4.asset.json";
import logoAsset from "@/assets/mamba-silver-logo.png.asset.json";

export function LogoMarquee() {
  const items = Array.from({ length: 12 });
  return (
    <section aria-label="Mamba Combat Academy" className="overflow-hidden border-y border-border bg-surface py-6">
      <div className="marquee-track flex w-max items-center gap-12">
        {[...items, ...items].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-4" aria-hidden={i >= items.length}>
            <img src={logoAsset.url} alt={i === 0 ? "Mamba Combat Academy logo" : ""} width={56} height={56} loading="lazy" className="h-14 w-14 rounded-full object-cover ring-1 ring-primary/40" />
            <span className="text-xl font-extrabold tracking-widest uppercase">Mamba <span className="text-gradient">Combat Academy</span></span>
          </div>
        ))}
      </div>
    </section>
  );
}
import { MISSION, PROGRAMS, SCHEDULE, TIMES } from "@/data/site";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHead({ eyebrow, lead, accent, sub }: { eyebrow: string; lead: string; accent: string; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{lead} <span className="text-gradient">{accent}</span></h2>
      {sub && <p className="mt-5 text-lg text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <picture>
        <source media="(max-width: 640px)" srcSet={heroMobile} />
        <img src={hero} alt="Mamba Combat Academy training" fetchPriority="high" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-center" />
      </picture>
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-background/30" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/60" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow animate-rise mb-6 flex items-center gap-3"><span className="h-px w-10 bg-primary" />Mamba Combat Academy</p>
          <h1 className="animate-rise text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-7xl lg:text-8xl" style={{ animationDelay: "100ms" }}>
            Be Better <br /><span className="text-gradient">Every Single Day.</span>
          </h1>
          <p className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl" style={{ animationDelay: "250ms" }}>
            Led by Coach Athul Hotkar. Build functional strength, learn martial arts, and make everyday life easier. Classes for kids, students, adults, and seniors.
          </p>
          <div className="animate-rise mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "400ms" }}>
            <a href="#contact" className="btn-primary">Book Your First Class <ArrowRight className="h-4 w-4" /></a>
            <a href="#programs" className="btn-ghost">Explore Our Programs</a>
          </div>
        </div>
      </div>
      <a href="#about" aria-label="Scroll to About" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary">
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </a>
    </section>
  );
}

const fmtTime = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
};

export function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const syncDuration = () => setDuration(Number.isFinite(v.duration) ? v.duration : 0);
    const syncTime = () => setTime(v.currentTime);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("loadedmetadata", syncDuration);
    v.addEventListener("durationchange", syncDuration);
    v.addEventListener("timeupdate", syncTime);
    v.addEventListener("seeked", syncTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    syncDuration();
    syncTime();
    return () => {
      v.removeEventListener("loadedmetadata", syncDuration);
      v.removeEventListener("durationchange", syncDuration);
      v.removeEventListener("timeupdate", syncTime);
      v.removeEventListener("seeked", syncTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => setPlaying(false));
    else v.pause();
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };
  const seekTo = (t: number) => {
    const v = videoRef.current;
    if (!v) return;
    const safe = Math.min(Math.max(t, 0), duration || 0);
    v.currentTime = safe;
    setTime(safe);
  };
  const onSeekKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const jump = ({ ArrowLeft: -5, ArrowRight: 5, PageDown: -10, PageUp: 10 } as Record<string, number>)[e.key];
    if (jump) { e.preventDefault(); seekTo(time + jump); }
    else if (e.key === "Home") { e.preventDefault(); seekTo(0); }
    else if (e.key === "End") { e.preventDefault(); seekTo(duration); }
  };

  const pct = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <section aria-label="Introduction video" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHead eyebrow="Inside The Academy" lead="Train" accent="With Us" sub="A quick look at training, coaching and the community at Mamba Combat Academy." />
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-glow)]">
            <video
              ref={videoRef}
              src={introVideo.url}
              poster={hero}
              preload="none"
              playsInline
              className="aspect-video w-full bg-background object-cover"
            />
            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play introduction video"
                className="absolute inset-0 grid place-items-center bg-background/40 backdrop-blur-sm transition-colors hover:bg-background/30"
              >
                <span className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-110">
                  <Play className="h-8 w-8 translate-x-0.5 fill-current" />
                </span>
              </button>
            )}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 bg-linear-to-t from-background via-background/85 to-transparent px-4 pt-12 pb-4 sm:gap-4 sm:px-6">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause video" : "Play video"}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:text-primary"
              >
                {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
              </button>
              <span className="w-11 shrink-0 text-right text-sm font-semibold tabular-nums text-muted-foreground">{fmtTime(time)}</span>
              <input
                type="range"
                className="scrub min-w-0 flex-1"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(time, duration || 0)}
                onInput={(e) => seekTo(parseFloat(e.currentTarget.value))}
                onKeyDown={onSeekKey}
                aria-label="Jump to any part of the video"
                aria-valuetext={`${fmtTime(time)} of ${fmtTime(duration)}`}
                style={{ "--pct": pct } as CSSProperties}
              />
              <span className="w-11 shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">{fmtTime(duration)}</span>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:text-primary"
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead eyebrow="About Us" lead="Our" accent="Philosophy" sub="More than just a gym, we are a community dedicated to growth." />
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>Founded and led by <strong className="text-foreground">Coach Athul Hotkar</strong>, Mamba Combat Academy was built on a simple premise: fitness and martial arts are for everyone, regardless of age or experience level.</p>
            <p>We don't just teach fighting; we teach you how to be better every single day. Our focus is on <span className="text-foreground">anti-weakness and functional strength</span>. We want to banish weakness and help you build a capable, resilient body for real life.</p>
            <p>Whether you want to learn self-defense, improve your everyday mobility, or just make carrying groceries effortless, we are here to guide you. You don't have to want to be a professional fighter to train here; you just have to want to be the best version of yourself.</p>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card p-8 shadow-[var(--shadow-glow)] sm:p-10">
              <p className="eyebrow mb-3">Our purpose</p>
              <h3 className="mb-8 text-3xl font-bold">The Mamba Mission</h3>
              <ul className="space-y-5">
                {MISSION.map((m) => (
                  <li key={m} className="flex items-start gap-4 text-lg">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />{m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function WhoWeServe() {
  return (
    <section id="programs" className="scroll-mt-20 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead eyebrow="Programs" lead="Who We" accent="Serve" sub="Programs tailored for every stage of life. Everyone is welcome on our mats." />
        <div className="grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <article className="group relative h-[30rem] overflow-hidden rounded-3xl border border-border">
                <img src={p.img} alt={p.title} loading="lazy" decoding="async" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/75 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="eyebrow">0{i + 1}</span>
                  <h3 className="mt-2 text-2xl font-bold">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => <span key={t} className="rounded-full bg-accent/70 px-3 py-1 text-sm font-medium text-accent-foreground backdrop-blur">{t}</span>)}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const ICONS = [Flame, Target, Shield, Dumbbell, Swords, Moon];

export function Schedule() {
  return (
    <section id="schedule" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead eyebrow="Training" lead="Weekly" accent="Class Schedule" />
        <Reveal className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <span className="flex items-center gap-2 text-muted-foreground"><Clock className="h-5 w-5 text-primary" /> Daily sessions</span>
          {TIMES.map((t) => <span key={t} className="rounded-full border border-border bg-card px-5 py-2 font-semibold">{t}</span>)}
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCHEDULE.map((s, i) => {
            const Icon = ICONS[i] ?? Flame;
            return (
              <Reveal key={s.day} delay={i * 70}>
                <div className={`group flex h-full items-center gap-5 rounded-2xl border p-6 transition-colors ${s.closed ? "border-dashed border-border bg-transparent opacity-70" : "border-border bg-card hover:border-primary/50"}`}>
                  <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl ${s.closed ? "bg-muted text-muted-foreground" : "bg-accent text-primary"}`}><Icon className="h-6 w-6" /></div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">{s.day}</p>
                    <p className="mt-1 text-xl font-bold">{s.cls}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <blockquote className="rounded-2xl border-l-4 border-primary bg-accent/30 p-8 text-center text-lg leading-relaxed italic">
            "All classes are scalable and safe for every age and fitness level. Whether you are a college student or a senior citizen, Coach Athul will adapt the workout to help you get better every single day."
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <img src={hero} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/70 to-background" />
      <Reveal className="relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Ready to take the <span className="text-gradient">first step?</span></h2>
        <p className="mt-5 text-lg text-muted-foreground">Drop us a message or visit us in person.</p>
        <a href="#contact" className="btn-primary mt-10">Book Your First Class <ArrowRight className="h-4 w-4" /></a>
      </Reveal>
    </section>
  );
}
