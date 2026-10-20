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
        </div>

        <div className="animate-rodar relative -mr-24 md:-mr-40">
          <Wheel className="w-full max-w-[560px] drop-shadow-[0_24px_30px_rgba(20,33,61,0.18)]" />
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
