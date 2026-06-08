"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FluxoVtalExpress from "./FluxoVtalExpress";

/* ─── Paleta compartilhada ─── */
const P = {
  headerFill: "#DBEAFE", headerStroke: "#93C5FD", headerText: "#1E3A5F",
  colFill: "#F9FAFB", colStroke: "#E5E7EB", colText: "#6B7280",
  blueFill: "#DBEAFE", blueStroke: "#3B82F6", blueText: "#1E40AF", blueSub: "#3B82F6",
  greenFill: "#D1FAE5", greenStroke: "#059669", greenText: "#065F46",
  orangeFill: "#FEF3C7", orangeStroke: "#D97706", orangeText: "#92400E",
  redFill: "#FEE2E2", redStroke: "#DC2626", redText: "#7F1D1D",
  grayFill: "#F3F4F6", grayStroke: "#9CA3AF", grayText: "#6B7280",
  tealFill: "#CCFBF1", tealStroke: "#0D9488", tealText: "#134E4A",
  sepColor: "#D1D5DB", arrowBlue: "#3B82F6", arrowGray: "#9CA3AF",
};

/* ─── helper: retorna width/height corretos para SVG rect ─── */
const nr = (cx: number, cy: number, w: number, h: number) =>
  ({ x: cx - w / 2, y: cy - h / 2, width: w, height: h });

