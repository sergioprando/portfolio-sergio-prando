"use client";

export default function FluxoNio() {
  /* ── Paleta ── */
  const tealFill   = "#B2DFDB"; const tealStroke   = "#00897B"; const tealText   = "#004D40";
  const grayFill   = "#ECEFF1"; const grayStroke   = "#90A4AE"; const grayText   = "#37474F";
  const redFill    = "#FFCDD2"; const redStroke    = "#E53935"; const redText    = "#B71C1C";
  const greenFill  = "#C8E6C9"; const greenStroke  = "#43A047"; const greenText  = "#1B5E20";
  const purpleFill = "#EDE9FE"; const purpleStroke = "#7C3AED"; const purpleText = "#4C1D95";
  const beigeFill  = "#FFF3E0"; const beigeStroke  = "#FB8C00"; const beigeText  = "#E65100";
  const arrow      = "#607D8B";

  /* ── Dimensões ── */
  const vW = 880; const vH = 980;
  const mainCx = 435;
  const leftCx = 90;
  const rightCx = 740;

  /* ── Helper de nó ── */
  const N = (cx: number, cy: number, w: number, h: number) =>
    ({ x: cx - w / 2, y: cy - h / 2, w, h, cx, cy });

  /* ── Top row ── */
  const tGatilho = N(160, 60, 148, 48);
  const tDados   = N(400, 60, 200, 48);
  const tAgente  = N(650, 60, 160, 48);

  /* ── Main column ── */
  const nContato   = N(mainCx, 180, 230, 56);
  const nTitular   = N(mainCx, 300, 215, 54);
  const nDespedida = N(leftCx, 300, 130, 48);
  const nPergunta  = N(mainCx, 420, 240, 56);
  const nPagou     = N(mainCx, 540, 195, 54);
  const nProposta  = N(mainCx, 665, 240, 56);
  const nAceita    = N(mainCx, 785, 210, 54);
  const nAtendLeft = N(leftCx, 785, 148, 48);
  const nBoleto    = N(mainCx, 905, 215, 56);

  /* ── Right branch ── */
  const nMais48  = N(rightCx, 540, 168, 54);
  const nPago48  = N(rightCx, 645, 160, 54);
  const nEscala  = N(rightCx, 750, 168, 48);

  /* ── Arrow markers ── */
  const mk = (id: string, color: string) => (
    <marker key={id} id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <polygon points="0 0, 8 4, 0 8" fill={color} />
    </marker>
  );

  return (
    <svg
      viewBox={`0 0 ${vW} ${vH}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
    >
      <defs>
        {mk("fn-a",  arrow)}
        {mk("fn-r",  redStroke)}
        {mk("fn-g",  greenStroke)}
        {mk("fn-p",  purpleStroke)}
        {mk("fn-gr", grayStroke)}
      </defs>

      {/* ════ TOP ROW ════ */}

      {/* Gatilho CRM */}
      <rect x={tGatilho.x} y={tGatilho.y} width={tGatilho.w} height={tGatilho.h} rx="10"
        fill={beigeFill} stroke={beigeStroke} strokeWidth="1.5" />
      <text x={tGatilho.cx} y={tGatilho.cy + 5} textAnchor="middle"
        fontSize="12" fontWeight="700" fill={beigeText}>Gatilho CRM</text>

      {/* → Dados do cliente */}
      <line x1={tGatilho.x + tGatilho.w} y1={tGatilho.cy} x2={tDados.x} y2={tDados.cy}
        stroke={arrow} strokeWidth="1.5" markerEnd="url(#fn-a)" />

      {/* Dados do cliente */}
      <rect x={tDados.x} y={tDados.y} width={tDados.w} height={tDados.h} rx="10"
        fill={grayFill} stroke={grayStroke} strokeWidth="1.5" />
      <text x={tDados.cx} y={tDados.cy - 6} textAnchor="middle"
        fontSize="12" fontWeight="700" fill={grayText}>Dados do cliente</text>
      <text x={tDados.cx} y={tDados.cy + 10} textAnchor="middle"
        fontSize="10" fill={grayStroke}>Perfil e débito</text>

      {/* → Agente NIO */}
      <line x1={tDados.x + tDados.w} y1={tDados.cy} x2={tAgente.x} y2={tAgente.cy}
        stroke={arrow} strokeWidth="1.5" markerEnd="url(#fn-p)" />

      {/* Agente NIO */}
      <rect x={tAgente.x} y={tAgente.y} width={tAgente.w} height={tAgente.h} rx="10"
        fill={purpleFill} stroke={purpleStroke} strokeWidth="2" />
      <text x={tAgente.cx} y={tAgente.cy + 5} textAnchor="middle"
        fontSize="12" fontWeight="700" fill={purpleText}>Agente NIO</text>

      {/* Agente NIO ↓ (L down → left) → Contato inicial */}
      <polyline
        points={`${tAgente.cx},${tAgente.y + tAgente.h} ${tAgente.cx},${nContato.cy} ${nContato.x + nContato.w},${nContato.cy}`}
        fill="none" stroke={arrow} strokeWidth="1.5" markerEnd="url(#fn-a)" />

      {/* ════ MAIN COLUMN ════ */}

      {/* Contato inicial */}
      <rect x={nContato.x} y={nContato.y} width={nContato.w} height={nContato.h} rx="10"
        fill={tealFill} stroke={tealStroke} strokeWidth="1.5" />
      <text x={mainCx} y={nContato.cy - 7} textAnchor="middle"
        fontSize="12" fontWeight="700" fill={tealText}>Contato inicial</text>
      <text x={mainCx} y={nContato.cy + 10} textAnchor="middle"
        fontSize="10" fill={tealStroke}>Mensagem ativa ao cliente</text>

      {/* ↓ Confirmou titular? */}
      <line x1={mainCx} y1={nContato.y + nContato.h} x2={mainCx} y2={nTitular.y}
        stroke={arrow} strokeWidth="1.5" markerEnd="url(#fn-a)" />

      {/* Confirmou titular? */}
      <rect x={nTitular.x} y={nTitular.y} width={nTitular.w} height={nTitular.h} rx="10"
        fill={grayFill} stroke={grayStroke} strokeWidth="1.5" />
      <text x={mainCx} y={nTitular.cy + 5} textAnchor="middle"
        fontSize="12" fontWeight="600" fill={grayText}>Confirmou titular?</text>

      {/* → Não → Despedida */}
      <line x1={nTitular.x} y1={nTitular.cy} x2={nDespedida.x + nDespedida.w} y2={nDespedida.cy}
        stroke={redStroke} strokeWidth="1.5" markerEnd="url(#fn-r)" />
      <text x={(nTitular.x + nDespedida.x + nDespedida.w) / 2} y={nTitular.cy - 6}
        textAnchor="middle" fontSize="10" fontWeight="600" fill={redStroke}>Não</text>

      {/* Despedida */}
      <rect x={nDespedida.x} y={nDespedida.y} width={nDespedida.w} height={nDespedida.h} rx="10"
        fill={redFill} stroke={redStroke} strokeWidth="1.5" />
      <text x={leftCx} y={nDespedida.cy + 5} textAnchor="middle"
        fontSize="12" fontWeight="700" fill={redText}>Despedida</text>

      {/* Sim ↓ Pergunta sobre débito */}
      <line x1={mainCx} y1={nTitular.y + nTitular.h} x2={mainCx} y2={nPergunta.y}
        stroke={arrow} strokeWidth="1.5" markerEnd="url(#fn-a)" />
      <text x={mainCx + 10} y={(nTitular.y + nTitular.h + nPergunta.y) / 2 + 4}
        fontSize="10" fontWeight="600" fill={arrow}>Sim</text>

      {/* Pergunta sobre débito */}
      <rect x={nPergunta.x} y={nPergunta.y} width={nPergunta.w} height={nPergunta.h} rx="10"
        fill={tealFill} stroke={tealStroke} strokeWidth="1.5" />
      <text x={mainCx} y={nPergunta.cy - 7} textAnchor="middle"
        fontSize="12" fontWeight="700" fill={tealText}>Pergunta sobre débito</text>
      <text x={mainCx} y={nPergunta.cy + 10} textAnchor="middle"
        fontSize="10" fill={tealStroke}>Valor e situação da dívida</text>

      {/* ↓ Já pagou? */}
      <line x1={mainCx} y1={nPergunta.y + nPergunta.h} x2={mainCx} y2={nPagou.y}
        stroke={arrow} strokeWidth="1.5" markerEnd="url(#fn-a)" />

      {/* Já pagou? */}
      <rect x={nPagou.x} y={nPagou.y} width={nPagou.w} height={nPagou.h} rx="10"
        fill={grayFill} stroke={grayStroke} strokeWidth="1.5" />
      <text x={mainCx} y={nPagou.cy + 5} textAnchor="middle"
        fontSize="12" fontWeight="600" fill={grayText}>Já pagou?</text>

      {/* → Sim → Há mais de 48h? */}
      <line x1={nPagou.x + nPagou.w} y1={nPagou.cy} x2={nMais48.x} y2={nMais48.cy}
        stroke={arrow} strokeWidth="1.5" markerEnd="url(#fn-a)" />
      <text x={(nPagou.x + nPagou.w + nMais48.x) / 2} y={nPagou.cy - 6}
        textAnchor="middle" fontSize="10" fontWeight="600" fill={arrow}>Sim</text>

      {/* Não ↓ Proposta de pagamento */}
      <line x1={mainCx} y1={nPagou.y + nPagou.h} x2={mainCx} y2={nProposta.y}
        stroke={arrow} strokeWidth="1.5" markerEnd="url(#fn-a)" />
      <text x={mainCx + 10} y={(nPagou.y + nPagou.h + nProposta.y) / 2 + 4}
        fontSize="10" fontWeight="600" fill={arrow}>Não</text>

      {/* ════ RIGHT BRANCH ════ */}

      {/* Há mais de 48h? */}
      <rect x={nMais48.x} y={nMais48.y} width={nMais48.w} height={nMais48.h} rx="10"
        fill={grayFill} stroke={grayStroke} strokeWidth="1.5" />
      <text x={rightCx} y={nMais48.cy - 6} textAnchor="middle"
        fontSize="11" fontWeight="600" fill={grayText}>Há mais</text>
      <text x={rightCx} y={nMais48.cy + 10} textAnchor="middle"
        fontSize="11" fontWeight="600" fill={grayText}>de 48h?</text>

      {/* Não ↓ Pago <48h */}
      <line x1={rightCx} y1={nMais48.y + nMais48.h} x2={rightCx} y2={nPago48.y}
        stroke={arrow} strokeWidth="1.5" markerEnd="url(#fn-a)" />
      <text x={rightCx + 10} y={(nMais48.y + nMais48.h + nPago48.y) / 2 + 4}
        fontSize="10" fontWeight="600" fill={arrow}>Não</text>

      {/* Pago <48h */}
      <rect x={nPago48.x} y={nPago48.y} width={nPago48.w} height={nPago48.h} rx="10"
        fill={greenFill} stroke={greenStroke} strokeWidth="1.5" />
      <text x={rightCx} y={nPago48.cy - 6} textAnchor="middle"
        fontSize="11" fontWeight="700" fill={greenText}>Pago &lt;48h</text>
      <text x={rightCx} y={nPago48.cy + 10} textAnchor="middle"
        fontSize="10" fill={greenStroke}>Aguardar baixa</text>

      {/* Pago48 ↓ (dashed) → Atend. humano (Escalada) */}
      <line x1={rightCx} y1={nPago48.y + nPago48.h} x2={rightCx} y2={nEscala.y}
        stroke={grayStroke} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#fn-r)" />
      <text x={rightCx + 10} y={(nPago48.y + nPago48.h + nEscala.y) / 2 + 4}
        fontSize="10" fontWeight="600" fill={redStroke}>Sim</text>

      {/* Há mais de 48h? → Sim → Atend. humano (Escalada) direct */}
      <polyline
        points={`${nMais48.x + nMais48.w},${nMais48.cy} ${nMais48.x + nMais48.w + 24},${nMais48.cy} ${nMais48.x + nMais48.w + 24},${nEscala.cy} ${nEscala.x + nEscala.w},${nEscala.cy}`}
        fill="none" stroke={redStroke} strokeWidth="1.5" markerEnd="url(#fn-r)" />
      <text x={nMais48.x + nMais48.w + 30} y={nMais48.cy - 6}
        fontSize="10" fontWeight="600" fill={redStroke}>Sim</text>

      {/* Atend. humano (Escalada) */}
      <rect x={nEscala.x} y={nEscala.y} width={nEscala.w} height={nEscala.h} rx="10"
        fill={redFill} stroke={redStroke} strokeWidth="1.5" />
      <text x={rightCx} y={nEscala.cy - 6} textAnchor="middle"
        fontSize="11" fontWeight="700" fill={redText}>Atend. humano</text>
      <text x={rightCx} y={nEscala.cy + 9} textAnchor="middle"
        fontSize="10" fill={redStroke}>Escalada</text>

      {/* ════ CONTINUA MAIN ════ */}

      {/* Proposta de pagamento */}
      <rect x={nProposta.x} y={nProposta.y} width={nProposta.w} height={nProposta.h} rx="10"
        fill={tealFill} stroke={tealStroke} strokeWidth="1.5" />
      <text x={mainCx} y={nProposta.cy - 7} textAnchor="middle"
        fontSize="12" fontWeight="700" fill={tealText}>Proposta de pagamento</text>
      <text x={mainCx} y={nProposta.cy + 10} textAnchor="middle"
        fontSize="10" fill={tealStroke}>Condições e prazo</text>

      {/* ↓ Aceita o prazo? */}
      <line x1={mainCx} y1={nProposta.y + nProposta.h} x2={mainCx} y2={nAceita.y}
        stroke={arrow} strokeWidth="1.5" markerEnd="url(#fn-a)" />

      {/* Aceita o prazo? */}
      <rect x={nAceita.x} y={nAceita.y} width={nAceita.w} height={nAceita.h} rx="10"
        fill={grayFill} stroke={grayStroke} strokeWidth="1.5" />
      <text x={mainCx} y={nAceita.cy + 5} textAnchor="middle"
        fontSize="12" fontWeight="600" fill={grayText}>Aceita o prazo?</text>

      {/* → Não → Atend. humano */}
      <line x1={nAceita.x} y1={nAceita.cy} x2={nAtendLeft.x + nAtendLeft.w} y2={nAtendLeft.cy}
        stroke={redStroke} strokeWidth="1.5" markerEnd="url(#fn-r)" />
      <text x={(nAceita.x + nAtendLeft.x + nAtendLeft.w) / 2} y={nAceita.cy - 6}
        textAnchor="middle" fontSize="10" fontWeight="600" fill={redStroke}>Não</text>

      {/* Atend. humano (left) */}
      <rect x={nAtendLeft.x} y={nAtendLeft.y} width={nAtendLeft.w} height={nAtendLeft.h} rx="10"
        fill={redFill} stroke={redStroke} strokeWidth="1.5" />
      <text x={leftCx} y={nAtendLeft.cy - 5} textAnchor="middle"
        fontSize="11" fontWeight="700" fill={redText}>Atend.</text>
      <text x={leftCx} y={nAtendLeft.cy + 9} textAnchor="middle"
        fontSize="11" fontWeight="700" fill={redText}>humano</text>

      {/* Sim ↓ Enviar boleto */}
      <line x1={mainCx} y1={nAceita.y + nAceita.h} x2={mainCx} y2={nBoleto.y}
        stroke={greenStroke} strokeWidth="1.5" markerEnd="url(#fn-g)" />
      <text x={mainCx + 10} y={(nAceita.y + nAceita.h + nBoleto.y) / 2 + 4}
        fontSize="10" fontWeight="600" fill={greenStroke}>Sim</text>

      {/* Enviar boleto */}
      <rect x={nBoleto.x} y={nBoleto.y} width={nBoleto.w} height={nBoleto.h} rx="10"
        fill={greenFill} stroke={greenStroke} strokeWidth="2" />
      <text x={mainCx} y={nBoleto.cy - 7} textAnchor="middle"
        fontSize="12" fontWeight="700" fill={greenText}>Enviar boleto</text>
      <text x={mainCx} y={nBoleto.cy + 10} textAnchor="middle"
        fontSize="10" fill={greenStroke}>Resolução autônoma</text>

      {/* ════ LEGENDA ════ */}
      {(() => {
        const lx = 20; const ly = vH - 72; const sq = 14; const gap = 22;
        const items = [
          { color: tealFill,   stroke: tealStroke,   label: "Interação com cliente" },
          { color: greenFill,  stroke: greenStroke,  label: "Resolução positiva" },
          { color: grayFill,   stroke: grayStroke,   label: "Decisão" },
          { color: redFill,    stroke: redStroke,    label: "Escalada / encerramento" },
        ];
        return (
          <g>
            <rect x={lx - 6} y={ly - 10} width={310} height={62} rx="6"
              fill="white" stroke={grayStroke} strokeWidth="0.8" opacity="0.85" />
            <text x={lx} y={ly + 5} fontSize="10" fontWeight="700" fill={grayText}>Legenda</text>
            {items.map((it, i) => (
              <g key={i}>
                <rect x={lx} y={ly + 14 + Math.floor(i / 2) * gap}
                  width={sq} height={sq} rx="3" fill={it.color} stroke={it.stroke} strokeWidth="1" />
                <text x={lx + sq + 5} y={ly + 14 + Math.floor(i / 2) * gap + 10}
                  fontSize="9" fill={grayText}>
                  {i % 2 === 0 ? it.label : ""}
                </text>
                {i % 2 === 1 && (
                  <>
                    <rect x={lx + 155} y={ly + 14 + Math.floor(i / 2) * gap}
                      width={sq} height={sq} rx="3" fill={it.color} stroke={it.stroke} strokeWidth="1" />
                    <text x={lx + 155 + sq + 5} y={ly + 14 + Math.floor(i / 2) * gap + 10}
                      fontSize="9" fill={grayText}>{it.label}</text>
                  </>
                )}
              </g>
            ))}
          </g>
        );
      })()}
    </svg>
  );
}
