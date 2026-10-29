import { horario, taller } from "@/data/taller";
import { formatoHora } from "@/lib/horario";

const filas = [
  { dias: "Lunes a viernes", turno: horario[1] },
  { dias: "Sábado", turno: horario[6] },
  { dias: "Domingo y festivos", turno: horario[0] },
];

export function Visitanos() {
  const { lat, lng } = taller.coordenadas;
  const bbox = [lng - 0.006, lat - 0.004, lng + 0.006, lat + 0.004].join(",");

  return (
    <section id="visitanos" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
      <div>
        <h2 className="heading text-4xl md:text-5xl">Visítanos</h2>
        <address className="mt-6 text-lg not-italic leading-relaxed">
          {taller.direccion}
          <br />A cuatro cuadras de la Catedral Metropolitana.
        </address>

        <table className="mt-8 w-full max-w-md text-left">
          <caption className="sr-only">Horario de atención</caption>
          <tbody className="divide-y divide-line border-y border-line">
            {filas.map(({ dias, turno }) => (
              <tr key={dias}>
                <th scope="row" className="py-3 font-medium">
                  {dias}
                </th>
                <td className="tabular py-3 text-right text-steel">
                  {turno ? `${formatoHora(turno.abre)} a ${formatoHora(turno.cierra)}` : "Cerrado"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="mt-8 space-y-2 text-lg">
          <li>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-cobalt underline underline-offset-4"
            >
              Cómo llegar en Google Maps
            </a>
          </li>
          <li>
            <a href={`tel:${taller.telefono.replace(/\s/g, "")}`} className="font-semibold hover:text-cobalt">
              {taller.telefono}
            </a>
          </li>
          <li>
            <a href={`mailto:${taller.email}`} className="font-semibold hover:text-cobalt">
              {taller.email}
            </a>
          </li>
        </ul>
      </div>

      <div className="mapa relative overflow-hidden rounded-2xl border-2 border-ink bg-[#dfe3e9]">
        <iframe
          title={`Mapa de ubicación de ${taller.nombre}`}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`}
          className="h-[380px] w-full md:h-full md:min-h-[440px]"
          loading="lazy"
        />
        {/* El pin va encima del centro del mapa, que es la dirección del taller */}
        <span className="mapa__pin" aria-hidden="true">
          <span>R</span>
        </span>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-xl bg-ink px-5 py-4 text-paper shadow-lg transition-colors hover:bg-cobalt sm:right-auto"
        >
          <span>
            <b className="block">{taller.nombre}</b>
            <span className="text-sm text-paper/75">{taller.direccion}</span>
          </span>
          <span className="font-semibold text-lane">Cómo llegar →</span>
        </a>
      </div>
    </section>
  );
}
