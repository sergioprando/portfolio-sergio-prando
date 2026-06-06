import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getCalendarClient } from "./google-calendar";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;

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

    const event = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      conferenceDataVersion: 1,
      sendUpdates: "all",
      requestBody: {
        summary: `[Portfólio] Reunião com ${name}${subject ? " — " + subject : ""}`,
        description: `Reunião agendada pelo portfólio de Sergio Prando.\n\nAssunto: ${subject || "Não informado"}\nContato: ${email}`,
        start: { dateTime: startDateTime, timeZone: "America/Sao_Paulo" },
        end:   { dateTime: endDateTime,   timeZone: "America/Sao_Paulo" },
        attendees: [{ email }],
        conferenceData: {
          createRequest: {
            requestId: `portfolio-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
    });

    const meetLink = event.data.conferenceData?.entryPoints?.find(
      (e) => e.entryPointType === "video"
    )?.uri;

    return res.status(200).json({ success: true, meetLink });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[book]", message);
    return res.status(500).json({ error: `Erro ao criar evento: ${message}` });
  }
}
