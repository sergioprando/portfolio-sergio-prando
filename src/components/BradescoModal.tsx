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

const painPoints = [
  "7 dias de espera para uma simples aprovação de apólice — tempo suficiente para o cliente desistir",
  "Todo o processo crítico de retenção dependia de uma única planilha, sem controle de versão ou rastreabilidade",
  "Cada etapa exigia intervenção humana manual, gerando gargalos invisíveis e perda de receita silenciosa",
  "Documentos trafegavam por e-mail e aprovações eram feitas sem fluxo definido, criando retrabalho constante",
  "O time operava isolado dos demais sistemas do banco, tornando qualquer automação inviável no curto prazo",
];

const results = [
  {
    highlight: "Eficiência de Tempo:",
    text: "Redução drástica de 7 dias de espera para 0 dias. Eliminamos a 'janela da angústia' do cliente B2B, permitindo que a contraproposta fosse gerada instantaneamente, capturando o cliente no momento crítico da decisão.",
  },
  {
    highlight: "Conversão de Negócio:",
    text: "Aumento de 19% na Reversão de Cancelamentos. Este número prova que o design não foi apenas estético. Ao reduzir a fricção e o tempo de resposta, impactamos diretamente o OKR principal do projeto, recuperando receita de forma proativa.",
  },
  {
    highlight: "Otimização Operacional:",
    text: "Redução de 42% no Retrabalho do Setor. Liderei o design focado em usabilidade e adoção rápida. Ao eliminar planilhas e processos manuais morosos, devolvemos quase metade do tempo produtivo da equipe, que agora foca em análises estratégicas, não em tarefas operacionais.",
  },
];

const toolkit = [
  { name: "Adobe XD",        icon: "/toolkit-xd.png"         },
  { name: "Miro",            icon: "/toolkit-miro.png"        },
  { name: "Salesforce CRM",  icon: "/toolkit-salesforce.png"  },
  { name: "Microsoft Teams", icon: "/toolkit-teams.png"       },
];