/* ═══════════════════════════════════════════════════════════
   FASE 2 — Deslocamento, chegada e execução em campo
═══════════════════════════════════════════════════════════ */
function FluxoFase2() {
  const vW = 920, pad = 10, headerH = 44, colHeaderH = 30;
  const laneTop = pad + headerH + colHeaderH + 4;
  const c1 = { x: pad, w: 268, cx: pad + 134 };
  const c2 = { x: 286, w: 300, cx: 436 };
  const c3 = { x: 594, w: 316, cx: 752 };

  const NH = 52;
  const y1  = laneTop + 48;
  const y2  = y1  + 114;
  const yD1 = y2  + 108;
  const yRA = yD1 + 96;
  const y9  = yD1 + 96;
  const yD2 = y9  + 94;
  const yF3 = yD2 + 92;
  const laneBot = yF3 + 46;

  const n5   = nr(c3.cx, y1,  230, NH);
  const nGL  = nr(c2.cx, y1,  210, NH);
  const n6   = nr(c1.cx, y1,  200, NH);
  const n7   = nr(c3.cx, y2,  230, NH);
  const nAC  = nr(c1.cx, y2,  200, NH);
  const d1   = { cx: c3.cx, cy: yD1, hw: 68, hh: 40 };
  const n8A  = nr(c2.cx, yD1, 220, 68);
  const n8B  = nr(c1.cx, yD1, 200, NH);
  const nRA  = nr(c2.cx, yRA, 220, NH);
  const n9   = nr(c3.cx, y9,  230, NH);
  const d2   = { cx: c3.cx, cy: yD2, hw: 68, hh: 40 };
  const n10A = nr(c2.cx, yD2, 220, 68);
  const nCN2 = nr(c1.cx, yD2, 200, NH);
  const nF3  = nr(c3.cx, yF3, 230, NH);

  return (
    <svg viewBox={`0 0 ${vW} ${laneBot + pad}`} xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
      <defs>
        <marker id="f2-ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={P.arrowBlue} />
        </marker>
        <marker id="f2-ag" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={P.arrowGray} />
        </marker>
      </defs>

      {/* Header */}
      <rect x={pad} y={pad} width={vW - pad * 2} height={headerH} rx="8"
        fill={P.headerFill} stroke={P.headerStroke} strokeWidth="1.5" />
      <text x={vW / 2} y={pad + headerH / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={P.headerText}>
        Fase 2 — Deslocamento, chegada e execução em campo
      </text>

      {/* Col headers */}
      {[{ col: c1, label: "Cliente" }, { col: c2, label: "Agente de IA / Sistema" }, { col: c3, label: "Técnico GIG" }]
        .map(({ col, label }) => (
          <g key={label}>
            <rect x={col.x} y={pad + headerH + 2} width={col.w} height={colHeaderH} rx="4"
              fill={P.colFill} stroke={P.colStroke} strokeWidth="1" />
            <text x={col.cx} y={pad + headerH + 2 + colHeaderH / 2 + 5} textAnchor="middle"
              fontSize="12" fontWeight="600" fill={P.colText}>{label}</text>
          </g>
        ))}

      {/* Swim lanes */}
      {[c1, c2, c3].map((col, i) => (
        <rect key={i} x={col.x} y={laneTop} width={col.w} height={laneBot - laneTop}
          fill={i === 1 ? "#EFF6FF" : "#FAFAFA"} stroke={P.colStroke} strokeWidth="1" rx="4" />
      ))}
      <line x1={c2.x} y1={laneTop} x2={c2.x} y2={laneBot} stroke={P.sepColor} strokeWidth="1" strokeDasharray="6 4" />
      <line x1={c3.x} y1={laneTop} x2={c3.x} y2={laneBot} stroke={P.sepColor} strokeWidth="1" strokeDasharray="6 4" />

      {/* ── Row 1 ── */}
      <rect {...n5} rx="8" fill={P.blueFill} stroke={P.blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.blueText} fontWeight="700" fontSize="12"><tspan x={c3.cx} y={y1 - 8}>5. Inicia deslocamento</tspan></text>
      <text textAnchor="middle" fill={P.blueSub} fontSize="10"><tspan x={c3.cx} y={y1 + 10}>App registra GPS + ETA</tspan></text>

      <rect {...nGL} rx="8" fill={P.grayFill} stroke={P.grayStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.grayText} fontWeight="700" fontSize="12"><tspan x={c2.cx} y={y1 - 8}>Gera link de rastreio</tspan></text>
      <text textAnchor="middle" fill={P.grayText} fontSize="10"><tspan x={c2.cx} y={y1 + 10}>Mapa ao vivo + ETA</tspan></text>

      <rect {...n6} rx="8" fill={P.greenFill} stroke={P.greenStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.greenText} fontWeight="700" fontSize="12"><tspan x={c1.cx} y={y1 - 8}>6. Notificação de rota</tspan></text>
      <text textAnchor="middle" fill={P.greenStroke} fontSize="10"><tspan x={c1.cx} y={y1 + 10}>Link mapa + técnico a caminho</tspan></text>

      {/* ── Row 2 ── */}
      <rect {...n7} rx="8" fill={P.blueFill} stroke={P.blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.blueText} fontWeight="700" fontSize="12"><tspan x={c3.cx} y={y2 - 8}>7. Registra chegada</tspan></text>
      <text textAnchor="middle" fill={P.blueSub} fontSize="10"><tspan x={c3.cx} y={y2 + 10}>Check-in GPS obrigatório</tspan></text>

      <rect {...nAC} rx="8" fill={P.greenFill} stroke={P.greenStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.greenText} fontWeight="700" fontSize="12"><tspan x={c1.cx} y={y2 - 8}>Alerta de chegada</tspan></text>
      <text textAnchor="middle" fill={P.greenStroke} fontSize="10"><tspan x={c1.cx} y={y2 + 10}>Push + "Técnico chegou"</tspan></text>

      {/* ── Diamond 1 ── */}
      <polygon points={`${d1.cx},${d1.cy - d1.hh} ${d1.cx + d1.hw},${d1.cy} ${d1.cx},${d1.cy + d1.hh} ${d1.cx - d1.hw},${d1.cy}`}
        fill="white" stroke={P.blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.blueText} fontSize="10" fontWeight="600">
        <tspan x={d1.cx} y={yD1 - 5}>Impeditivo</tspan><tspan x={d1.cx} dy="13">técnico?</tspan>
      </text>

      <rect {...n8A} rx="8" fill={P.orangeFill} stroke={P.orangeStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.orangeText} fontWeight="700" fontSize="12"><tspan x={c2.cx} y={yD1 - 18}>8A. Registra impeditivo</tspan></text>
      <text textAnchor="middle" fill={P.orangeText} fontSize="10">
        <tspan x={c2.cx} y={yD1}>Foto/vídeo + justificativa</tspan>
        <tspan x={c2.cx} dy="14">Ausência / mau tempo / obra</tspan>
      </text>

      <rect {...n8B} rx="8" fill={P.orangeFill} stroke={P.orangeStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.orangeText} fontWeight="700" fontSize="12"><tspan x={c1.cx} y={yD1 - 8}>8B. Cliente informado</tspan></text>
      <text textAnchor="middle" fill={P.orangeText} fontSize="10"><tspan x={c1.cx} y={yD1 + 10}>Motivo + previsão reagend.</tspan></text>

      <rect {...nRA} rx="8" fill={P.grayFill} stroke={P.grayStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.grayText} fontWeight="600" fontSize="12"><tspan x={c2.cx} y={yRA + 6}>Reagendamento automático</tspan></text>

      <rect {...n9} rx="8" fill={P.blueFill} stroke={P.blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.blueText} fontWeight="700" fontSize="12"><tspan x={c3.cx} y={y9 - 8}>9. Realiza atendimento</tspan></text>
      <text textAnchor="middle" fill={P.blueSub} fontSize="10"><tspan x={c3.cx} y={y9 + 10}>Manutenção fibra / conexão</tspan></text>

      {/* ── Diamond 2 ── */}
      <polygon points={`${d2.cx},${d2.cy - d2.hh} ${d2.cx + d2.hw},${d2.cy} ${d2.cx},${d2.cy + d2.hh} ${d2.cx - d2.hw},${d2.cy}`}
        fill="white" stroke={P.blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.blueText} fontSize="10" fontWeight="600">
        <tspan x={d2.cx} y={yD2 - 5}>Problema</tspan><tspan x={d2.cx} dy="13">resolvido?</tspan>
      </text>

      <rect {...n10A} rx="8" fill={P.redFill} stroke={P.redStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.redText} fontWeight="700" fontSize="12"><tspan x={c2.cx} y={yD2 - 18}>10A. Abre ticket N2</tspan></text>
      <text textAnchor="middle" fill={P.redText} fontSize="10">
        <tspan x={c2.cx} y={yD2}>Evidências + justificativa</tspan>
        <tspan x={c2.cx} dy="14">Chamado escalado</tspan>
      </text>

      <rect {...nCN2} rx="8" fill={P.redFill} stroke={P.redStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.redText} fontWeight="700" fontSize="12"><tspan x={c1.cx} y={yD2 - 8}>Cliente notificado N2</tspan></text>
      <text textAnchor="middle" fill={P.redText} fontSize="10"><tspan x={c1.cx} y={yD2 + 10}>Prazo N2 + novo protocolo</tspan></text>

      <rect {...nF3} rx="8" fill={P.tealFill} stroke={P.tealStroke} strokeWidth="2" />
      <text textAnchor="middle" fill={P.tealText} fontWeight="700" fontSize="13"><tspan x={c3.cx} y={yF3 + 6}>Segue para Fase 3</tspan></text>

      {/* ─── Setas ─── */}
      <line x1={n5.x} y1={y1} x2={nGL.x + nGL.width} y2={y1} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <line x1={nGL.x} y1={y1} x2={n6.x + n6.width} y2={y1} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <line x1={c3.cx} y1={n5.y + n5.height} x2={c3.cx} y2={n7.y} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <polyline points={`${n7.x},${y2 + 12} ${c2.x + 10},${y2 + 12} ${c2.x + 10},${y2 + 20} ${nAC.x + nAC.width},${y2 + 20}`}
        fill="none" stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <line x1={c3.cx} y1={n7.y + n7.height} x2={c3.cx} y2={d1.cy - d1.hh} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <line x1={d1.cx - d1.hw} y1={yD1} x2={n8A.x + n8A.width} y2={yD1} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <text x={(d1.cx - d1.hw + n8A.x + n8A.width) / 2} y={yD1 - 6} textAnchor="middle" fontSize="10" fill={P.arrowBlue} fontWeight="600">Sim</text>
      <line x1={n8A.x} y1={yD1} x2={n8B.x + n8B.width} y2={yD1} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <line x1={c2.cx} y1={n8A.y + n8A.height} x2={c2.cx} y2={nRA.y} stroke={P.arrowGray} strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#f2-ag)" />
      <line x1={c3.cx} y1={d1.cy + d1.hh} x2={c3.cx} y2={n9.y} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <text x={c3.cx + 10} y={d1.cy + d1.hh + 16} fontSize="10" fill={P.arrowBlue} fontWeight="600">Não</text>
      <line x1={c3.cx} y1={n9.y + n9.height} x2={c3.cx} y2={d2.cy - d2.hh} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <line x1={c3.cx} y1={d2.cy + d2.hh} x2={c3.cx} y2={nF3.y} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <text x={c3.cx + 10} y={d2.cy + d2.hh + 16} fontSize="10" fill={P.arrowBlue} fontWeight="600">Sim</text>
      <line x1={d2.cx - d2.hw} y1={yD2} x2={n10A.x + n10A.width} y2={yD2} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
      <text x={(d2.cx - d2.hw + n10A.x + n10A.width) / 2} y={yD2 - 6} textAnchor="middle" fontSize="10" fill={P.arrowBlue} fontWeight="600">Não</text>
      <line x1={n10A.x} y1={yD2} x2={nCN2.x + nCN2.width} y2={yD2} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f2-ah)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   FASE 3 — Conclusão, avaliação e encerramento
═══════════════════════════════════════════════════════════ */
function FluxoFase3() {
  const vW = 920, pad = 10, headerH = 44, colHeaderH = 30;
  const laneTop = pad + headerH + colHeaderH + 4;
  const c1 = { x: pad, w: 268, cx: pad + 134 };
  const c2 = { x: 286, w: 300, cx: 436 };
  const c3 = { x: 594, w: 316, cx: 752 };

  const NH = 52;
  const y1 = laneTop + 52;
  const y2 = y1 + 120;
  const y3 = y2 + 120;
  const yD = y3;
  const y4 = y3 + 106;
  const laneBot = y4 + 46;

  const n11  = nr(c3.cx, y1,  240, NH);
  const n11B = nr(c2.cx, y1,  230, 68);
  const n12  = nr(c1.cx, y1,  200, NH);
  const n12B = nr(c1.cx, y2,  200, NH);
  const n13A = nr(c3.cx, y2,  240, 68);
  const n12C = nr(c1.cx, y3,  200, 68);
  const nSC  = nr(c2.cx, y3,  220, 68);
  const diam = { cx: c3.cx, cy: yD, hw: 68, hh: 40 };
  const n13B = nr(c3.cx, y4,  240, NH);

  return (
    <svg viewBox={`0 0 ${vW} ${laneBot + pad}`} xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
      <defs>
        <marker id="f3-ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={P.arrowBlue} />
        </marker>
        <marker id="f3-ag" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={P.arrowGray} />
        </marker>
      </defs>

      {/* Header */}
      <rect x={pad} y={pad} width={vW - pad * 2} height={headerH} rx="8"
        fill={P.headerFill} stroke={P.headerStroke} strokeWidth="1.5" />
      <text x={vW / 2} y={pad + headerH / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={P.headerText}>
        Fase 3 — Conclusão, avaliação e encerramento
      </text>

      {/* Col headers */}
      {[{ col: c1, label: "Cliente" }, { col: c2, label: "Sistema / IA" }, { col: c3, label: "Técnico GIG" }]
        .map(({ col, label }) => (
          <g key={label}>
            <rect x={col.x} y={pad + headerH + 2} width={col.w} height={colHeaderH} rx="4"
              fill={P.colFill} stroke={P.colStroke} strokeWidth="1" />
            <text x={col.cx} y={pad + headerH + 2 + colHeaderH / 2 + 5} textAnchor="middle"
              fontSize="12" fontWeight="600" fill={P.colText}>{label}</text>
          </g>
        ))}

      {/* Swim lanes */}
      {[c1, c2, c3].map((col, i) => (
        <rect key={i} x={col.x} y={laneTop} width={col.w} height={laneBot - laneTop}
          fill={i === 1 ? "#EFF6FF" : "#FAFAFA"} stroke={P.colStroke} strokeWidth="1" rx="4" />
      ))}
      <line x1={c2.x} y1={laneTop} x2={c2.x} y2={laneBot} stroke={P.sepColor} strokeWidth="1" strokeDasharray="6 4" />
      <line x1={c3.x} y1={laneTop} x2={c3.x} y2={laneBot} stroke={P.sepColor} strokeWidth="1" strokeDasharray="6 4" />

      {/* ── Row 1 ── */}
      <rect {...n11} rx="8" fill={P.blueFill} stroke={P.blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.blueText} fontWeight="700" fontSize="12"><tspan x={c3.cx} y={y1 - 8}>11. Registra conclusão</tspan></text>
      <text textAnchor="middle" fill={P.blueSub} fontSize="10"><tspan x={c3.cx} y={y1 + 10}>Medição de banda + foto</tspan></text>

      <rect {...n11B} rx="8" fill={P.grayFill} stroke={P.grayStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.grayText} fontWeight="700" fontSize="12"><tspan x={c2.cx} y={y1 - 18}>11B. Envia link avaliação</tspan></text>
      <text textAnchor="middle" fill={P.grayText} fontSize="10">
        <tspan x={c2.cx} y={y1}>WhatsApp + App (24h)</tspan>
        <tspan x={c2.cx} dy="14">Não requer presença física</tspan>
      </text>

      <rect {...n12} rx="8" fill={P.greenFill} stroke={P.greenStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.greenText} fontWeight="700" fontSize="12"><tspan x={c1.cx} y={y1 - 8}>12. Recebe link avaliação</tspan></text>
      <text textAnchor="middle" fill={P.greenStroke} fontSize="10"><tspan x={c1.cx} y={y1 + 10}>NPS / estrelas via App</tspan></text>

      {/* ── Row 2 ── */}
      <rect {...n12B} rx="8" fill={P.blueFill} stroke={P.blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.blueText} fontWeight="700" fontSize="12"><tspan x={c1.cx} y={y2 - 8}>12B. Cliente avalia</tspan></text>
      <text textAnchor="middle" fill={P.blueSub} fontSize="10"><tspan x={c1.cx} y={y2 + 10}>Janela 24h (lembrete único)</tspan></text>

      <rect {...n13A} rx="8" fill={P.tealFill} stroke={P.tealStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.tealText} fontWeight="700" fontSize="12"><tspan x={c3.cx} y={y2 - 18}>13A. Avalia V.Tal Express</tspan></text>
      <text textAnchor="middle" fill={P.tealText} fontSize="10">
        <tspan x={c3.cx} y={y2}>Formulário obrigatório</tspan>
        <tspan x={c3.cx} dy="14">Bloqueio sem preenchimento</tspan>
      </text>

      {/* ── Row 3 ── */}
      <rect {...n12C} rx="8" fill={P.greenFill} stroke={P.greenStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.greenText} fontWeight="700" fontSize="12"><tspan x={c1.cx} y={y3 - 18}>12C. Confirmação final</tspan></text>
      <text textAnchor="middle" fill={P.greenText} fontSize="10">
        <tspan x={c1.cx} y={y3}>Resumo: banda, protocolo</tspan>
        <tspan x={c1.cx} dy="14">Opção de reabrir chamado</tspan>
      </text>

      <rect {...nSC} rx="8" fill={P.grayFill} stroke={P.grayStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.grayText} fontWeight="700" fontSize="12"><tspan x={c2.cx} y={y3 - 18}>Sistema consolida dados</tspan></text>
      <text textAnchor="middle" fill={P.grayText} fontSize="10">
        <tspan x={c2.cx} y={y3}>SLA, NPS, tempo campo</tspan>
        <tspan x={c2.cx} dy="14">Disponível em dashboard</tspan>
      </text>

      {/* Diamond */}
      <polygon points={`${diam.cx},${diam.cy - diam.hh} ${diam.cx + diam.hw},${diam.cy} ${diam.cx},${diam.cy + diam.hh} ${diam.cx - diam.hw},${diam.cy}`}
        fill="white" stroke={P.blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={P.blueText} fontSize="10" fontWeight="600">
        <tspan x={diam.cx} y={yD - 5}>Mais</tspan><tspan x={diam.cx} dy="13">chamados?</tspan>
      </text>

      <rect {...n13B} rx="8" fill={P.tealFill} stroke={P.tealStroke} strokeWidth="2" />
      <text textAnchor="middle" fill={P.tealText} fontWeight="700" fontSize="12"><tspan x={c3.cx} y={y4 - 8}>13B. Encerra expediente</tspan></text>
      <text textAnchor="middle" fill={P.tealText} fontSize="10"><tspan x={c3.cx} y={y4 + 10}>retorna ao App (Fase 1)</tspan></text>

      {/* ─── Setas ─── */}
      <line x1={n11.x} y1={y1} x2={n11B.x + n11B.width} y2={y1} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f3-ah)" />
      <line x1={n11B.x} y1={y1} x2={n12.x + n12.width} y2={y1} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f3-ah)" />
      <line x1={c1.cx} y1={n12.y + n12.height} x2={c1.cx} y2={n12B.y} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f3-ah)" />
      <line x1={c3.cx} y1={n11.y + n11.height} x2={c3.cx} y2={n13A.y} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f3-ah)" />
      <line x1={c1.cx} y1={n12B.y + n12B.height} x2={c1.cx} y2={n12C.y} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f3-ah)" />
      <line x1={c3.cx} y1={n13A.y + n13A.height} x2={c3.cx} y2={diam.cy - diam.hh} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f3-ah)" />
      <line x1={c2.cx} y1={n11B.y + n11B.height} x2={c2.cx} y2={nSC.y} stroke={P.arrowGray} strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#f3-ag)" />
      <line x1={c3.cx} y1={diam.cy + diam.hh} x2={c3.cx} y2={n13B.y} stroke={P.arrowBlue} strokeWidth="1.5" markerEnd="url(#f3-ah)" />
      <text x={c3.cx + 10} y={diam.cy + diam.hh + 16} fontSize="10" fill={P.arrowBlue} fontWeight="600">Não</text>
      <polyline
        points={`${diam.cx + diam.hw},${yD} ${c3.x + c3.w - 10},${yD} ${c3.x + c3.w - 10},${y1} ${n11.x + n11.width},${y1}`}
        fill="none" stroke={P.arrowBlue} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#f3-ah)" />
      <text x={c3.x + c3.w - 10} y={yD - 8} textAnchor="middle" fontSize="10" fill={P.arrowBlue} fontWeight="600">Sim</text>

    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MODAL PRINCIPAL — padrão JornadaAsIs
