"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── helpers ── */
function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function isWeekday(d: Date) {
  const day = d.getDay();
  return day !== 0 && day !== 6;
}

const PT_MONTHS = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];
const PT_DAYS = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

type Step = "date" | "time" | "form" | "done";

export default function BookingPanel() {
  const [open,     setOpen]     = useState(false);
  const [step,     setStep]     = useState<Step>("date");
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calMonth,     setCalMonth]     = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });

  const [slots,        setSlots]        = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("");
  const [meetLink, setMeetLink] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleDateSelect = async (date: string) => {
    setSelectedDate(date);
    setLoading(true);
    setApiError(null);
    try {
      const res  = await fetch(`/api/availability?date=${date}`);
      const data = await res.json();
      setSlots(data.slots ?? []);
      setStep("time");
    } catch {
      setApiError("Erro ao buscar horários disponíveis.");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setLoading(true);
    setApiError(null);
    try {
      const res  = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDate, time: selectedTime, name, email, subject }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro desconhecido");
      setMeetLink(data.meetLink ?? null);
      setStep("done");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Erro ao agendar.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("date");
      setSelectedDate(null);
      setSelectedTime(null);
      setSlots([]);
      setName(""); setEmail(""); setSubject("");
      setMeetLink(null);
      setApiError(null);
    }, 400);
  };

  const today  = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDay = addDays(today, 30);

  const firstDayOfMonth = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1);
  const startPad        = firstDayOfMonth.getDay();
  const daysInMonth     = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 0).getDate();

  const calCells: (Date | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      new Date(calMonth.getFullYear(), calMonth.getMonth(), i + 1)
    ),
  ];

  const canPrevMonth = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1) > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNextMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1) <= new Date(maxDay.getFullYear(), maxDay.getMonth(), 1);

  return (
    <>
      {/* Tab fixo */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[60]
                   bg-[#1F2937] text-white text-sm font-medium
                   px-6 py-2.5 rounded-t-2xl
                   flex items-center gap-2
                   hover:bg-[#FFBB1E] hover:text-[#1F2937]
                   transition-colors duration-200 cursor-pointer shadow-lg"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        Agendar reunião
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-[61] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
            />

            {/* Panel — centralizado, max-w 760px, light mode */}
            <motion.div
              className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[62] w-full
                         bg-[#ECEEE8] text-[#1F2937]
                         rounded-t-3xl shadow-2xl
                         max-h-[85vh] overflow-y-auto
                         [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ maxWidth: 760 }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#1F2937]/10">
                <div>
                  <h2 className="text-lg font-bold text-[#1F2937]">Agendar uma reunião</h2>
                  <p className="text-sm text-[#1F2937]/50 mt-0.5">30 min · Google Meet · Grátis</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             hover:bg-[#1F2937]/10 transition-colors cursor-pointer"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Steps */}
              {step !== "done" && (
                <div className="flex items-center gap-2 px-6 py-4">
                  {(["date","time","form"] as Step[]).map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center
                        ${step === s
                          ? "bg-[#FFBB1E] text-[#1F2937]"
                          : (["date","time","form"].indexOf(step) > i)
                            ? "bg-[#1F2937]/20 text-[#1F2937]"
                            : "bg-[#1F2937]/10 text-[#1F2937]/30"}`}>
                        {i + 1}
                      </div>
                      {i < 2 && <div className="w-8 h-px bg-[#1F2937]/15" />}
                    </div>
                  ))}
                  <span className="ml-2 text-xs text-[#1F2937]/40">
                    {step === "date" ? "Escolha a data" : step === "time" ? "Escolha o horário" : "Seus dados"}
                  </span>
                </div>
              )}

              {/* Error banner */}
              {apiError && (
                <div className="mx-6 mb-4 rounded-xl bg-red-100 border border-red-300 px-4 py-3">
                  <p className="text-sm text-red-700">{apiError}</p>
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-2 border-[#FFBB1E] border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* STEP 1: DATE */}
              {!loading && step === "date" && (
                <div className="px-6 pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                      disabled={!canPrevMonth}
                      className="w-8 h-8 rounded-full flex items-center justify-center
                                 hover:bg-[#1F2937]/10 disabled:opacity-30 transition-colors cursor-pointer"
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    <span className="text-sm font-semibold text-[#1F2937]">
                      {PT_MONTHS[calMonth.getMonth()]} {calMonth.getFullYear()}
                    </span>
                    <button
                      onClick={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                      disabled={!canNextMonth}
                      className="w-8 h-8 rounded-full flex items-center justify-center
                                 hover:bg-[#1F2937]/10 disabled:opacity-30 transition-colors cursor-pointer"
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-7 mb-2">
                    {PT_DAYS.map(d => (
                      <div key={d} className="text-center text-xs text-[#1F2937]/40 py-1">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calCells.map((day, i) => {
                      if (!day) return <div key={i} />;
                      const str        = formatDate(day);
                      const disabled   = day < today || day > maxDay || !isWeekday(day);
                      const isSelected = selectedDate === str;
                      const isToday    = str === formatDate(today);
                      return (
                        <button
                          key={str}
                          disabled={disabled}
                          onClick={() => handleDateSelect(str)}
                          className={[
                            "aspect-square rounded-xl text-sm font-medium transition-all",
                            disabled
                              ? "text-[#1F2937]/20 cursor-not-allowed"
                              : isSelected
                                ? "bg-[#FFBB1E] text-[#1F2937] cursor-pointer"
                                : "hover:bg-[#1F2937]/10 text-[#1F2937] cursor-pointer",
                            isToday && !isSelected ? "ring-1 ring-[#FFBB1E]" : "",
                          ].join(" ")}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: TIME */}
              {!loading && step === "time" && (
                <div className="px-6 pb-8">
                  <button
                    onClick={() => setStep("date")}
                    className="flex items-center gap-1.5 text-sm text-[#1F2937]/50 hover:text-[#1F2937] mb-4 transition-colors cursor-pointer"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                    {selectedDate && new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
                  </button>

                  {slots.length === 0 ? (
                    <div className="text-center py-8 text-[#1F2937]/40">
                      <p className="text-lg mb-2">Sem horários disponíveis</p>
                      <p className="text-sm">Escolha outra data.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => { setSelectedTime(slot); setStep("form"); }}
                          className="py-2.5 rounded-xl text-sm font-medium text-[#1F2937]
                                     border border-[#1F2937]/20
                                     hover:border-[#FFBB1E] hover:bg-[#FFBB1E]/15 hover:text-[#1F2937]
                                     transition-all cursor-pointer"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: FORM */}
              {!loading && step === "form" && (
                <form onSubmit={handleBook} className="px-6 pb-8 flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("time")}
                    className="flex items-center gap-1.5 text-sm text-[#1F2937]/50 hover:text-[#1F2937] transition-colors cursor-pointer"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                    {selectedDate && new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
                    {" · "}{selectedTime}
                  </button>

                  <input
                    type="text" required placeholder="Nome completo"
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full rounded-xl bg-white border border-[#1F2937]/15 px-4 py-3
                               text-sm text-[#1F2937] placeholder:text-[#1F2937]/30
                               outline-none focus:border-[#FFBB1E] transition-colors"
                  />
                  <input
                    type="email" required placeholder="E-mail"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-white border border-[#1F2937]/15 px-4 py-3
                               text-sm text-[#1F2937] placeholder:text-[#1F2937]/30
                               outline-none focus:border-[#FFBB1E] transition-colors"
                  />
                  <input
                    type="text" placeholder="Assunto da reunião (opcional)"
                    value={subject} onChange={e => setSubject(e.target.value)}
                    className="w-full rounded-xl bg-white border border-[#1F2937]/15 px-4 py-3
                               text-sm text-[#1F2937] placeholder:text-[#1F2937]/30
                               outline-none focus:border-[#FFBB1E] transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#FFBB1E] text-[#1F2937]
                               text-sm font-bold py-3.5 mt-2
                               hover:bg-[#1F2937] hover:text-white transition-colors cursor-pointer"
                  >
                    Confirmar agendamento
                  </button>
                </form>
              )}

              {/* STEP 4: DONE */}
              {step === "done" && (
                <div className="px-6 py-10 text-center flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-[#FFBB1E]/20 flex items-center justify-center">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                      <path stroke="#FFBB1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#1F2937]">Reunião agendada!</h3>
                    <p className="text-sm text-[#1F2937]/60 leading-relaxed">
                      Confira seu e-mail para o link do Google Meet.
                    </p>
                  </div>
                  {meetLink && (
                    <a
                      href={meetLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full
                                 bg-[#1F2937] text-white hover:bg-[#1F2937]/80 text-sm transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          d="M15 10l4.553-2.069A1 1 0 0121 8.873v6.254a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                      </svg>
                      Abrir Google Meet
                    </a>
                  )}
                  <button
                    onClick={handleClose}
                    className="text-sm text-[#1F2937]/40 hover:text-[#1F2937] transition-colors cursor-pointer underline"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
