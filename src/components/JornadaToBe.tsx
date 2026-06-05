"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   Jornada To Be — Retentômetro Bradesco
   Row 1 (L→R): dois canais → SF → Triagem
   Row 2 (L→R): Time Gest. Apólice → Negociação
   Row 3 (L→R): Recebimento → Cadastros
   Row 4 (L→R): Armazenamento → Emissão Fatura
───────────────────────────────────────────────────────────────── */

const TEAL      = "#1AB8B5";
const TEAL_DARK = "#0E9E9B";
const TEAL_BOX  = "#2EC0BD";
const BLUE      = "#2172EC";
const WHITE     = "#FFFFFF";
const TEAL_BG   = "rgba(26,184,181,0.06)";
const BLUE_BG   = "rgba(33,114,236,0.05)";

/* ── Tooltip box ─────────────────────────────────────────────── */
function TipBox({
  x, y, w, lines, color,
}: {
  x: number; y: number; w: number;
  lines: { t: string; bold?: boolean }[];
  color: string;
}) {
  const lh = 15;
  const pad = 9;
  const h = lines.length * lh + pad * 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={color} />
      {lines.map((l, i) => (
        <text key={i} x={x + pad} y={y + pad + lh * i + 10}
          fontSize="10.5" fill={WHITE}
          fontWeight={l.bold ? "700" : "400"}
          fontFamily="'Plus Jakarta Sans', sans-serif">
          {l.t}
        </text>
      ))}
    </g>
  );
}

/* ── Small dot node ─────────────────────────────────────────── */
function Dot({ cx, cy, r = 9, c = TEAL }: {
  cx: number; cy: number; r?: number; c?: string;
}) {
  return <circle cx={cx} cy={cy} r={r} fill={c} stroke={WHITE} strokeWidth="2.5" />;
}

/* ── Icon node ──────────────────────────────────────────────── */
function INode({ cx, cy, r = 28, c, icon }: {
  cx: number; cy: number; r?: number; c: string;
  icon: "email" | "phone" | "computer" | "triagem" | "money" | "sf";
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={WHITE} stroke={c} strokeWidth="2.5" />
      {icon === "email" && (
        <g transform={`translate(${cx - 12},${cy - 8})`}>
          <rect width="24" height="16" rx="2" fill={c} />
          <polyline points="0,0 12,9 24,0" fill="none" stroke={WHITE} strokeWidth="1.8" />
        </g>
      )}
      {icon === "phone" && (
        <path d={`M${cx - 8},${cy - 11} Q${cx - 9},${cy - 2} ${cx - 4},${cy + 3} Q${cx + 1},${cy + 8} ${cx + 8},${cy + 11} L${cx + 10},${cy + 7} L${cx + 5},${cy + 4} L${cx + 3},${cy + 6} Q${cx},${cy + 4} ${cx - 3},${cy + 1} L${cx - 1},${cy - 1} L${cx - 4},${cy - 6} Z`}
          fill={c} />
      )}
      {icon === "computer" && (
        <g transform={`translate(${cx - 13},${cy - 11})`}>
          <rect width="26" height="16" rx="2" fill={c} />
          <rect x="2" y="2" width="22" height="10" rx="1" fill={WHITE} opacity="0.3" />
          <rect x="7" y="17" width="12" height="3" rx="1" fill={c} />
          <rect x="4" y="19" width="18" height="2" rx="1" fill={c} />
        </g>
      )}
      {icon === "triagem" && (
        <g transform={`translate(${cx - 14},${cy - 12})`}>
          <circle cx="8" cy="6" r="5" fill={c} />
          <circle cx="20" cy="6" r="5" fill={c} />
          <path d="M1,22 Q10,16 14,17 Q18,16 27,22" fill={c} />
        </g>
      )}
      {icon === "money" && (
        <>
          <circle cx={cx} cy={cy} r={r - 6} fill={c} />
          <text x={cx} y={cy + 5} textAnchor="middle"
            fontSize="16" fill={WHITE} fontWeight="700">$</text>
        </>
      )}
      {icon === "sf" && (
        <>
          <circle cx={cx} cy={cy} r={r - 6} fill={c} />
          <text x={cx} y={cy + 5} textAnchor="middle"
            fontSize="12" fill={WHITE} fontWeight="700">SF</text>
        </>
      )}
    </g>
  );
}

