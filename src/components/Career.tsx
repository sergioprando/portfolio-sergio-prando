"use client";

import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";

const certs = [
  { src: "/cert-uxpm1.png",       alt: "UX PM Certification Level 1", label: "UX PM1"       },
  { src: "/cert-certiprof.png",   alt: "Scrum Certiprof",             label: "Certprof"     },
  { src: "/cert-ux-unicornio.png",alt: "UX Unicórnio",               label: "UX Unicórnio" },
];

export default function Career() {
  const { t } = useLang();
  const careerRef = useRef<HTMLElement>(null);
  const careerVisible = useReveal(careerRef);

  const { career } = t;

  return (
    <>
      {/* ── Carreira ── */}
      <section
        id="carreira"
        ref={careerRef}
        className={[
          "w-full bg-[#ECEEE8] pb-16",
          "transition-all duration-700 ease-out",
          careerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1440px] px-8">
          <h2 className="text-[44px] font-normal text-[#1F2937] mb-10">
            {career.title}
          </h2>

          {/* Desktop: two columns / Mobile: stacked */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">

            {/* Left — photo */}
            <div className="flex flex-col items-start md:w-[42%] flex-shrink-0">
              {/* Mobile photo */}
              <div className="w-[min(55vw,208px)] sm:w-full mx-auto sm:mx-0 aspect-square sm:aspect-auto rounded-full overflow-hidden md:hidden">
                <img
                  src="/foto-carreira-mobile-v3.png"
                  alt="Sergio Prando"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Desktop photo */}
              <div className="w-full rounded-2xl overflow-hidden hidden md:block">
                <img
                  src="/foto-carreira-v3.png"
                  alt="Sergio Prando"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right — text */}
            <div className="flex flex-col gap-6 text-[#1F2937]">
              <div>
                <h3 className="text-lg font-bold mb-2">{career.bioTitle}</h3>
                <p className="text-base leading-relaxed">{career.bio}</p>
              </div>

              <a
                href="/sergio-prando-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center md:w-auto md:self-start rounded-full border border-[#1F2937] px-6 py-2 text-sm font-normal uppercase tracking-widest text-[#1F2937] transition-all duration-200 hover:bg-[#FFBB1E] hover:border-[#FFBB1E]"
              >
                {career.cvButton}
              </a>

              <div>
                <h3 className="text-lg font-bold mb-3">{career.deliversTitle}</h3>
                <ul className="flex flex-col gap-3">
                  {career.delivers.map((item, i) => (
                    <li key={i} className="text-base leading-relaxed">
                      <span className="font-semibold">{item.label}</span>{" "}
                      {item.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">{career.numbersTitle}</h3>
                <ul className="flex flex-col gap-2">
                  {career.numbers.map((item, i) => (
                    <li key={i} className="text-base leading-relaxed">
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certificações */}
              <div id="certificacoes" className="pt-4">
                <h2 className="text-[44px] font-normal text-[#1F2937] mb-8">
                  {career.certsTitle}
                </h2>
                <div className="flex flex-wrap gap-8 items-center">
                  {certs.map((cert) => (
                    <div key={cert.alt} className="flex flex-col items-center gap-2">
                      <div className="h-28 flex items-center">
                        <img
                          src={cert.src}
                          alt={cert.alt}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-[#1F2937]">{cert.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
