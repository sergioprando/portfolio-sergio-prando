"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";
import ProjectModal from "@/components/ProjectModal";

const projects = [
  { id: 1, thumb: "/thumb-1-vtal-conecta.png",          tooltip: "V.tal Conecta" },
  { id: 2, thumb: "/thumb-2-vtal-express.png",           tooltip: "Vtal Express" },
  { id: 7, thumb: "/thumb-3-agente-nio.png",             tooltip: "AI Agent NIO" },
  { id: 3, thumb: "/thumb-3-bradesco-retentometro.png",  tooltip: "Bradesco Seguros Retentômetro" },
  { id: 4, thumb: "/thumb-4-bb-seguros.png",             tooltip: "BB Seguros Automação" },
  { id: 5, thumb: "/thumb-5-alianca.png",                tooltip: "Aliança Intercab" },
  { id: 6, thumb: "/thumb-6-bradesco-consulta.png",      tooltip: "Bradesco Seguros - Consulta" },
];

export interface CardRect { top: number; left: number; width: number; height: number; }

const TRACK_OFFSET = 'max(2rem, calc((100vw - 1440px) / 2 + 2rem))';

export default function Work() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const visible    = useReveal(sectionRef);

  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedId,     setSelectedId]     = useState<number | null>(null);
  const [flippingId,     setFlippingId]     = useState<number | null>(null);
  const [cardRect,       setCardRect]       = useState<CardRect | null>(null);

  const isDragging      = useRef(false);
  const dragStartX      = useRef(0);
  const dragScrollLeft  = useRef(0);
  const hasDragged      = useRef(false);
  const rafId           = useRef(0);

  const syncScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncScrollState();
    el.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);
    return () => {
      el.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [syncScrollState]);

  const scrollBy = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({ left: dir === "right" ? 368 : -368, behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current     = true;
    hasDragged.current     = false;
    dragStartX.current     = e.clientX;
    dragScrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.scrollSnapType = 'none';
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const delta = dragStartX.current - e.clientX;
    if (Math.abs(delta) > 4) hasDragged.current = true;
    const target = dragScrollLeft.current + delta;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (trackRef.current) trackRef.current.scrollLeft = target;
    });
  };

  const stopDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = trackRef.current;
    if (el) setTimeout(() => { el.style.scrollSnapType = ''; }, 80);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    if (hasDragged.current) return;
    if (flippingId !== null || selectedId !== null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCardRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    setFlippingId(id);
  };

  // Start opening modal mid-flip (~halfway through 450ms animation)
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

        {/* Carousel */}
        <div className="relative">
          {canScrollLeft && (
            <div aria-hidden="true" className="absolute left-0 top-0 bottom-2 w-32 pointer-events-none z-[5]"
              style={{ background: "linear-gradient(to right, #ECEEE8 0%, transparent 100%)" }} />
          )}
          {canScrollRight && (
            <div aria-hidden="true" className="absolute right-0 top-0 bottom-2 w-32 pointer-events-none z-[5]"
              style={{ background: "linear-gradient(to left, #ECEEE8 0%, transparent 100%)" }} />
          )}

          {canScrollLeft && (
            <button
              onClick={() => scrollBy("left")}
              aria-label="Anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                         w-12 h-12 rounded-full border border-[#1F2937]/30
                         flex items-center justify-center text-[#1F2937]
                         bg-[#ECEEE8]/80 backdrop-blur-sm
                         hover:bg-[#FFBB1E] hover:border-[#FFBB1E]
                         transition-all duration-200 hidden md:flex cursor-pointer"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-proximity pb-2
                       [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                       cursor-grab active:cursor-grabbing select-none"
            style={{
              paddingLeft: TRACK_OFFSET,
              paddingRight: '2rem',
              scrollPaddingLeft: TRACK_OFFSET,
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 snap-start w-[44vw] md:w-[307px]"
              >
                <motion.div
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
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scrollBy("right")}
              aria-label="Próximo"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                         w-12 h-12 rounded-full border border-[#1F2937]/30
                         flex items-center justify-center text-[#1F2937]
                         bg-[#ECEEE8]/80 backdrop-blur-sm
                         hover:bg-[#FFBB1E] hover:border-[#FFBB1E]
                         transition-all duration-200 hidden md:flex cursor-pointer"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
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