═══════════════════════════════════════════════════════════ */
interface Props { onClose: () => void }

export default function FluxoCompletoModal({ onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => { setVisible(false); setTimeout(onClose, 260); };

  return (
    <motion.div
      className="fixed inset-0 z-[70] bg-black/70 flex flex-col"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 14 }}
      transition={{ duration: 0.26, ease: "easeInOut" }}
    >
      {/* Header — mesmo padrão JornadaAsIs */}
      <div className="flex-shrink-0 bg-[#F7F8F5] border-b border-black/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-sm text-[#1F2937]/60 hover:text-[#1F2937] transition-colors cursor-pointer"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Voltar
          </button>
          <div className="w-px h-5 bg-black/15" />
          <p className="text-sm font-semibold text-[#1F2937]">
            Fluxo Completo — V.tal Técnico Express
          </p>
        </div>
        <button onClick={handleClose} aria-label="Fechar"
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Conteúdo scrollável */}
      <div className="flex-1 overflow-y-auto bg-[#F7F8F5] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 pb-20 space-y-10 pt-8">

          <div>
            <p className="text-xs font-bold text-[#9CA3AF] tracking-widest uppercase mb-3">Fase 1 — Abertura, triagem e dispatch</p>
            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white p-3">
              <FluxoVtalExpress />
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-[#9CA3AF] tracking-widest uppercase mb-3">Fase 2 — Deslocamento, chegada e execução em campo</p>
            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white p-3">
              <FluxoFase2 />
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-[#9CA3AF] tracking-widest uppercase mb-3">Fase 3 — Conclusão, avaliação e encerramento</p>
            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white p-3">
              <FluxoFase3 />
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
