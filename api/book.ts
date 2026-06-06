import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getCalendarClient } from "./google-calendar";
import { Resend } from "resend";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { date, time, name, email, subject } = req.body ?? {};
  if (!date || !time || !name || !email) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  try {
    const calendar = getCalendarClient();
    const startDateTime = new Date(`${date}T${time}:00-03:00`).toISOString();
    const endDateTime   = new Date(new Date(`${date}T${time}:00-03:00`).getTime() + 30 * 60 * 1000).toISOString();

    // Formata data legível para o e-mail
    const dateLabel = new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    // Link fixo de Google Meet (conta pessoal não suporta geração dinâmica via API)
    const meetLink = "https://meet.google.com/muv-bxow-uuf";

    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      sendUpdates: "none",
      requestBody: {
        summary: `[Portfólio] Reunião com ${name}${subject ? " — " + subject : ""}`,
        description: `Reunião agendada pelo portfólio de Sergio Prando.\n\nAssunto: ${subject || "Não informado"}\nContato: ${email}\nLink Meet: ${meetLink}`,
        start: { dateTime: startDateTime, timeZone: "America/Sao_Paulo" },
        end:   { dateTime: endDateTime,   timeZone: "America/Sao_Paulo" },
        location: meetLink,
      },
    });

    // Envia e-mail de confirmação ao visitante via Resend
    await resend.emails.send({
      from: "Sergio Prando <onboarding@resend.dev>",
      to: email,
      subject: "Reunião confirmada! 🗓️",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;color:#1F2937">
          <h2 style="color:#1F2937">Reunião confirmada, ${name}!</h2>
          <p>Sua reunião com <strong>Sergio Prando</strong> foi agendada com sucesso.</p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0">
            <tr><td style="padding:8px 0;color:#666">📅 Data</td><td style="padding:8px 0"><strong>${dateLabel}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#666">🕐 Horário</td><td style="padding:8px 0"><strong>${time} (horário de Brasília)</strong></td></tr>
            <tr><td style="padding:8px 0;color:#666">⏱ Duração</td><td style="padding:8px 0"><strong>30 minutos</strong></td></tr>
            ${subject ? `<tr><td style="padding:8px 0;color:#666">📋 Assunto</td><td style="padding:8px 0"><strong>${subject}</strong></td></tr>` : ""}
          </table>
          ${meetLink ? `<a href="${meetLink}" style="display:inline-block;background:#FFBB1E;color:#1F2937;font-weight:bold;padding:12px 24px;border-radius:999px;text-decoration:none">Entrar no Google Meet</a>` : ""}
          <p style="margin-top:24px;color:#666;font-size:13px">Até breve!<br/>Sergio Prando</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, meetLink });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[book]", message);
    return res.status(500).json({ error: `Erro ao criar evento: ${message}` });
  }
}
