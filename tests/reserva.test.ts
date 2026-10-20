import { describe, expect, it } from "vitest";
import { codigoReserva, erroresDe, reservaSchema } from "@/lib/reserva";

const valida = {
  nombre: "Laura Gómez",
  telefono: "300 555 0182",
  email: "",
  tipoBici: "ruta",
  servicioIds: ["centrado"],
  fecha: "2099-01-15",
};

describe("reservaSchema", () => {
  it("acepta una reserva completa", () => {
    expect(reservaSchema.safeParse(valida).success).toBe(true);
  });

  it("el correo es opcional", () => {
    const sinCorreo: Partial<typeof valida> = { ...valida };
    delete sinCorreo.email;
    expect(reservaSchema.safeParse(sinCorreo).success).toBe(true);
  });

  it("devuelve un mensaje por campo inválido", () => {
    const r = reservaSchema.safeParse({ ...valida, telefono: "abc", servicioIds: [], fecha: "2001-01-01" });
    expect(r.success).toBe(false);
    if (!r.success) {
      const errores = erroresDe(r.error);
      expect(Object.keys(errores).sort()).toEqual(["fecha", "servicioIds", "telefono"]);
    }
  });

  it("rechaza servicios que no existen", () => {
    expect(reservaSchema.safeParse({ ...valida, servicioIds: ["pintura"] }).success).toBe(false);
  });
});

describe("codigoReserva", () => {
  it("genera códigos sin caracteres ambiguos", () => {
    for (let i = 0; i < 200; i++) expect(codigoReserva()).toMatch(/^RD-[A-HJ-NP-Z2-9]{6}$/);
  });
});
