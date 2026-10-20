import Link from "next/link";

export default function NoEncontrada() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center gap-6 px-5 py-20">
      <p className="tabular text-sm font-semibold text-cobalt">Error 404</p>
      <h1 className="display text-5xl md:text-7xl">Esta página se pinchó.</h1>
      <p className="max-w-lg text-lg text-steel">
        La dirección que buscas no existe o cambió. Desde el inicio puedes cotizar, reservar o ver dónde estamos.
      </p>
      <Link href="/" className="btn-primary">
        Volver al inicio
      </Link>
    </main>
  );
}
