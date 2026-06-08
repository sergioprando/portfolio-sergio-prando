"use client";

export default function FluxoVtalExpress() {
  const headerFill   = "#DBEAFE";
  const headerStroke = "#93C5FD";
  const headerText   = "#1E3A5F";

  const colFill   = "#F9FAFB";
  const colStroke = "#E5E7EB";
  const colText   = "#6B7280";

  const blueFill   = "#DBEAFE";
  const blueStroke = "#3B82F6";
  const blueText   = "#1E40AF";
  const blueSub    = "#3B82F6";

  const greenFill   = "#D1FAE5";
  const greenStroke = "#059669";
  const greenText   = "#065F46";

  const orangeFill   = "#FEF3C7";
  const orangeStroke = "#D97706";
  const orangeText   = "#92400E";

  const redFill   = "#FEE2E2";
  const redStroke = "#DC2626";
  const redText   = "#7F1D1D";

  const sepColor = "#D1D5DB";
  const arrowBlue   = "#3B82F6";
  const arrowOrange = "#F59E0B";
  const arrowGray   = "#9CA3AF";

  /* ── Medidas das swim lanes ── */
  // viewBox 920 × 660
  const vW = 920, vH = 660;
  const pad = 10;
  const headerH = 44;
  const colHeaderH = 30;

  // Colunas (x, width, center-x)
  const c1 = { x: pad,  w: 268, cx: pad + 134  };   // Cliente
  const c2 = { x: 286,  w: 300, cx: 286 + 150  };   // Agente IA
  const c3 = { x: 594,  w: 316, cx: 594 + 158  };   // Tecnico GIG

  const laneTop = pad + headerH + colHeaderH + 4;
  const laneBot = vH - pad;

  // Nó helper
  const NW = 220, NH = 52;
  const node = (cx: number, cy: number, w = NW, h = NH) =>
    ({ x: cx - w / 2, y: cy - h / 2, w, h });

  /* ── Centros dos nós ── */
  const y1 = laneTop + 40;    // Row 1
  const y2 = y1 + 110;        // Row 2
  const yD1 = y2 + 110;       // Diamond 1
  const y3C = yD1 + 108;      // Node 2C
  const yD2 = yD1;            // Diamond 2 (mesma linha do diamond 1)
  const y4B = yD2 + 100;      // Node 4B  / Node 2D / Aviso

  const n1  = node(c1.cx, y1,  200, NH);
  const n2  = node(c2.cx, y1,  230, NH);
  const n3  = node(c3.cx, y1,  240, NH);
  const n1b = node(c1.cx, y2,  200, NH);
  const n2b = node(c2.cx, y2,  230, NH);

  // Diamond 1 "Tecnico disponivel?"
  const d1 = { cx: c2.cx, cy: yD1, hw: 70, hh: 40 };

  // Node 4 "Chamado enviado" — mesma linha que diamond1
  const n4  = node(c3.cx, yD1, 240, NH);

  // Node 2C
  const n2c = node(c2.cx, y3C, 230, 68);

  // Diamond 2 "Tecnico aceita?" — abaixo de n4
  const d2 = { cx: c3.cx, cy: yD1 + 108, hw: 66, hh: 38 };

  // Node 4B
  const n4b = node(c3.cx, d2.cy + 95, 240, NH);

  // Node 2D "Fallback"
  const n2d = node(c2.cx, n4b.y + NH / 2, 230, NH);

  // Node Aviso
  const nav = node(c1.cx, n4b.y + NH / 2, 200, NH);

  return (
    <svg
      viewBox={`0 0 ${vW} ${vH}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
    >
      <defs>
        <marker id="fve-ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={arrowBlue} />
        </marker>
        <marker id="fve-ao" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={arrowOrange} />
        </marker>
        <marker id="fve-ag" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={arrowGray} />
        </marker>
        <marker id="fve-gr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={greenStroke} />
        </marker>
      </defs>

      {/* ── Header ── */}
      <rect x={pad} y={pad} width={vW - pad * 2} height={headerH} rx="8"
        fill={headerFill} stroke={headerStroke} strokeWidth="1.5" />
      <text x={vW / 2} y={pad + headerH / 2 + 5} textAnchor="middle"
        fontSize="14" fontWeight="700" fill={headerText}>
        Fase 1 — Abertura, triagem e dispatch
      </text>

      {/* ── Column headers ── */}
      {[
        { col: c1, label: "Cliente" },
        { col: c2, label: "Agente de IA" },
        { col: c3, label: "Técnico GIG" },
      ].map(({ col, label }) => (
        <g key={label}>
          <rect x={col.x} y={pad + headerH + 2} width={col.w} height={colHeaderH} rx="4"
            fill={colFill} stroke={colStroke} strokeWidth="1" />
          <text x={col.cx} y={pad + headerH + 2 + colHeaderH / 2 + 5}
            textAnchor="middle" fontSize="12" fontWeight="600" fill={colText}>
            {label}
          </text>
        </g>
      ))}

      {/* ── Swim lane backgrounds ── */}
      {[c1, c2, c3].map((col, i) => (
        <rect key={i} x={col.x} y={laneTop} width={col.w} height={laneBot - laneTop}
          fill={i === 1 ? "#F0F6FF" : "#FAFAFA"} stroke={colStroke} strokeWidth="1" rx="4" />
      ))}

      {/* ── Separadores tracejados ── */}
      <line x1={c2.x} y1={laneTop} x2={c2.x} y2={laneBot}
        stroke={sepColor} strokeWidth="1" strokeDasharray="6 4" />
      <line x1={c3.x} y1={laneTop} x2={c3.x} y2={laneBot}
        stroke={sepColor} strokeWidth="1" strokeDasharray="6 4" />

      {/* ════════════ NÓS ════════════ */}

      {/* Nó 1 — Abre chamado */}
      <rect x={n1.x} y={n1.y} width={n1.w} height={n1.h} rx="8"
        fill={blueFill} stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontWeight="700" fontSize="12">
        <tspan x={c1.cx} y={y1 - 8}>1. Abre chamado</tspan>
      </text>
      <text textAnchor="middle" fill={blueSub} fontSize="10">
        <tspan x={c1.cx} y={y1 + 10}>Central, App ou WhatsApp</tspan>
      </text>

      {/* Nó 2 — Triagem */}
      <rect x={n2.x} y={n2.y} width={n2.w} height={n2.h} rx="8"
        fill={blueFill} stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontWeight="700" fontSize="12">
        <tspan x={c2.cx} y={y1 - 8}>2. Triagem e classificação</tspan>
      </text>
      <text textAnchor="middle" fill={blueSub} fontSize="10">
        <tspan x={c2.cx} y={y1 + 10}>Urgência + tipo de falha</tspan>
      </text>

      {/* Nó 3 — Técnico ativa App */}
      <rect x={n3.x} y={n3.y} width={n3.w} height={n3.h} rx="8"
        fill={blueFill} stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontWeight="700" fontSize="12">
        <tspan x={c3.cx} y={y1 - 8}>3. Técnico ativa App</tspan>
      </text>
      <text textAnchor="middle" fill={blueSub} fontSize="10">
        <tspan x={c3.cx} y={y1 + 10}>Status: disponível / GPS on</tspan>
      </text>

      {/* Caixa laranja tracejada ao redor de 1B */}
      <rect x={n1b.x - 8} y={n1b.y - 8} width={n1b.w + 16} height={n1b.h + 16} rx="10"
        fill="none" stroke={arrowOrange} strokeWidth="1.8" strokeDasharray="5 3" />

      {/* Nó 1B — Confirmação imediata */}
      <rect x={n1b.x} y={n1b.y} width={n1b.w} height={n1b.h} rx="8"
        fill={greenFill} stroke={greenStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={greenText} fontWeight="700" fontSize="12">
        <tspan x={c1.cx} y={y2 - 8}>1B. Confirmação imediata</tspan>
      </text>
      <text textAnchor="middle" fill={greenStroke} fontSize="10">
        <tspan x={c1.cx} y={y2 + 10}>Protocolo + previsão de SLA</tspan>
      </text>

      {/* Nó 2B — Busca técnicos */}
      <rect x={n2b.x} y={n2b.y} width={n2b.w} height={n2b.h} rx="8"
        fill={blueFill} stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontWeight="700" fontSize="12">
        <tspan x={c2.cx} y={y2 - 8}>2B. Busca técnicos</tspan>
      </text>
      <text textAnchor="middle" fill={blueSub} fontSize="10">
        <tspan x={c2.cx} y={y2 + 10}>Raio inicial 5 km</tspan>
      </text>

      {/* Diamond 1 — Técnico disponível? */}
      <polygon
        points={`${d1.cx},${d1.cy - d1.hh} ${d1.cx + d1.hw},${d1.cy} ${d1.cx},${d1.cy + d1.hh} ${d1.cx - d1.hw},${d1.cy}`}
        fill="white" stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontSize="10" fontWeight="600">
        <tspan x={d1.cx} y={d1.cy - 5}>Técnico</tspan>
        <tspan x={d1.cx} dy="13">disponível?</tspan>
      </text>

      {/* Nó 4 — Chamado enviado */}
      <rect x={n4.x} y={n4.y} width={n4.w} height={n4.h} rx="8"
        fill={blueFill} stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontWeight="700" fontSize="12">
        <tspan x={c3.cx} y={yD1 - 8}>4. Chamado enviado</tspan>
      </text>
      <text textAnchor="middle" fill={blueSub} fontSize="10">
        <tspan x={c3.cx} y={yD1 + 10}>Timer 10 min para aceitar</tspan>
      </text>

      {/* Nó 2C — Amplia raio */}
      <rect x={n2c.x} y={n2c.y} width={n2c.w} height={n2c.h} rx="8"
        fill={orangeFill} stroke={orangeStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={orangeText} fontWeight="700" fontSize="12">
        <tspan x={c2.cx} y={y3C - 18}>2C. Amplia raio +5 km</tspan>
      </text>
      <text textAnchor="middle" fill={orangeText} fontSize="10">
        <tspan x={c2.cx} y={y3C + 0}>Max 25 km / 4 tentativas</tspan>
        <tspan x={c2.cx} dy="14">Timer: 4h por tentativa</tspan>
      </text>

      {/* Diamond 2 — Técnico aceita? */}
      <polygon
        points={`${d2.cx},${d2.cy - d2.hh} ${d2.cx + d2.hw},${d2.cy} ${d2.cx},${d2.cy + d2.hh} ${d2.cx - d2.hw},${d2.cy}`}
        fill="white" stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontSize="10" fontWeight="600">
        <tspan x={d2.cx} y={d2.cy - 5}>Técnico</tspan>
        <tspan x={d2.cx} dy="13">aceita?</tspan>
      </text>

      {/* Nó 4B — Chamado aceito */}
      <rect x={n4b.x} y={n4b.y} width={n4b.w} height={n4b.h} rx="8"
        fill={greenFill} stroke={greenStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={greenText} fontWeight="700" fontSize="12">
        <tspan x={c3.cx} y={d2.cy + 95 - 8}>4B. Chamado aceito</tspan>
      </text>
      <text textAnchor="middle" fill={greenStroke} fontSize="10">
        <tspan x={c3.cx} y={d2.cy + 95 + 10}>Protocolo vinculado ao técnico</tspan>
      </text>

      {/* Nó 2D — Fallback operacional */}
      <rect x={n2d.x} y={n2d.y} width={n2d.w} height={n2d.h} rx="8"
        fill={redFill} stroke={redStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={redText} fontWeight="700" fontSize="12">
        <tspan x={c2.cx} y={n2d.y + 20}>2D. Fallback operacional</tspan>
      </text>
      <text textAnchor="middle" fill={redStroke} fontSize="10">
        <tspan x={c2.cx} y={n2d.y + 37}>Escala técnico fixo + alerta</tspan>
      </text>

      {/* Nó Aviso de atraso */}
      <rect x={nav.x} y={nav.y} width={nav.w} height={nav.h} rx="8"
        fill={greenFill} stroke={greenStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={greenText} fontWeight="700" fontSize="12">
        <tspan x={c1.cx} y={nav.y + 20}>Aviso de atraso</tspan>
      </text>
      <text textAnchor="middle" fill={greenStroke} fontSize="10">
        <tspan x={c1.cx} y={nav.y + 37}>Prazo revisado + opção fila</tspan>
      </text>

      {/* ════════════ SETAS ════════════ */}

      {/* 1 → 2 (horizontal) */}
      <line x1={n1.x + n1.w} y1={y1} x2={n2.x} y2={y1}
        stroke={arrowBlue} strokeWidth="1.5" markerEnd="url(#fve-ah)" />

      {/* 1 ↓ 1B */}
      <line x1={c1.cx} y1={n1.y + n1.h} x2={c1.cx} y2={n1b.y}
        stroke={arrowBlue} strokeWidth="1.5" markerEnd="url(#fve-ah)" />

      {/* 2 ↓ 2B */}
      <line x1={c2.cx} y1={n2.y + n2.h} x2={c2.cx} y2={n2b.y}
        stroke={arrowBlue} strokeWidth="1.5" markerEnd="url(#fve-ah)" />

      {/* 2B → 1B (laranja tracejada) */}
      <polyline
        points={`${n2b.x},${y2 + 14} ${c2.x - 12},${y2 + 14} ${c2.x - 12},${y2 - 2} ${n1b.x + n1b.w},${y2 - 2}`}
        fill="none" stroke={arrowOrange} strokeWidth="1.5"
        strokeDasharray="5 3" markerEnd="url(#fve-ao)" />

      {/* 2B ↓ Diamond1 */}
      <line x1={c2.cx} y1={n2b.y + n2b.h} x2={c2.cx} y2={d1.cy - d1.hh}
        stroke={arrowBlue} strokeWidth="1.5" markerEnd="url(#fve-ah)" />

      {/* 3 ↓ 4 (tracejada longa) */}
      <line x1={c3.cx} y1={n3.y + n3.h} x2={c3.cx} y2={n4.y}
        stroke={arrowGray} strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#fve-ag)" />

      {/* Diamond1 → 4 (Sim) */}
      <line x1={d1.cx + d1.hw} y1={d1.cy} x2={n4.x} y2={d1.cy}
        stroke={arrowBlue} strokeWidth="1.5" markerEnd="url(#fve-ah)" />
      <text x={(d1.cx + d1.hw + n4.x) / 2} y={d1.cy - 6}
        textAnchor="middle" fontSize="10" fill={arrowBlue} fontWeight="600">Sim</text>

      {/* Diamond1 ↓ 2C (Não) */}
      <line x1={d1.cx} y1={d1.cy + d1.hh} x2={c2.cx} y2={n2c.y}
        stroke={arrowBlue} strokeWidth="1.5" markerEnd="url(#fve-ah)" />
      <text x={d1.cx - 18} y={d1.cy + d1.hh + 18}
        textAnchor="middle" fontSize="10" fill={arrowBlue} fontWeight="600">Não</text>

      {/* 4 ↓ Diamond2 */}
      <line x1={c3.cx} y1={n4.y + n4.h} x2={d2.cx} y2={d2.cy - d2.hh}
        stroke={arrowBlue} strokeWidth="1.5" markerEnd="url(#fve-ah)" />

      {/* Diamond2 → 2B (Não, redireciona) — loop */}
      <polyline
        points={`${d2.cx - d2.hw},${d2.cy} ${c3.x + 12},${d2.cy} ${c3.x + 12},${y2} ${n2b.x + n2b.w},${y2}`}
        fill="none" stroke={arrowBlue} strokeWidth="1.5"
        strokeDasharray="5 3" markerEnd="url(#fve-ah)" />
      <text x={c3.x + 12} y={d2.cy - 8}
        textAnchor="middle" fontSize="9" fill={arrowBlue} fontWeight="600">Não</text>
      <text x={c3.x + 12} y={d2.cy - 20}
        textAnchor="middle" fontSize="9" fill={arrowBlue}>(redireciona)</text>

      {/* Diamond2 ↓ 4B (Sim) */}
      <line x1={d2.cx} y1={d2.cy + d2.hh} x2={c3.cx} y2={n4b.y}
        stroke={arrowBlue} strokeWidth="1.5" markerEnd="url(#fve-ah)" />
      <text x={d2.cx + 16} y={d2.cy + d2.hh + 18}
        textAnchor="start" fontSize="10" fill={arrowBlue} fontWeight="600">Sim</text>

      {/* 2C ↓ 2D */}
      <line x1={c2.cx} y1={n2c.y + n2c.h} x2={c2.cx} y2={n2d.y}
        stroke={arrowBlue} strokeWidth="1.5" markerEnd="url(#fve-ah)" />

      {/* 2D → Aviso (esquerda) */}
      <line x1={n2d.x} y1={n2d.y + n2d.h / 2} x2={nav.x + nav.w} y2={nav.y + nav.h / 2}
        stroke={arrowBlue} strokeWidth="1.5" markerEnd="url(#fve-ah)" />
    </svg>
  );
}
