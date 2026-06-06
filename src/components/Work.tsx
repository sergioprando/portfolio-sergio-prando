"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import ProjectModal from "@/components/ProjectModal";

// Senha de acesso aos cases — CaseDesign@2026
const CASE_PASSWORD = "CaseDesign@2026";

const projects = [
  { id: 2, thumb: "/thumb-2-vtal-express.png",          tooltip: "V.tal Técnico Express" },
  { id: 7, thumb: "/thumb-3-agente-nio.png",            tooltip: "AI Agent NIO" },
  { id: 3, thumb: "/thumb-3-bradesco-retentometro.png", tooltip: "Bradesco Retentômetro" },
  { id: 6, thumb: "/thumb-6-bradesco-consulta.png",     tooltip: "Bradesco Saúde Consulta" },
];

export interface CardRect { top: number; left: number; width: number; height: number; }

/* ── Password Modal ─────────────────────────────────────── */
function PasswordModal({
  onConfirm, onClose,
}: { onConfirm: () => void; onClose: () => void }) {
  const [value,   setValue]   = useState("");
  const [error,   setError]   = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => { setVisible(false); setTimeout(onClose, 260); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === CASE_PASSWORD) {
      setVisible(false);
      setTimeout(onConfirm, 260);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.26, ease: "easeInOut" }}
        onClick={handleClose}
      />
      <motion.div
        className="relative w-full max-w-sm bg-[#F7F8F5] rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
        transition={{ duration: 0.26, ease: "easeInOut" }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-[#1F2937] mb-2">Senha de Acesso</h2>
        <p className="text-sm text-[#1F2937]/70 mb-6 leading-relaxed">
          Para garantir a segurança e privacidade do cliente é necessário o acesso ao case mediante a apresentação de senha.
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm text-red-600">
              A senha está incorreta, se tiver dificuldade para acessar entre em contato comigo que resolvemos isto juntos.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Informe a senha"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-[#1F2937] placeholder:text-[#1F2937]/40 outline-none focus:border-[#1F2937] transition-colors"
            autoFocus
          />
          <button
            type="submit"
            className="w-full rounded-full bg-[#1F2937] text-white text-sm font-medium py-3 hover:bg-[#FFBB1E] hover:text-[#1F2937] transition-colors duration-200 cursor-pointer"
          >
            Acessar
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function Work() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const visible    = useReveal(sectionRef);

  const [selectedId,    setSelectedId]    = useState<number | null>(null);
  const [flippingId,    setFlippingId]    = useState<number | null>(null);
  const [cardRect,      setCardRect]      = useState<CardRect | null>(null);
  const [pendingId,     setPendingId]     = useState<number | null>(null);
  const [pendingRect,   setPendingRect]   = useState<CardRect | null>(null);
  const [showPassword,  setShowPassword]  = useState(false);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    if (flippingId !== null || selectedId !== null || showPassword) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPendingId(id);
    setPendingRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    setShowPassword(true);
  };

  const handlePasswordConfirm = () => {
    if (pendingId === null || pendingRect === null) return;
    setShowPassword(false);
    setCardRect(pendingRect);
    setFlippingId(pendingId);
    setPendingId(null);
    setPendingRect(null);
  };

  const handlePasswordClose = () => {
    setShowPassword(false);
    setPendingId(null);
    setPendingRect(null);
  };

  useEffect(() => {
    if (flippingId === null) return;
    const timer = setTimeout(() => {
      setSelectedId(flippingId);
      setFlippingId(null);
    }, 220);
    return () => clearTimeout(timer);
  }, [flippingId]);

  const handleClose = () => {
    setSelectedId(null);
    setCardRect(null);
  };

  return (
    <>
      {showPassword && (
        <PasswordModal
          onConfirm={handlePasswordConfirm}
          onClose={handlePasswordClose}
        />
      )}
      <section
        id="trabalho"
        ref={sectionRef}
        className={[
          "w-full bg-[#ECEEE8] pb-16",
          "transition-all duration-700 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        ].join(" ")}
      >
        {/* Header */}
        <div className="mx-auto max-w-[1440px] px-8 mb-10">
          <h2 className="text-[44px] font-normal text-[#1F2937]">
            {t.work.title}
          </h2>
        </div>

        {/* 4 Cards em grid horizontal */}
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#D0D2CD] cursor-pointer group"
                style={{ transformStyle: "preserve-3d" }}
                animate={flippingId === project.id ? { rotateY: 180 } : { rotateY: 0 }}
                transition={
                  flippingId === project.id
                    ? { duration: 0.45, ease: "easeInOut" }
                    : { duration: 0 }
                }
                onClick={(e) => handleCardClick(e, project.id)}
              >
                <img
                  src={project.thumb}
                  alt={project.tooltip}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 flex items-end justify-center pb-6
                                bg-[#1F2937]/0 group-hover:bg-[#1F2937]/40
                                transition-all duration-300 rounded-2xl">
                  <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                                   transition-all duration-300
                                   bg-[#1F2937] text-white text-sm font-medium
                                   px-4 py-2 rounded-full whitespace-nowrap">
                    {project.tooltip}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedId !== null && cardRect && (
          <ProjectModal
            key={selectedId}
            projectId={selectedId}
            cardRect={cardRect}
            thumb={projects.find(p => p.id === selectedId)!.thumb}
            tooltip={projects.find(p => p.id === selectedId)!.tooltip}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
