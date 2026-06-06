import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nome, email, mensagem } = req.body ?? {};

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Campos obrigatórios faltando." });
  }

  try {
    await resend.emails.send({
      // Domínio verificado no Resend → troque pelo seu quando configurar
      from: "Sergio Prando <contato@sergioprando.com.br>",
      to: "sergio.prando@gmail.com",
      replyTo: email,
      subject: `Contato via portfólio — ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[contact] erro ao enviar:", message);
    return res.status(500).json({ error: `Falha ao enviar: ${message}` });
  }
}
