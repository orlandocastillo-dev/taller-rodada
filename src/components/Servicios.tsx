import { categorias, servicios } from "@/data/taller";
import { duracion, pesos } from "@/lib/format";

export function Servicios() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="max-w-2xl">
        <h2 className="heading text-4xl md:text-5xl">Servicios y precios</h2>
        <p className="mt-4 text-lg text-steel">
          Precios de mano de obra para bici urbana. Ruta, montaña y eléctricas tienen un ajuste que ves en el
          cotizador. Los repuestos se cobran aparte y siempre te los mostramos antes.
        </p>
      </div>

      <div className="mt-14 space-y-14">
        {categorias.map((categoria) => (
          <div key={categoria} className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
            <h3 className="heading text-xl text-cobalt md:pt-5">{categoria}</h3>
            <ul className="divide-y divide-line border-y border-line">
              {servicios
                .filter((s) => s.categoria === categoria)
                .map((s) => (
                  <li key={s.id} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-5 sm:grid-cols-[1fr_90px_140px]">
                    <div>
                      <p className="text-lg font-semibold">
                        {s.nombre}
                        {s.destacado && (
                          <span className="ml-2 inline-block -translate-y-0.5 rounded-full bg-lane px-2.5 py-0.5 align-middle text-xs font-bold text-ink">
                            El más pedido
                          </span>
                        )}
                      </p>
                      <p className="mt-1 max-w-lg text-[15px] leading-relaxed text-steel">{s.detalle}</p>
                    </div>
                    <p className="tabular order-3 col-span-2 text-sm text-steel sm:order-none sm:col-span-1 sm:pt-1 sm:text-base">
                      {duracion(s.minutos)}
                    </p>
                    <p className="tabular text-right text-lg font-semibold sm:pt-0.5">
                      {pesos(s.precio)}
                      {s.unidad && <span className="block text-sm font-normal text-steel">{s.unidad}</span>}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
