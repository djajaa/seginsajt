"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
const SERGEJ_IG     = "https://www.instagram.com/janjiccsergej/";
const GYM_IG        = "https://www.instagram.com/gym_phoenix_/";
const PHONE_DISPLAY = "+387 66 457 157";
const PHONE_E164    = "38766457157";
const ADDRESS       = "Trg srpskih junaka 1, Banja Luka 78000";
const MAPS_LINK     = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

// VAŽNO: container klase moraju biti raspisane kao literali — Tailwind JIT
// ne može da "vidi" dinamički konkateniran string u JS varijabli na svim
// setupima. Koristiti direktno u className={}.
// Zadržavamo varijablu jer radi u Next.js/Tailwind v4 JIT načinu,
// ali padding je raspisaniji za sigurnost.
const cx = "mx-auto w-full max-w-[1600px] px-8 sm:px-10 lg:px-14 xl:px-20";

const NAV_LINKS = [
  { label: "Početna",   href: "#hero"     },
  { label: "O meni",    href: "#about"    },
  { label: "Saradnja",  href: "#services" },
  { label: "Rezultati", href: "#results"  },
  { label: "Kontakt",   href: "#contact"  },
];

const MARQUEE_WORDS = [
  "tehnika", "progresija", "struktura", "oporavak",
  "navike",  "podrška",    "realan plan", "bez šablona",
];

