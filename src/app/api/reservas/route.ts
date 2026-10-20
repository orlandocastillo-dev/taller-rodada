import { NextResponse } from "next/server";
import { codigoReserva, erroresDe, reservaSchema } from "@/lib/reserva";

/**
 * Límite simple por IP: 5 reservas cada 10 minutos.
 * En memoria es suficiente para una demo; en producción con varias instancias usar Redis (p. ej. Upstash).
 */
const VENTANA_MS = 10 * 60 * 1000;
const MAXIMO = 5;
const intentos = new Map<string, number[]>();

function limitado(ip: string): boolean {
  const ahora = Date.now();
  const recientes = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  intentos.set(ip, recientes);
  return recientes.length > MAXIMO;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limitado(ip)) {
    return NextResponse.json(
      { mensaje: "Recibimos muchas reservas desde tu conexión. Intenta en unos minutos o escríbenos por WhatsApp." },
      { status: 429 },
    );
  }

  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ mensaje: "El cuerpo de la solicitud no es JSON válido." }, { status: 400 });
  }

  const resultado = reservaSchema.safeParse(cuerpo);
  if (!resultado.success) {
    return NextResponse.json(
      { mensaje: "Revisa los campos marcados.", errores: erroresDe(resultado.error) },
      { status: 422 },
    );
  }

  const { empresa, ...reserva } = resultado.data;

  // Si el honeypot viene lleno respondemos 200 para no darle pistas al bot, pero no guardamos nada.
  if (empresa) return NextResponse.json({ codigo: codigoReserva() }, { status: 200 });

  const codigo = codigoReserva();

  // Punto de integración: aquí se enviaría el correo (Resend) o se guardaría en la base de datos (Supabase).
  console.info("[reserva]", codigo, reserva);

  return NextResponse.json({ codigo }, { status: 201 });
}