export default function BradescoModal({ cardRect, onClose }: Props) {
  console.log("BradescoModal v2 — Principais Dores loaded");
  const [phase, setPhase] = useState<"init" | "open" | "closing">("init");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setPhase("open"))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const close = () => setPhase("closing");

  const vw = window.innerWidth;
  const vh = window.innerHeight;

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
              <div className="grid grid-cols-3 gap-4 md:gap-10 mt-10 py-8 border-b border-black/10">
                {stats.map((s) => (
                  <div key={s.value}>
                    <p className="text-xl md:text-[2.5rem] font-bold leading-none text-[#1F2937]">{s.value}</p>
                    <p className="mt-2 text-[11px] md:text-sm text-[#1F2937]/60 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* ── Desafio do Projeto ── */}
              <div className="mt-12">
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
                      Na Bradesco Seguros, o time de retenção lutava diariamente contra o churn de apólices B2B usando processos manuais que geravam atrasos críticos de 7 dias e perda direta de receita.
                    </p>
                    <p className="text-base leading-relaxed text-[#1F2937]">
                      A Capgemini me integrou a este cenário com uma missão clara: conduzir um Discovery profundo para mapear as dores operacionais e viabilizar a transição para um ecossistema automatizado via Salesforce CRM.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Estratégia de Design ── */}
              <div className="mt-14">
                <h3 className="text-[22px] font-normal text-[#1F2937] mb-3">
                  Estratégia de Design focada em Valor e Viabilidade
                </h3>
                <p className="text-base leading-relaxed text-[#1F2937] mb-10">
                  O desafio era transformar um processo Enterprise complexo em algo eficiente. Estruturei o processo de design para garantir a entrega de valor contínuo:
                </p>

                {/* Step 1 — Discovery */}
                <div className="mb-10">
                  <div className="flex gap-4 items-start mb-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">1</span>
                    <div>
                      <p className="font-semibold text-base text-[#1F2937]">Discovery: <span className="font-normal">Entrevistamos stakeholders e analistas para priorizar os problemas que geravam maior impacto na reversão de cancelamentos e entender todo o processo As Is.</span></p>
                    </div>
                  </div>

                  <div className="ml-10">
                    <p className="text-sm font-semibold text-[#1F2937] mb-3">Principais Dores Mapeadas:</p>
                    <ul className="space-y-2 mb-4">
                      {painPoints.map((point, i) => (
                        <li key={i} className="flex gap-2 items-start text-sm leading-relaxed text-[#1F2937]">
                          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1F2937]/50" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-[#1F2937]/60 italic">
                      Entrevista em profundidade | 16 pessoas | Tempo Médio 30min
                    </p>
                  </div>
                </div>

                {/* Step 2 — Jornada As Is */}
                <div className="mb-10">
                  <div className="flex gap-4 items-start mb-5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">2</span>
                    <p className="text-base leading-relaxed text-[#1F2937]">
                      Junto ao time Capgemini eu Liderei o mapeamento da Jornada As Is, para entender as dores e complicações do fluxo de trabalho atual e mapear possíveis oportunidades de melhoria.
                    </p>
                  </div>
                  <div className="ml-10 rounded-2xl overflow-hidden bg-[#D0D2CD]">
                    <img
                      src="/bradesco-mockup-laptop.png"
                      alt="Jornada As Is — Bradesco Retentômetro"
                      className="w-full object-cover"
                    />
                  </div>
                </div>

                {/* Step 3 — MOSCOW */}
                <div className="mb-10">
                  <div className="flex gap-4 items-start mb-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">3</span>
                    <div>
                      <p className="font-semibold text-base text-[#1F2937]">Priorização Técnica (MOSCOW): <span className="font-normal">Realizamos a priorização de funcionalidades com os times de Arquitetura e Negócios, garantindo que o MVP fosse o mais assertivo possível.</span></p>
                    </div>
                  </div>
                  <div className="ml-10 space-y-2 mb-5">
                    <div className="flex gap-2 items-start text-sm leading-relaxed text-[#1F2937]">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1F2937]/50" />
                      Duas sessões de priorização com 6 participantes entre Arquitetura, Negócios e UX. Cada funcionalidade foi avaliada contra dois critérios: impacto na reversão de cancelamentos e viabilidade técnica no curto prazo.
                    </div>
                    <div className="flex gap-2 items-start text-sm leading-relaxed text-[#1F2937]">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1F2937]/50" />
                      Das funcionalidades mapeadas, 40% foram classificadas como Must Have para o MVP, concentrando o escopo no core do processo de retenção.
                    </div>
                  </div>
                </div>

                {/* Step 4 — Workshop To Be */}
                <div className="mb-10">
                  <div className="flex gap-4 items-start mb-5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">4</span>
                    <p className="text-base leading-relaxed text-[#1F2937]">
                      Juntos aos Stakeholders e time técnico realizamos um Workshop para mapear a jornada To Be com todas as melhorias e priorizações para garantir a entrega de um MVP que gere valor e impacto.
                    </p>
                  </div>
                </div>

                {/* Step 5 — Fluxo de Automação */}
                <div className="mb-10">
                  <div className="flex gap-4 items-start mb-5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">5</span>
                    <div>
                      <p className="font-semibold text-base text-[#1F2937]">Fluxo de Automação: <span className="font-normal">Junto ao time de arquitetura modelamos o fluxograma do processo futuro para validar a viabilidade técnica da automação antes de investir tempo em UI.</span></p>
                    </div>
                  </div>
                </div>

                {/* Step 6 — UI Validada */}
                <div className="mb-10">
                  <div className="flex gap-4 items-start mb-5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">6</span>
                    <div>
                      <p className="font-semibold text-base text-[#1F2937]">UI Validada: <span className="font-normal">Realizamos testes de usabilidade e mapa de calor com o time técnico de Retentômetro. Com a Prototipagem testada a solução focada na usabilidade e na adoção rápida pela equipe que estava acostumada ao Excel.</span></p>
                    </div>
                  </div>
                  <div className="ml-10 rounded-2xl overflow-hidden bg-[#D0D2CD]">
                    <img
                      src="/bradesco-proto2.png"
                      alt="UI Validada — Testes de Usabilidade Retentômetro"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* ── Resultado e Entrega de Valor ── */}
              <div className="mt-14 pt-10 border-t border-black/10">
                <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">Resultado e Entrega de Valor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="rounded-2xl overflow-hidden bg-[#D0D2CD]">
                    <img
                      src="/bradesco-proto1.png"
                      alt="Bradesco Retentômetro — Dashboard Final"
                      className="w-full object-cover object-center"
                    />
                  </div>
                  <div className="space-y-5">
                    <p className="text-base leading-relaxed text-[#1F2937]">
                      O Discovery técnico e o design focado em automação, não entregamos apenas telas, mas uma nova capacidade operacional para a Bradesco Seguros. A transição do caos das planilhas para a precisão do Salesforce via Mulesoft permitiu que o time de retenção agisse com a velocidade que o mercado Enterprise exige.
                    </p>
                    <div className="space-y-4">
                      {results.map((r) => (
                        <div key={r.highlight} className="flex gap-2 items-start">
                          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1F2937]" />
                          <p className="text-base leading-relaxed text-[#1F2937]">
                            <span className="font-semibold">{r.highlight}</span> {r.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Design Toolkit ── */}
              <div className="mt-14 pt-10 border-t border-black/10">
                <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">Design Toolkit</h3>
                <div className="flex flex-wrap gap-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}
