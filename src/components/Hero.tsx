import { taller } from "@/data/taller";
import { EstadoAbierto } from "./EstadoAbierto";
import { Wheel } from "./Wheel";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.15fr_0.85fr] md:pb-24 md:pt-16">
        <div className="relative z-10">
          <h1 className="display animate-subir text-[clamp(2.75rem,7.5vw,5.75rem)]">
            Tu bici lista para rodar, sin esperar semanas.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel md:text-xl">
            Taller de mantenimiento y reparación en El Rosario, Barranquilla. Diagnóstico gratis en 15 minutos, precio cerrado
            antes de empezar y la mayoría de arreglos listos el mismo día.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#reservar" className="btn-primary">
              Reservar turno
            </a>
            <a href="#cotizar" className="btn-ghost">
              Calcular precio
            </a>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              ["15 min", "Diagnóstico gratis"],
              ["Mismo día", "La mayoría de arreglos"],
              ["30 días", "De garantía en mano de obra"],
            ].map(([dato, texto]) => (
              <div key={dato}>
                <dt className="sr-only">{texto}</dt>
                <dd className="heading whitespace-nowrap text-lg sm:text-2xl md:text-3xl">{dato}</dd>
                <dd className="mt-1 text-sm leading-snug text-steel">{texto}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="animate-rodar relative -mr-24 md:-mr-40">
            <Wheel className="w-full max-w-[560px] drop-shadow-[0_24px_30px_rgba(20,33,61,0.18)]" />
          </div>
          <p className="ficha-flotante left-0 top-[12%] md:-left-6">
            <span className="ficha-flotante__icono">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span>
              <b>Precio cerrado</b>
              Antes de tocar una pieza
            </span>
          </p>
          <p className="ficha-flotante bottom-[10%] right-4 [animation-delay:0.25s] md:right-0">
            <span className="ficha-flotante__icono ficha-flotante__icono--lane">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2.5 2M9.5 2.5h5" />
              </svg>
            </span>
            <span>
              <b>Lista hoy</b>
              Ajustes y despinches
            </span>
          </p>
        </div>
      </div>

      <div className="bg-ink text-paper">
        <div className="lane-dashes h-1.5 w-full" aria-hidden="true" />
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-[15px] md:flex-row md:items-center md:justify-between">
          <EstadoAbierto />
          <p className="text-paper/80">{taller.direccion}</p>
          <a
            href={`https://wa.me/${taller.whatsapp}`}
            className="font-semibold underline decoration-lane decoration-2 underline-offset-4 hover:text-lane"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
