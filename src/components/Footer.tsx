import { horario, taller } from "@/data/taller";
import { formatoHora } from "@/lib/horario";

const filas = [
  { dias: "Lunes a viernes", turno: horario[1] },
  { dias: "Sábados", turno: horario[6] },
  { dias: "Domingos y festivos", turno: horario[0] },
];

export function Footer() {
  return (
    <footer className="bg-ink pb-24 text-paper md:pb-0">
      <div className="lane-dashes h-1.5 w-full" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="display text-5xl md:text-6xl">rodada</p>
          <p className="mt-3 max-w-xs text-paper/70">{taller.descripcion}. Mantenimiento, reparación y ensamble.</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-lane">Visítanos</h2>
          <address className="mt-3 text-[15px] not-italic leading-relaxed text-paper/80">
            {taller.direccion}
            <br />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${taller.coordenadas.lat},${taller.coordenadas.lng}`}
              className="underline decoration-paper/30 underline-offset-4 hover:text-lane"
            >
              Cómo llegar
            </a>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-lane">Horario</h2>
          <dl className="mt-3 space-y-1.5 text-[15px] text-paper/80">
            {filas.map(({ dias, turno }) => (
              <div key={dias}>
                <dt className="text-paper">{dias}</dt>
                <dd className="tabular">{turno ? `${formatoHora(turno.abre)} a ${formatoHora(turno.cierra)}` : "Cerrado"}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-lane">Contacto</h2>
          <ul className="mt-3 space-y-1.5 text-[15px] text-paper/80">
            <li>
              <a href={`https://wa.me/${taller.whatsapp}`} className="hover:text-lane">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:${taller.telefono.replace(/\s/g, "")}`} className="tabular hover:text-lane">
                {taller.telefono}
              </a>
            </li>
            <li>
              <a href={`mailto:${taller.email}`} className="hover:text-lane">
                {taller.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-paper/10 px-5 py-6 text-sm text-paper/50">
        Proyecto de portafolio de Orlando Castillo. Rodada es un negocio ficticio.
      </div>
    </footer>
  );
}
