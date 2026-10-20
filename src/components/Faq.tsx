import { preguntas } from "@/data/taller";

export function Faq() {
  return (
    <section id="preguntas" className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 md:grid-cols-[1fr_1.6fr] md:pb-28">
      <h2 className="heading text-4xl md:text-5xl">Preguntas frecuentes</h2>
      <div className="divide-y divide-line border-y border-line">
        {preguntas.map((p) => (
          <details key={p.pregunta} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {p.pregunta}
              <svg
                viewBox="0 0 24 24"
                className="size-5 shrink-0 text-cobalt transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="max-w-prose pb-5 leading-relaxed text-steel">{p.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
