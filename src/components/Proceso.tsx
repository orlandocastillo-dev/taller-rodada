import { pasos } from "@/data/taller";

export function Proceso() {
  return (
    <section id="como-trabajamos" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <h2 className="heading max-w-2xl text-4xl md:text-5xl">Así trabajamos tu bici</h2>

      <div className="relative mt-14">
        {/* Línea de ciclorruta que une los pasos en escritorio */}
        <div className="lane-dashes absolute left-0 right-0 top-[22px] hidden h-1 md:block" aria-hidden="true" />
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
        {pasos.map((paso, i) => (
          <li key={paso.titulo} className="relative">
            <span className="display tabular relative grid size-12 place-items-center rounded-full bg-ink text-xl text-lane">
              {i + 1}
            </span>
            <h3 className="mt-5 text-xl font-bold">{paso.titulo}</h3>
            <p className="mt-2 leading-relaxed text-steel">{paso.texto}</p>
          </li>
        ))}
        </ol>
      </div>
    </section>
  );
}
