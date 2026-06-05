"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
}

interface Errors {
  nome?: string;
  email?: string;
  mensagem?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(nome: string, email: string, mensagem: string): Errors {
  const erros: Errors = {};
  if (!nome.trim())
    erros.nome = "Você não preencheu o campo de nome.";
  if (!email.trim())
    erros.email = "Você não preencheu o campo de e-mail.";
  else if (!EMAIL_REGEX.test(email))
    erros.email = "Preciso que você coloque um e-mail válido para que eu possa respondê-lo.";
  if (!mensagem.trim())
    erros.mensagem = "Você não preencheu o campo de mensagem.";
  return erros;
}

export default function ContactModal({ onClose }: Props) {
  const [nome,     setNome]     = useState("");
  const [email,    setEmail]    = useState("");
  const [mensagem, setMensagem] = useState("");
  const [errors,   setErrors]   = useState<Errors>({});
  const [touched,  setTouched]  = useState<Record<string, boolean>>({});
  const [success,   setSuccess]   = useState(false);
  const [leaving,   setLeaving]   = useState(false);
  const [sending,   setSending]   = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [visible,   setVisible]   = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 260);
  };

  /* Remove error from a field as soon as the user fixes it */
  const clearError = (field: keyof Errors) => {
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const erros = validate(nome, email, mensagem);
    if (Object.keys(erros).length > 0) {
      setErrors(erros);
      setTouched({ nome: true, email: true, mensagem: true });
      return;
    }

    setSending(true);
    setSendError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao enviar.");
      }

      setLeaving(true);
      setTimeout(() => { setLeaving(false); setSuccess(true); }, 300);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1F2937] " +
    "placeholder:text-[#1F2937]/40 outline-none transition-colors duration-200";

  const inputClass = (field: keyof Errors) =>
    inputBase + (touched[field] && errors[field]
      ? " border-red-500 focus:border-red-500"
      : " border-black/20 focus:border-[#1F2937]");

  const CloseBtn = () => (
    <button
      onClick={handleClose}
      aria-label="Fechar"
      className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer flex-shrink-0 ml-4"
    >
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.26, ease: "easeInOut" }}
        onClick={handleClose}
      />

      {/* Panel — form always dictates height; success overlays on top */}
      <motion.div
        className="relative w-full max-w-md bg-[#F7F8F5] rounded-2xl shadow-2xl p-8 overflow-hidden"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
        transition={{ duration: 0.26, ease: "easeInOut" }}
      >

        {/* ── Success screen (absolute overlay, same padding) ── */}
        <div
          className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out rounded-2xl bg-[#F7F8F5]"
          style={{
            opacity: success ? 1 : 0,
            transform: success ? "translateY(0)" : "translateY(16px)",
            pointerEvents: success ? "auto" : "none",
          }}
        >
          <div className="absolute top-4 right-4" onClick={handleClose}>
            <CloseBtn />
          </div>
          <h2 className="text-2xl font-semibold text-[#1F2937] mb-3">Email enviado com sucesso!</h2>
          <p className="text-sm text-[#1F2937]/60 leading-relaxed mb-6">
            Sua mensagem foi enviada com sucesso, logo vamos conversar sobre como podemos trabalhar juntos.
          </p>
          <svg width="132" height="132" viewBox="0 0 132 132" fill="none" className="flex-shrink-0">
            <circle cx="66" cy="66" r="66" fill="#DCFCE7"/>
            <circle cx="66" cy="66" r="52" fill="#BBF7D0"/>
            <path d="M42 66l16 16 32-32" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* ── Form screen (always rendered to keep modal height) ── */}
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            opacity: leaving || success ? 0 : 1,
            transform: leaving || success ? "translateY(-16px)" : "translateY(0)",
            pointerEvents: success ? "none" : "auto",
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#1F2937]">Vamos Conversar</h2>
              <p className="text-sm text-[#1F2937]/60 mt-1">
                Fico feliz pelo seu interesse no meu trabalho, como eu posso te ajudar hoje?
              </p>
            </div>
            <CloseBtn />
          </div>

          {/* Global error summary */}
          {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 space-y-1">
              {errors.nome     && <p className="text-sm text-red-600">{errors.nome}</p>}
              {errors.email    && <p className="text-sm text-red-600">{errors.email}</p>}
              {errors.mensagem && <p className="text-sm text-red-600">{errors.mensagem}</p>}
            </div>
          )}
          {sendError && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm text-red-600">{sendError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => { setNome(e.target.value); if (e.target.value.trim()) clearError("nome"); }}
              onBlur={() => setTouched((p) => ({ ...p, nome: true }))}
              className={inputClass("nome")}
            />
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.trim() && EMAIL_REGEX.test(e.target.value)) clearError("email");
              }}
              onBlur={() => setTouched((p) => ({ ...p, email: true }))}
              className={inputClass("email")}
            />
            <textarea
              placeholder="Sua mensagem"
              rows={5}
              value={mensagem}
              onChange={(e) => { setMensagem(e.target.value); if (e.target.value.trim()) clearError("mensagem"); }}
              onBlur={() => setTouched((p) => ({ ...p, mensagem: true }))}
              className={inputClass("mensagem") + " resize-none"}
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-[#1F2937] text-white text-sm font-medium py-3 hover:bg-[#FFBB1E] hover:text-[#1F2937] transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Enviando…" : "Enviar mensagem"}
            </button>
          </form>
        </div>

      </motion.div>
    </div>
  );
}
