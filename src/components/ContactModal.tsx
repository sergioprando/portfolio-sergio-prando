"use client";

import React, { useState, useEffect } from "react";

interface Props {
  onClose: () => void;
}

export default function ContactModal({ onClose }: Props) {
  const [nome,      setNome]      = useState("");
  const [email,     setEmail]     = useState("");
  const [mensagem,  setMensagem]  = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject  = encodeURIComponent(`Contato via portfólio — ${nome}`);
    const body     = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`);
    window.location.href = `mailto:sergio.prando@gmail.com?subject=${subject}&body=${body}`;
  };

  const inputClass =
    "w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-[#1F2937] " +
    "placeholder:text-[#1F2937]/40 outline-none focus:border-[#1F2937] transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-[#F7F8F5] rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#1F2937]">Vamos Conversar</h2>
            <p className="text-sm text-[#1F2937]/60 mt-1">Preencha e seu cliente de email vai abrir com tudo pronto.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer flex-shrink-0 ml-4"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Seu nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Seu email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <textarea
            placeholder="Sua mensagem"
            required
            rows={5}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className={inputClass + " resize-none"}
          />
          <button
            type="submit"
            className="w-full rounded-full bg-[#1F2937] text-white text-sm font-medium py-3 hover:bg-[#FFBB1E] hover:text-[#1F2937] transition-colors duration-200 cursor-pointer"
          >
            Enviar mensagem
          </button>
        </form>
      </div>
    </div>
  );
}
