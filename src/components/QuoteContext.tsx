"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { TipoBiciId } from "@/data/taller";
import { calcularCotizacion, type QuoteResult } from "@/lib/quote";

interface QuoteState {
  tipoBici: TipoBiciId;
  servicioIds: string[];
  express: boolean;
  resultado: QuoteResult;
  setTipoBici: (t: TipoBiciId) => void;
  toggleServicio: (id: string) => void;
  setExpress: (v: boolean) => void;
}

const QuoteCtx = createContext<QuoteState | null>(null);

/** Estado compartido entre el cotizador y el formulario de reserva. */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [tipoBici, setTipoBici] = useState<TipoBiciId>("urbana");
  const [servicioIds, setServicioIds] = useState<string[]>(["mantenimiento-general"]);
  const [express, setExpress] = useState(false);

  const value = useMemo<QuoteState>(
    () => ({
      tipoBici,
      servicioIds,
      express,
      resultado: calcularCotizacion({ tipoBici, servicioIds, express }),
      setTipoBici,
      setExpress,
      toggleServicio: (id) =>
        setServicioIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    }),
    [tipoBici, servicioIds, express],
  );

  return <QuoteCtx.Provider value={value}>{children}</QuoteCtx.Provider>;
}

export function useQuote(): QuoteState {
  const ctx = useContext(QuoteCtx);
  if (!ctx) throw new Error("useQuote debe usarse dentro de <QuoteProvider>");
  return ctx;
}