/* ── Actor circle ───────────────────────────────────────────── */
function Actor({ cx, cy, r = 46, c, src, label, label2 }: {
  cx: number; cy: number; r?: number; c: string;
  src: string; label: string; label2?: string;
}) {
  const clipId = `clip-tobe-${src.replace(/\W/g, "")}`;
  const badgeH = label2 ? 34 : 22;
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      <circle cx={cx} cy={cy} r={r + 4} fill={WHITE} stroke={c} strokeWidth="3" />
      <image href={src} x={cx - r} y={cy - r} width={r * 2} height={r * 2}
        clipPath={`url(#${clipId})`} preserveAspectRatio="xMidYMid slice" />
      <rect x={cx - 42} y={cy + r + 2} width="84" height={badgeH} rx="11" fill={c} />
      <text x={cx} y={cy + r + 15} textAnchor="middle"
        fontSize="11" fill={WHITE} fontWeight="700"
        fontFamily="'Plus Jakarta Sans', sans-serif">{label}</text>
      {label2 && (
        <text x={cx} y={cy + r + 28} textAnchor="middle"
          fontSize="11" fill={WHITE} fontWeight="700"
          fontFamily="'Plus Jakarta Sans', sans-serif">{label2}</text>
      )}
    </g>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function JornadaToBe({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const handleClose = () => { setVisible(false); setTimeout(onClose, 260); };

  const W = 1200;

  // ── Actor at TOP ──
  const ACT_CX = 165;
  const ACT_CY = 65;

  // ── Y positions Row 1 ──
  const TOP_Y  = 290;
  const BOT_Y  = 400;
  const MID_Y  = 345;
  const MERGE_X = 740;
  const R_END  = 1110;

  // Triagem sub-items Y (shifted +320 from original)
  const TR_Y = [740, 830];

  // Section split
  const SPLIT_Y = TR_Y[1] + 60;

  // ── Row 2 (Blue: Time Gest. Apólice) ──
  const ROW2_Y = SPLIT_Y + 160;
  const N2 = { email: 290, d1: 480, d2: 680, d3: 880, neg: 1060 };

  // ── Row 3 (Blue: Análise Gest. Apólice) ──
  const SPLIT_Y2 = ROW2_Y + 120;
  const ROW3_Y   = SPLIT_Y2 + 140;
  const N3 = { email: 165, d1: 400, d2: 680, comp: 880 };
  const RC3_Y1   = ROW3_Y - 180;
  const RC3_Y2   = ROW3_Y - 90;

  // ── Row 4 (Blue: Armazenamento) ──
  const ROW4_Y = ROW3_Y + 240;
  const N4 = { folder: 165, d1: 380, d2: 600, d3: 820, emit: 1030 };
  const RC4_Y1 = ROW4_Y - 120;

  // SVG height
  const H = ROW4_Y + 300;

  // ── Node X positions (row 1) ──
  const N1 = {
    actor: ACT_CX,
    othersCh: 220,
    negCh: 220,
    dia1: 370,
    sf: 560,
    notif: 757,
    extr: 760,
    triage: 1040,
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] bg-black/70 flex flex-col"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 14 }}
      transition={{ duration: 0.26, ease: "easeInOut" }}
    >

      {/* Header */}
      <div className="flex-shrink-0 bg-[#F7F8F5] border-b border-black/10
                      px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={handleClose}
            className="flex items-center gap-2 text-sm text-[#1F2937]/60
                       hover:text-[#1F2937] transition-colors cursor-pointer">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Voltar
          </button>
          <div className="w-px h-5 bg-black/15" />
          <p className="text-sm font-semibold text-[#1F2937]">
            Jornada To Be — Processo de Retenção
          </p>
        </div>
        <button onClick={handleClose} aria-label="Fechar"
          className="w-8 h-8 rounded-full flex items-center justify-center
                     hover:bg-black/10 transition-colors cursor-pointer">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round"
              d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable SVG */}
      <div className="flex-1 overflow-auto bg-[#F7F8F5]">
        <div style={{ width: W + 40, padding: "20px", margin: "0 auto" }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>

            {/* ── Section backgrounds ── */}
            <rect x="85" y="0" width={W - 90} height={SPLIT_Y}
              rx="10" fill={TEAL_BG} />
            <rect x="85" y={SPLIT_Y} width={W - 90} height={H - SPLIT_Y - 10}
              rx="10" fill={BLUE_BG} />

            {/* ── Left vertical bar ── */}
            <rect x="76" y="0" width="10" height={SPLIT_Y} rx="5" fill={TEAL} />
            <rect x="76" y={SPLIT_Y} width="10" height={H - SPLIT_Y} rx="5" fill={BLUE} />

            {/* ── Section labels ── */}
            <text fontSize="11" fill={TEAL} fontWeight="600" opacity="0.6"
              transform={`rotate(-90) translate(-${SPLIT_Y / 2}, 52)`}
              textAnchor="middle">
              Processo de Retenção
            </text>
            <text fontSize="11" fill={BLUE} fontWeight="600" opacity="0.8"
              transform={`rotate(-90) translate(-${SPLIT_Y + (H - SPLIT_Y) / 2}, 52)`}
              textAnchor="middle">
              Processo Análise de Gest. Apólice
            </text>

            {/* ══════════════════════════════════════════════════
                ROW 1 — Left to Right (teal)
            ══════════════════════════════════════════════════ */}

            {/* Top lane line — extended to cover all 4 card nodes */}
            <line x1="152" y1={TOP_Y} x2={N1.notif + 10} y2={TOP_Y}
              stroke={TEAL} strokeWidth="3" />
            {/* Bottom lane line */}
            <line x1="152" y1={BOT_Y} x2={MERGE_X} y2={BOT_Y}
              stroke={TEAL} strokeWidth="3" />
            {/* Actor vertical connector */}
            <line x1={N1.actor} y1={TOP_Y} x2={N1.actor} y2={BOT_Y}
              stroke={TEAL} strokeWidth="3" />
            <line x1={N1.actor} y1={TOP_Y} x2="152" y2={TOP_Y}
              stroke={TEAL} strokeWidth="3" />
            <line x1={N1.actor} y1={BOT_Y} x2="152" y2={BOT_Y}
              stroke={TEAL} strokeWidth="3" />
            {/* Merge */}
            <line x1={MERGE_X} y1={TOP_Y} x2={MERGE_X} y2={MID_Y}
              stroke={TEAL} strokeWidth="3" />
            <line x1={MERGE_X} y1={BOT_Y} x2={MERGE_X} y2={MID_Y}
              stroke={TEAL} strokeWidth="3" />
            <line x1={MERGE_X} y1={MID_Y} x2={N1.triage} y2={MID_Y}
              stroke={TEAL} strokeWidth="3" />

            {/* ── Actor vertical connector → top of journey ── */}
            <line x1={N1.actor} y1={ACT_CY + 70} x2={N1.actor} y2={TOP_Y}
              stroke={TEAL} strokeWidth="3" />

            {/* ── Actor 1: Time de Retenção ── */}
            <Actor cx={N1.actor} cy={ACT_CY} c={TEAL}
              src="/persona-p4.png" label="Retenção" />

            {/* ── Channel labels ── */}
            <rect x="155" y={TOP_Y - 17} width="100" height="26"
              rx="6" fill={WHITE} stroke={TEAL} strokeWidth="1.5" />
            <text x="205" y={TOP_Y - 1} textAnchor="middle"
              fontSize="10" fill={TEAL} fontWeight="600">Outros Canais</text>

            <rect x="155" y={BOT_Y - 17} width="100" height="26"
              rx="6" fill={WHITE} stroke={TEAL} strokeWidth="1.5" />
            <text x="205" y={BOT_Y - 1} textAnchor="middle"
              fontSize="10" fill={TEAL} fontWeight="600">Via Central</text>

            {/* ── Stem lines: card bottom → dot (vertical, straight) ── */}
            <line x1={N1.dia1}  y1={273} x2={N1.dia1}  y2={TOP_Y - 9} stroke={TEAL} strokeWidth="2" />
            <line x1={N1.sf}    y1={258} x2={N1.sf}    y2={TOP_Y - 9} stroke={TEAL} strokeWidth="2" />
            <line x1={N1.notif} y1={243} x2={N1.notif} y2={TOP_Y - 9} stroke={TEAL} strokeWidth="2" />

            {/* ── Down connector: notif dot → MID_Y flow ── */}
            <line x1={N1.notif} y1={TOP_Y + 9} x2={N1.notif} y2={MID_Y} stroke={TEAL} strokeWidth="2" />

            {/* ── 3 dots on TOP_Y — one per card ── */}
            <Dot cx={N1.dia1}  cy={TOP_Y} />
            <Dot cx={N1.sf}    cy={TOP_Y} />
            <Dot cx={N1.notif} cy={TOP_Y} />

            {/* ── Card 1: Dia +1 ── */}
            <TipBox x={N1.dia1 - 79} y={195} w={158} color={TEAL_BOX}
              lines={[
                { t: "Dia + 1", bold: true },
                { t: "Outros canais podem entrar" },
                { t: "em contato direto com a" },
                { t: "Célula de Retenção." },
              ]} />

            {/* ── Card 2: Salesforce ── */}
            <TipBox x={N1.sf - 81} y={195} w={162} color={TEAL_BOX}
              lines={[
                { t: "Cadastro do Cliente na", bold: true },
                { t: "Salesforce para gerar a" },
                { t: "elaboração do Dossiê." },
              ]} />

            {/* ── Card 4: Notificação ── */}
            <TipBox x={N1.notif - 86} y={195} w={172} color={TEAL_BOX}
              lines={[
                { t: "Envio de Notificação de novos", bold: true },
                { t: "registros para Time de Retenção." },
              ]} />

            {/* ── Phone: Pedido de Negociação (bottom lane) ── */}
            <INode cx={N1.negCh} cy={BOT_Y} c={TEAL} icon="phone" />
            <text x={N1.negCh} y={BOT_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={TEAL_DARK} fontWeight="700">Pedido de</text>
            <text x={N1.negCh} y={BOT_Y + 53} textAnchor="middle"
              fontSize="10.5" fill={TEAL_DARK} fontWeight="700">Negociação</text>

            {/* ── Dot (bottom lane) ── */}
            <Dot cx={460} cy={BOT_Y} />
            <TipBox x={460 - 80} y={BOT_Y + 18} w={162} color={TEAL_BOX}
              lines={[
                { t: "O Gerente de Atendimento ou", bold: true },
                { t: "analista usa 3 registros: perfil" },
                { t: "de negociação, performance," },
                { t: "rentabilidade do plano e saúde." },
              ]} />

            {/* ── Extração de Dados — moved to old Triagem X position ── */}
            <INode cx={N1.triage} cy={MID_Y} c={TEAL} icon="computer" />
            <text x={N1.triage} y={MID_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={TEAL_DARK} fontWeight="700">Extração</text>
            <text x={N1.triage} y={MID_Y + 53} textAnchor="middle"
              fontSize="10.5" fill={TEAL_DARK} fontWeight="700">de Dados</text>


            {/* ── Vertical connector: Extração → Triagem (320px down) ── */}
            <line x1={N1.triage} y1={MID_Y + 28} x2={N1.triage} y2={MID_Y + 320 - 28}
              stroke={TEAL} strokeWidth="3" />

            {/* ── Triagem — shifted 320px down ── */}
            <INode cx={N1.triage} cy={MID_Y + 320} c={TEAL} icon="triagem" />
            <text x={N1.triage} y={MID_Y + 320 + 41} textAnchor="middle"
              fontSize="10.5" fill={TEAL_DARK} fontWeight="700">Triagem</text>
            <text x={N1.triage} y={MID_Y + 320 + 53} textAnchor="middle"
              fontSize="10" fill={TEAL_DARK}>Painel Salesforce</text>

            {/* ── Right vertical axis (teal) — starts from Triagem new position ── */}
            <line x1={N1.triage} y1={MID_Y + 320} x2={R_END + 55} y2={MID_Y + 320}
              stroke={TEAL} strokeWidth="6" />
            <line x1={R_END + 55} y1={MID_Y + 320} x2={R_END + 55} y2={SPLIT_Y}
              stroke={TEAL} strokeWidth="6" />
            <line x1={R_END + 55} y1={SPLIT_Y} x2={R_END} y2={SPLIT_Y}
              stroke={TEAL} strokeWidth="6" />

            {/* ── Triagem sub-items ── */}
            {[
              { lines: [{ t: "Dentro do painel de Oportunidades" }, { t: "do Salesforce, acessa o perfil de" }, { t: "oportunidade que foi destinado" }, { t: "para acesse analisar específico." }] },
              { lines: [{ t: "Em casos específicos, o Gerente" }, { t: "de Relacionamento pode pedir" }, { t: "uma análise de enquadramento," }, { t: "com possibilidade de retenção." }] },
            ].map((item, i) => (
              <g key={i}>
                <Dot cx={R_END + 55} cy={TR_Y[i]} r={10} />
                <line x1={R_END + 55 - 10} y1={TR_Y[i]} x2={R_END - 22} y2={TR_Y[i]}
                  stroke={TEAL} strokeWidth="2" />
                <TipBox x={R_END - 205} y={TR_Y[i] - 26} w={182} color={TEAL_BOX}
                  lines={item.lines} />
              </g>
            ))}

            {/* ══════════════════════════════════════════════════
                ROW 2 — Time de Gest. Apólice (Blue, L→R)
            ══════════════════════════════════════════════════ */}

            {/* Email → row line → negociação */}
            <line x1={N2.email + 28} y1={ROW2_Y} x2={N2.neg - 28} y2={ROW2_Y}
              stroke={BLUE} strokeWidth="3" />

            {/* ── Actor 2: Time Gest. Apólice ── */}
            <Actor cx={165} cy={ROW2_Y} c={BLUE}
              src="/persona-gestao-apolice.png" label="Gestão de" label2="Apólice" />

            {/* ── Email: Envio de Notificação ── */}
            <INode cx={N2.email} cy={ROW2_Y} c={BLUE} icon="email" />
            <text x={N2.email} y={ROW2_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Envio de</text>
            <text x={N2.email} y={ROW2_Y + 53} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Notificação</text>

            {/* ── Dot 1 ── */}
            <Dot cx={N2.d1} cy={ROW2_Y} c={BLUE} r={10} />
            <TipBox x={N2.d1 - 80} y={ROW2_Y - 100} w={162} color={BLUE}
              lines={[
                { t: "Um fluxo assíncrono Salesforce", bold: true },
                { t: "é acionado para encontrar a" },
                { t: "negociação para o Time de" },
                { t: "Gestão de Apólice e enviado" },
                { t: "para notificar ao responsável." },
              ]} />

            {/* ── Dot 2 ── */}
            <Dot cx={N2.d2} cy={ROW2_Y} c={BLUE} r={10} />
            <TipBox x={N2.d2 - 80} y={ROW2_Y - 100} w={162} color={BLUE}
              lines={[
                { t: "Após a notificação é realizado", bold: true },
                { t: "o registro no sistema com" },
                { t: "todas as informações acordadas" },
                { t: "permitindo revisar em" },
                { t: "notificação." },
              ]} />

            {/* ── Dot 3 ── */}
            <Dot cx={N2.d3} cy={ROW2_Y} c={BLUE} r={10} />
            <TipBox x={N2.d3 - 80} y={ROW2_Y - 100} w={162} color={BLUE}
              lines={[
                { t: "Com acesso à visão 360 do", bold: true },
                { t: "cliente com todas as informações" },
                { t: "acordadas, entra em contato" },
                { t: "com o cliente e dá início" },
                { t: "à negociação." },
              ]} />

            {/* ── Negociação ── */}
            <INode cx={N2.neg} cy={ROW2_Y} c={BLUE} icon="money" />
            <text x={N2.neg} y={ROW2_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Negociação</text>

            {/* ══════════════════════════════════════════════════
                ROW 3 — Processo Análise Gest. Apólice (Blue, L→R)
            ══════════════════════════════════════════════════ */}

            {/* Vertical connector ROW2 → ROW3 */}
            <line x1={165} y1={ROW2_Y + 70} x2={165} y2={ROW3_Y - 28}
              stroke={BLUE} strokeWidth="3" />

            {/* Row line */}
            <line x1={N3.email + 28} y1={ROW3_Y} x2={N3.comp} y2={ROW3_Y}
              stroke={BLUE} strokeWidth="3" />

            {/* Right vertical axis (blue) */}
            <line x1={N3.comp + 28} y1={ROW3_Y} x2={R_END + 55} y2={ROW3_Y}
              stroke={BLUE} strokeWidth="3" />
            <line x1={R_END + 55} y1={SPLIT_Y} x2={R_END + 55} y2={ROW3_Y}
              stroke={BLUE} strokeWidth="6" />

            {/* Right col dots */}
            <Dot cx={R_END + 55} cy={RC3_Y1} r={10} c={BLUE} />
            <line x1={R_END + 55 - 10} y1={RC3_Y1} x2={R_END - 22} y2={RC3_Y1}
              stroke={BLUE} strokeWidth="2" />
            <TipBox x={R_END - 205} y={RC3_Y1 - 40} w={182} color={BLUE}
              lines={[
                { t: "Realização do cálculo e", bold: true },
                { t: "aplicação do reajuste acordado." },
              ]} />

            <Dot cx={R_END + 55} cy={RC3_Y2} r={10} c={BLUE} />
            <line x1={R_END + 55 - 10} y1={RC3_Y2} x2={R_END - 22} y2={RC3_Y2}
              stroke={BLUE} strokeWidth="2" />
            <TipBox x={R_END - 205} y={RC3_Y2 - 22} w={182} color={BLUE}
              lines={[
                { t: "Conferência para verificar se", bold: true },
                { t: "os valores foram ajustados" },
                { t: "conforme a negociação." },
              ]} />

            {/* ── Email: Recebimento da Notificação ── */}
            <INode cx={N3.email} cy={ROW3_Y} c={BLUE} icon="email" />
            <text x={N3.email} y={ROW3_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Recebimento da</text>
            <text x={N3.email} y={ROW3_Y + 53} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Notificação</text>

            {/* ── Dot 1 ── */}
            <Dot cx={N3.d1} cy={ROW3_Y} c={BLUE} r={10} />
            <TipBox x={N3.d1 - 80} y={ROW3_Y - 85} w={162} color={BLUE}
              lines={[
                { t: "Recebe relatos de Negociação", bold: true },
                { t: "feitos pelo time de Retenção." },
              ]} />

            {/* ── Dot 2 ── */}
            <Dot cx={N3.d2} cy={ROW3_Y} c={BLUE} r={10} />
            <TipBox x={N3.d2 - 85} y={ROW3_Y - 115} w={172} color={BLUE}
              lines={[
                { t: "Verifica informações no Salesforce.", bold: true },
                { t: "Com a fatura já emitida, o sistema" },
                { t: "levanta um alerta de cancelamento" },
                { t: "e analista confirma o cancelamento" },
                { t: "e a emissão da fatura solicitada." },
              ]} />

            {/* ── Computer: Cadastros nos Sistemas ── */}
            <INode cx={N3.comp} cy={ROW3_Y} c={BLUE} icon="computer" />
            <text x={N3.comp} y={ROW3_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Cadastros nos</text>
            <text x={N3.comp} y={ROW3_Y + 53} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Sistemas</text>

            {/* ══════════════════════════════════════════════════
                ROW 4 — Armazenamento → Emissão de Fatura (Blue, L→R)
            ══════════════════════════════════════════════════ */}

            {/* Vertical connector ROW3 → ROW4 */}
            <line x1={165} y1={ROW3_Y + 28} x2={165} y2={ROW4_Y - 28}
              stroke={BLUE} strokeWidth="3" />

            {/* Row line */}
            <line x1={N4.folder + 28} y1={ROW4_Y} x2={N4.emit - 28} y2={ROW4_Y}
              stroke={BLUE} strokeWidth="3" />

            {/* Connect emit to right col */}
            <line x1={N4.emit} y1={ROW4_Y} x2={R_END + 55} y2={ROW4_Y}
              stroke={BLUE} strokeWidth="3" />

            {/* Right col dot (Cadastro SISA) */}
            <Dot cx={R_END + 55} cy={RC4_Y1} r={10} c={BLUE} />
            <line x1={R_END + 55 - 10} y1={RC4_Y1} x2={R_END - 22} y2={RC4_Y1}
              stroke={BLUE} strokeWidth="2" />
            <TipBox x={R_END - 205} y={RC4_Y1 - 22} w={182} color={BLUE}
              lines={[
                { t: "Cadastro dentro do", bold: true },
                { t: "sistema do SISA." },
              ]} />

            {/* ── Folder: Armazenamento do Sistema ── */}
            <INode cx={N4.folder} cy={ROW4_Y} c={BLUE} icon="triagem" />
            <text x={N4.folder - 55} y={ROW4_Y + 3} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Armazenamento</text>
            <text x={N4.folder - 55} y={ROW4_Y + 16} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">do Sistema</text>

            {/* ── Dot 1 ── */}
            <Dot cx={N4.d1} cy={ROW4_Y} c={BLUE} r={10} />
            <TipBox x={N4.d1 - 80} y={ROW4_Y - 85} w={162} color={BLUE}
              lines={[
                { t: "Dentro do sistema do SISA,", bold: true },
                { t: "é sinalizado que a apólice" },
                { t: "sofreu alteração de custo." },
              ]} />

            {/* ── Dot 2 ── */}
            <Dot cx={N4.d2} cy={ROW4_Y} c={BLUE} r={10} />
            <TipBox x={N4.d2 - 80} y={ROW4_Y - 105} w={162} color={BLUE}
              lines={[
                { t: "Caso a fatura já tenha sido", bold: true },
                { t: "emitida, é cancelado o endosso" },
                { t: "da fatura solicitada. É emitido" },
                { t: "aditivo para minimizar o" },
                { t: "risco regulatório." },
              ]} />

            {/* ── Dot 3 ── */}
            <Dot cx={N4.d3} cy={ROW4_Y} c={BLUE} r={10} />
            <TipBox x={N4.d3 - 80} y={ROW4_Y - 85} w={162} color={BLUE}
              lines={[
                { t: "É feita a emissão da fatura", bold: true },
                { t: "no sistema do SISA." },
              ]} />

            {/* ── Emissão de Fatura ── */}
            <INode cx={N4.emit} cy={ROW4_Y} c={BLUE} icon="money" />
            <text x={N4.emit + 55} y={ROW4_Y + 3} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Emissão</text>
            <text x={N4.emit + 55} y={ROW4_Y + 16} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">de Fatura</text>

          </svg>
        </div>
      </div>
    </motion.div>
  );
}
