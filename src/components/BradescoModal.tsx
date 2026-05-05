"use client";

import { useEffect, useState } from "react";

export interface CardRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Props {
  cardRect: CardRect;
  onClose: () => void;
}

const stats = [
  { value: "D+7 > D+0", label: "Dias de espera para resposta o time Bradesco" },
  { value: "+19%",      label: "Na Reversão de Cancelamento" },
  { value: "-42%",      label: "No retrabalho do Setor" },
];

const strategyIntro = "O desafio era transformar um processo Enterprise complexo em algo eficiente. Estruturei o processo de design para garantir a entrega de valor contínuo:";

const strategy = [
  {
    title: "Discovery Qualitativo",
    text: "Entrevistamos stakeholders e usuários para priorizar os problemas que geravam maior impacto na reversão de cancelamentos e entender todo o processo As Is.",
  },
  {
    title: "Mapeamento da Jornada As Is",
    text: "Junto ao time Capgemini, liderei o mapeamento da Jornada As Is para entender as dores e complicações do fluxo de trabalho atual e mapear possíveis oportunidades de melhoria.",
  },
  {
    title: "Priorização Técnica (MOSCOW)",
    text: "Realizamos a priorização de funcionalidades com os times de Arquitetura e Negócios, garantindo que o MVP focasse no que traria ROI imediato para a Capgemini/Bradesco.",
  },
  {
    title: "Workshop To Be",
    text: "Junto aos Stakeholders e time técnico, realizamos um Workshop para mapear a jornada To Be com todas as melhorias e priorizações para garantir a entrega de um MVP que gere valor e impacto.",
  },
  {
    title: "Fluxo de Automação",
    text: "Junto ao time de arquitetura, modelamos o fluxograma do processo futuro para validar a viabilidade técnica da automação antes de investir tempo em UI.",
  },
  {
    title: "UI Validada",
    text: "Prototipagem da solução focada na usabilidade e na adoção rápida pela equipe que estava acostumada ao Excel.",
  },
];

const results = [
  {
    highlight: "Eficiência de Tempo",
    text: "Redução de 7 dias para D+0 no ciclo de atendimento ao cancelamento, agilizando decisões e recuperando receita direta.",
  },
  {
    highlight: "Conversão de Negócios",
    text: "Aumento de 19% na retenção de cancelamentos com abordagem orientada a dados e automação da oferta de contrapropostas.",
  },
  {
    highlight: "Otimização Operacional",
    text: "Redução de 42% no retrabalho do setor ao eliminar processos manuais e centralizar dados via Salesforce CRM.",
  },
];

const toolkit = [
  { name: "Adobe XD",        icon: "/toolkit-xd.png"         },
  { name: "Miro",            icon: "/toolkit-miro.png"        },
  { name: "Salesforce CRM",  icon: "/toolkit-salesforce.png"  },
  { name: "Microsoft Teams", icon: "/toolkit-teams.png"       },
];

