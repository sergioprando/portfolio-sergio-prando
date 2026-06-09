"use client";

import { useRef, useEffect, useState, CSSProperties } from "react";
import { useLang } from "@/lib/i18n";
import ScrollFade from "@/components/ScrollFade";

// Conta do 0 até o valor final em ~300ms
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return <>{value}</>;
  const target = Number(match[1]);
  const suffix = match[2] ?? "";
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 300;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setDisplay(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target]);

  return <>{display}{suffix}</>;
}

const companyLogos = [
  { src: "/logo-capgemini.png", alt: "Capgemini" },
  { src: "/logo-mutant.png",    alt: "Mutant" },
  { src: "/logo-mjv.png",       alt: "MJV" },
];

export default function Hero() {
  const { t, lang, switching } = useLang();
  const avatarRef         = useRef<HTMLDivElement>(null);
  const subtitleBlockRef  = useRef<HTMLDivElement>(null);
  const companiesTitleRef = useRef<HTMLHeadingElement>(null);
  const companiesRef      = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [winWidth, setWinWidth] = useState(1440);

  useEffect(() => { setLoaded(true); }, []);

  useEffect(() => {
    const update = () => setWinWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const avatar         = avatarRef.current;
      const subtitle       = subtitleBlockRef.current;
      const companiesTitle = companiesTitleRef.current;
      if (!avatar || !subtitle || !companiesTitle) return;

      const scrollY   = window.scrollY;
      const fadeStart = subtitle.getBoundingClientRect().top       + scrollY;
      const fadeEnd   = companiesTitle.getBoundingClientRect().top + scrollY;

      if (scrollY <= fadeStart) {
        avatar.style.opacity = "1";
        avatar.style.filter = "blur(0px)";
      } else if (scrollY >= fadeEnd) {
        avatar.style.opacity = "0";
        avatar.style.filter = "blur(12px)";
      } else {
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        avatar.style.opacity = String(1 - progress);
        avatar.style.filter = `blur(${(progress * 12).toFixed(1)}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { stats, companies: descriptions, companiesTitle } = t.hero;

  const companies = companyLogos.map((logo, i) => ({
    ...logo,
    description: descriptions[i],
  }));

  const textAnim = (delayMs: number): CSSProperties => ({
    transition: `opacity 600ms ease-in ${delayMs}ms, transform 600ms ease-in ${delayMs}ms`,
    opacity:   loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(14px)",
  });

  return (
    <section
      id="sobre"
      className={[
        "w-full bg-[#ECEEE8] overflow-hidden transition-opacity duration-300",
        switching ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >

      {/* ── Mobile layout ── */}
      <div className="flex flex-col items-center px-6 pt-8 pb-10 md:hidden">
        <div className="relative w-52 h-52 rounded-full overflow-hidden bg-[#F0C040] flex-shrink-0">
          <img src="/avatar.png" alt="Sergio Prando" className="absolute inset-0 w-full h-full object-cover object-top" />
        </div>
        <div className="w-full mt-6">
          <h1 style={textAnim(0)} className="text-5xl font-bold leading-tight text-[#1F2937]">
            {t.hero.greeting}
          </h1>
          <h2 style={textAnim(150)} className="mt-4 text-[28px] font-medium text-[#1F2937]">
            {t.hero.name}
          </h2>
          <p style={textAnim(300)} className="mt-2 text-base leading-relaxed text-[#1F2937]">
            {t.hero.role}<br />
            {t.hero.specialty}
          </p>
          <ScrollFade className="mt-8 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {stats.map((stat, i) => (
              <div key={i} className="min-w-[130px] flex-shrink-0">
                {"value" in stat ? (
                  <>
                    <p className="text-5xl font-bold text-[#1F2937]">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="mt-1 text-sm leading-snug text-[#1F2937] whitespace-pre-line">{stat.label}</p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold leading-snug text-[#1F2937] whitespace-pre">{stat.highlight}</p>
                    {stat.items?.map((item) => (
                      <p key={item} className="mt-1 text-sm leading-snug text-[#1F2937]">{item}</p>
                    ))}
                  </>
                )}
              </div>
            ))}
          </ScrollFade>

          {/* Companies — mobile */}
          <div className="mt-10">
            <h3 className="text-xl font-normal text-[#1F2937]">{companiesTitle}</h3>
            <ScrollFade className="mt-4 flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {companies.map((company) => (
                <div key={company.alt} className="flex-shrink-0">
                  <div className="relative h-8 w-36">
                    <img src={company.src} alt={company.alt} className="absolute inset-0 w-full h-full object-contain object-left" />
                  </div>
                  <p className="mt-2 max-w-[160px] text-xs leading-snug text-[#1F2937]/80">
                    {company.description}
                  </p>
                </div>
              ))}
            </ScrollFade>
          </div>
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:block relative overflow-hidden" style={{ height: "calc(100vh - 67px)" }}>

        {/* Avatar — escala com a altura da viewport */}
        <div
          ref={avatarRef}
          style={{ height: "100%", width: "auto", transition: "opacity 0.1s linear" }}
          className="absolute right-0 top-0 pointer-events-none select-none"
        >
          <img
            src="/avatar.png"
            alt="Sergio Prando"
            style={{ height: "100%", width: "auto" }}
            className="object-contain object-bottom"
          />
        </div>

        {/* Texto — 55% da largura do container */}
        <div className="relative z-10 h-full flex flex-col justify-start pt-10 mx-auto w-full max-w-[1440px] px-8">

          <h1
            style={{ ...textAnim(0), fontSize: `clamp(48px, ${lang === "en" ? "4.8vw" : "6vw"}, ${lang === "en" ? "64px" : "88px"})` }}
            className="font-bold leading-none tracking-tight text-[#1F2937]"
          >
            {t.hero.greeting}
          </h1>

          <div ref={subtitleBlockRef} style={{
            marginTop: "3vh",
            marginLeft: winWidth <= 1280 ? "22%" : "28%",
            marginRight: "-10%",
          }}>
            <h2
              style={{ ...textAnim(150), fontSize: "clamp(28px, 3.6vw, 52px)" }}
              className="font-medium leading-tight text-[#1F2937]"
            >
              {t.hero.name}
            </h2>

            {lang === "pt" ? (
              <p style={{ ...textAnim(300), fontSize: "clamp(16px, 1.6vw, 24px)" }} className="mt-3 leading-relaxed text-[#1F2937]">
                {t.hero.role}<br />
                {t.hero.specialty}
              </p>
            ) : (
              <div style={textAnim(300)} className="mt-3">
                <p style={{ fontSize: "clamp(16px, 1.6vw, 24px)" }} className="leading-relaxed text-[#1F2937]">{t.hero.role}</p>
                <p style={{ fontSize: "clamp(16px, 1.6vw, 24px)" }} className="leading-relaxed text-[#1F2937]">{t.hero.specialty}</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div style={{ marginTop: "3vh" }} className="flex items-start gap-10">
            {stats.map((stat, i) => (
              <div key={i}>
                {"value" in stat ? (
                  <>
                    <p style={{ fontSize: "clamp(40px, 4.5vw, 64px)" }} className="font-bold leading-none text-[#1F2937]">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="mt-2 text-base leading-snug text-[#1F2937] whitespace-pre-line">{stat.label}</p>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: "clamp(18px, 1.6vw, 24px)" }} className="font-bold leading-snug text-[#1F2937] whitespace-pre">{stat.highlight}</p>
                    {stat.items?.map((item) => (
                      <p key={item} className="mt-1 text-base text-[#1F2937]">{item}</p>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Companies */}
          <div style={{ marginTop: "4vh" }}>
            <h3
              ref={companiesTitleRef}
              style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
              className="font-normal text-[#1F2937]"
            >
              {companiesTitle}
            </h3>
            <div ref={companiesRef} className="mt-6 flex items-start gap-8">
              {companies.map((company) => (
                <div key={company.alt}>
                  <div className="relative h-12 w-44">
                    <img src={company.src} alt={company.alt} className="absolute inset-0 w-full h-full object-contain object-left" />
                  </div>
                  <p className="mt-2 max-w-[180px] text-sm leading-snug text-[#1F2937]/80">
                    {company.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
