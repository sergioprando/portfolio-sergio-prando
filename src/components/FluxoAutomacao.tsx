"use client";

export default function FluxoAutomacao() {
  // ── Paleta de cores ───────────────────────────────────────────
  const tealFill   = "#D9F0EA";
  const tealStroke = "#4CAF9D";
  const tealText   = "#1B5E50";
  const tealSub    = "#2E8B70";

  const greenFill   = "#C8E6C9";
  const greenStroke = "#388E3C";
  const greenText   = "#1B4332";

  const grayFill   = "#EDEDE8";
  const grayStroke = "#BDBDBD";
  const grayText   = "#5A5A5A";

  const blueFill   = "#DDEEFF";
  const blueStroke = "#5B9BD5";
  const blueText   = "#1A3A5C";

  const sectionStroke  = "#9ED4C6";
  const sectionFill    = "#F4FBF8";
  const section2Fill   = "#EFF6FC";
  const section2Stroke = "#90BEE0";

  const arrowSolid = "#555555";
  const arrowDash  = "#888888";

  return (
    <svg
      viewBox="0 0 880 530"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
    >
      <defs>
        {/* Seta sólida direita */}
        <marker id="ah" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={arrowSolid} />
        </marker>
        {/* Seta tracejada para baixo */}
        <marker id="ahd" markerWidth="7" markerHeight="7" refX="3.5" refY="6" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={arrowDash} />
        </marker>
        {/* Seta tracejada esquerda (polyline auto) */}
        <marker id="ahl" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0, 7 3.5, 0 7" fill={arrowDash} />
        </marker>
      </defs>

      {/* ══════════════════════════════════════════════════════
          SEÇÃO 1 — Processo de Retenção
      ══════════════════════════════════════════════════════ */}
      <rect x="5" y="5" width="868" height="375" rx="8"
        fill={sectionFill} stroke={sectionStroke} strokeWidth="1.5" strokeDasharray="6 3" />
      <text x="20" y="26" fontSize="12" fontWeight="700" fill={tealText}>Processo de Retenção</text>

      {/* ── Canal: outros canais ── */}
      <text x="20" y="52" fontSize="11" fill="#777" fontStyle="italic">Canal: outros canais</text>

      {/* A — Pedido outros canais */}
      <rect x="20" y="60" width="128" height="52" rx="6"
        fill={tealFill} stroke={tealStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={tealText} fontWeight="600" fontSize="11">
        <tspan x="84" y="81">Pedido outros</tspan>
        <tspan x="84" dy="15">canais</tspan>
      </text>

      {/* B — Cadastro de cliente */}
      <rect x="195" y="60" width="150" height="52" rx="6"
        fill={tealFill} stroke={tealStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={tealText} fontWeight="600" fontSize="11">
        <tspan x="270" y="79">Cadastro de cliente</tspan>
      </text>
      <text textAnchor="middle" fill={tealSub} fontSize="10">
        <tspan x="270" y="95">Salesforce → dossiê</tspan>
      </text>

      {/* C — Envio de notificação (outros canais) */}
      <rect x="394" y="60" width="168" height="52" rx="6"
        fill={tealFill} stroke={tealStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={tealText} fontWeight="600" fontSize="11">
        <tspan x="478" y="79">Envio de notificação</tspan>
      </text>
      <text textAnchor="middle" fill={tealSub} fontSize="10">
        <tspan x="478" y="95">Novos registros → retenção</tspan>
      </text>

      {/* ── Canal: telefone / central ── */}
      <text x="20" y="158" fontSize="11" fill="#777" fontStyle="italic">Canal: telefone / central</text>

      {/* D — Pedido de negociação */}
      <rect x="20" y="166" width="128" height="52" rx="6"
        fill={tealFill} stroke={tealStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={tealText} fontWeight="600" fontSize="11">
        <tspan x="84" y="187">Pedido de</tspan>
        <tspan x="84" dy="15">negociação</tspan>
      </text>

      {/* E — Registro on-time */}
      <rect x="195" y="166" width="150" height="52" rx="6"
        fill={tealFill} stroke={tealStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={tealText} fontWeight="600" fontSize="11">
        <tspan x="270" y="185">Registro on-time</tspan>
      </text>
      <text textAnchor="middle" fill={tealSub} fontSize="10">
        <tspan x="270" y="201">D=0 · Central → Salesforce</tspan>
      </text>

      {/* F — Envio de notificação (telefone) */}
      <rect x="394" y="166" width="168" height="52" rx="6"
        fill={tealFill} stroke={tealStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={tealText} fontWeight="600" fontSize="11">
        <tspan x="478" y="185">Envio de notificação</tspan>
      </text>
      <text textAnchor="middle" fill={tealSub} fontSize="10">
        <tspan x="478" y="201">Novos registros →</tspan>
      </text>

      {/* G — Triagem  (centro y≈140) */}
      <rect x="608" y="114" width="120" height="52" rx="6"
        fill={greenFill} stroke={greenStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={greenText} fontWeight="700" fontSize="12">
        <tspan x="668" y="135">Triagem</tspan>
      </text>
      <text textAnchor="middle" fill={greenText} fontSize="10">
        <tspan x="668" y="152">Painel Salesforce</tspan>
      </text>

      {/* H — Negociação */}
      <rect x="746" y="114" width="116" height="52" rx="6"
        fill={greenFill} stroke={greenStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={greenText} fontWeight="700" fontSize="12">
        <tspan x="804" y="135">Negociação</tspan>
      </text>
      <text textAnchor="middle" fill={greenText} fontSize="10">
        <tspan x="804" y="152">Visão 360º · SF</tspan>
      </text>

      {/* I — Registro negociação (cinza tracejado) */}
      <rect x="545" y="234" width="218" height="52" rx="6"
        fill={grayFill} stroke={grayStroke} strokeWidth="1.2" strokeDasharray="4 2" />
      <text textAnchor="middle" fill={grayText} fontSize="11">
        <tspan x="654" y="254">Registro negociação no sistema</tspan>
        <tspan x="654" dy="15">histórico + acordos</tspan>
      </text>

      {/* J — Flow Salesforce (cinza tracejado) */}
      <rect x="545" y="304" width="218" height="52" rx="6"
        fill={grayFill} stroke={grayStroke} strokeWidth="1.2" strokeDasharray="4 2" />
      <text textAnchor="middle" fill={grayText} fontSize="11">
        <tspan x="654" y="324">Flow Salesforce aciona</tspan>
        <tspan x="654" dy="15">time de Gestão de Apólice</tspan>
      </text>

      {/* ══════════════════════════════════════════════════════
          SETAS — Linha 1 (outros canais)
      ══════════════════════════════════════════════════════ */}
      {/* A → B */}
      <line x1="148" y1="86" x2="193" y2="86"
        stroke={arrowSolid} strokeWidth="1.5" markerEnd="url(#ah)" />
      {/* B → C */}
      <line x1="345" y1="86" x2="392" y2="86"
        stroke={arrowSolid} strokeWidth="1.5" markerEnd="url(#ah)" />

      {/* ══════════════════════════════════════════════════════
          SETAS — Linha 2 (telefone)
      ══════════════════════════════════════════════════════ */}
      {/* D → E */}
      <line x1="148" y1="192" x2="193" y2="192"
        stroke={arrowSolid} strokeWidth="1.5" markerEnd="url(#ah)" />
      {/* E → F */}
      <line x1="345" y1="192" x2="392" y2="192"
        stroke={arrowSolid} strokeWidth="1.5" markerEnd="url(#ah)" />

      {/* ══════════════════════════════════════════════════════
          CONVERGÊNCIA C + F → G
          Vertical junction em x=582
      ══════════════════════════════════════════════════════ */}
      {/* C right → junction */}
      <line x1="562" y1="86" x2="582" y2="86"
        stroke={arrowSolid} strokeWidth="1.5" />
      {/* F right → junction */}
      <line x1="562" y1="192" x2="582" y2="192"
        stroke={arrowSolid} strokeWidth="1.5" />
      {/* Vertical connector */}
      <line x1="582" y1="86" x2="582" y2="192"
        stroke={arrowSolid} strokeWidth="1.5" />
      {/* Junction → G (centro y=140) */}
      <line x1="582" y1="140" x2="606" y2="140"
        stroke={arrowSolid} strokeWidth="1.5" markerEnd="url(#ah)" />

      {/* G → H */}
      <line x1="728" y1="140" x2="744" y2="140"
        stroke={arrowSolid} strokeWidth="1.5" markerEnd="url(#ah)" />

      {/* ══════════════════════════════════════════════════════
          H → I  (tracejado, desce e vai à esquerda)
      ══════════════════════════════════════════════════════ */}
      <polyline
        points="804,166 804,260 765,260"
        fill="none" stroke={arrowDash} strokeWidth="1.5"
        strokeDasharray="5 3" markerEnd="url(#ahl)" />

      {/* I → J */}
      <line x1="654" y1="286" x2="654" y2="302"
        stroke={arrowDash} strokeWidth="1.5"
        strokeDasharray="5 3" markerEnd="url(#ahl)" />

      {/* ══════════════════════════════════════════════════════
          J → Seção 2  (tracejado, label lateral)
      ══════════════════════════════════════════════════════ */}
      <polyline
        points="654,356 654,392 190,392 190,423"
        fill="none" stroke={arrowDash} strokeWidth="1.5"
        strokeDasharray="5 3" markerEnd="url(#ahl)" />
      <text x="430" y="387" fontSize="10" fill={arrowDash} textAnchor="middle">
        Flow SF → Gest. Apólice
      </text>

      {/* ══════════════════════════════════════════════════════
          SEÇÃO 2 — Processo Análise de Gestão de Apólice
      ══════════════════════════════════════════════════════ */}
      <rect x="5" y="397" width="868" height="128" rx="8"
        fill={section2Fill} stroke={section2Stroke} strokeWidth="1.5" strokeDasharray="6 3" />
      <text x="20" y="415" fontSize="12" fontWeight="700" fill={blueText}>
        Processo Análise de Gestão de Apólice
      </text>

      {/* K — Recebimento de notificação */}
      <rect x="20" y="427" width="148" height="52" rx="6"
        fill={blueFill} stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontWeight="600" fontSize="11">
        <tspan x="94" y="447">Recebimento de</tspan>
        <tspan x="94" dy="15">notificação</tspan>
      </text>

      {/* K → L */}
      <line x1="168" y1="453" x2="210" y2="453"
        stroke={arrowSolid} strokeWidth="1.5" markerEnd="url(#ah)" />

      {/* L — Cadastros nos sistemas */}
      <rect x="210" y="427" width="148" height="52" rx="6"
        fill={blueFill} stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontWeight="600" fontSize="11">
        <tspan x="284" y="447">Cadastros nos</tspan>
        <tspan x="284" dy="15">sistemas</tspan>
      </text>

      {/* L → M */}
      <line x1="358" y1="453" x2="400" y2="453"
        stroke={arrowSolid} strokeWidth="1.5" markerEnd="url(#ah)" />

      {/* M — Notificação interna */}
      <rect x="400" y="427" width="148" height="52" rx="6"
        fill={blueFill} stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontWeight="600" fontSize="11">
        <tspan x="474" y="447">Envio de</tspan>
        <tspan x="474" dy="15">notificação</tspan>
      </text>

      {/* M → N */}
      <line x1="548" y1="453" x2="590" y2="453"
        stroke={arrowSolid} strokeWidth="1.5" markerEnd="url(#ah)" />

      {/* N — Armazenamento */}
      <rect x="590" y="427" width="148" height="52" rx="6"
        fill={blueFill} stroke={blueStroke} strokeWidth="1.5" />
      <text textAnchor="middle" fill={blueText} fontWeight="600" fontSize="11">
        <tspan x="664" y="447">Armazenamento</tspan>
        <tspan x="664" dy="15">Salesforce</tspan>
      </text>
    </svg>
  );
}