// ─── ThemeBtn ─────────────────────────────────────────────────────────────────
function ThemeBtn({
  children, href, onClick, className = "", variant = "filled", type,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "filled" | "border";
  type?: "submit";
}) {
  const inner = (
    <>
      <span className="btn-text">{children}</span>
      <span className="btn-hover btn-hover--1" />
      <span className="btn-hover btn-hover--2" />
      <span className="btn-hover btn-hover--3" />
      <span className="btn-hover btn-hover--4" />
      <span className="btn-hover btn-hover--5" />
    </>
  );
  const cls = `gt-theme-btn ${variant === "border" ? "style-border" : ""} ${className}`.trim();
  if (href) return <a href={href} onClick={onClick} className={cls}>{inner}</a>;
  return <button type={type ?? "button"} onClick={onClick} className={cls}>{inner}</button>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled]             = useState(false);
  const [showBackTop, setShowBackTop]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuCloseBtnRef               = useRef<HTMLButtonElement | null>(null);

  const [form, setForm] = useState({
    name:    "",
    email:   "",
    mode:    "Uživo (1:1)"  as "Uživo (1:1)"  | "Online (1:1)",
    goal:    "Mršavljenje"  as "Mršavljenje" | "Mišićna masa" | "Kondicija" | "Rekompozicija" | "Povratak u formu",
    message: "",
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      setShowBackTop(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    mobileMenuCloseBtnRef.current?.focus();
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const openWhatsApp = useCallback(() => {
    const lines = [
      "Zdravo Sergej,", "",
      `Ime: ${form.name || "-"}`,
      `Email: ${form.email || "-"}`,
      `Vrsta saradnje: ${form.mode}`,
      `Cilj: ${form.goal}`, "",
      "Poruka:", form.message || "-", "", "Hvala!",
    ];
    window.open(
      `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank", "noopener,noreferrer"
    );
  }, [form]);

  const marqueeItems = useMemo(() => [...MARQUEE_WORDS, ...MARQUEE_WORDS], []);

  return (
    <>

      {/* ════════════════════════════ HEADER ════════════════════════════ */}
      <header className={`fixed left-0 right-0 top-0 z-50 font-heading transition-all duration-300 ${
        scrolled
          ? "bg-white/96 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl"
          : "bg-[#161b22]/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
      }`}>
        <div className={`${cx} flex items-center justify-between py-4 lg:py-3`}>

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-theme shadow-[0_8px_24px_rgba(244,30,30,0.35)]">
              <span className="font-heading text-lg font-bold text-white">S</span>
            </div>
            <div className="leading-tight">
              <div className="font-heading text-sm font-bold tracking-wide text-theme">Sergej Janjić</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-theme">Personal Coaching</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
                  scrolled ? "text-header hover:text-theme" : "text-white hover:text-theme"
                }`}
              >{link.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
          

            {/* Hamburger */}
            <button
              className="flex flex-col gap-1.5 rounded-xl p-2 lg:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Zatvori meni" : "Otvori meni"}
            >
              <span className={`block h-0.5 w-6 bg-theme transition-all duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-theme transition-all duration-300 ${mobileMenuOpen ? "opacity-0"              : ""}`} />
              <span className={`block h-0.5 w-6 bg-theme transition-all duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════ MOBILE MENU ═══════════════════════════ */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] lg:hidden ${mobileMenuOpen ? "" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Glavni meni"
          aria-hidden={!mobileMenuOpen}
          className={`absolute right-0 top-0 h-full w-full max-w-[400px] bg-[#161b22] shadow-[0_0_60px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
            <a href="#hero" onClick={closeMobileMenu} className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-theme">
                <span className="font-heading text-base font-bold text-white">S</span>
              </div>
              <div className="leading-tight">
                <div className="font-heading text-sm font-bold text-white">Sergej Janjić</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-theme">Personal Coaching</div>
              </div>
            </a>
            <button
              ref={mobileMenuCloseBtnRef}
              onClick={closeMobileMenu}
              className="grid h-10 w-10 place-items-center rounded-xl text-white/60 transition hover:text-theme"
              aria-label="Zatvori meni"
            >✕</button>
          </div>

          {/* Drawer body */}
          <div className="h-[calc(100%-72px)] overflow-y-auto px-5 py-6">
            <nav className="space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-base font-bold uppercase tracking-[0.08em] text-white transition hover:border-theme/40 hover:bg-white/[0.08] hover:text-theme"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-lg text-theme">↗</span>
                </a>
              ))}
            </nav>

            <div className="mt-6 space-y-3">
              <ThemeBtn href="#contact" className="w-full !justify-center" onClick={closeMobileMenu}>
                JAVI SE
              </ThemeBtn>
              <div className="grid grid-cols-2 gap-3">
                <a href={SERGEJ_IG} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.10] bg-white/[0.04] py-4 font-semibold text-white transition hover:border-theme/50 hover:text-theme">
                  <span className="sr-only">Instagram</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" />
                  </svg>
                </a>
                <a href={GYM_IG} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.04] py-4 text-white transition hover:border-theme/50 hover:text-theme">
                  <span className="sr-only">Teretana</span>
                  <span aria-hidden="true" className="text-2xl">🏋️</span>
                </a>
              </div>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Kontakt</p>
              <a className="mt-3 block font-heading text-lg font-semibold text-white transition hover:text-theme" href={`tel:+${PHONE_E164}`}>
                {PHONE_DISPLAY}
              </a>
              <a className="mt-1.5 block text-sm leading-relaxed text-white/50 transition hover:text-theme" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
                {ADDRESS}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════ HERO ═══════════════════════════
          Gradijenti su pojačani da hero tekst bude čitljiv.
          h1 ima explicitno text-white — s @layer base u globals.css
          ovo sada sigurno radi i bez !important.
      ════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/sergej-hero.jpg')" }}
      >
        {/* Primarni overlay — lijeva strana potpuno tamna, gradira prema desno */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/88 to-[#0d1117]/45" />
        {/* Sekundarni overlay — dno tamno za tekst */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/90 via-[#0d1117]/20 to-transparent" />
        {/* Blagi crveni glow pozadi teksta */}
        <div className="absolute left-0 top-1/4 h-[600px] w-[600px] -translate-x-1/4 rounded-full bg-theme/[0.07] blur-[120px]" />

        <div className={`${cx} relative z-10 pb-24 pt-40 md:pb-28 lg:pb-32 lg:pt-44 overflow-hidden`}>
          <div className="max-w-4xl">
            {/* Subtitle */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-theme" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-theme">
                Personal Coaching
              </span>
            </div>

            {/* H1 — text-white ovdje radi jer su h-tagovi sada u @layer base */}
            <h1 className="text-[clamp(3.2rem,9vw,7rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
              MODERNO VOĐENJE.
              <br />
              <span className="text-theme">REZULTAT</span>{" "}
              <span className="text-white">KOJI OSTAJE</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
              Kroz godine rada sa klijentima izgradio sam pristup koji podrazumijeva jasan plan, stalnu komunikaciju i napredak koji se prati korak po korak, bez nagađanja.
            </p>

            {/* CTA dugmad — mt-12 daje dobar razmak */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <ThemeBtn href="#contact" className="w-full sm:w-auto">
                ZAPOČNI SARADNJU
              </ThemeBtn>
              <ThemeBtn href="#services" variant="border" className="w-full sm:w-auto">
                VRSTE SARADNJE
              </ThemeBtn>
            </div>

            {/* Stats — mt-14 odvaja od dugmadi */}
<div className="mt-14 inline-flex gap-8 rounded-3xl border border-white/[0.10] bg-white/[0.05] px-6 py-5 backdrop-blur-md sm:px-8 sm:py-7">
  {([["300+","Saradnji"],["1:1","Pristup"],["100%","Posvećenost"]] as const).map(([big,small]) => (
    <div key={small}>
      <div className="font-heading text-2xl font-bold text-theme sm:text-[2.2rem]">{big}</div>
      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">{small}</div>
    </div>
  ))}
</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ MARQUEE ════════════════════════════ */}
      <div className="overflow-hidden bg-[#161b22] py-[18px]">
  <div style={{ animation: "marquee 20s linear infinite" }} className="flex whitespace-nowrap">
          {marqueeItems.map((w, i) => (
            <span key={`${w}-${i}`} className="px-8 font-heading text-[13px] font-semibold uppercase tracking-[0.18em] text-white/60">
              <span className="text-theme" aria-hidden="true">✦</span> {w}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════ ABOUT ════════════════════════════
          gt-trans-text: position absolute z-0 (section ima overflow:hidden)
          container:     relative z-10
      ═════════════════════════════════════════════════════════════════ */}
      <section id="about" className="section-padding relative">
        <div className="gt-trans-text" aria-hidden="true">COACHING</div>

        <div className={`${cx} relative z-10`}>
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">

            {/* Slike */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] shadow-[0_24px_64px_rgba(0,0,0,0.14)]">
                  <Image src="/images/form/sergej-form-1.png" alt="Sergej forma 1" fill className="object-cover" />
                </div>
                <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[28px] shadow-[0_24px_64px_rgba(0,0,0,0.14)]">
                  <Image src="/images/form/sergej-form-2.png" alt="Sergej forma 2" fill className="object-cover" />
                </div>
              </div>
              <div className="relative z-10 -mt-10 ml-5 inline-flex items-center gap-3 rounded-3xl bg-theme px-6 py-4 shadow-[0_20px_40px_rgba(244,30,30,0.30)]">
                <span className="font-heading text-3xl font-bold text-white">300+</span>
                <span className="text-sm font-bold uppercase leading-tight text-white/90">
                  Uspješnih<br />saradnji
                </span>
              </div>
            </div>

            {/* Tekst */}
            <div>
              <div className="gt-section-title">
                <h6><span aria-hidden="true">✦</span> O MENI</h6>
                <h2>Sergej <span className="text-theme">Janjić</span></h2>
              </div>

              <p className="mt-7 max-w-xl leading-8 text-txt">
                Godine rada su me naučile da je najvažnije da se osjećaš sigurno, uz jasan plan, dobru komunikaciju i proces bez ekstremnih rješenja.
              </p>
              <p className="mt-4 max-w-xl leading-8 text-txt">
                Stil rada: mirno, precizno, sistemski — da napredak bude stabilan, ne slučajan.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  { icon: "🏋️", title: "Tehnika & sigurnost", desc: "Ispravno izvođenje, bez povreda — to je osnova svega." },
                  { icon: "📊", title: "Struktura & progres",  desc: "Jasan plan koji možeš pratiti, mjerljivo i realno."  },
                ].map((item) => (
                  <div key={item.title} className="gt-soft-card flex gap-5 rounded-[24px] p-6">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-theme/10 text-3xl" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="mb-1.5 text-header">{item.title}</h4>
                      <p className="text-sm leading-7 text-txt">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <ThemeBtn href={SERGEJ_IG} className="w-full sm:w-auto">
                  INSTAGRAM
                </ThemeBtn>
                <a
                  href={`https://wa.me/${PHONE_E164}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[60px] w-full items-center justify-center gap-2 rounded-[18px] border-2 border-header/80 px-8 py-4 text-sm font-bold uppercase tracking-[0.06em] text-header transition hover:bg-header hover:text-white sm:w-auto"
                >
                  WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SERVICES ════════════════════════════ */}
      <section id="services" className="section-padding section-bg-2 relative">
        <div className={`${cx} relative z-10`}>

          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="gt-section-title">
              <h6><span aria-hidden="true">✦</span> VRSTE SARADNJE</h6>
              <h2>Saradnja (1:1)</h2>
            </div>
            <ThemeBtn href="#contact" className="w-full sm:w-auto">JAVI SE</ThemeBtn>
          </div>

          <p className="mb-14 max-w-3xl leading-8 text-txt">
            Sve je 1:1 — uživo ili online. Prvo se uskladimo oko cilja i dinamike, a
            onda gradimo sistem koji je održiv. Cijena se dogovara nakon kratkog razgovora.
          </p>

          {/* Koraci */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { num: "01", title: "Start & procjena",     desc: "Prije početka analiziramo cilj, navike, raspored i ograničenja, kako bi plan bio u potpunosti prilagođen tebi, a ne generičan." },
              { num: "02", title: "Plan & progres",        desc: "Nema gotovih programa. Svaki plan je pisan za jednu osobu, za tebe. Progresija je postavljena tako da uvijek znaš šta radiš i zašto, korak po korak."        },
              { num: "03", title: "Praćenje & korekcije", desc: "Proces ne staje nakon što dobiješ plan. Tu sam uz tebe, pratim napredak, korigujem i prilagođavam kada stvari ne idu po planu." },
            ].map((item) => (
              <div
                key={item.num}
                className="group relative overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_8px_28px_rgba(0,0,0,0.07)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.11)]"
              >
                <div className="absolute right-6 top-5 select-none font-heading text-[72px] font-bold leading-none text-header/[0.05] transition-colors group-hover:text-theme/[0.10]" aria-hidden="true">
                  {item.num}
                </div>
                <div className="relative z-10">
                  <div className="mb-5 h-1.5 w-10 rounded-full bg-theme" />
                  <h3 className="mb-3 text-header">{item.title}</h3>
                  <p className="text-sm leading-7 text-txt">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tamne kartice — gt-dark-card sada ima color: rgba(255,255,255,0.75) kao default */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              { letter: "U", title: "Uživo (1:1)",  desc: "Fokus na tehniku, ritam i progres — jasno, bez lutanja."              },
              { letter: "O", title: "Online (1:1)", desc: "Struktura + praćenje + korekcije — plan koji možeš pratiti bilo gdje." },
            ].map((item) => (
              <div key={item.letter} className="gt-dark-card flex items-center gap-6 rounded-[28px] p-8 transition-all hover:-translate-y-1">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-theme/60 bg-white/[0.05]" aria-hidden="true">
                  <span className="font-heading text-2xl font-bold text-theme">{item.letter}</span>
                </div>
                <div>
                  <h4 className="mb-2 text-white">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ RESULTS ══════════════════════════════
          Isti pattern: gt-trans-text z-0, container z-10
      ═════════════════════════════════════════════════════════════════ */}
      <section id="results" className="section-padding relative">
        <div className="gt-trans-text" aria-hidden="true">REZULTAT</div>

        <div className={`${cx} relative z-10`}>
          <div className="mb-16 text-center">
            <div className="gt-section-title mx-auto">
              <h6 className="justify-center">
                <span aria-hidden="true">✦</span> DOKAZ <span aria-hidden="true">✦</span>
              </h6>
              <h2 className="mx-auto">Stvarni rezultati</h2>
            </div>
            <p className="mt-4 text-txt">Realno • Mjerljivo • Održivo</p>
          </div>

          <div className="relative overflow-hidden">
  <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#f4f6f9] to-transparent sm:w-24" />
  <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#f4f6f9] to-transparent sm:w-24" />

  <div style={{ animation: "marquee-slow 55s linear infinite", display: "flex", width: "max-content" }}>
    {[
      {
        src: "/images/transformations/client-1.png",
        name: "Aleksa.",
        quote: "Godinama profesionalnog sporta i mislio sam da znam sve. Konačno treniram pametno, ne samo naporno.",
      },
      {
        src: "/images/transformations/client-2.png",
        name: "Luka",
        quote: "Sergej nije bio samo trener — bio je onaj koji me drži odgovornim. Konzistentnost koja mi je uvijek nedostajala, konačno je tu.",
      },
      {
        src: "/images/transformations/client-3.jpg",
        name: "Marko",
        quote: "104kg → 84kg. Nije bilo lako, ali uz pravi plan i podršku — moguće je.",
      },
      {
        src: "/images/transformations/client-4.png",
        name: "Jovan",
        quote: "Nikad nisam mislio da mogu ovako izgledati. Svaki korak je bio isplaniran i imao je smisla.",
      },
      {
        src: "/images/transformations/client-5.png",
        name: "Danilo",
        quote: "Rezultati su bili jasni od prvog dana — pravi plan, pravi pristup.",
      },
      {
        src: "/images/transformations/client-6.jpg",
        name: "Sergej",
        quote: "57kg → 62kg. Čista mišićna masa, bez viška — upravo ono što sam htio.",
      },
      /* Duplikat za beskonačnu petlju */
      {
        src: "/images/transformations/client-1.png",
        name: "Aleksa",
        quote: "Godinama profesionalnog sporta i mislio sam da znam sve. Konačno treniram pametno, ne samo naporno.",
      },
      {
        src: "/images/transformations/client-2.png",
        name: "Luka",
        quote: "Sergej nije bio samo trener — bio je onaj koji me drži odgovornim. Konzistentnost koja mi je uvijek nedostajala, konačno je tu.",
      },
      {
        src: "/images/transformations/client-3.jpg",
        name: "Klijent · 5 mjeseci",
        quote: "104kg → 84kg. Nije bilo lako, ali uz pravi plan i podršku — moguće je.",
      },
      {
        src: "/images/transformations/client-4.png",
        name: "Klijent",
        quote: "Nikad nisam mislio da mogu ovako izgledati. Svaki korak je bio isplaniran i imao je smisla.",
      },
      {
        src: "/images/transformations/client-5.png",
        name: "Klijent",
        quote: "Rezultati su bili jasni od prvog dana — pravi plan, pravi pristup.",
      },
      {
        src: "/images/transformations/client-6.jpg",
        name: "Klijent · 4 mjeseca",
        quote: "57kg → 62kg. Čista mišićna masa, bez viška — upravo ono što sam htio.",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="mx-3 w-[260px] flex-shrink-0 overflow-hidden rounded-[24px] bg-white sm:w-[340px]"
      >
        <div className="relative aspect-square overflow-hidden bg-bg2">
  <Image src={item.src} alt={item.name} fill className="object-contain" />
</div>
        <div className="p-6">
          <h3 className="text-base font-bold text-header">{item.name}</h3>
          <p className="mt-2 text-sm leading-7 text-txt">&ldquo;{item.quote}&rdquo;</p>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>
      </section>

      {/* ══════════════════════════ CTA BANNER ═══════════════════════════ */}
      <section
        className="relative overflow-hidden bg-cover bg-fixed bg-center py-32"
        style={{ backgroundImage: "url('/images/hero/sergej-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#0d1117]/92" />

        <div className={`${cx} relative z-10`}>
          <div className="max-w-4xl">
            <div className="gt-section-title">
              <h6><span aria-hidden="true">✦</span> SPREMAN?</h6>
              {/* text-white radi jer je @layer base sada ispod Tailwind utilities */}
              <h2 className="text-white">Započni promjenu još danas</h2>
            </div>

            <p className="mt-6 max-w-xl leading-8 text-white/65">
              Javi se za besplatan uvodni razgovor. Bez obaveza, bez pritiska — samo da
              vidimo da li ima smisla da radimo zajedno.
            </p>

            <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
  {["Fleksibilan raspored","Podrška 1:1","Fokus na tijelo i um","Moderan pristup","Prilagođen plan","Podrška kroz proces"].map((item) => (
    <li key={item} className="flex items-center gap-3 text-base font-semibold text-white/85 sm:text-lg">
      <span className="text-xl text-theme" aria-hidden="true">✦</span> {item}
    </li>
  ))}
</ul>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <ThemeBtn href="#contact" className="w-full sm:w-auto">KONTAKTIRAJ ME</ThemeBtn>
              <ThemeBtn onClick={openWhatsApp} variant="border" className="w-full sm:w-auto">WHATSAPP UPIT</ThemeBtn>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CONTACT ══════════════════════════════ */}
      <section id="contact" className="section-padding relative">
        <div className={`${cx} relative z-10`}>

          <div className="mb-16 text-center">
            <div className="gt-section-title mx-auto">
              <h6 className="justify-center">
                <span aria-hidden="true">✦</span> KONTAKT <span aria-hidden="true">✦</span>
              </h6>
              <h2 className="mx-auto">Pošalji upit</h2>
            </div>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-txt">
              Napiši svoj cilj i nekoliko detalja. Na osnovu toga ide prijedlog kako da kreneš.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">

            {/* Kontakt info — gt-dark-card, sve bijelo */}
            <div className="gt-dark-card rounded-[30px] p-8 sm:p-10">
              <h3 className="mb-8 text-white">Kontakt info</h3>

              {[
                { icon: "📞", label: "Telefon", value: PHONE_DISPLAY, href: `tel:+${PHONE_E164}`, target: undefined },
                { icon: "📍", label: "Adresa",  value: ADDRESS,        href: MAPS_LINK,           target: "_blank"  },
              ].map((item, i) => (
                <div key={item.label} className={`flex gap-5 py-6 ${i > 0 ? "border-t border-white/[0.08]" : ""}`}>
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">{item.label}</p>
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.target ? "noopener noreferrer" : undefined}
                      className="text-base font-semibold text-white transition hover:text-theme"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}

              <div className="mt-2 border-t border-white/[0.08] pt-7">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Zaprati</p>
                <div className="grid grid-cols-1 gap-3">
  <a href={SERGEJ_IG} target="_blank" rel="noopener noreferrer"
    className="flex h-16 items-center justify-center rounded-2xl bg-white/[0.07] text-base font-bold text-white transition hover:bg-theme">
    Instagram
  </a>
  <a href={GYM_IG} target="_blank" rel="noopener noreferrer" title="Teretana"
    className="flex h-16 items-center justify-center rounded-2xl bg-white/[0.07] text-base font-bold text-white transition hover:bg-theme">
    Teretana
  </a>
</div>
              </div>
            </div>

{/* Forma */}
            <div className="gt-soft-card rounded-[30px] p-8 sm:p-10 lg:p-12">
              <h3 className="mb-8 text-header">Pošalji poruku</h3>

              <form onSubmit={(e) => {
                e.preventDefault();
                const subject = encodeURIComponent(`Upit – ${form.goal} – ${form.name || "Anonimno"}`);
                const body = encodeURIComponent(`Ime: ${form.name || "-"}\nEmail: ${form.email || "-"}\nVrsta saradnje: ${form.mode}\nCilj: ${form.goal}\n\nPoruka:\n${form.message || "-"}`);
                window.location.href = `mailto:janjicsergejcoaching@gmail.com?subject=${subject}&body=${body}`;
              }}>
                <div className="grid gap-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <input
                      id="contact-name" name="name"
                      className="w-full rounded-[14px] border border-gray-200 bg-bg2 px-5 py-4 text-sm text-header placeholder:text-txt/50 focus:border-theme"
                      placeholder="Ime"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    />
                    <input
                      id="contact-phone" name="phone" type="tel"
                      className="w-full rounded-[14px] border border-gray-200 bg-bg2 px-5 py-4 text-sm text-header placeholder:text-txt/50 focus:border-theme"
                      placeholder="Telefon (opciono)"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <select
                      id="contact-mode" name="mode"
                      className="w-full rounded-[14px] border border-gray-200 bg-bg2 px-5 py-4 text-sm text-header focus:border-theme"
                      value={form.mode}
                      onChange={(e) => setForm((p) => ({ ...p, mode: e.target.value as typeof form.mode }))}
                    >
                      <option value="Uživo (1:1)">Uživo (1:1)</option>
                      <option value="Online (1:1)">Online (1:1)</option>
                    </select>
                    <select
                      id="contact-goal" name="goal"
                      className="w-full rounded-[14px] border border-gray-200 bg-bg2 px-5 py-4 text-sm text-header focus:border-theme"
                      value={form.goal}
                      onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value as typeof form.goal }))}
                    >
                      <option value="Mršavljenje">Mršavljenje</option>
                      <option value="Mišićna masa">Mišićna masa</option>
                      <option value="Kondicija">Kondicija</option>
                      <option value="Rekompozicija">Rekompozicija</option>
                      <option value="Povratak u formu">Povratak u formu</option>
                    </select>
                  </div>

                  <textarea
                    id="contact-message" name="message"
                    className="min-h-[180px] w-full rounded-[14px] border border-gray-200 bg-bg2 px-5 py-4 text-sm text-header placeholder:text-txt/50 focus:border-theme"
                    placeholder="Poruka (iskustvo, ograničenja, termini...)"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  />

                  <div className="pt-2">
                    <ThemeBtn type="submit" className="w-full !justify-center">
                      POŠALJI PORUKU
                    </ThemeBtn>
                  </div>

                  <p className="text-xs text-txt/50">
                    Klikom na dugme otvara se tvoj mail sa pripremljenom porukom.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FOOTER ══════════════════════════════ */}
      <footer
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero/sergej-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#0d1117]/97" />

        <div className="relative z-10">
          <div className={`${cx} py-20 sm:py-24`}>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">

              {/* Kontakt info */}
              <div>
                <h3 className="mb-10 text-2xl font-bold text-white">Kontakt info</h3>
                <ul className="space-y-8">
                  {[
                    { icon: "📍", label: "Adresa",  value: ADDRESS,       href: MAPS_LINK,            target: "_blank"  },
                    { icon: "📞", label: "Telefon", value: PHONE_DISPLAY, href: `tel:+${PHONE_E164}`, target: undefined },
                  ].map((item) => (
                    <li key={item.label} className="flex gap-5">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] text-lg" aria-hidden="true">
                        {item.icon}
                      </div>
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">{item.label}</p>
                        <a
                          href={item.href}
                          target={item.target}
                          rel={item.target ? "noopener noreferrer" : undefined}
                          className="text-sm font-semibold text-white/75 transition hover:text-theme"
                        >{item.value}</a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brand */}
              <div>
                <a href="#hero" className="mb-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-theme">
                    <span className="font-heading text-lg font-bold text-white">S</span>
                  </div>
                  <div>
                    <div className="font-heading text-sm font-bold text-white">Sergej Janjić</div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-theme">Personal Coaching</div>
                  </div>
                </a>

                <p className="mb-7 max-w-sm text-sm leading-7 text-white/55">
                  1:1 coaching • uživo i online • Banja Luka. Mirno, precizno i
                  sistemski — da napredak bude stabilan, ne slučajan.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a href={SERGEJ_IG} target="_blank" rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.04] px-5 text-sm font-semibold text-white/70 transition hover:border-theme/40 hover:text-theme">
                    Instagram
                  </a>
                  <a href="#contact"
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.04] px-5 text-sm font-semibold text-white/70 transition hover:border-theme/40 hover:text-theme">
                    Kontakt
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.07]">
            <div className={`${cx} flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between`}>
              <p className="text-sm text-white/40">
                © {new Date().getFullYear()} <b className="text-white/65">Sergej Janjić</b>. Sva prava zadržana.
              </p>
              <a href="#contact" className="text-sm text-white/40 transition hover:text-theme">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
