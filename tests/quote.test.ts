import { describe, expect, it } from "vitest";
import { calcularCotizacion, estimarEntrega, redondearMil } from "@/lib/quote";

describe("calcularCotizacion", () => {
  it("cobra el precio base para bici urbana", () => {
    const r = calcularCotizacion({ tipoBici: "urbana", servicioIds: ["mantenimiento-general"], express: false });
    expect(r.total).toBe(120000);
    expect(r.recargoExpress).toBe(0);
    expect(r.entrega).toBe("mismo día");
  });

  it("aplica el factor del tipo de bici y redondea a miles", () => {
    const r = calcularCotizacion({ tipoBici: "mtb", servicioIds: ["ajuste-rapido", "centrado"], express: false });
    // (45.000 + 35.000) * 1,15 = 92.000
    expect(r.subtotal).toBe(92000);
  });

  it("suma 35 % por servicio express", () => {
    const r = calcularCotizacion({ tipoBici: "urbana", servicioIds: ["mantenimiento-full"], express: true });
    expect(r.recargoExpress).toBe(84000);
    expect(r.total).toBe(324000);
  });

  it("devuelve cero cuando no hay servicios", () => {
    const r = calcularCotizacion({ tipoBici: "ruta", servicioIds: [], express: false });
    expect(r.total).toBe(0);
    expect(r.minutos).toBe(0);
  });

  it("rechaza un tipo de bici desconocido", () => {
    // @ts-expect-error probando una entrada inválida
    expect(() => calcularCotizacion({ tipoBici: "tandem", servicioIds: [], express: false })).toThrow();
  });
});

describe("estimarEntrega", () => {
  it("el express entrega antes que el normal para el mismo trabajo", () => {
    expect(estimarEntrega(480, false)).toBe("1 día hábil");
    expect(estimarEntrega(480, true)).toBe("mismo día");
  });

  it("limita la estimación a 3 días hábiles", () => {
    expect(estimarEntrega(5000, false)).toBe("3 días hábiles");
  });
});

describe("redondearMil", () => {
  it("redondea al millar más cercano", () => {
    expect(redondearMil(51749)).toBe(52000);
    expect(redondearMil(51499)).toBe(51000);
  });
});
