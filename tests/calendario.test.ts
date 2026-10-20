import { describe, expect, it } from "vitest";
import { crearIcs, mensajeConfirmacion } from "@/lib/calendario";
import { diaSemana, reservaSchema } from "@/lib/reserva";

describe("crearIcs", () => {
  const ics = crearIcs(
    { codigo: "RD-ABC234", fecha: "2030-03-05", franja: "tarde", servicios: ["Centrado de rueda", "Purga, frenos"] },
    new Date("2030-03-01T10:00:00Z"),
  );

  it("usa la hora de Colombia convertida a UTC", () => {
    // 12:00 en Colombia = 17:00 UTC; 5:00 p. m. = 22:00 UTC
    expect(ics).toContain("DTSTART:20300305T170000Z");
    expect(ics).toContain("DTEND:20300305T220000Z");
  });

  it("escapa comas y usa saltos de línea CRLF", () => {
    expect(ics).toContain("Purga\\, frenos");
    expect(ics.split("\r\n")[0]).toBe("BEGIN:VCALENDAR");
  });

  it("incluye un recordatorio dos horas antes", () => {
    expect(ics).toContain("TRIGGER:-PT2H");
  });
});

describe("mensajeConfirmacion", () => {
  it("menciona el código, el día y la franja", () => {
    const m = mensajeConfirmacion("Laura", "RD-ABC234", "2030-03-05", "manana");
    expect(m).toContain("RD-ABC234");
    expect(m).toContain("martes");
    expect(m).toContain("mañana (8:00 a 12:00)");
  });
});

describe("franjas", () => {
  const base = { nombre: "Laura", telefono: "3005550182", tipoBici: "ruta", servicioIds: ["centrado"] };

  it("calcula el día de la semana en hora de Colombia", () => {
    expect(diaSemana("2030-03-03")).toBe(0); // domingo
  });

  it("no permite turnos en la tarde un domingo", () => {
    const r = reservaSchema.safeParse({ ...base, fecha: "2030-03-03", franja: "tarde" });
    expect(r.success).toBe(false);
    expect(reservaSchema.safeParse({ ...base, fecha: "2030-03-03", franja: "manana" }).success).toBe(true);
  });
});
