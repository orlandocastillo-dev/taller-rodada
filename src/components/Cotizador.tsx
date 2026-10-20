"use client";

import { servicios, taller, tiposBici } from "@/data/taller";
import { duracion, pesos } from "@/lib/format";
import { useQuote } from "./QuoteContext";

export function Cotizador() {
  const { tipoBici, servicioIds, express, resultado, setTipoBici, toggleServicio, setExpress } = useQuote();
  const seleccion = servicios.filter((s) => servicioIds.includes(s.id));
  const vacio = seleccion.length === 0;
  const tipo = tiposBici.find((t) => t.id === tipoBici)!;
  const textoCotizacion = [
    `Hola, quiero cotizar para mi bici ${tipo.nombre.toLowerCase()}:`,
    ...seleccion.map((s) => `- ${s.nombre}`),
    express ? "- Servicio express" : "",
    `Estimado en la página: ${pesos(resultado.total)}, entrega ${resultado.entrega}.`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section id="cotizar" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_380px] md:py-28">
        <div>
          <h2 className="heading text-4xl md:text-5xl">Calcula cuánto te sale</h2>
          <p className="mt-4 max-w-xl text-lg text-steel">
            Elige tu bici y lo que necesita. El valor final lo confirmamos en el diagnóstico, y nunca sube sin
            que lo apruebes.
          </p>

          <fieldset className="mt-10">
            <legend className="text-lg font-semibold">Tipo de bici</legend>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {tiposBici.map((t) => (
                <label
                  key={t.id}
                  className="cursor-pointer rounded-lg border-2 border-line px-4 py-3 text-center text-[15px] font-medium transition-colors has-[:checked]:border-cobalt has-[:checked]:bg-cobalt has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt"
                >
                  <input
                    type="radio"
                    name="tipo-bici"
                    value={t.id}
                    checked={tipoBici === t.id}
                    onChange={() => setTipoBici(t.id)}
                    className="sr-only"
                  />
                  {t.nombre}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-10">
            <legend className="text-lg font-semibold">Servicios</legend>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {servicios.map((s) => (
                <li key={s.id}>
                  <label className="flex cursor-pointer items-center gap-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={servicioIds.includes(s.id)}
                      onChange={() => toggleServicio(s.id)}
                      className="size-5 shrink-0 accent-cobalt"
                    />
                    <span className="flex-1 text-[15px] font-medium">{s.nombre}</span>
                    <span className="tabular text-[15px] text-steel">{pesos(s.precio)}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <label className="mt-8 flex cursor-pointer items-start gap-4 rounded-lg bg-lane/25 p-4">
            <input
              type="checkbox"
              checked={express}
              onChange={(e) => setExpress(e.target.checked)}
              className="mt-1 size-5 shrink-0 accent-cobalt"
            />
            <span>
              <span className="block font-semibold">Servicio express (+35 %)</span>
              <span className="text-[15px] text-steel">
                Tu bici entra a banco de inmediato y un mecánico trabaja solo en ella.
              </span>
            </span>
          </label>
        </div>

        <aside aria-label="Resumen de la cotización" className="md:pt-24">
          <div className="sticky top-24 rounded-2xl bg-ink p-7 text-paper">
            <p className="text-sm text-paper/70">Estimado de mano de obra</p>
            <p className="display tabular mt-2 text-5xl text-lane" aria-live="polite">
              {pesos(resultado.total)}
            </p>

            {vacio ? (
              <p className="mt-6 text-[15px] text-paper/80">Marca al menos un servicio para ver el estimado.</p>
            ) : (
              <dl className="mt-6 space-y-2.5 border-t border-paper/15 pt-5 text-[15px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-paper/70">Subtotal</dt>
                  <dd className="tabular">{pesos(resultado.subtotal)}</dd>
                </div>
                {express && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-paper/70">Recargo express</dt>
                    <dd className="tabular">{pesos(resultado.recargoExpress)}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-paper/70">Trabajo en banco</dt>
                  <dd className="tabular">{duracion(resultado.minutos)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-paper/70">Entrega</dt>
                  <dd className="font-semibold">{resultado.entrega}</dd>
                </div>
              </dl>
            )}

            <a
              href="#reservar"
              aria-disabled={vacio}
              className={`btn mt-7 w-full bg-lane text-ink hover:bg-white ${vacio ? "pointer-events-none opacity-50" : ""}`}
            >
              Reservar con esta cotización
            </a>
            {!vacio && (
              <a
                href={`https://wa.me/${taller.whatsapp}?text=${encodeURIComponent(textoCotizacion)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-center text-sm font-semibold text-paper/80 underline decoration-paper/30 underline-offset-4 hover:text-lane"
              >
                Enviar esta cotización por WhatsApp
              </a>
            )}
            <p className="mt-4 text-xs leading-relaxed text-paper/60">
              No incluye repuestos. Precio sujeto a diagnóstico en el taller.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
