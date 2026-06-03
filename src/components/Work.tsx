"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import ProjectModal from "@/components/ProjectModal";

const projects = [
  { id: 2, thumb: "/thumb-2-vtal-express.png",          tooltip: "V.tal Técnico Express" },
  { id: 7, thumb: "/thumb-3-agente-nio.png",            tooltip: "AI Agent NIO" },
  { id: 3, thumb: "/thumb-3-bradesco-retentometro.png", tooltip: "Bradesco Retentômetro" },
  { id: 6, thumb: "/thumb-6-bradesco-consulta.png",     tooltip: "Bradesco Saúde Consulta" },
];

export interface CardRect { top: number; left: number; width: number; height: number; }

export default function Work() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const visible    = useReveal(sectionRef);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [flippingId, setFlippingId] = useState<number | null>(null);
  const [cardRect,   setCardRect]   = useState<CardRect | null>(null);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    if (flippingId !== null || selectedId !== null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCardRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    setFlippingId(id);
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