export default function BradescoModal({ cardRect, onClose }: Props) {
  const [phase, setPhase] = useState<"init" | "open" | "closing">("init");

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Double-rAF: paint the "init" transform first, then switch to "open"
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setPhase("open"))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const close = () => setPhase("closing");

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // FLIP: translate modal center to card center, then scale down to card size
  const cardCx = cardRect.left + cardRect.width  / 2;
  const cardCy = cardRect.top  + cardRect.height / 2;
  const dx = cardCx - vw / 2;
  const dy = cardCy - vh / 2;
  const sx = cardRect.width  / vw;
  const sy = cardRect.height / vh;

  const collapsed = phase === "init" || phase === "closing";

  const panelTransform = collapsed
    ? `translate(${dx}px, ${dy}px) scale(${sx}, ${sy}) rotateY(${phase === "init" ? "-14deg" : "-14deg"})`
    : `translate(0px, 0px) scale(1, 1) rotateY(0deg)`;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-[600ms] ease-out cursor-pointer"
        style={{ opacity: collapsed ? 0 : 0.65 }}
        onClick={close}
      />

      {/* Perspective container */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: "1400px" }}>
        {/* Modal panel */}
        <div
          className="absolute inset-0 bg-[#F7F8F5] pointer-events-auto"
          style={{
            transform: panelTransform,
            transformOrigin: "center center",
            opacity: phase === "init" ? 0 : 1,
            borderRadius: collapsed ? "20px" : "0px",
            transition:
              "transform 620ms cubic-bezier(0.32, 0.72, 0, 1), " +
              "opacity 180ms ease, " +
              "border-radius 620ms cubic-bezier(0.32, 0.72, 0, 1)",
            willChange: "transform",
          }}
          onTransitionEnd={(e) => {
            if (e.propertyName === "transform" && phase === "closing") onClose();
          }}
        >
          <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {/* ── Sticky header ── */}
            <div className="sticky top-0 z-10 bg-[#F7F8F5]/95 backdrop-blur-sm border-b border-black/10 px-6 md:px-12 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="/bradesco-logo-wide.png" alt="Bradesco Seguros" className="h-7 object-contain object-left flex-shrink-0" />
                <div className="w-px h-6 bg-black/20 hidden sm:block" />
                <p className="text-sm font-semibold text-[#1F2937] hidden sm:block">Retentômetro</p>
              </div>
              <button
                onClick={close}
                aria-label="Fechar"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* ── Content ── */}
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-20">

              {/* Stats */}
              <div className="mt-10">
                <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">Impacto do Projeto</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 md:gap-10 py-8 border-b border-black/10">
                {stats.map((s) => (
                  <div key={s.value}>
                    <p className="text-xl md:text-[2.5rem] font-bold leading-none text-[#1F2937]">{s.value}</p>
                    <p className="mt-2 text-[11px] md:text-sm text-[#1F2937]/60 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Desafio do Projeto */}
              <div className="mt-10">
                <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">Desafio do Projeto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="rounded-2xl overflow-hidden bg-[#D0D2CD]">
                    <img
                      src="/bradesco-foto-equipe.png"
                      alt="Bradesco Seguros — Equipe Retentômetro"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-base leading-relaxed text-[#1F2937]">
                      O Bradesco Seguros possuía um time de retenção sobrecarregado, pois o volume de solicitações B2B era totalmente manual, gerando atrasos de até 7 dias e perda direta de receita por cancelamentos não tratados a tempo.
                    </p>
                    <p className="text-base leading-relaxed text-[#1F2937]">
                      A Capgemini integrou o time conduzindo um Discovery profundo para mapear as dores específicas e os desafios da transição para um processo escalável e automatizado via Salesforce CRM.
                    </p>
                  </div>
                </div>
              </div>

              {/* Strategy + Toolkit */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10">
                <div>
                  <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">
                    Estratégia de Design focada em Valor e Viabilidade
                  </h3>
                  <p className="text-base leading-relaxed text-[#1F2937] mb-5">{strategyIntro}</p>
                  <ol className="space-y-5">
                    {strategy.map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <span className="font-semibold text-base leading-relaxed text-[#1F2937]">{item.title}: </span>
                          <span className="text-base leading-relaxed text-[#1F2937]">{item.text}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">Design Toolkit</h3>
                  <div className="flex flex-col gap-4">
                    {toolkit.map((tool) => (
                      <div key={tool.name} className="flex items-center gap-3">
                        <img
                          src={tool.icon}
                          alt={tool.name}
                          className="w-10 h-10 rounded-xl object-contain flex-shrink-0 bg-white"
                        />
                        <span className="text-sm text-[#1F2937]">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="mt-12">
                <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">Resultado e Entrega de Valor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#D0D2CD]">
                    <img
                      src="/bradesco-proto1.png"
                      alt="Bradesco Retentômetro — Dashboard"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="space-y-6">
                    {results.map((r) => (
                      <div key={r.highlight}>
                        <p className="font-semibold text-base text-[#1F2937]">{r.highlight}</p>
                        <p className="mt-1 text-base leading-relaxed text-[#1F2937]">{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
