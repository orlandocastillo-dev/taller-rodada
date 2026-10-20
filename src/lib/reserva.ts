import { z } from "zod";
import { servicios, tiposBici } from "@/data/taller";

const idsServicio = servicios.map((s) => s.id) as [string, ...string[]];
const idsBici = tiposBici.map((t) => t.id) as [string, ...string[]];

export const franjas = [
  { id: "manana", nombre: "Mañana", horas: "8:00 a 12:00", inicio: 8, fin: 12 },
  { id: "tarde", nombre: "Tarde", horas: "12:00 a 5:00", inicio: 12, fin: 17 },
] as const;

export type FranjaId = (typeof franjas)[number]["id"];

/** Día de la semana (0 = domingo) de una fecha AAAA-MM-DD, interpretada en hora de Colombia. */
export function diaSemana(fecha: string): number {
  return new Date(`${fecha}T12:00:00-05:00`).getUTCDay();
}

export const reservaSchema = z
  .object({
    nombre: z.string().trim().min(2, "Escribe tu nombre.").max(80),
    telefono: z
      .string()
      .trim()
      .regex(/^\+?[\d\s-]{7,15}$/, "Escribe un celular válido, por ejemplo 300 555 0182."),
    email: z
      .union([z.literal(""), z.string().trim().email("Revisa el correo.")], { message: "Revisa el correo." })
      .optional()
      .default(""),
    tipoBici: z.enum(idsBici, { message: "Elige el tipo de bici." }),
    servicioIds: z.array(z.enum(idsServicio)).min(1, "Elige al menos un servicio."),
    fecha: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Elige una fecha.")
      .refine((f) => new Date(`${f}T23:59:59-05:00`).getTime() >= Date.now(), "La fecha ya pasó."),
    franja: z.enum(["manana", "tarde"], { message: "Elige mañana o tarde." }).optional().default("manana"),
    comentarios: z.string().trim().max(500, "Máximo 500 caracteres.").optional().default(""),
    /** Campo trampa para bots: debe llegar vacío. */
    empresa: z.string().max(0).optional().default(""),
  })
  // Los domingos el taller cierra a la 1:00 p. m.: no hay turnos en la tarde.
  .refine((r) => !(/^\d{4}-\d{2}-\d{2}$/.test(r.fecha) && diaSemana(r.fecha) === 0 && r.franja === "tarde"), {
    message: "Los domingos solo atendemos en la mañana.",
    path: ["franja"],
  });

export type ReservaInput = z.input<typeof reservaSchema>;
export type Reserva = z.output<typeof reservaSchema>;

export type ErroresReserva = Partial<Record<keyof Reserva, string>>;

export function erroresDe(error: z.ZodError): ErroresReserva {
  const errores: ErroresReserva = {};
  for (const issue of error.issues) {
    const campo = issue.path[0] as keyof Reserva | undefined;
    if (campo && !errores[campo]) errores[campo] = issue.message;
  }
  return errores;
}

/** Código corto legible para que el cliente lo dicte por teléfono. */
export function codigoReserva(): string {
  const alfabeto = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let codigo = "";
  for (let i = 0; i < 6; i++) codigo += alfabeto[Math.floor(Math.random() * alfabeto.length)];
  return `RD-${codigo}`;
}
