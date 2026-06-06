import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getCalendarClient } from "./google-calendar";

const SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30",
];

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const date = req.query.date as string;
  if (!date) return res.status(400).json({ error: "date required" });

  // Bloquear fins de semana
  const dayOfWeek = new Date(date + "T12:00:00").getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return res.status(200).json({ slots: [] });

  try {
    const calendar = getCalendarClient();
    const timeMin = new Date(`${date}T09:00:00-03:00`).toISOString();
    const timeMax = new Date(`${date}T18:00:00-03:00`).toISOString();

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: "America/Sao_Paulo",
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busy = response.data.calendars?.[CALENDAR_ID]?.busy ?? [];

    const available = SLOTS.filter((slot) => {
      const slotStart = new Date(`${date}T${slot}:00-03:00`);
      const slotEnd   = new Date(slotStart.getTime() + 30 * 60 * 1000);
      return !busy.some((b) => {
        const busyStart = new Date(b.start!);
        const busyEnd   = new Date(b.end!);
        return slotStart < busyEnd && slotEnd > busyStart;
      });
    });

    return res.status(200).json({ slots: available });
  } catch (err) {
    console.error("[availability]", err);
    return res.status(500).json({ error: "Erro ao consultar agenda" });
  }
}
