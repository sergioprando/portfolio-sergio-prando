"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CardRect } from "@/components/Work";
import FluxoAutomacao from "@/components/FluxoAutomacao";
import FluxoNio from "@/components/FluxoNio";
import FluxoVtalExpress from "@/components/FluxoVtalExpress";
import FluxoCompletoModal from "@/components/FluxoCompletoModal";
import JornadaAsIs from "@/components/JornadaAsIs";
import JornadaToBe from "@/components/JornadaToBe";
import { useLang, type Lang } from "@/lib/i18n";

interface Props {
  projectId: number;
  cardRect: CardRect;
  thumb: string;
  tooltip: string;
  onClose: () => void;
}

/* ── Detecta mobile em portrait ── */
function usePortraitMobile() {
  const check = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(orientation: portrait)").matches &&
    window.innerWidth < 768;

  const [isPortraitMobile, setIsPortraitMobile] = useState(check);

  useEffect(() => {
    const update = () => setIsPortraitMobile(check());
    const mq = window.matchMedia("(orientation: portrait)");
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return isPortraitMobile;
}

/* ── Overlay de rotação exibido dentro do lightbox ── */
function RotateHint({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/80 rounded-2xl pointer-events-none">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="animate-bounce">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="white" strokeWidth="1.8"/>
        <path stroke="#FFBB1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M17 8l3 3-3 3"/>
        <path stroke="#FFBB1E" strokeWidth="1.8" strokeLinecap="round" d="M20 11H9"/>
      </svg>
      <p className="text-white text-sm font-semibold text-center px-8 leading-relaxed">
        {title}
        <br/>
        <span className="text-white/50 text-xs font-normal">{subtitle}</span>
      </p>
    </div>
  );
}

/* ── Bradesco content data ── */
const bradescoPainPoints: Record<Lang, string[]> = {
  pt: [
    "7 dias de espera para uma simples aprovação de apólice — tempo suficiente para o cliente desistir",
    "Todo o processo crítico de retenção dependia de uma única planilha, sem controle de versão ou rastreabilidade",
    "Cada etapa exigia intervenção humana manual, gerando gargalos invisíveis e perda de receita silenciosa",
    "Documentos trafegavam por e-mail e aprovações eram feitas sem fluxo definido, criando retrabalho constante",
    "O time operava isolado dos demais sistemas do banco, tornando qualquer automação inviável no curto prazo",
  ],
  en: [
    "7-day wait for a simple policy approval — enough time for the customer to give up",
    "The entire critical retention process relied on a single spreadsheet, with no version control or traceability",
    "Every step required manual human intervention, creating invisible bottlenecks and silent revenue loss",
    "Documents were shared by email and approvals were made without a defined workflow, creating constant rework",
    "The team operated in isolation from the rest of the bank's systems, making any short-term automation unfeasible",
  ],
};

const bradesco: Record<Lang, {
  stats: { value: string; label: string }[];
  strategyIntro: string;
  strategy: { title: string; text: string; bullets?: string[] }[];
  resultsIntro: string;
  results: { highlight: string; text: string }[];
  toolkit: { name: string; icon: string }[];
}> = {
  pt: {
    stats: [
      { value: "D+7 > D+0", label: "Dias de espera para resposta o time Bradesco" },
      { value: "+19%",       label: "Na Reversão de Cancelamento" },
      { value: "-42%",       label: "No retrabalho do Setor" },
    ],
    strategyIntro: "O desafio era transformar um processo Enterprise complexo em algo eficiente. Estruturei o processo de design para garantir a entrega de valor contínuo:",
    strategy: [
      { title: "Discovery", text: "Entrevistamos stakeholders e analistas para priorizar os problemas que geravam maior impacto na reversão de cancelamentos e entender todo o processo As Is." },
      { title: "Mapeamento da Jornada As Is", text: "Junto ao time Capgemini eu Liderei o mapeamento da Jornada As Is, para entender as dores e complicações do fluxo de trabalho atual e mapear possíveis oportunidades de melhoria." },
      { title: "Priorização Técnica (MOSCOW)", text: "Realizamos a priorização de funcionalidades com os times de Arquitetura e Negócios, garantindo que o MVP fosse o mais assertivo possível.", bullets: ["Duas sessões de priorização com 6 participantes entre Arquitetura, Negócios e UX. Cada funcionalidade foi avaliada contra dois critérios: impacto na reversão de cancelamentos e viabilidade técnica no curto prazo.", "Das funcionalidades mapeadas, 40% foram classificadas como Must Have para o MVP, concentrando o escopo no core do processo de retenção."] },
      { title: "Workshop To Be", text: "Juntos aos Stakeholders e time técnico realizamos um Workshop para mapear a jornada To Be com todas as melhorias e priorizações para garantir a entrega de um MVP que gere valor e impacto." },
      { title: "Fluxo de Automação", text: "Junto ao time de arquitetura modelamos o fluxograma do processo futuro para validar a viabilidade técnica da automação antes de investir tempo em UI." },
      { title: "UI Validada", text: "Realizamos testes de usabilidade e mapa de calor com o time técnico de Retentômetro. Com a Prototipagem testada a solução focada na usabilidade e na adoção rápida pela equipe que estava acostumada ao Excel." },
    ],
    resultsIntro: "O Discovery técnico e o design focado em automação, não entregamos apenas telas, mas uma nova capacidade operacional para a Bradesco Seguros. A transição do caos das planilhas para a precisão do Salesforce via Mulesoft permitiu que o time de retenção agisse com a velocidade que o mercado Enterprise exige.",
    results: [
      { highlight: "Eficiência de Tempo:", text: "Redução drástica de 7 dias de espera para 0 dias. Eliminamos a 'janela da angústia' do cliente B2B, permitindo que a contraproposta fosse gerada instantaneamente, capturando o cliente no momento crítico da decisão." },
      { highlight: "Conversão de Negócio:", text: "Aumento de 19% na Reversão de Cancelamentos. Este número prova que o design não foi apenas estético. Ao reduzir a fricção e o tempo de resposta, impactamos diretamente o OKR principal do projeto, recuperando receita de forma proativa." },
      { highlight: "Otimização Operacional:", text: "Redução de 42% no Retrabalho do Setor. Liderei o design focado em usabilidade e adoção rápida. Ao eliminar planilhas e processos manuais morosos, devolvemos quase metade do tempo produtivo da equipe, que agora foca em análises estratégicas, não em tarefas operacionais." },
    ],
    toolkit: [
      { name: "Adobe XD",        icon: "/toolkit-xd.png"        },
      { name: "Hotjar",          icon: "/toolkit-hotjar.png"     },
      { name: "Microsoft Teams", icon: "/toolkit-teams.png"      },
      { name: "Miro",            icon: "/toolkit-miro.png"       },
      { name: "Salesforce CRM",  icon: "/toolkit-salesforce.png" },
    ],
  },
  en: {
    stats: [
      { value: "D+7 > D+0", label: "Days of waiting for a response from the Bradesco team" },
      { value: "+19%",       label: "In Cancellation Reversal" },
      { value: "-42%",       label: "In Sector Rework" },
    ],
    strategyIntro: "The challenge was to transform a complex Enterprise process into something efficient. I structured the design process to ensure continuous value delivery:",
    strategy: [
      { title: "Discovery", text: "We interviewed stakeholders and analysts to prioritise the problems generating the greatest impact on cancellation reversals and to fully understand the As Is process." },
      { title: "As Is Journey Mapping", text: "Alongside the Capgemini team I led the As Is Journey mapping, to understand the pain points and complications of the current workflow and map potential improvement opportunities." },
      { title: "Technical Prioritisation (MOSCOW)", text: "We prioritised features with the Architecture and Business teams, ensuring the MVP was as targeted as possible.", bullets: ["Two prioritisation sessions with 6 participants across Architecture, Business and UX. Each feature was assessed against two criteria: impact on cancellation reversals and short-term technical feasibility.", "Of the mapped features, 40% were classified as Must Have for the MVP, focusing scope on the core of the retention process."] },
      { title: "To Be Workshop", text: "Together with stakeholders and the technical team, we ran a Workshop to map the To Be journey with all improvements and priorities to ensure delivery of an MVP that generates value and impact." },
      { title: "Automation Flow", text: "Alongside the architecture team, we modelled the future process flowchart to validate technical automation feasibility before investing time in UI." },
      { title: "Validated UI", text: "We conducted usability testing and heat mapping with the technical Retentômetro team. With the prototype tested, the solution focused on usability and rapid adoption by the team accustomed to Excel." },
    ],
    resultsIntro: "From the technical Discovery and automation-focused design, we delivered not just screens but a new operational capability for Bradesco Seguros. The transition from spreadsheet chaos to Salesforce precision via Mulesoft allowed the retention team to act at the speed the Enterprise market demands.",
    results: [
      { highlight: "Time Efficiency:", text: "Drastic reduction from 7 days of waiting to 0. We eliminated the B2B client's 'anxiety window', allowing the counter-proposal to be generated instantly, capturing the customer at the critical moment of decision." },
      { highlight: "Business Conversion:", text: "19% increase in Cancellation Reversals. This number proves the design wasn't merely aesthetic. By reducing friction and response time, we directly impacted the project's main OKR, proactively recovering revenue." },
      { highlight: "Operational Optimisation:", text: "42% reduction in Sector Rework. I led design focused on usability and rapid adoption. By eliminating slow spreadsheets and manual processes, we gave back nearly half the team's productive time, which now focuses on strategic analysis rather than operational tasks." },
    ],
    toolkit: [
      { name: "Adobe XD",        icon: "/toolkit-xd.png"        },
      { name: "Hotjar",          icon: "/toolkit-hotjar.png"     },
      { name: "Microsoft Teams", icon: "/toolkit-teams.png"      },
      { name: "Miro",            icon: "/toolkit-miro.png"       },
      { name: "Salesforce CRM",  icon: "/toolkit-salesforce.png" },
    ],
  },
};

function BradescoContent({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLang();
  const cs = t.modals.cases;
  const data = bradesco[lang];
  const painPoints = bradescoPainPoints[lang];
  const [showJornada, setShowJornada] = useState(false);
  const [showJornadaToBe, setShowJornadaToBe] = useState(false);

  return (
    <>
    {showJornada && <JornadaAsIs onClose={() => setShowJornada(false)} />}
    {showJornadaToBe && <JornadaToBe onClose={() => setShowJornadaToBe(false)} />}
    <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-[#F7F8F5]/95 backdrop-blur-sm border-b border-black/10 py-4">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/bradesco-logo-wide.png" alt="Bradesco Seguros" className="h-7 object-contain object-left flex-shrink-0" />
            <div className="w-px h-6 bg-black/20 hidden sm:block" />
            <p className="text-sm font-semibold text-[#1F2937] hidden sm:block">Retentômetro</p>
          </div>
          <button onClick={onClose} aria-label={t.modals.close}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-20">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-10 mt-10 py-8 border-b border-black/10">
          {data.stats.map((s) => (
            <div key={s.value}>
              <p className="text-xl md:text-[2.5rem] font-bold leading-none text-[#1F2937]">{s.value}</p>
              <p className="mt-2 text-[11px] md:text-sm text-[#1F2937]/60 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Desafio do Projeto */}
        <div className="mt-12">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.projectChallenge}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden bg-[#D0D2CD]">
              <img src="/retentometroDesafio.png" alt="Bradesco Seguros — Desafio Retentômetro" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              {lang === "pt" ? <>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  Na Bradesco Seguros, o time de retenção lutava diariamente contra o churn de apólices B2B usando processos manuais que geravam atrasos críticos de 7 dias e perda direta de receita.
                </p>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  A Capgemini me integrou a este cenário com uma missão clara: conduzir um Discovery profundo para mapear as dores operacionais e viabilizar a transição para um ecossistema automatizado via Salesforce CRM.
                </p>
              </> : <>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  At Bradesco Seguros, the retention team fought daily against B2B policy churn using manual processes that generated critical 7-day delays and direct revenue loss.
                </p>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  Capgemini brought me into this scenario with a clear mission: to conduct a deep Discovery to map operational pain points and enable the transition to an automated ecosystem via Salesforce CRM.
                </p>
              </>}
            </div>
          </div>
        </div>

        {/* Estratégia */}
        <div className="mt-14">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-3">
            {cs.bradesco.strategyTitle}
          </h3>
          <p className="text-base leading-relaxed text-[#1F2937] mb-10">{data.strategyIntro}</p>

          {/* Step 1 — Discovery */}
          <div className="mb-10">
            {/* Duas colunas: card dores (esq) + imagem (dir) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Card esquerdo — fundo cinza + borda vermelha esquerda + todas as bordas arredondadas */}
              <div className="bg-[#F0F1ED] border-l-4 border-[#CC0000] rounded-xl px-5 py-5 flex flex-col justify-between">
                <div>
                  {/* Número + título dentro do card */}
                  <div className="flex gap-3 items-center mb-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center">1</span>
                    <span className="text-base font-semibold text-[#1F2937]">{data.strategy[0].title}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#1F2937] mb-4">
                    {data.strategy[0].text}
                  </p>
                  <p className="text-sm font-semibold text-[#1F2937] mb-3">{cs.bradesco.keyPainPoints}</p>
                  <ul className="space-y-2 mb-4">
                    {painPoints.map((point, i) => (
                      <li key={i} className="flex gap-2 items-start text-sm leading-relaxed text-[#1F2937]">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1F2937]/50" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-[#1F2937]/60 italic">{cs.bradesco.discoveryFootnote}</p>
              </div>

              {/* Imagem direita */}
              <div className="rounded-xl overflow-hidden bg-[#F7F8F5] flex items-center justify-center">
                <img
                  src="/EntrevistaBradescoSeguros.png"
                  alt="Entrevista em profundidade — Bradesco Seguros"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>
          </div>

          {/* Step 2 — Jornada As Is */}
          <div className="mb-10">
            <div className="flex gap-4 items-start mb-5">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">2</span>
              <p className="text-base leading-relaxed text-[#1F2937]">
                {data.strategy[1].text}
              </p>
            </div>
            <div className="overflow-hidden">
              <img src="/TimeRetentometro.png" alt="Time Retentômetro — Jornada As Is" className="w-full object-cover" />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowJornada(true)}
                className="rounded-full border border-[#1F2937] px-6 py-1.5 text-sm font-normal text-[#1F2937] bg-transparent transition-all duration-200 hover:bg-[#1F2937] hover:text-white cursor-pointer">
                {cs.startJourneyAsIs}
              </button>
            </div>
          </div>

          {/* Step 3 — MOSCOW */}
          <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Card esquerdo — cinza sem borda vermelha */}
              <div className="bg-[#F0F1ED] rounded-xl px-5 py-5 flex flex-col justify-between">
                <div>
                  <div className="flex gap-3 items-center mb-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center">3</span>
                    <span className="text-base font-semibold text-[#1F2937]">{data.strategy[2].title}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#1F2937] mb-4">
                    {data.strategy[2].text}
                  </p>
                  <div className="space-y-2">
                    {data.strategy[2].bullets?.map((b, i) => (
                      <div key={i} className="flex gap-2 items-start text-sm leading-relaxed text-[#1F2937]">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1F2937]/50" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Imagem direita */}
              <div className="rounded-xl overflow-hidden bg-[#F7F8F5]">
                <img
                  src="/MOSCOWRetentometro.png"
                  alt="MOSCOW — Priorização Retentômetro"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>
          </div>

          {/* Step 4 — Workshop To Be */}
          <div className="mb-10">
            <div className="flex gap-4 items-start mb-5">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">4</span>
              <p className="text-base leading-relaxed text-[#1F2937]">
                {data.strategy[3].text}
              </p>
            </div>
            <div className="overflow-hidden rounded-xl">
              <img
                src="/JornadaToBeRetentometro.png"
                alt="Jornada To Be — Retentômetro"
                className="w-full h-auto object-contain block"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowJornadaToBe(true)}
                className="rounded-full border border-[#1F2937] px-6 py-1.5 text-sm font-normal text-[#1F2937] bg-transparent transition-all duration-200 hover:bg-[#1F2937] hover:text-white cursor-pointer">
                {cs.startJourneyToBe}
              </button>
            </div>
          </div>

          {/* Step 5 — Fluxo de Automação */}
          <div className="mb-10">
            <div className="flex gap-4 items-start mb-5">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">5</span>
              <p className="text-base leading-relaxed text-[#1F2937]">
                <span className="font-semibold">{data.strategy[4].title}: </span>
                {data.strategy[4].text}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden bg-white p-4">
              <FluxoAutomacao />
            </div>
          </div>

          {/* Step 6 — UI Validada */}
          <div className="mb-10">
            <div className="flex gap-4 items-start mb-5">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">6</span>
              <p className="text-base leading-relaxed text-[#1F2937]">
                <span className="font-semibold">{data.strategy[5].title}: </span>
                {data.strategy[5].text}
              </p>
            </div>
            <div className="overflow-hidden rounded-xl">
              <img
                src="/RetentometroMapaDeCalor.png"
                alt="Mapa de Calor — UI Validada Retentômetro"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
        </div>

        {/* Resultado e Entrega de Valor */}
        <div className="mt-14 pt-10 border-t border-black/10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.resultsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <RetentometroCarousel />
            </div>
            <div className="space-y-5">
              <p className="text-base leading-relaxed text-[#1F2937]">{data.resultsIntro}</p>
              <div className="space-y-4">
                {data.results.map((r) => (
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

        {/* Design Toolkit */}
        <div className="mt-14 pt-10 border-t border-black/10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.designToolkit}</h3>
          <div className="flex flex-wrap gap-6">
            {data.toolkit.map((tool) => (
              <div key={tool.name} className="flex items-center gap-3">
                <img src={tool.icon} alt={tool.name} className="w-10 h-10 rounded-xl object-contain flex-shrink-0 bg-white" />
                <span className="text-sm text-[#1F2937]">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

/* ── Retentômetro Salesforce carousel ── */
const retentometroSlides = [
  "/SalesForceRetentometro1.png",
  "/SalesForceRetentometro2.png",
  "/SalesForceRetentometro3.png",
  "/SalesForceRetentometro4.png",
  "/SalesForceRetentometro5.png",
  "/SalesForceRetentometro6.png",
  "/SalesForceRetentometro7.png",
  "/SalesForceRetentometro8.png",
];

function RetentometroCarousel() {
  const { t } = useLang();
  const [index,    setIndex]    = useState(0);
  const [dir,      setDir]      = useState(1);
  const [lightbox, setLightbox] = useState(false);
  const isPortraitMobile = usePortraitMobile();

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = info.offset.x + info.velocity.x * 0.3;
    if (swipe < -30 && index < retentometroSlides.length - 1) go(index + 1);
    else if (swipe > 30 && index > 0) go(index - 1);
  };

  const slideVariants = {
    enter:  (d: number) => ({ x: d * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d * -80, opacity: 0 }),
  };

  const arrowClass =
    "flex-shrink-0 w-9 h-9 rounded-full bg-[#1F2937]/60 hover:bg-[#1F2937]/90 " +
    "flex items-center justify-center text-white transition-colors cursor-pointer";

  const arrowClassLightbox =
    "flex-shrink-0 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 " +
    "flex items-center justify-center text-white transition-colors cursor-pointer";

  return (
    <>
      {/* ── inline carousel ── */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 w-full">
          <div className="w-9 flex-shrink-0 flex justify-center">
            {index > 0 && (
              <button onClick={() => go(index - 1)} aria-label="Anterior" className={arrowClass}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}
          </div>

          <div
            className="relative flex-1 overflow-hidden rounded-2xl bg-[#D0D2CD] cursor-zoom-in"
            style={{ aspectRatio: "16 / 9" }}
            onClick={() => setLightbox(true)}
          >
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.img
                key={index}
                src={retentometroSlides[index]}
                alt={`Retentômetro Salesforce — tela ${index + 1}`}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover select-none"
              />
            </AnimatePresence>
          </div>

          <div className="w-9 flex-shrink-0 flex justify-center">
            {index < retentometroSlides.length - 1 && (
              <button onClick={() => go(index + 1)} aria-label="Próxima" className={arrowClass}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {retentometroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-[#1F2937]" : "bg-[#1F2937]/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-black/80" onClick={() => setLightbox(false)} />

            <button
              onClick={() => setLightbox(false)}
              aria-label="Fechar lightbox"
              className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div className="relative z-10 flex items-center gap-4 w-full max-w-[90vw] px-4">
              <div className="w-11 flex-shrink-0 flex justify-center">
                {index > 0 && (
                  <button onClick={() => go(index - 1)} aria-label="Anterior imagem" className={arrowClassLightbox}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                )}
              </div>

              <div
                className="relative flex-1 overflow-hidden rounded-2xl bg-black"
                style={{ aspectRatio: "16 / 9" }}
              >
                {isPortraitMobile && <RotateHint title={t.modals.rotate.title} subtitle={t.modals.rotate.subtitle} />}
                <AnimatePresence initial={false} custom={dir} mode="wait">
                  <motion.img
                    key={index}
                    src={retentometroSlides[index]}
                    alt={`Retentômetro Salesforce — tela ${index + 1}`}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={handleDragEnd}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain select-none"
                  />
                </AnimatePresence>
              </div>

              <div className="w-11 flex-shrink-0 flex justify-center">
                {index < retentometroSlides.length - 1 && (
                  <button onClick={() => go(index + 1)} aria-label="Próxima imagem" className={arrowClassLightbox}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="relative z-10 flex gap-3 mt-5">
              {retentometroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Imagem ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === index ? "bg-white" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Saúde Consulta image carousel ── */
const carouselSlides = [
  "/saudeconsulta1celular.png",
  "/saudeconsulta2celular.png",
  "/saudeconsulta3celular.png",
  "/saudeconsulta4celular.png",
  "/saudeconsulta5celular.png",
  "/saudeconsulta6celular.png",
  "/saudeconsulta7celular.png",
];

function SaudeCarousel() {
  const [index,    setIndex]    = useState(0);
  const [dir,      setDir]      = useState(1);
  const [lightbox, setLightbox] = useState(false);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = info.offset.x + info.velocity.x * 0.3;
    if (swipe < -30 && index < carouselSlides.length - 1) go(index + 1);
    else if (swipe > 30 && index > 0) go(index - 1);
  };

  const slideVariants = {
    enter:  (d: number) => ({ x: d * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d * -80, opacity: 0 }),
  };

  const arrowClass = "flex-shrink-0 w-9 h-9 rounded-full " +
    "bg-[#1F2937]/60 hover:bg-[#1F2937]/90 flex items-center justify-center " +
    "text-white transition-colors cursor-pointer";

  const arrowClassLightbox =
    "flex-shrink-0 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 " +
    "flex items-center justify-center text-white transition-colors cursor-pointer";

  return (
    <>
      {/* ── inline carousel ── */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto md:mx-auto">
          <div className="w-9 flex-shrink-0 flex justify-center">
            {index > 0 && (
              <button onClick={() => go(index - 1)} aria-label="Anterior" className={arrowClass}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}
          </div>

          <div
            className="relative flex-1 md:flex-none md:h-[600px] overflow-hidden rounded-2xl cursor-zoom-in"
            style={{ aspectRatio: "780 / 1739" }}
            onClick={() => setLightbox(true)}
          >
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.img
                key={index}
                src={carouselSlides[index]}
                alt={`Bradesco Saúde Consulta — tela ${index + 1}`}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                draggable={false}
                className="absolute inset-0 w-full h-full object-contain select-none"
              />
            </AnimatePresence>
          </div>

          <div className="w-9 flex-shrink-0 flex justify-center">
            {index < carouselSlides.length - 1 && (
              <button onClick={() => go(index + 1)} aria-label="Próxima" className={arrowClass}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-[#1F2937]" : "bg-[#1F2937]/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-black/80" onClick={() => setLightbox(false)} />

            <button
              onClick={() => setLightbox(false)}
              aria-label="Fechar lightbox"
              className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-11 flex-shrink-0 flex justify-center">
                {index > 0 && (
                  <button onClick={() => go(index - 1)} aria-label="Anterior imagem" className={arrowClassLightbox}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                )}
              </div>

              <div
                className="relative overflow-hidden rounded-2xl bg-black"
                style={{ height: "85vh", aspectRatio: "780 / 1739" }}
              >

                <AnimatePresence initial={false} custom={dir} mode="wait">
                  <motion.img
                    key={index}
                    src={carouselSlides[index]}
                    alt={`Bradesco Saúde Consulta — tela ${index + 1}`}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={handleDragEnd}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain select-none"
                  />
                </AnimatePresence>
              </div>

              <div className="w-11 flex-shrink-0 flex justify-center">
                {index < carouselSlides.length - 1 && (
                  <button onClick={() => go(index + 1)} aria-label="Próxima imagem" className={arrowClassLightbox}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="relative z-10 flex gap-3 mt-5">
              {carouselSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Imagem ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === index ? "bg-white" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Bradesco Saúde Consulta content ── */
const saudeConsulta: Record<Lang, {
  stats: { value: string; label: string }[];
  strategyIntro: string;
  strategy: { title: string; text: string }[];
  results: { highlight: string; text: string }[];
  toolkit: { name: string; icon: string }[];
}> = {
  pt: {
    stats: [
      { value: "-22%",  label: "Na redução de tickets de suporte repetitivos" },
      { value: "+23%",  label: "No NPS da jornada do segurado" },
    ],
    strategyIntro: "A abordagem foi dividida em três pilares fundamentais para garantir a aderência do usuário e a viabilidade técnica:",
    strategy: [
      { title: "Discovery & Mapeamento de Fricção", text: "Realizamos uma imersão profunda para entender por que o catálogo estático falhava. Identificamos que a falta de confirmação em tempo real era o que levava o cliente a abandonar o app e ligar na central." },
      { title: "Arquitetura de Informação & Design de Serviço", text: "Redesenhamos o fluxo de busca por geolocalização e filtros de cobertura, garantindo que o usuário pudesse encontrar e agendar o exame em poucos toques, sem sair do ambiente digital." },
      { title: "Implementação de Self-Service", text: "Focamos na criação de uma interface de autoatendimento que consumia APIs de parceiros de saúde, permitindo que o segurado visualizasse a disponibilidade real das unidades." },
    ],
    results: [
      { highlight: "Redução Drástica de Tickets", text: "Diminuição no volume de chamados repetitivos para dúvidas de cobertura, liberando o time de atendimento para casos de maior complexidade." },
      { highlight: "Melhoria no NPS da Jornada", text: "O aumento da autonomia do segurado refletiu diretamente na percepção de valor do plano de saúde." },
      { highlight: "Eficiência de Dados", text: "A estruturação da base de dados para o agendamento permitiu uma atualização mais ágil da rede credenciada, mitigando o erro de informações obsoletas que existia no modelo anterior." },
    ],
    toolkit: [
      { name: "Figma",           icon: "/toolkit-figma.png"       },
      { name: "Hotjar",          icon: "/toolkit-hotjar.png"      },
      { name: "Miro",            icon: "/toolkit-miro-saude.png"  },
      { name: "Microsoft Teams", icon: "/toolkit-teams.png"       },
    ],
  },
  en: {
    stats: [
      { value: "-22%",  label: "Reduction in repetitive support tickets" },
      { value: "+23%",  label: "In policyholder journey NPS" },
    ],
    strategyIntro: "The approach was divided into three fundamental pillars to ensure user adoption and technical feasibility:",
    strategy: [
      { title: "Discovery & Friction Mapping", text: "We conducted a deep dive to understand why the static catalogue was failing. We identified that the lack of real-time confirmation was what led customers to abandon the app and call the contact centre." },
      { title: "Information Architecture & Service Design", text: "We redesigned the geolocation search flow and coverage filters, ensuring users could find and schedule their exam in just a few taps, without leaving the digital environment." },
      { title: "Self-Service Implementation", text: "We focused on creating a self-service interface that consumed health partner APIs, allowing policyholders to view the real availability of units." },
    ],
    results: [
      { highlight: "Drastic Ticket Reduction", text: "Decrease in the volume of repetitive calls for coverage queries, freeing the support team for more complex cases." },
      { highlight: "Journey NPS Improvement", text: "The increased policyholder autonomy was directly reflected in the perceived value of the health plan." },
      { highlight: "Data Efficiency", text: "Structuring the scheduling database allowed for more agile updates to the accredited network, mitigating the outdated information errors present in the previous model." },
    ],
    toolkit: [
      { name: "Figma",           icon: "/toolkit-figma.png"       },
      { name: "Hotjar",          icon: "/toolkit-hotjar.png"      },
      { name: "Miro",            icon: "/toolkit-miro-saude.png"  },
      { name: "Microsoft Teams", icon: "/toolkit-teams.png"       },
    ],
  },
};

function SaudeConsultaContent({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLang();
  const cs = t.modals.cases;
  const data = saudeConsulta[lang];

  return (
    <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-[#F7F8F5]/95 backdrop-blur-sm border-b border-black/10 py-4">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/bradesco-consulta-logo.png" alt="Bradesco Seguros" className="h-7 object-contain object-left flex-shrink-0" />
            <div className="w-px h-6 bg-black/20 hidden sm:block" />
            <p className="text-sm font-semibold text-[#1F2937] hidden sm:block">Saúde e Consulta</p>
          </div>
          <button onClick={onClose} aria-label={t.modals.close}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-20">
        {/* Stats */}
        <div className="mt-10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.projectImpact}</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-10 py-8 border-b border-black/10">
          {data.stats.map((s) => (
            <div key={s.value}>
              <p className="text-xl md:text-[2.5rem] font-bold leading-none text-[#1F2937]">{s.value}</p>
              <p className="mt-2 text-[11px] md:text-sm text-[#1F2937]/60 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Desafio */}
        <div className="mt-10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.projectChallenge}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden bg-[#D0D2CD]">
              <img src="/bradesco-consulta-ilustra.png" alt="Bradesco Saúde — Jornada do Segurado" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              {lang === "pt" ? <>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  Em 2017, a Bradesco Seguros enfrentava um alto volume de tickets de suporte originados por uma falha de informação: o catálogo de unidades conveniadas estava frequentemente desatualizado. Isso impedia que o segurado soubesse, com precisão, onde realizar seus exames, gerando frustração e sobrecarga nos canais de atendimento.
                </p>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  A MJV foi acionada para transformar essa jornada analógica em uma experiência de Self-Service Scheduling. O design não é apenas visual, mas de engenharia de dados: consolidar informações de unidades conveniadas em uma interface intuitiva dentro do ecossistema mobile do banco.
                </p>
              </> : <>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  In 2017, Bradesco Seguros was facing a high volume of support tickets stemming from an information failure: the catalogue of accredited units was frequently outdated. This prevented policyholders from knowing exactly where to have their tests done, generating frustration and overload in support channels.
                </p>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  MJV was brought in to transform this analogue journey into a Self-Service Scheduling experience. The design is not just visual, but data engineering: consolidating accredited unit information into an intuitive interface within the bank's mobile ecosystem.
                </p>
              </>}
            </div>
          </div>
        </div>

        {/* Strategy + Toolkit */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10">
          <div>
            <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">
              {cs.designStrategy}
            </h3>
            <p className="text-base leading-relaxed text-[#1F2937] mb-5">{data.strategyIntro}</p>
            <ol className="space-y-5">
              {data.strategy.map((item, i) => (
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
            <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.designToolkit}</h3>
            <div className="flex flex-col gap-4">
              {data.toolkit.map((tool) => (
                <div key={tool.name} className="flex items-center gap-3">
                  <img src={tool.icon} alt={tool.name} className="w-10 h-10 rounded-xl object-contain flex-shrink-0 bg-white" />
                  <span className="text-sm text-[#1F2937]">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-12">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.resultsTitle}</h3>
          <p className="text-base leading-relaxed text-[#1F2937] mb-6">
            {lang === "pt"
              ? "Ao migrar o processo de consulta e agendamento para o modelo de autoatendimento, o projeto entregou resultados tangíveis:"
              : "By migrating the consultation and scheduling process to the self-service model, the project delivered tangible results:"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <SaudeCarousel />
            <div className="space-y-6">
              {data.results.map((r) => (
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
  );
}

/* ── V.tal Express carousel ── */
const tecExpressSlides = [
  "/tecexpress1celular.png",
  "/tecexpress2celular.png",
  "/tecexpress3celular.png",
  "/tecexpress4celular.png",
];

function TecExpressCarousel() {
  const [index,    setIndex]    = useState(0);
  const [dir,      setDir]      = useState(1);
  const [lightbox, setLightbox] = useState(false);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = info.offset.x + info.velocity.x * 0.3;
    if (swipe < -30 && index < tecExpressSlides.length - 1) go(index + 1);
    else if (swipe > 30 && index > 0) go(index - 1);
  };

  const slideVariants = {
    enter:  (d: number) => ({ x: d * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d * -80, opacity: 0 }),
  };

  const arrowClass =
    "flex-shrink-0 w-9 h-9 rounded-full bg-[#1F2937]/60 hover:bg-[#1F2937]/90 " +
    "flex items-center justify-center text-white transition-colors cursor-pointer";

  const arrowClassLightbox =
    "flex-shrink-0 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 " +
    "flex items-center justify-center text-white transition-colors cursor-pointer";

  return (
    <>
      {/* ── inline carousel ── */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto md:mx-auto">
          <div className="w-9 flex-shrink-0 flex justify-center">
            {index > 0 && (
              <button onClick={() => go(index - 1)} aria-label="Anterior" className={arrowClass}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}
          </div>

          <div
            className="relative flex-1 md:flex-none md:h-[600px] overflow-hidden rounded-2xl cursor-zoom-in"
            style={{ aspectRatio: "427 / 950" }}
            onClick={() => setLightbox(true)}
          >
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.img
                key={index}
                src={tecExpressSlides[index]}
                alt={`V.tal Express — tela ${index + 1}`}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                draggable={false}
                className="absolute inset-0 w-full h-full object-contain select-none"
              />
            </AnimatePresence>
          </div>

          <div className="w-9 flex-shrink-0 flex justify-center">
            {index < tecExpressSlides.length - 1 && (
              <button onClick={() => go(index + 1)} aria-label="Próxima" className={arrowClass}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {tecExpressSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-[#1F2937]" : "bg-[#1F2937]/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-black/80" onClick={() => setLightbox(false)} />

            <button
              onClick={() => setLightbox(false)}
              aria-label="Fechar lightbox"
              className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-11 flex-shrink-0 flex justify-center">
                {index > 0 && (
                  <button onClick={() => go(index - 1)} aria-label="Anterior imagem" className={arrowClassLightbox}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                )}
              </div>

              <div
                className="relative overflow-hidden rounded-2xl bg-black"
                style={{ height: "85vh", aspectRatio: "427 / 950" }}
              >
                <AnimatePresence initial={false} custom={dir} mode="wait">
                  <motion.img
                    key={index}
                    src={tecExpressSlides[index]}
                    alt={`V.tal Express — tela ${index + 1}`}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={handleDragEnd}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain select-none"
                  />
                </AnimatePresence>
              </div>

              <div className="w-11 flex-shrink-0 flex justify-center">
                {index < tecExpressSlides.length - 1 && (
                  <button onClick={() => go(index + 1)} aria-label="Próxima imagem" className={arrowClassLightbox}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="relative z-10 flex gap-3 mt-5">
              {tecExpressSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Imagem ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === index ? "bg-white" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── V.tal Express data ── */
const vtalExpressDiscoveryPains: Record<Lang, string[]> = {
  pt: [
    "Tempo de recrutamento e onboarding demasiadamente longo — até 30 dias para um técnico estar operacional",
    "Exigências de perfil restritivas: Ensino Médio completo, CNH B definitiva e disponibilidade para escalas/sobreavisos limitavam bastante o funil de contratação",
    "Sistemas de suporte ineficientes: plataformas de gestão de ordens de serviço (OS) fora do ar, lentas ou com atualizações desencontradas entre a central e o campo",
    "Deslocamento e trânsito: perda excessiva de tempo no trajeto reduzia a quantidade de chamados atendidos por dia",
  ],
  en: [
    "Recruitment and onboarding time far too long — up to 30 days before a technician could operate independently",
    "Restrictive profile requirements: completed high school, definitive category B licence, and shift availability significantly narrowed the hiring funnel",
    "Inefficient support systems: service-order management platforms offline, slow or out of sync between HQ and the field",
    "Commute and traffic: excessive travel time reduced the number of calls each technician could handle per day",
  ],
};

const vtalExpress: Record<Lang, {
  stats: { title: string; desc: string }[];
  strategyIntro: string;
  strategy: { title: string; text: string }[];
  results: { highlight: string; text: string }[];
  toolkit: { name: string; icon: string }[];
}> = {
  pt: {
    stats: [
      { title: "Tempo Médio de Ativação",   desc: "Redução no tempo de onboarding técnico via interface simplificada." },
      { title: "Disponibilidade Regional",  desc: "Mapeamento em tempo real de 100% da força de trabalho por geolocalização." },
      { title: "Autonomia",                 desc: "Digitalização total do fluxo de aceite de Ordens de Serviço (Zero Paper)." },
    ],
    strategyIntro: "A abordagem foi estruturada para mitigar os riscos operacionais da transição para o modelo GIG e garantir a viabilidade técnica da solução. O processo foi dividido em quatro fases fundamentais:",
    strategy: [
      { title: "Discovery Holístico e Etnografia", text: "Conduzimos um Discovery profundo, alinhando as expectativas de stakeholders, patrocinadores (sponsors) e do time técnico de engenharia. Para compreender a realidade operacional, realizamos entrevistas etnográficas com 10 técnicos de campo, acompanhando suas rotinas e mapeando as dores latentes na jornada de atendimento." },
      { title: "Arquitetura de Solução Inteligente", text: "Priorizamos uma arquitetura baseada em geolocalização de alta precisão. Implementamos um agente de IA Generativa para automatizar a triagem de ordens de serviço e otimizar o roteamento, direcionando os pedidos para técnicos disponíveis dentro do raio de atendimento, reduzindo custos logísticos e tempos de deslocamento." },
      { title: "Prototipagem Mobile-First e Validação Externa", text: "Desenvolvemos um protótipo navegável sob o conceito de Mobile-First. Como estratégia de MVP, optou-se por uma aplicação web responsiva para acelerar o Go-to-Market. Validamos a facilidade do fluxo de onboarding e a usabilidade da jornada com 10 técnicos externos à rede V.tal, garantindo que a interface fosse intuitiva para novos ingressantes." },
      { title: "Implantação Piloto e Escala", text: "Realizamos o Go-Live do piloto no final de Março de 2026, em uma região no Rio de Janeiro. A adesão e a receptividade dos técnicos foram excepcionais. Com a validação da hipótese de produto e eficiência operacional comprovada, avançamos para o processo de escalabilidade do V.tal Técnico Express para todas as filiais do estado do Rio de Janeiro." },
    ],
    results: [
      { highlight: "Eficiência Operacional",  text: "Mapeamento de 100% da força de trabalho em tempo real e automação completa do fluxo de OS (Zero Paper)." },
      { highlight: "Padronização Técnica",    text: "Garantia de qualidade na execução via jornada guiada, mitigando erros e futuras reclamações de clientes." },
      { highlight: "Design de Escala",        text: "Criação de um Design System robusto que sustenta a expansão nacional, garantindo consistência e baixa manutenção técnica." },
    ],
    toolkit: [
      { name: "Figma",           icon: "/toolkit-figma.png"  },
      { name: "Hotjar",          icon: "/toolkit-hotjar.png" },
      { name: "Miro",            icon: "/toolkit-miro.png"   },
      { name: "Microsoft Teams", icon: "/toolkit-teams.png"  },
    ],
  },
  en: {
    stats: [
      { title: "Average Activation Time",  desc: "Reduction in technical onboarding time via simplified interface." },
      { title: "Regional Availability",    desc: "Real-time mapping of 100% of the workforce by geolocation." },
      { title: "Autonomy",                 desc: "Complete digitalisation of the Service Order acceptance flow (Zero Paper)." },
    ],
    strategyIntro: "The approach was structured to mitigate the operational risks of the transition to the GIG model and ensure the technical feasibility of the solution. The process was divided into four fundamental phases:",
    strategy: [
      { title: "Holistic Discovery & Ethnography", text: "We conducted a deep Discovery, aligning the expectations of stakeholders, sponsors and the technical engineering team. To understand the operational reality, we conducted ethnographic interviews with 20 field technicians, following their routines and mapping latent pain points in the service journey." },
      { title: "Intelligent Solution Architecture", text: "We prioritised an architecture based on high-precision geolocation. We implemented a Generative AI agent to automate service order triage and optimise routing, directing requests to available technicians within the service radius, reducing logistical costs and travel times." },
      { title: "Mobile-First Prototyping & External Validation", text: "We developed a navigable prototype under a Mobile-First concept. As an MVP strategy, we chose a responsive web application to accelerate Go-to-Market. We validated the ease of the onboarding flow and journey usability with 10 technicians external to the V.tal network, ensuring the interface was intuitive for new entrants." },
      { title: "Pilot Deployment & Scale", text: "We launched the pilot at the end of March 2026, in a region of Rio de Janeiro. The adoption and receptivity of technicians were exceptional. With the product hypothesis validated and operational efficiency proven, we advanced to the process of scaling V.tal Técnico Express to all branches in the state of Rio de Janeiro." },
    ],
    results: [
      { highlight: "Operational Efficiency",  text: "Real-time mapping of 100% of the workforce and complete automation of the OS flow (Zero Paper)." },
      { highlight: "Technical Standardisation", text: "Quality guarantee in execution via guided journey, mitigating errors and future customer complaints." },
      { highlight: "Scale Design",             text: "Creation of a robust Design System that supports national expansion, ensuring consistency and low technical maintenance." },
    ],
    toolkit: [
      { name: "Figma",           icon: "/toolkit-figma.png"  },
      { name: "Hotjar",          icon: "/toolkit-hotjar.png" },
      { name: "Miro",            icon: "/toolkit-miro.png"   },
      { name: "Microsoft Teams", icon: "/toolkit-teams.png"  },
    ],
  },
};

function VtalExpressContent({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLang();
  const cs = t.modals.cases;
  const data = vtalExpress[lang];
  const [showFluxo, setShowFluxo] = useState(false);

  return (
    <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-[#F7F8F5]/95 backdrop-blur-sm border-b border-black/10 py-4">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo-vtal-express.png" alt="V.tal Express" className="h-7 object-contain object-left flex-shrink-0" />
            <div className="w-px h-6 bg-black/20 hidden sm:block" />
            <p className="text-sm font-semibold text-[#1F2937] hidden sm:block">Técnico Express</p>
          </div>
          <button onClick={onClose} aria-label={t.modals.close}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-20">

        {/* Stats — title + description format */}
        <div className="mt-10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.projectImpact}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-black/10">
          {data.stats.map((s) => (
            <div key={s.title}>
              <p className="text-base font-semibold text-[#1F2937] mb-1">{s.title}</p>
              <p className="text-sm text-[#1F2937]/60 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Desafio */}
        <div className="mt-10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.projectChallenge}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden bg-[#D0D2CD]">
              <img src="/ilustra-vtal-express.png" alt="V.tal Express — equipe de campo" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              {lang === "pt" ? <>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  A V.tal, gigante da infraestrutura B2B em Telecom, enfrentava um desafio crítico de sustentabilidade operacional: um alto índice de turnover entre os técnicos de manutenção e instalação de fibra óptica. Este cenário gerava um efeito cascata negativo, resultando em recorrentes reclamações de clientes finais e uma complexidade logística extrema para gerenciar equipes por região.
                </p>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  O desafio central foi a concepção de um modelo de GIG Economy trabalhado sob demanda customizado para o setor. A proposta era criar o V.tal Express: uma plataforma onde o técnico atua com autonomia e flexibilidade, permitindo que a empresa escalasse suas capacidades de atendimento sem os gargalos do modelo de contratação tradicional.
                </p>
              </> : <>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  V.tal, a B2B infrastructure giant in Telecom, faced a critical operational sustainability challenge: a high turnover rate among fibre optic maintenance and installation technicians. This scenario created a negative cascade effect, resulting in recurring end-customer complaints and extreme logistical complexity in managing teams by region.
                </p>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  The central challenge was the conception of a demand-based GIG Economy model customised for the sector. The proposal was to create V.tal Express: a platform where technicians operate with autonomy and flexibility, allowing the company to scale its service capabilities without the bottlenecks of the traditional hiring model.
                </p>
              </>}
            </div>
          </div>
        </div>

        {/* Strategy */}
        <div className="mt-12">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.designStrategy}</h3>
          <p className="text-base leading-relaxed text-[#1F2937] mb-8">{data.strategyIntro}</p>

          <ol className="space-y-8">
            {data.strategy.map((item, i) => (
              <li key={i}>
                {/* Discovery — layout duas colunas */}
                {i === 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {/* Coluna esquerda: card estilo Bradesco */}
                    <div className="bg-[#F0F1ED] border-l-4 border-[#CC0000] rounded-xl px-5 py-5 flex flex-col justify-between">
                      <div className="flex gap-4 items-start mb-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                          1
                        </span>
                        <div>
                          <span className="font-semibold text-base leading-relaxed text-[#1F2937]">{item.title}: </span>
                          <span className="text-base leading-relaxed text-[#1F2937]">{item.text}</span>
                        </div>
                      </div>
                      <div className="ml-10">
                        <p className="text-sm font-semibold text-[#1F2937] mb-3">
                          {lang === "pt" ? "Principais Dores Mapeadas:" : "Key Pain Points Identified:"}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {vtalExpressDiscoveryPains[lang].map((pain, j) => (
                            <li key={j} className="flex gap-2 items-start text-sm leading-relaxed text-[#1F2937]">
                              <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1F2937]/50" />
                              {pain}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-[#1F2937]/60 italic">
                          {lang === "pt"
                            ? "Entrevista em profundidade | 14 pessoas | Tempo Médio 30min"
                            : "In-depth interview | 14 people | Average time 30min"}
                        </p>
                      </div>
                    </div>
                    {/* Coluna direita: foto */}
                    <div className="rounded-2xl overflow-hidden bg-[#D0D2CD] self-start">
                      <img src="/EntrevistaVtalExpress.png" alt="Entrevista etnográfica V.tal Express" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-semibold text-base leading-relaxed text-[#1F2937]">{item.title}: </span>
                        <span className="text-base leading-relaxed text-[#1F2937]">{item.text}</span>
                      </div>
                    </div>
                    {/* Fluxo SVG da Arquitetura + botão fluxo completo */}
                    {i === 1 && (
                      <>
                        <div className="mt-6 rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white p-3">
                          <FluxoVtalExpress />
                        </div>
                        <div className="mt-4 flex justify-center">
                          <button
                            onClick={() => setShowFluxo(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1F2937] text-sm font-semibold text-[#1F2937] hover:bg-[#1F2937] hover:text-white transition-colors cursor-pointer"
                          >
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
                            </svg>
                            VER FLUXO COMPLETO
                          </button>
                        </div>
                        {showFluxo && <FluxoCompletoModal onClose={() => setShowFluxo(false)} />}
                      </>
                    )}
                    {/* Imagens de protótipo — step 3 (Prototipagem Mobile-First) */}
                    {i === 2 && (
                      <div className="mt-6 ml-10 overflow-hidden">
                        <div className="flex gap-8 items-start">
                          <div className="min-w-0 flex-1">
                            <img src="/PrototipoVtalExpress1.png" alt="Protótipo V.tal Express — tela 1"
                              className="w-full h-auto rounded-xl object-contain" />
                          </div>
                          <div className="min-w-0 flex-1 hidden md:block">
                            <img src="/PrototipoVtalExpress2.png" alt="Protótipo V.tal Express — tela 2"
                              className="w-full h-auto rounded-xl object-contain" />
                          </div>
                          <div className="min-w-0 flex-1 hidden md:block">
                            <img src="/PrototipoVtalExpress3.png" alt="Protótipo V.tal Express — tela 3"
                              className="w-full h-auto rounded-xl object-contain" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Results */}
        <div className="mt-12">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.resultsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <TecExpressCarousel />
            <div className="space-y-6">
              {data.results.map((r) => (
                <div key={r.highlight}>
                  <p className="font-semibold text-base text-[#1F2937]">{r.highlight}</p>
                  <p className="mt-1 text-base leading-relaxed text-[#1F2937]">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design Toolkit */}
        <div className="mt-10 pt-10 border-t border-black/10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.designToolkit}</h3>
          <div className="flex flex-wrap gap-6">
            {data.toolkit.map((tool) => (
              <div key={tool.name} className="flex items-center gap-3">
                <img src={tool.icon} alt={tool.name} className="w-10 h-10 rounded-xl object-contain flex-shrink-0 bg-white" />
                <span className="text-sm text-[#1F2937]">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── V.tal Conecta carousel ── */
const vtalConectaSlides = [
  "/vtalconecta1.png",
  "/vtalconecta2.png",
  "/vtalconecta3.png",
  "/vtalconecta4.png",
];

function VtalConectaCarousel() {
  const { t } = useLang();
  const [index,     setIndex]     = useState(0);
  const [dir,       setDir]       = useState(1);
  const [lightbox,  setLightbox]  = useState(false);
  const isPortraitMobile = usePortraitMobile();

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = info.offset.x + info.velocity.x * 0.3;
    if (swipe < -30 && index < vtalConectaSlides.length - 1) go(index + 1);
    else if (swipe > 30 && index > 0) go(index - 1);
  };

  const slideVariants = {
    enter:  (d: number) => ({ x: d * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d * -80, opacity: 0 }),
  };

  const arrowClass =
    "flex-shrink-0 w-9 h-9 rounded-full bg-[#1F2937]/60 hover:bg-[#1F2937]/90 " +
    "flex items-center justify-center text-white transition-colors cursor-pointer";

  const arrowClassLightbox =
    "flex-shrink-0 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 " +
    "flex items-center justify-center text-white transition-colors cursor-pointer";

  return (
    <>
      {/* ── inline carousel ── */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 w-full">
          <div className="w-9 flex-shrink-0 flex justify-center">
            {index > 0 && (
              <button onClick={() => go(index - 1)} aria-label="Anterior" className={arrowClass}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}
          </div>

          <div
            className="relative flex-1 overflow-hidden rounded-2xl bg-[#D0D2CD] cursor-zoom-in"
            style={{ aspectRatio: "1370 / 768" }}
            onClick={() => setLightbox(true)}
          >
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.img
                key={index}
                src={vtalConectaSlides[index]}
                alt={`V.tal Conecta — tela ${index + 1}`}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover select-none"
              />
            </AnimatePresence>
          </div>

          <div className="w-9 flex-shrink-0 flex justify-center">
            {index < vtalConectaSlides.length - 1 && (
              <button onClick={() => go(index + 1)} aria-label="Próxima" className={arrowClass}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {vtalConectaSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-[#1F2937]" : "bg-[#1F2937]/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setLightbox(false)}
            />

            {/* close button */}
            <button
              onClick={() => setLightbox(false)}
              aria-label="Fechar lightbox"
              className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* image + arrows */}
            <div className="relative z-10 flex items-center gap-4 w-full max-w-[90vw] px-4">
              <div className="w-11 flex-shrink-0 flex justify-center">
                {index > 0 && (
                  <button onClick={() => go(index - 1)} aria-label="Anterior imagem" className={arrowClassLightbox}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                )}
              </div>

              <div
                className="relative flex-1 overflow-hidden rounded-2xl bg-black"
                style={{ aspectRatio: "1370 / 768" }}
              >
                {isPortraitMobile && <RotateHint title={t.modals.rotate.title} subtitle={t.modals.rotate.subtitle} />}
                <AnimatePresence initial={false} custom={dir} mode="wait">
                  <motion.img
                    key={index}
                    src={vtalConectaSlides[index]}
                    alt={`V.tal Conecta — tela ${index + 1}`}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={handleDragEnd}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-contain select-none"
                  />
                </AnimatePresence>
              </div>

              <div className="w-11 flex-shrink-0 flex justify-center">
                {index < vtalConectaSlides.length - 1 && (
                  <button onClick={() => go(index + 1)} aria-label="Próxima imagem" className={arrowClassLightbox}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* dots */}
            <div className="relative z-10 flex gap-3 mt-5">
              {vtalConectaSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Imagem ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === index ? "bg-white" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── V.tal Conecta data ── */
const vtalConecta: Record<Lang, {
  stats: { value: string; label: string }[];
  strategyIntro: string;
  strategy: { title: string; text: string }[];
  results: { highlight: string; text: string }[];
  toolkit: { name: string; icon: string }[];
}> = {
  pt: {
    stats: [
      { value: "-50%",  label: "Tempo de resposta para novos orçamentos" },
      { value: "-60%",  label: "Abertura de chamados de suporte no nível 2" },
      { value: "",       label: "Estabilidade e Integração de Legados" },
    ],
    strategyIntro: "A abordagem foi estruturada para eliminar silos de informação e converter processos manuais em fluxos automatizados de alta precisão:",
    strategy: [
      { title: "Discovery e Mapeamento de Personas", text: "Realizamos um Desk Research profundo em sistemas legados e helpdesk, alinhando expectativas entre engenheiros e stakeholders. Mapeamos as jornadas de usuários em diversos níveis técnicos para garantir que a centralização do conhecimento eliminasse os principais gargalos de informação e suporte dos parceiros." },
      { title: "Arquitetura e Automação de Custos", text: "Estruturamos fluxos funcionais que integram dados de geolocalização ao motor de cálculo de OpEx. Essa arquitetura substituiu processos manuais por uma precificação automatizada (fibras, equipamentos e deslocamento), permitindo que a complexidade técnica dos sistemas antigos fosse convertida em respostas comerciais instantâneas." },
      { title: "Design Desktop-First e Omnicanalidade", text: "Priorizamos uma interface para Desktop, atendendo ao perfil de uso de 80% do público, com funcionalidades mobile reduzidas ao essencial. Prototipamos a central de atendimento integrada a Agentes de IA, validando a fluência do canal Omnichannel antes do desenvolvimento para garantir uma experiência de suporte eficiente e intuitiva." },
      { title: "Validação e Estabilidade Técnica", text: "Conduzimos ciclos de testes com o time técnico e parceiros, focando na precisão dos cálculos e na performance das APIs. As validações pré e pós-implantação garantiram que a transição dos sistemas legados para a nova plataforma ocorresse sem latência, assegurando a estabilidade necessária para a escala do projeto." },
    ],
    results: [
      { highlight: "Eficiência e Precisão no Pricing", text: "A automação do motor de cálculo de OpEx reduziu em 50% o tempo de resposta para novos orçamentos. A integração de dados geoespaciais eliminou processos manuais, garantindo precisão imediata na viabilidade técnica e maior previsibilidade financeira para os parceiros." },
      { highlight: "Escalabilidade via IA e Omnichannel", text: "A implementação dos Agentes de IA absorveu 60% dos chamados de nível 1, reduzindo drasticamente o tempo médio de atendimento (TMA). Sua integração em canal único transformou o suporte em uma experiência de autoatendimento eficiente e disponível 24/7." },
      { highlight: "Estabilidade e Integração de Legados", text: "A nova arquitetura orquestrou com sucesso os sistemas legados, eliminando gargalos de informação. Com performance validada, o V.tal Conecta consolidou-se como o \"ponto único de verdade\", suportando a expansão nacional da rede neutra com total estabilidade técnica." },
    ],
    toolkit: [
      { name: "Figma",           icon: "/toolkit-figma.png"        },
      { name: "Hotjar",          icon: "/toolkit-hotjar.png"       },
      { name: "Miro",            icon: "/toolkit-miro.png"         },
      { name: "Microsoft Teams", icon: "/toolkit-teams.png"        },
      { name: "Google Cloud",    icon: "/toolkit-google-cloud.png" },
    ],
  },
  en: {
    stats: [
      { value: "-50%",  label: "Response time for new quotations" },
      { value: "-60%",  label: "Level 2 support ticket opening" },
      { value: "",       label: "Stability & Legacy Integration" },
    ],
    strategyIntro: "The approach was structured to eliminate information silos and convert manual processes into highly accurate automated flows:",
    strategy: [
      { title: "Discovery & Persona Mapping", text: "We conducted deep desk research into legacy systems and helpdesk, aligning expectations between engineers and stakeholders. We mapped user journeys across various technical levels to ensure the centralisation of knowledge eliminated the main bottlenecks of partner information and support." },
      { title: "Architecture & Cost Automation", text: "We structured functional flows integrating geolocation data into the OpEx calculation engine. This architecture replaced manual processes with automated pricing (fibres, equipment and travel), allowing the technical complexity of old systems to be converted into instant commercial responses." },
      { title: "Desktop-First Design & Omnichannel", text: "We prioritised a Desktop interface, serving the usage profile of 80% of the audience, with mobile features reduced to essentials. We prototyped the support centre integrated with AI Agents, validating Omnichannel flow before development to ensure an efficient and intuitive support experience." },
      { title: "Validation & Technical Stability", text: "We conducted testing cycles with the technical team and partners, focusing on calculation accuracy and API performance. Pre- and post-deployment validations ensured the transition from legacy systems to the new platform occurred without latency, securing the stability necessary for the project's scale." },
    ],
    results: [
      { highlight: "Efficiency & Pricing Accuracy", text: "The automation of the OpEx calculation engine reduced the response time for new quotations by 50%. The integration of geospatial data eliminated manual processes, ensuring immediate accuracy in technical feasibility and greater financial predictability for partners." },
      { highlight: "Scalability via AI & Omnichannel", text: "The implementation of AI Agents absorbed 60% of Level 1 calls, drastically reducing average handling time (AHT). Their integration into a single channel transformed support into an efficient self-service experience available 24/7." },
      { highlight: "Stability & Legacy Integration", text: "The new architecture successfully orchestrated legacy systems, eliminating information bottlenecks. With validated performance, V.tal Conecta consolidated itself as the 'single source of truth', supporting the national expansion of the neutral network with full technical stability." },
    ],
    toolkit: [
      { name: "Figma",           icon: "/toolkit-figma.png"        },
      { name: "Hotjar",          icon: "/toolkit-hotjar.png"       },
      { name: "Miro",            icon: "/toolkit-miro.png"         },
      { name: "Microsoft Teams", icon: "/toolkit-teams.png"        },
      { name: "Google Cloud",    icon: "/toolkit-google-cloud.png" },
    ],
  },
};

function VtalConectaContent({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLang();
  const cs = t.modals.cases;
  const data = vtalConecta[lang];

  return (
    <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-[#F7F8F5]/95 backdrop-blur-sm border-b border-black/10 py-4">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo-vtal-express.png" alt="V.tal Conecta" className="h-7 object-contain object-left flex-shrink-0" />
            <div className="w-px h-6 bg-black/20 hidden sm:block" />
            <p className="text-sm font-semibold text-[#1F2937] hidden sm:block">Técnico Express</p>
          </div>
          <button onClick={onClose} aria-label={t.modals.close}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-20">

        {/* Stats */}
        <div className="mt-10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.projectImpact}</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-10 py-8 border-b border-black/10">
          {data.stats.map((s, i) => (
            <div key={i}>
              {s.value
                ? <>
                    <p className="text-xl md:text-[2.5rem] font-bold leading-none text-[#1F2937]">{s.value}</p>
                    <p className="mt-2 text-[11px] md:text-sm text-[#1F2937]/60 leading-snug">{s.label}</p>
                  </>
                : <p className="text-base md:text-lg font-semibold text-[#1F2937] leading-snug">{s.label}</p>
              }
            </div>
          ))}
        </div>

        {/* Desafio */}
        <div className="mt-10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.projectChallenge}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden bg-[#D0D2CD]">
              <img src="/IlustraVtalConecta.png" alt="V.tal Conecta — plataforma de infraestrutura" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              {lang === "pt" ? <>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  Em 2026, a V.tal enfrentava o desafio de escalar sua operação, lidando com uma alta fragmentação de dados e processos. Informações de viabilidade técnica eram mantidas em sistemas legados, enquanto o cálculo de custos operacionais (OpEx) dependia de fluxos manuais, gerando gargalos na expansão da rede e um suporte reativo aos parceiros de infraestrutura.
                </p>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  A Capgemini foi acionada para desenvolver o V.tal Conecta, uma plataforma desenhada para transformar essa complexidade em eficiência operacional. O design de engenharia focou na integração de dados de geolocalização e na automação do motor de cálculo de custos — incluindo deslocamento, equipamentos e servidores — garantindo precisão absoluta e respostas instantâneas para a viabilidade de novos pontos de fibra.
                </p>
              </> : <>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  In 2026, V.tal faced the challenge of scaling its operation while dealing with high data and process fragmentation. Technical feasibility information was maintained in legacy systems, while operational cost (OpEx) calculations depended on manual flows, creating bottlenecks in network expansion and reactive support for infrastructure partners.
                </p>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  Capgemini was brought in to develop V.tal Conecta, a platform designed to transform this complexity into operational efficiency. The engineering design focused on integrating geolocation data and automating the cost calculation engine — including travel, equipment and servers — ensuring absolute accuracy and instant responses for the feasibility of new fibre points.
                </p>
              </>}
            </div>
          </div>
        </div>

        {/* Strategy + Toolkit */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10">
          <div>
            <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.designStrategy}</h3>
            <p className="text-base leading-relaxed text-[#1F2937] mb-5">{data.strategyIntro}</p>
            <ol className="space-y-5">
              {data.strategy.map((item, i) => (
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
            <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.designToolkit}</h3>
            <div className="flex flex-col gap-4">
              {data.toolkit.map((tool) => (
                <div key={tool.name} className="flex items-center gap-3">
                  <img src={tool.icon} alt={tool.name} className="w-10 h-10 rounded-xl object-contain flex-shrink-0 bg-white" />
                  <span className="text-sm text-[#1F2937]">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-12">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.resultsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <VtalConectaCarousel />
            <div className="space-y-6">
              {data.results.map((r) => (
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
  );
}

/* ── NIO data ── */
const nio: Record<Lang, {
  stats: { title: string; desc: string }[];
  strategyIntro: string;
  strategy: { title: string; text: string }[];
  results: { highlight: string; text: string }[];
  toolkit: { name: string; icon: string }[];
}> = {
  pt: {
    stats: [
      { title: "Otimização Radical de OPEX",       desc: "A automação de 100% da triagem e dos fluxos iniciais de negociação." },
      { title: "Recuperação de Crédito (Cash-in)", desc: "A natureza ativa do agente permitiu contatos proativos e humanizados." },
      { title: "Resolução Autônoma",               desc: "Clientes conseguiram suporte e negociação 24/7, eliminando filas de espera." },
    ],
    strategyIntro: "Neste cenário, meu foco como Designer foi converter processos burocráticos de cobrança em fluxos conversacionais fluidos:",
    strategy: [
      { title: "Desenho da Jornada do Agente", text: "Mapeamos e desenhamos a jornada completa do Agente NIO focada em negociação de dívidas — fluxos que permitem ao cliente resolver pendências financeiras de forma autônoma, reduzindo atrito e aumentando o cash-in da companhia." },
      { title: "MVP por Texto: Validação com Risco Controlado", text: "Antes de escalar, optamos por um MVP baseado em atendimento por texto (não voz), priorizando canais assíncronos para mapear gaps, fricções e riscos da jornada com menor custo de retrabalho. A decisão de começar por texto foi deliberada: permite auditoria do fluxo conversacional, ajuste de tom de voz da IA e identificação de quebras na jornada antes de qualquer investimento em infraestrutura de voz." },
      { title: "Arquitetura Ativa em Camadas: HubSpot + N8N", text: "O MVP foi implementado com HubSpot e N8N — plataformas de médio porte, deliberadamente escolhidas para validar a hipótese com custo reduzido antes de comprometer a stack definitiva. Essa decisão de arquitetura reduziu o risco financeiro do projeto e permitiu iterações rápidas na jornada. O fluxo construído no N8N já incorporava a lógica de \"Agente Ativo\": a IA não apenas responde, mas inicia o contato de forma inteligente baseada no perfil do usuário. Validada a ideia, a solução foi migrada e escalada via Vertex AI Agent Builder." },
      { title: "Validação Interna: Time + Stakeholders", text: "Antes de expor o MVP ao público externo, testamos internamente com nosso time e 10 stakeholders para validar a coerência da jornada, identificar gaps de negócio e ajustar o comportamento do agente. Essa etapa funcionou como teste de mesa estruturado — essencial para não transferir problemas de lógica para usuários reais." },
      { title: "Pesquisa Comportamental em Escala", text: "Com a jornada validada internamente, conduzimos uma análise quantitativa com mais de 30 usuários internos (time Vtal e NIO), mapeando padrões de resposta, pontos de fricção e gatilhos de engajamento durante a negociação." },
      { title: "Validação Qualitativa com Usuários Reais", text: "Realizamos entrevistas em profundidade com 10 usuários que interagiram diretamente com o Agente NIO. Esse feedback foi determinante para calibrar o tom de voz da IA e garantir que a abordagem ativa fosse percebida como humanizada e resolutiva — e não invasiva." },
      { title: "Design de Conversação e ROI", text: "A arquitetura final em Vertex AI Agent Builder consolidou os aprendizados de todas as fases anteriores em fluxos de negociação automatizados focados em redução de OPEX. A interface permite que o cliente resolva pendências financeiras de forma autônoma, com impacto direto no aumento do cash-in da NIO." },
    ],
    results: [
      { highlight: "Otimização Radical de OPEX", text: "A automação de 100% da triagem e dos fluxos iniciais de negociação permitiu uma redução drástica nos custos operacionais. Ao migrar o volume de chamadas de baixa complexidade do Call Center para o Agente de IA, liberamos a força de trabalho humana para tratativas críticas, otimizando o custo por atendimento e escalando a capacidade da NIO sem inflacionar a folha de pagamento." },
      { highlight: "Incremento na Recuperação de Crédito (Cash-in)", text: "Diferente dos modelos passivos, a natureza ativa do agente permitiu contatos proativos e humanizados. A jornada de negociação desenhada com base nas pesquisas comportamentais (100+ testadores) resultou em maior conversão — redução da fricção no pagamento com a geração instantânea de boletos e acordos dentro da conversa — e recuperação de valores que anteriormente seriam perdidos pelo gargalo de capacidade do call center tradicional." },
      { highlight: "Experiência do Cliente e Resolução Autônoma", text: "As entrevistas qualitativas com os 30 clientes reais comprovaram que a interface conversacional foi percebida como uma facilidade, não como uma barreira. A IA foi validada como \"humanizada e resolutiva\", mantendo o padrão de marca da NIO mesmo em situações sensíveis de cobrança, e clientes conseguiram suporte e negociação 24/7, eliminando filas de espera." },
    ],
    toolkit: [
      { name: "Figma",                   icon: "/toolkit-figma.png"        },
      { name: "Vertex AI Agent Builder", icon: "/toolkit-vertex.png"       },
      { name: "Google Cloud",            icon: "/toolkit-google-cloud.png" },
      { name: "Miro",                    icon: "/toolkit-miro.png"         },
      { name: "Microsoft Teams",         icon: "/toolkit-teams.png"        },
    ],
  },
  en: {
    stats: [
      { title: "Radical OPEX Optimisation",       desc: "Automation of 100% of triage and initial negotiation flows." },
      { title: "Credit Recovery (Cash-in)",        desc: "The agent's active nature enabled proactive and humanised contacts." },
      { title: "Autonomous Resolution",            desc: "Customers achieved support and negotiation 24/7, eliminating waiting queues." },
    ],
    strategyIntro: "In this scenario, my focus as a Designer was to convert bureaucratic collection processes into fluid conversational flows:",
    strategy: [
      { title: "Cost Optimisation (OPEX)", text: "Replacing manual call centre flows with a conversational AI interface, drastically reducing the cost per interaction." },
      { title: "Agent Journey Design", text: "Design of automated negotiation flows that allow customers to resolve financial pending matters without friction, increasing the company's cash-in." },
      { title: "Active Scalability", text: "Implementation of an 'Active Agent' logic, where the AI not only responds but initiates contact intelligently based on the user's profile." },
      { title: "Behavioural Research at Scale", text: "We conducted quantitative analysis with a critical mass of over 100 users, mapping response patterns, friction points and engagement triggers during the negotiation journey." },
      { title: "Qualitative Validation with Real Users", text: "We conducted in-depth interviews with 30 customers who interacted directly with Agent NIO. This qualitative feedback was fundamental for adjusting the AI's tone of voice and ensuring the active approach was perceived as humanised and effective, not invasive." },
      { title: "Conversation Design & ROI", text: "We implemented automated negotiation flows via Vertex AI Agent Builder, focused on OPEX reduction. The interface was designed to allow customers to resolve financial matters autonomously, directly impacting the increase in NIO's cash-in." },
    ],
    results: [
      { highlight: "Radical OPEX Optimisation", text: "The automation of 100% of triage and initial negotiation flows allowed for a drastic reduction in operational costs. By migrating the volume of low-complexity calls from the Call Centre to the AI Agent, we freed the human workforce for critical negotiations, optimising cost per interaction and scaling NIO's capacity without inflating payroll." },
      { highlight: "Increased Credit Recovery (Cash-in)", text: "Unlike passive models, the agent's active nature enabled proactive and humanised contacts. The negotiation journey designed based on behavioural research (100+ testers) resulted in higher conversion — reduced payment friction with instant generation of payment slips and agreements within the conversation — and recovery of values previously lost due to the bottleneck capacity of the traditional call centre." },
      { highlight: "Customer Experience & Autonomous Resolution", text: "Qualitative interviews with 30 real customers proved the conversational interface was perceived as a convenience, not a barrier. The AI was validated as 'humanised and effective', maintaining NIO's brand standard even in sensitive collection situations, and customers achieved support and negotiation 24/7, eliminating waiting queues." },
    ],
    toolkit: [
      { name: "Figma",                   icon: "/toolkit-figma.png"        },
      { name: "Vertex AI Agent Builder", icon: "/toolkit-vertex.png"       },
      { name: "Google Cloud",            icon: "/toolkit-google-cloud.png" },
      { name: "Miro",                    icon: "/toolkit-miro.png"         },
      { name: "Microsoft Teams",         icon: "/toolkit-teams.png"        },
    ],
  },
};

function NioContent({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLang();
  const cs = t.modals.cases;
  const data = nio[lang];

  return (
    <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-[#F7F8F5]/95 backdrop-blur-sm border-b border-black/10 py-4">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo-nio-agent.png" alt="AI Agent NIO" className="h-7 object-contain object-left flex-shrink-0" />
            <div className="w-px h-6 bg-black/20 hidden sm:block" />
            <p className="text-sm font-semibold text-[#1F2937] hidden sm:block">{lang === "pt" ? "Automação Inteligente de Recuperação e Atendimento" : "Intelligent Recovery & Service Automation"}</p>
          </div>
          <button onClick={onClose} aria-label={t.modals.close}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-20">

        {/* Stats */}
        <div className="mt-10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.projectImpact}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-black/10">
          {data.stats.map((s) => (
            <div key={s.title}>
              <p className="text-base font-semibold text-[#1F2937] mb-1">{s.title}</p>
              <p className="text-sm text-[#1F2937]/60 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Desafio */}
        <div className="mt-10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.projectChallenge}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden bg-[#D0D2CD]">
              <img src="/ilustra-nio.png" alt="NIO — Ilustração do projeto" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              {lang === "pt" ? <>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  A NIO, operadora de telecomunicações B2C, enfrentava um gargalo crítico em sua operação financeira: o alto índice de inadimplência aliado ao elevado custo operacional (OPEX) para manutenção de um Call Center ativo para cobrança ativa. O modelo tradicional apresentava baixa escalabilidade e taxas de conversão insuficientes frente ao volume de clientes.
                </p>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  Para mitigar essa dor, fomos desafiados a projetar um dos primeiros AI Agents (Agentes de IA Generativa) ativos do país. O objetivo central não era apenas automatizar o atendimento, mas criar uma camada de inteligência capaz de atuar proativamente na recuperação de crédito e na resolução de demandas de suporte de forma autônoma, humanizada e escalável.
                </p>
              </> : <>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  NIO, a B2C telecommunications operator, faced a critical bottleneck in its financial operations: a high delinquency rate combined with elevated operational costs (OPEX) for maintaining an active Call Centre for debt collection. The traditional model showed low scalability and insufficient conversion rates relative to the volume of customers.
                </p>
                <p className="text-base leading-relaxed text-[#1F2937]">
                  To address this pain point, we were challenged to design one of the first active AI Agents (Generative AI Agents) in the country. The central objective was not just to automate service, but to create an intelligence layer capable of proactively recovering credit and resolving support demands in an autonomous, humanised and scalable way.
                </p>
              </>}
            </div>
          </div>
        </div>

        {/* Strategy */}
        <div className="mt-12">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.nio.strategyTitle}</h3>
          <p className="text-base leading-relaxed text-[#1F2937] mb-5">{data.strategyIntro}</p>
          <ol className="space-y-5">
            {data.strategy.map((item, i) => (
              <>
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F2937] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-base leading-relaxed text-[#1F2937]">{item.title}: </span>
                    <span className="text-base leading-relaxed text-[#1F2937]">{item.text}</span>
                  </div>
                </li>
                {i === 0 && (
                  <li key="fluxo-nio" className="list-none">
                    <div className="rounded-2xl overflow-hidden border border-black/8 bg-white p-4">
                      <FluxoNio />
                    </div>
                  </li>
                )}
                {i === 1 && (
                  <li key="nio-n8n" className="list-none">
                    <div className="rounded-2xl overflow-hidden bg-[#D0D2CD]">
                      <img src="/NION8N.png" alt="NIO — Fluxo N8N MVP" className="w-full h-auto object-cover" />
                    </div>
                  </li>
                )}
              </>
            ))}
          </ol>
        </div>

        {/* Results */}
        <div className="mt-12">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.resultsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden bg-[#D0D2CD]">
              <img src="/ai-agent-nio.png" alt="NIO — AI Agent interface" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
              {data.results.map((r) => (
                <div key={r.highlight}>
                  <p className="font-semibold text-base text-[#1F2937]">{r.highlight}</p>
                  <p className="mt-1 text-base leading-relaxed text-[#1F2937]">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design Toolkit */}
        <div className="mt-10 pt-10 border-t border-black/10">
          <h3 className="text-[22px] font-normal text-[#1F2937] mb-6">{cs.designToolkit}</h3>
          <div className="flex flex-wrap gap-6">
            {data.toolkit.map((tool) => (
              <div key={tool.name} className="flex items-center gap-3">
                <img src={tool.icon} alt={tool.name} className="w-10 h-10 rounded-xl object-contain flex-shrink-0 bg-white" />
                <span className="text-sm text-[#1F2937]">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function PlaceholderContent({ thumb, tooltip, onClose }: { thumb: string; tooltip: string; onClose: () => void }) {
  const { t } = useLang();
  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 bg-[#F7F8F5]/95 backdrop-blur-sm border-b border-black/10 px-6 md:px-12 py-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-[#1F2937]">{tooltip}</p>
        <button onClick={onClose} aria-label={t.modals.close}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <img src={thumb} alt={tooltip} className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default function ProjectModal({ projectId, cardRect, thumb, tooltip, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // FLIP: translate + scale to match card position from fullscreen origin
  const scaleX = cardRect.width  / vw;
  const scaleY = cardRect.height / vh;
  const cardCx = cardRect.left + cardRect.width  / 2;
  const cardCy = cardRect.top  + cardRect.height / 2;
  const dx = cardCx - vw / 2;
  const dy = cardCy - vh / 2;

  const collapsed = { x: dx, y: dy, scaleX, scaleY, borderRadius: "16px" };
  const expanded  = { x: 0,  y: 0,  scaleX: 1, scaleY: 1, borderRadius: "0px" };

  const ease = [0.32, 0.72, 0, 1] as const;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-auto cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />

      {/* Panel — FLIP from card position to fullscreen */}
      <motion.div
        className="absolute inset-0 bg-[#F7F8F5] overflow-hidden pointer-events-auto"
        style={{ transformOrigin: "center center" }}
        initial={collapsed}
        animate={expanded}
        exit={collapsed}
        transition={{ duration: 0.55, ease }}
      >
        {projectId === 1
          ? <VtalConectaContent onClose={onClose} />
          : projectId === 2
            ? <VtalExpressContent onClose={onClose} />
            : projectId === 3
              ? <BradescoContent onClose={onClose} />
              : projectId === 6
                ? <SaudeConsultaContent onClose={onClose} />
                : projectId === 7
                  ? <NioContent onClose={onClose} />
                  : <PlaceholderContent thumb={thumb} tooltip={tooltip} onClose={onClose} />
        }
      </motion.div>
    </div>
  );
}
