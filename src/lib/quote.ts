import { servicios, tiposBici, type TipoBiciId } from "@/data/taller";

export interface QuoteInput {
  tipoBici: TipoBiciId;
  servicioIds: string[];
  express: boolean;
}

export interface QuoteResult {
  subtotal: number;
  recargoExpress: number;
  total: number;
  /** Minutos totales de mano de obra estimados. */
  minutos: number;
  entrega: "mismo día" | "1 día hábil" | "2 días hábiles" | "3 días hábiles";
}

const RECARGO_EXPRESS = 0.35;
const MINUTOS_JORNADA = 8 * 60;

/** Redondea a múltiplos de mil, como se cobra en mostrador. */
export function redondearMil(valor: number): number {
  return Math.round(valor / 1000) * 1000;
}

export function calcularCotizacion({ tipoBici, servicioIds, express }: QuoteInput): QuoteResult {
  const tipo = tiposBici.find((t) => t.id === tipoBici);
  if (!tipo) throw new Error(`Tipo de bicicleta desconocido: ${tipoBici}`);

  const seleccion = servicios.filter((s) => servicioIds.includes(s.id));

  const subtotal = redondearMil(seleccion.reduce((acc, s) => acc + s.precio * tipo.factor, 0));
  const recargoExpress = express ? redondearMil(subtotal * RECARGO_EXPRESS) : 0;
  const minutos = Math.round(seleccion.reduce((acc, s) => acc + s.minutos, 0) * tipo.factor);

  return {
    subtotal,
    recargoExpress,
    total: subtotal + recargoExpress,
    minutos,
    entrega: estimarEntrega(minutos, express),
  };
}

export function estimarEntrega(minutos: number, express: boolean): QuoteResult["entrega"] {
  // El banco de trabajo rinde ~4 h efectivas por bici en un día normal; en express se le dedica la jornada completa.
  const capacidadDiaria = express ? MINUTOS_JORNADA : MINUTOS_JORNADA / 2;
  const dias = Math.ceil(minutos / capacidadDiaria);
  if (dias <= 1) return "mismo día";
  if (dias === 2) return "1 día hábil";
  if (dias === 3) return "2 días hábiles";
  return "3 días hábiles";
}
