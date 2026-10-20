import { describe, expect, it } from "vitest";
import { estadoTaller, formatoHora, horaColombia } from "@/lib/horario";

// Colombia es UTC-5 todo el año (sin horario de verano).
const enColombia = (iso: string) => new Date(`${iso}-05:00`);

describe("horaColombia", () => {
  it("convierte desde UTC", () => {
    expect(horaColombia(new Date("2026-10-19T15:30:00Z"))).toEqual({ dia: 1, hora: 10, minuto: 30 });
  });
});

describe("estadoTaller", () => {
  it("abierto un lunes a media mañana", () => {
    const e = estadoTaller(enColombia("2026-10-19T10:00:00"));
    expect(e.abierto).toBe(true);
    expect(e.mensaje).toContain("7:00 p. m.");
  });

  it("avisa cuando falta menos de una hora para cerrar", () => {
    expect(estadoTaller(enColombia("2026-10-19T18:20:00")).mensaje).toContain("cerramos pronto");
  });

  it("antes de abrir indica la hora de hoy", () => {
    expect(estadoTaller(enColombia("2026-10-19T06:00:00")).mensaje).toBe("Cerrado, abrimos hoy a las 8:00 a. m.");
  });

  it("después de cerrar el sábado anuncia el domingo", () => {
    expect(estadoTaller(enColombia("2026-10-24T18:00:00")).mensaje).toBe("Cerrado, abrimos mañana a las 7:00 a. m.");
  });
});

describe("formatoHora", () => {
  it("usa formato colombiano de 12 horas", () => {
    expect(formatoHora(0)).toBe("12:00 a. m.");
    expect(formatoHora(13)).toBe("1:00 p. m.");
  });
});
