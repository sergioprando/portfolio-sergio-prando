"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   Jornada As Is — Layout COBRA (snake) — Retentômetro Bradesco
   Row 1 (L→R): dois canais → Extração → Triagem
   Right column: sub-itens do Triagem
   Row 2 (R→L): Analista → Email → Negociação
───────────────────────────────────────────────────────────────── */

const TEAL        = "#1AB8B5";
const TEAL_DARK   = "#0E9E9B";
const TEAL_BOX    = "#2EC0BD";
const ORANGE      = "#F0A024";
const ORANGE_BOX  = "#F0A024";
const BLUE        = "#2172EC";
const PINK        = "#EC21D7";
const WHITE       = "#FFFFFF";
const TEAL_BG     = "rgba(26,184,181,0.06)";
const ORANGE_BG   = "rgba(240,160,36,0.05)";
const BLUE_BG     = "rgba(33,114,236,0.05)";
const PINK_BG     = "rgba(236,33,215,0.05)";

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
  icon: "email" | "phone" | "computer" | "triagem" | "money";
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
    </g>
  );
}

/* ── Actor circle ───────────────────────────────────────────── */
function Actor({ cx, cy, r = 46, c, src, label, label2 }: {
  cx: number; cy: number; r?: number; c: string;
  src: string; label: string; label2?: string;
}) {
  const clipId = `clip-${src.replace(/\W/g, "")}`;
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
export default function JornadaAsIs({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const handleClose = () => { setVisible(false); setTimeout(onClose, 260); };

  const W = 1200;

  // ── Actor at TOP ──
  const ACT_CX  = 165;   // actor X (left side)
  const ACT_CY  = 65;    // actor at very top of journey

  // ── Y positions ── (shifted down to give room for actor at top)
  const TOP_Y   = 290;   // Outros Canais lane
  const BOT_Y   = 400;   // Via Central lane
  const MID_Y   = 345;   // merged center
  const MERGE_X = 740;   // where two lanes merge
  const R_END   = 1110;  // right end of row 1 / right connector x
  const ROW2_Y  = 960;   // row 2 (goes R→L)

  // Tooltip bottom-align: both Dia+7 and Dossiê bottom here
  const TIP_BOT = TOP_Y - 15;  // = 275
  const dia7H   = 5 * 15 + 18; // 93px
  const dossieH = 6 * 15 + 18; // 108px

  // Triagem sub-items Y (right column, between rows)
  const TR_Y = [420, 495, 570, 645, 720];

  // Row 3 — vertical branch below Actor 2
  const ROW3_Y1 = ROW2_Y + 120;  // Recebimento de E-mail node
  const ROW3_Y2 = ROW2_Y + 240;  // dot node (direcionamento manual)

  // Split between Analista de Distribuição (orange) and Processo Análise (blue)
  // Starts after "Analista direciona" card bottom (ROW3_Y2 + 54) + padding
  const SPLIT_Y2 = ROW3_Y2 + 70;

  // Row 4 — horizontal blue row (L→R)
  const ROW4_Y      = SPLIT_Y2 + 130;
  const ROW4_EMAIL  = 290;  // Recebimento de E-mail icon
  const ROW4_D1     = 470;  // dot 1
  const ROW4_D2     = 680;  // dot 2
  const ROW4_CP     = 870;  // Cadastros nos Sistemas (computer icon)
  const ROW4_D3 = ROW4_Y + 110; // dot below computer

  // Row 5 — horizontal blue row (L→R)
  const ROW5_Y   = ROW4_D3 + 220;
  const ROW5_D1  = 350;   // dot 1
  const ROW5_D2  = 560;   // dot 2
  const ROW5_D3  = 770;   // dot 3
  const ROW5_D4  = 940;   // dot 4
  const ROW5_EM  = 1070;  // Emissão de Fatura icon
  const ROW5_RX  = R_END + 55; // right column x (same as triagem axis)
  const RC5_Y1   = ROW5_Y - 270; // right col dot 1 (Conferência)
  const RC5_Y2   = ROW5_Y - 150; // right col dot 2 (Cadastro SISA)
  const ROW5_DB  = ROW5_Y + 130; // dot below left icon

  // Row 6 — pink: RCP
  const SPLIT_Y3  = ROW5_DB + 80;   // split blue → pink
  const ROW6_Y    = SPLIT_Y3 + 140; // main row Y
  const ROW6_ACT  = 290;            // actor x
  const ROW6_D1   = 480;            // dot 1
  const ROW6_D2   = 720;            // dot 2
  const ROW6_EM   = 1000;           // Envio de Acordo icon

  // SVG height
  const H = ROW6_Y + 300;

  // ── Node X positions (row 1) ──
  const N1 = {
    actor: ACT_CX,
    othersCh: 220,
    viaCh: 220,
    dia7: 380,
    dossie: 570,
    dia1: 460,
    extr: 810,
    triage: 1040,
  };

  // ── Node X positions (row 2, R→L) ──
  const N2 = {
    neg: 1060,
    n4: 750,
    n3: 530,
    email: 330,
  };

  // Section split Y — just below the last teal tipbox (TR_Y[4] bottom = TR_Y[4]-26+63 ≈ 757)
  const SPLIT_Y = TR_Y[4] + 50;

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
            Jornada As Is — Processo de Retenção
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
            <rect x="85" y={SPLIT_Y} width={W - 90} height={SPLIT_Y2 - SPLIT_Y}
              rx="10" fill={ORANGE_BG} />
            <rect x="85" y={SPLIT_Y2} width={W - 90} height={SPLIT_Y3 - SPLIT_Y2}
              rx="10" fill={BLUE_BG} />
            <rect x="85" y={SPLIT_Y3} width={W - 90} height={H - SPLIT_Y3 - 10}
              rx="10" fill={PINK_BG} />

            {/* ── Left vertical bar — TEAL + ORANGE + BLUE + PINK ── */}
            <rect x="76" y="0" width="10" height={SPLIT_Y} rx="5" fill={TEAL} />
            <rect x="76" y={SPLIT_Y} width="10" height={SPLIT_Y2 - SPLIT_Y} rx="5" fill={ORANGE} />
            <rect x="76" y={SPLIT_Y2} width="10" height={SPLIT_Y3 - SPLIT_Y2} rx="5" fill={BLUE} />
            <rect x="76" y={SPLIT_Y3} width="10" height={H - SPLIT_Y3} rx="5" fill={PINK} />

            {/* ── Section labels (rotated) ── */}
            <text fontSize="11" fill={TEAL} fontWeight="600" opacity="0.6"
              transform={`rotate(-90) translate(-${SPLIT_Y / 2}, 52)`}
              textAnchor="middle">
              Processo de Retenção
            </text>
            <text fontSize="11" fill={ORANGE} fontWeight="600" opacity="0.7"
              transform={`rotate(-90) translate(-${SPLIT_Y + (SPLIT_Y2 - SPLIT_Y) / 2}, 52)`}
              textAnchor="middle">
              Analista de Distribuição
            </text>
            <text fontSize="11" fill={BLUE} fontWeight="600" opacity="0.8"
              transform={`rotate(-90) translate(-${SPLIT_Y2 + (SPLIT_Y3 - SPLIT_Y2) / 2}, 52)`}
              textAnchor="middle">
              Processo Analise de Gest. Apólice
            </text>
            <text fontSize="11" fill={PINK} fontWeight="600" opacity="0.8"
              transform={`rotate(-90) translate(-${SPLIT_Y3 + (H - SPLIT_Y3) / 2}, 52)`}
              textAnchor="middle">
              RCP
            </text>

            {/* ══════════════════════════════════════════════════
                ROW 1 — Left to Right
            ══════════════════════════════════════════════════ */}

            {/* Top lane line (Outros Canais): x=155 → MERGE_X */}
            <line x1="152" y1={TOP_Y} x2={MERGE_X} y2={TOP_Y}
              stroke={TEAL} strokeWidth="3" />
            {/* Bottom lane line (Via Central): x=155 → MERGE_X */}
            <line x1="152" y1={BOT_Y} x2={MERGE_X} y2={BOT_Y}
              stroke={TEAL} strokeWidth="3" />
            {/* Actor vertical connector between lanes */}
            <line x1={N1.actor} y1={TOP_Y} x2={N1.actor} y2={BOT_Y}
              stroke={TEAL} strokeWidth="3" />
            {/* Horizontal connectors actor → lanes */}
            <line x1={N1.actor} y1={TOP_Y} x2="152" y2={TOP_Y}
              stroke={TEAL} strokeWidth="3" />
            <line x1={N1.actor} y1={BOT_Y} x2="152" y2={BOT_Y}
              stroke={TEAL} strokeWidth="3" />
            {/* Merge lines: TOP_Y → MID_Y and BOT_Y → MID_Y at MERGE_X */}
            <line x1={MERGE_X} y1={TOP_Y} x2={MERGE_X} y2={MID_Y}
              stroke={TEAL} strokeWidth="3" />
            <line x1={MERGE_X} y1={BOT_Y} x2={MERGE_X} y2={MID_Y}
              stroke={TEAL} strokeWidth="3" />
            {/* Single merged line: MERGE_X → R_END */}
            <line x1={MERGE_X} y1={MID_Y} x2={R_END} y2={MID_Y}
              stroke={TEAL} strokeWidth="3" />

            {/* ── Actor vertical connector: top of journey down to top lane ── */}
            <line x1={N1.actor} y1={ACT_CY + 70} x2={N1.actor} y2={TOP_Y}
              stroke={TEAL} strokeWidth="3" />

            {/* ── Actor 1: Retenção (top of journey) ── */}
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

            {/* ── Node Dia+7 (top lane) — bottom-aligned with Dossiê ── */}
            <Dot cx={N1.dia7} cy={TOP_Y} />
            <TipBox x={N1.dia7 - 75} y={TIP_BOT - dia7H} w={152} color={TEAL_BOX}
              lines={[
                { t: "Dia + 7", bold: true },
                { t: "Corretor / Sucursal / Banco" },
                { t: "/ BPO entram em contato" },
                { t: "direto com Célula de" },
                { t: "Retenção." },
              ]} />

            {/* ── Node Dossiê (top lane) — bottom-aligned with Dia+7 ── */}
            <Dot cx={N1.dossie} cy={TOP_Y} />
            <TipBox x={N1.dossie - 80} y={TIP_BOT - dossieH} w={162} color={TEAL_BOX}
              lines={[
                { t: "Criação do Dossiê:", bold: true },
                { t: "Descritivo dos dados do" },
                { t: "contrato, performance," },
                { t: "maiores utilizadores e" },
                { t: "comparativo com tabela" },
                { t: "de venda." },
              ]} />

            {/* ── Node Dia+1 (bottom lane) ── */}
            <Dot cx={N1.dia1} cy={BOT_Y} />
            <TipBox x={N1.dia1 - 68} y={BOT_Y + 18} w={138} color={TEAL_BOX}
              lines={[
                { t: "Dia + 1", bold: true },
                { t: "Cliente faz pedido de" },
                { t: "cancelamento ou" },
                { t: "negociação na central." },
              ]} />

            {/* ── Extração de Dados (merged) ── */}
            <INode cx={N1.extr} cy={MID_Y} c={TEAL} icon="computer" />
            <text x={N1.extr} y={MID_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={TEAL_DARK} fontWeight="700">Extração</text>
            <text x={N1.extr} y={MID_Y + 53} textAnchor="middle"
              fontSize="10.5" fill={TEAL_DARK} fontWeight="700">de Dados</text>

            {/* Extração tooltip above */}
            <TipBox x={N1.extr - 88} y={MID_Y - 115} w={178} color={TEAL_BOX}
              lines={[
                { t: "Diariamente, mais duas" },
                { t: "planilhas são criadas" },
                { t: "manualmente com todas as" },
                { t: "solicitações da central e" },
                { t: "cancelamentos do banco." },
              ]} />

            {/* Extração tooltip below */}
            <TipBox x={N1.extr - 85} y={MID_Y + 58} w={172} color={TEAL_BOX}
              lines={[
                { t: "São extraídas mensalmente" },
                { t: "do DW duas planilhas com" },
                { t: "enquadramento da apólice" },
                { t: "e alocação do responsável." },
              ]} />

            {/* ── Triagem ── */}
            <INode cx={N1.triage} cy={MID_Y} c={TEAL} icon="triagem" />
            <text x={N1.triage} y={MID_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={TEAL_DARK} fontWeight="700">Triagem</text>
            <text x={N1.triage} y={MID_Y + 53} textAnchor="middle"
              fontSize="10" fill={TEAL_DARK}>Painel Salesforce</text>

            {/* ── Right connector (straight vertical axis) ── */}
            {/* Top horizontal: TEAL */}
            <line x1={R_END} y1={MID_Y} x2={R_END + 55} y2={MID_Y}
              stroke={TEAL} strokeWidth="6" />
            {/* Vertical TEAL portion (Row 1 section) */}
            <line x1={R_END + 55} y1={MID_Y} x2={R_END + 55} y2={SPLIT_Y}
              stroke={TEAL} strokeWidth="6" />
            {/* Vertical ORANGE portion (Row 2 section) */}
            <line x1={R_END + 55} y1={SPLIT_Y} x2={R_END + 55} y2={ROW2_Y}
              stroke={ORANGE} strokeWidth="6" />
            {/* Bottom horizontal: TEAL */}
            <line x1={R_END + 55} y1={ROW2_Y} x2={R_END} y2={ROW2_Y}
              stroke={TEAL} strokeWidth="6" />

            {/* ── Triagem sub-items (right column) — dots on axis at R_END+55 ── */}
            {[
              { lines: [{ t: "Diferenciação para chegar" }, { t: "no número da apólice para" }, { t: "localizar a pessoa jurídica." }] },
              { lines: [{ t: "Verifica-se manualmente" }, { t: "no MOVE cancelamentos" }, { t: "pendentes ou concluídos." }] },
              { lines: [{ t: "Checagem manual no SISA" }, { t: "do status da apólice e" }, { t: "CNPJ da empresa." }] },
              { lines: [{ t: "Consulta manual no sistema" }, { t: "da receita para verificar" }, { t: "se a apólice está ativa." }] },
              { lines: [{ t: "Sinistralidade no DW: 6," }, { t: "12, 24 e 36 meses, idosos," }, { t: "vidas e contato ativo." }] },
            ].map((item, i) => (
              <g key={i}>
                <Dot cx={R_END + 55} cy={TR_Y[i]} r={10} />
                <line x1={R_END + 55 - 10} y1={TR_Y[i]} x2={R_END - 22} y2={TR_Y[i]}
                  stroke={TEAL} strokeWidth="2" />
                <TipBox x={R_END - 205} y={TR_Y[i] - 26} w={182} color={TEAL_BOX}
                  lines={item.lines} />
              </g>
            ))}

            {/* ── Negociação extra cards — aligned with triagem right column ── */}
            <g>
              <Dot cx={R_END + 55} cy={TR_Y[4] + 78} r={10} c={TEAL} />
              <line x1={R_END + 55 - 10} y1={TR_Y[4] + 78} x2={R_END - 22} y2={TR_Y[4] + 78}
                stroke={TEAL} strokeWidth="2" />
              <TipBox x={R_END - 205} y={TR_Y[4] + 52} w={182} color={TEAL_BOX}
                lines={[
                  { t: "Relatório de enquadramento" },
                  { t: "para ver se após 12 meses" },
                  { t: "há informação relevante" },
                  { t: "de uso de plano." },
                ]} />
            </g>
            <g>
              <Dot cx={R_END + 55} cy={TR_Y[4] + 165} r={10} c={TEAL} />
              <line x1={R_END + 55 - 10} y1={TR_Y[4] + 165} x2={R_END - 22} y2={TR_Y[4] + 165}
                stroke={TEAL} strokeWidth="2" />
              <TipBox x={R_END - 205} y={TR_Y[4] + 139} w={182} color={TEAL_BOX}
                lines={[
                  { t: "Em alguns casos, pode ser" },
                  { t: "necessária elaboração de" },
                  { t: "dossiê com mais dados" },
                  { t: "sobre o cliente e apólice." },
                ]} />
            </g>

            {/* ══════════════════════════════════════════════════
                ROW 2 — Right to Left
            ══════════════════════════════════════════════════ */}

            {/* Row 2 line: R_END → 152 */}
            <line x1={R_END} y1={ROW2_Y} x2="152" y2={ROW2_Y}
              stroke={TEAL} strokeWidth="3" />
            {/* Connect left end back to left bar */}
            <line x1="152" y1={ROW2_Y} x2={N1.actor} y2={ROW2_Y}
              stroke={TEAL} strokeWidth="3" />

            {/* ── Email: Recebimento de E-mail (primeiro, na linha horizontal) ── */}
            <INode cx={N1.actor} cy={ROW2_Y} c={ORANGE} icon="email" />
            <text x={N1.actor} y={ROW2_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={ORANGE} fontWeight="700">Recebimento de E-mail</text>

            {/* ── Negociação ── */}
            <INode cx={N2.neg} cy={ROW2_Y} c={TEAL} icon="money" />
            <text x={N2.neg} y={ROW2_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={TEAL_DARK} fontWeight="700">Negociação</text>

            {/* ── Node 4 (proposta) ── */}
            <Dot cx={N2.n4} cy={ROW2_Y} c={TEAL} />
            <TipBox x={N2.n4 - 80} y={ROW2_Y - 100} w={162} color={TEAL_BOX}
              lines={[
                { t: "O gerente de relacionamento" },
                { t: "entra em contato com o" },
                { t: "Corretor/Estipulante e" },
                { t: "define proposta ao cliente." },
              ]} />

            {/* ── Node 3 (registro) ── */}
            <Dot cx={N2.n3} cy={ROW2_Y} c={TEAL} />
            <TipBox x={N2.n3 - 82} y={ROW2_Y - 90} w={165} color={TEAL_BOX}
              lines={[
                { t: "Todas as negociações são" },
                { t: "registradas manualmente" },
                { t: 'no "retentômetro".' },
              ]} />

            {/* ── Email (Envio) ── */}
            <INode cx={N2.email} cy={ROW2_Y} c={TEAL} icon="email" />
            <text x={N2.email} y={ROW2_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={TEAL_DARK} fontWeight="700">Envio de E-mail</text>

            {/* Email tooltip above */}
            <TipBox x={N2.email - 88} y={ROW2_Y - 118} w={178} color={TEAL_BOX}
              lines={[
                { t: "Após o aceite da proposta," },
                { t: "os detalhes são enviados" },
                { t: "via e-mail para implantação" },
                { t: "pela equipe de Gestão de" },
                { t: "apólice no sistema (SISA)." },
              ]} />

            {/* ══════════════════════════════════════════════════
                ROW 3 — Vertical branch below Actor 2
            ══════════════════════════════════════════════════ */}

            {/* Vertical connector: email bottom → actor top */}
            <line x1={N1.actor} y1={ROW2_Y + 28} x2={N1.actor} y2={ROW3_Y1 - 50}
              stroke={ORANGE} strokeWidth="3" />

            {/* ── Actor 2: Analista de Distribuição (depois do email) ── */}
            <Actor cx={N1.actor} cy={ROW3_Y1} c={ORANGE}
              src="/persona-p2.png" label="Analista de" label2="Distribuição" />

            {/* Horizontal connector on email → card */}
            <line x1={N1.actor + 28} y1={ROW2_Y} x2={N1.actor + 60} y2={ROW2_Y}
              stroke={ORANGE} strokeWidth="2" />
            <TipBox x={N1.actor + 60} y={ROW2_Y - 31} w={168} color={ORANGE_BOX}
              lines={[
                { t: "Recebimento de E-mail", bold: true },
                { t: "com detalhes da proposta" },
                { t: "aceita pelo cliente." },
              ]} />

            {/* Vertical connector: actor bottom → SPLIT_Y2 */}
            <line x1={N1.actor} y1={ROW3_Y1 + 70} x2={N1.actor} y2={SPLIT_Y2}
              stroke={ORANGE} strokeWidth="3" />

            {/* ── Dot: direcionamento manual ── */}
            <Dot cx={N1.actor} cy={ROW3_Y2} c={ORANGE} r={10} />
            {/* Horizontal connector: dot right edge → card left edge */}
            <line x1={N1.actor + 10} y1={ROW3_Y2} x2={N1.actor + 60} y2={ROW3_Y2}
              stroke={ORANGE} strokeWidth="2" />
            {/* Card vertically centered on dot — 6 lines h=108 */}
            <TipBox x={N1.actor + 60} y={ROW3_Y2 - 54} w={210} color={ORANGE_BOX}
              lines={[
                { t: "Analista direciona as apólices" },
                { t: "negociadas para o time Gestão" },
                { t: "de Apólice, identificando" },
                { t: "manualmente qual pessoa do" },
                { t: "time está disponível para" },
                { t: "atuar na implantação." },
              ]} />

            {/* ══════════════════════════════════════════════════
                ROW 4 — Blue: Processo Análise de Gest. Apólice
            ══════════════════════════════════════════════════ */}

            {/* Vertical connector from SPLIT_Y2 into ROW4 actor */}
            <line x1={N1.actor} y1={SPLIT_Y2} x2={N1.actor} y2={ROW4_Y - 28}
              stroke={BLUE} strokeWidth="3" />

            {/* ── Email icon: Recebimento de E-mail (primeiro) ── */}
            <INode cx={N1.actor} cy={ROW4_Y} c={BLUE} icon="email" />
            <text x={N1.actor} y={ROW4_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Recebimento</text>
            <text x={N1.actor} y={ROW4_Y + 53} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">de E-mail</text>

            {/* Horizontal row line: email → actor → dots → computer */}
            <line x1={N1.actor + 28} y1={ROW4_Y} x2={ROW4_CP} y2={ROW4_Y}
              stroke={BLUE} strokeWidth="3" />

            {/* ── Actor 3: Gestão de Apólice (depois do email) ── */}
            <Actor cx={ROW4_EMAIL} cy={ROW4_Y} c={BLUE}
              src="/persona-gestao-apolice.png" label="Gestão de" label2="Apólice" />

            {/* ── Dot 1 ── */}
            <Dot cx={ROW4_D1} cy={ROW4_Y} c={BLUE} r={10} />
            <TipBox x={ROW4_D1 - 80} y={ROW4_Y + 18} w={162} color={BLUE}
              lines={[
                { t: "Recebe a demanda via email", bold: true },
                { t: "com os aditivos e solicitações" },
                { t: "necessárias para implementar" },
                { t: "o reajuste." },
              ]} />

            {/* ── Dot 2 ── */}
            <Dot cx={ROW4_D2} cy={ROW4_Y} c={BLUE} r={10} />
            <TipBox x={ROW4_D2 - 86} y={ROW4_Y + 18} w={172} color={BLUE}
              lines={[
                { t: "Caso falte alguma informação", bold: true },
                { t: "para a implantação, retorna via" },
                { t: "email para a Equipe de Retenção" },
                { t: "solicitando os dados adicionais." },
              ]} />

            {/* ── Computer: Cadastros nos Sistemas ── */}
            <INode cx={ROW4_CP} cy={ROW4_Y} c={BLUE} icon="computer" />
            <text x={ROW4_CP} y={ROW4_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Cadastros nos</text>
            <text x={ROW4_CP} y={ROW4_Y + 53} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Sistemas</text>

            {/* Horizontal line from computer to right column axis */}
            <line x1={ROW4_CP + 28} y1={ROW4_Y} x2={R_END + 55} y2={ROW4_Y}
              stroke={BLUE} strokeWidth="3" />
            {/* Right column vertical axis — extends from ROW4_Y down through all row5 right items */}
            <line x1={R_END + 55} y1={ROW4_Y} x2={R_END + 55} y2={ROW5_Y}
              stroke={BLUE} strokeWidth="6" />

            {/* ── Dot 3: cálculo e reajuste — on right axis ── */}
            <Dot cx={R_END + 55} cy={ROW4_D3} c={BLUE} r={10} />
            <line x1={R_END + 55 - 10} y1={ROW4_D3} x2={R_END + 55 - 22} y2={ROW4_D3}
              stroke={BLUE} strokeWidth="2" />
            <TipBox x={ROW5_RX - 205} y={ROW4_D3 - 22} w={182} color={BLUE}
              lines={[
                { t: "Realização do cálculo e", bold: true },
                { t: "aplicação do reajuste acordado." },
              ]} />

            {/* ══════════════════════════════════════════════════
                ROW 5 — Blue: Armazena Negociação → Emissão de Fatura
            ══════════════════════════════════════════════════ */}

            {/* Horizontal row line */}
            <line x1={N1.actor + 28} y1={ROW5_Y} x2={ROW5_EM - 28} y2={ROW5_Y}
              stroke={BLUE} strokeWidth="3" />

            {/* Connect emissao to right column */}
            <line x1={ROW5_EM} y1={ROW5_Y} x2={ROW5_RX} y2={ROW5_Y}
              stroke={BLUE} strokeWidth="3" />

            {/* Right col dot 1 — Conferência */}
            <Dot cx={ROW5_RX} cy={RC5_Y1} c={BLUE} r={10} />
            <line x1={ROW5_RX - 10} y1={RC5_Y1} x2={ROW5_RX - 22} y2={RC5_Y1}
              stroke={BLUE} strokeWidth="2" />
            <TipBox x={ROW5_RX - 205} y={RC5_Y1 - 40} w={182} color={BLUE}
              lines={[
                { t: "Conferência para verificar", bold: true },
                { t: "se os valores foram ajustados" },
                { t: "conforme a negociação." },
              ]} />

            {/* Right col dot 2 — Cadastro SISA */}
            <Dot cx={ROW5_RX} cy={RC5_Y2} c={BLUE} r={10} />
            <line x1={ROW5_RX - 10} y1={RC5_Y2} x2={ROW5_RX - 22} y2={RC5_Y2}
              stroke={BLUE} strokeWidth="2" />
            <TipBox x={ROW5_RX - 205} y={RC5_Y2 - 22} w={182} color={BLUE}
              lines={[
                { t: "Cadastro dentro do", bold: true },
                { t: "sistema do SISA." },
              ]} />

            {/* ── Left icon: Armazena Negociação ── */}
            <INode cx={N1.actor} cy={ROW5_Y} c={BLUE} icon="triagem" />
            <text x={N1.actor - 52} y={ROW5_Y + 10} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Armazena</text>
            <text x={N1.actor - 52} y={ROW5_Y + 23} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Negociação</text>

            {/* ── Dot 1 ── */}
            <Dot cx={ROW5_D1} cy={ROW5_Y} c={BLUE} r={10} />
            <TipBox x={ROW5_D1 - 80} y={ROW5_Y - 100} w={162} color={BLUE}
              lines={[
                { t: "Dentro do sistema do SISA,", bold: true },
                { t: "é sinalizado que a apólice" },
                { t: "sofreu alteração de custo." },
              ]} />

            {/* ── Dot 2 ── */}
            <Dot cx={ROW5_D2} cy={ROW5_Y} c={BLUE} r={10} />
            <TipBox x={ROW5_D2 - 80} y={ROW5_Y - 115} w={162} color={BLUE}
              lines={[
                { t: "Ao final do processo de", bold: true },
                { t: "emissão de fatura é realizado" },
                { t: "o cadastro dos documentos" },
                { t: "da apólice manualmente" },
                { t: "dentro do sistema do GEDE." },
              ]} />

            {/* ── Dot 3 ── */}
            <Dot cx={ROW5_D3} cy={ROW5_Y} c={BLUE} r={10} />
            <TipBox x={ROW5_D3 - 80} y={ROW5_Y - 115} w={162} color={BLUE}
              lines={[
                { t: "Caso a fatura já tenha sido", bold: true },
                { t: "emitida, é cancelado o endosso" },
                { t: "da fatura solicitada. Hoje é" },
                { t: "emitido o aditivo para minimizar" },
                { t: "o risco regulatório." },
              ]} />

            {/* ── Dot 4 ── */}
            <Dot cx={ROW5_D4} cy={ROW5_Y} c={BLUE} r={10} />
            <TipBox x={ROW5_D4 - 80} y={ROW5_Y - 90} w={162} color={BLUE}
              lines={[
                { t: "É feito a emissão da fatura", bold: true },
                { t: "no sistema do SISA." },
              ]} />

            {/* ── Right icon: Emissão de Fatura ── */}
            <INode cx={ROW5_EM} cy={ROW5_Y} c={BLUE} icon="money" />
            <text x={ROW5_EM + 52} y={ROW5_Y + 10} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">Emissão</text>
            <text x={ROW5_EM + 52} y={ROW5_Y + 23} textAnchor="middle"
              fontSize="10.5" fill={BLUE} fontWeight="700">de Fatura</text>

            {/* Vertical branch below left icon */}
            <line x1={N1.actor} y1={ROW5_Y + 28} x2={N1.actor} y2={ROW5_DB - 10}
              stroke={BLUE} strokeWidth="3" />
            <Dot cx={N1.actor} cy={ROW5_DB} c={BLUE} r={10} />
            <TipBox x={N1.actor + 20} y={ROW5_DB - 54} w={200} color={BLUE}
              lines={[
                { t: "A cada 15 dias são extraídos", bold: true },
                { t: "manualmente algumas planilhas." },
                { t: "São disponibilizadas pelo" },
                { t: "Sharepoint e encaminhadas" },
                { t: "para a equipe de RPC." },
              ]} />

            {/* ══════════════════════════════════════════════════
                ROW 6 — Pink: RCP
            ══════════════════════════════════════════════════ */}

            {/* Bridge: dot azul → SPLIT_Y3 */}
            <line x1={N1.actor} y1={ROW5_DB + 10} x2={N1.actor} y2={SPLIT_Y3}
              stroke={BLUE} strokeWidth="3" />

            {/* Vertical connector from SPLIT_Y3 to email icon */}
            <line x1={N1.actor} y1={SPLIT_Y3} x2={N1.actor} y2={ROW6_Y - 28}
              stroke={PINK} strokeWidth="3" />

            {/* Horizontal row line */}
            <line x1={N1.actor + 28} y1={ROW6_Y} x2={ROW6_EM - 28} y2={ROW6_Y}
              stroke={PINK} strokeWidth="3" />

            {/* ── Email icon (primeiro) ── */}
            <INode cx={N1.actor} cy={ROW6_Y} c={PINK} icon="email" />
            <text x={N1.actor} y={ROW6_Y + 41} textAnchor="middle"
              fontSize="10.5" fill={PINK} fontWeight="700">Recebimento</text>
            <text x={N1.actor} y={ROW6_Y + 53} textAnchor="middle"
              fontSize="10.5" fill={PINK} fontWeight="700">de Email</text>

            {/* ── Actor: Time de RCP ── */}
            <Actor cx={ROW6_ACT} cy={ROW6_Y} c={PINK}
              src="/persona-rcp.png" label="Time de RCP" />

            {/* ── Dot 1 ── */}
            <Dot cx={ROW6_D1} cy={ROW6_Y} c={PINK} r={10} />
            <TipBox x={ROW6_D1 - 85} y={ROW6_Y + 18} w={172} color={PINK}
              lines={[
                { t: "Recebimento de planilhas", bold: true },
                { t: "pela equipe de RPC via email." },
              ]} />

            {/* ── Dot 2 ── */}
            <Dot cx={ROW6_D2} cy={ROW6_Y} c={PINK} r={10} />
            <TipBox x={ROW6_D2 - 85} y={ROW6_Y + 18} w={172} color={PINK}
              lines={[
                { t: "Análise das planilhas para", bold: true },
                { t: "identificação e envio para ANS" },
                { t: "somente das negociações que" },
                { t: "não fazem parte da RN 565." },
              ]} />

            {/* ── Right icon: Envio de Acordo para ANS ── */}
            <INode cx={ROW6_EM} cy={ROW6_Y} c={PINK} icon="phone" />
            <text x={ROW6_EM + 55} y={ROW6_Y + 3} textAnchor="middle"
              fontSize="10.5" fill={PINK} fontWeight="700">Envio de Acordo</text>
            <text x={ROW6_EM + 55} y={ROW6_Y + 16} textAnchor="middle"
              fontSize="10.5" fill={PINK} fontWeight="700">para ANS</text>

          </svg>
        </div>
      </div>
    </motion.div>
  );
}
