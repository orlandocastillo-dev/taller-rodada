import { horario } from "@/data/taller";

// "America/Bogota" es el identificador IANA de la hora de toda Colombia (UTC-5).
const ZONA = "America/Bogota";
const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

interface HoraLocal {
  dia: number;
  hora: number;
  minuto: number;
}

export function horaColombia(fecha: Date): HoraLocal {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONA,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(fecha);

  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? "";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(valor("weekday"));

  return { dia, hora: Number(valor("hour")), minuto: Number(valor("minute")) };
}

export function formatoHora(hora: number): string {
  const sufijo = hora < 12 ? "a. m." : "p. m.";
  const h12 = hora % 12 === 0 ? 12 : hora % 12;
  return `${h12}:00 ${sufijo}`;
}

export interface EstadoTaller {
  abierto: boolean;
  mensaje: string;
}

export function estadoTaller(fecha: Date): EstadoTaller {
  const { dia, hora, minuto } = horaColombia(fecha);
  const ahora = hora + minuto / 60;
  const hoy = horario[dia];

  if (hoy && ahora >= hoy.abre && ahora < hoy.cierra) {
    const faltan = hoy.cierra - ahora;
    const mensaje =
      faltan <= 1
        ? `Abierto, cerramos pronto (${formatoHora(hoy.cierra)})`
        : `Abierto ahora, hasta las ${formatoHora(hoy.cierra)}`;
    return { abierto: true, mensaje };
  }

  if (hoy && ahora < hoy.abre) {
    return { abierto: false, mensaje: `Cerrado, abrimos hoy a las ${formatoHora(hoy.abre)}` };
  }

  for (let i = 1; i <= 7; i++) {
    const siguiente = (dia + i) % 7;
    const turno = horario[siguiente];
    if (turno) {
      const cuando = i === 1 ? "mañana" : `el ${DIAS[siguiente]}`;
      return { abierto: false, mensaje: `Cerrado, abrimos ${cuando} a las ${formatoHora(turno.abre)}` };
    }
  }

  return { abierto: false, mensaje: "Cerrado" };
}
