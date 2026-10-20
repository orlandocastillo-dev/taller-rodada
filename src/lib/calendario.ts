import { taller } from "@/data/taller";
import { franjas, type FranjaId } from "./reserva";

function dosDigitos(n: number): string {
  return String(n).padStart(2, "0");
}

/** Fecha y hora local de Colombia a formato UTC de iCalendar (20261020T130000Z). */
function aUtcIcs(fecha: string, hora: number): string {
  const d = new Date(`${fecha}T${dosDigitos(hora)}:00:00-05:00`);
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Escapa los caracteres especiales de un texto en iCalendar (RFC 5545). */
function escapar(texto: string): string {
  return texto.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export interface EventoReserva {
  codigo: string;
  fecha: string;
  franja: FranjaId;
  servicios: string[];
}

/** Archivo .ics que se abre en Google Calendar, Outlook o el calendario del celular. */
export function crearIcs({ codigo, fecha, franja, servicios }: EventoReserva, ahora = new Date()): string {
  const f = franjas.find((x) => x.id === franja) ?? franjas[0];
  const lineas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Rodada//Reservas//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${codigo}@rodada.co`,
    `DTSTAMP:${ahora.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART:${aUtcIcs(fecha, f.inicio)}`,
    `DTEND:${aUtcIcs(fecha, f.fin)}`,
    `SUMMARY:${escapar(`Llevar la bici a Rodada (${codigo})`)}`,
    `DESCRIPTION:${escapar(`Servicios: ${servicios.join(", ")}. Código de reserva ${codigo}.`)}`,
    `LOCATION:${escapar(taller.direccion)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Hoy llevas la bici a Rodada",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lineas.join("\r\n") + "\r\n";
}

export function mensajeConfirmacion(nombre: string, codigo: string, fecha: string, franja: FranjaId): string {
  const f = franjas.find((x) => x.id === franja) ?? franjas[0];
  const dia = new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Bogota" }).format(
    new Date(`${fecha}T12:00:00-05:00`),
  );
  return `Hola, soy ${nombre}. Reservé el turno ${codigo} para el ${dia} en la ${f.nombre.toLowerCase()} (${f.horas}).`;
}
