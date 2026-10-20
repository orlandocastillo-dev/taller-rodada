"use client";

import { useEffect, useState } from "react";

const enlaces = [
  { href: "#servicios", texto: "Servicios" },
  { href: "#cotizar", texto: "Cotizar" },
  { href: "#como-trabajamos", texto: "Cómo trabajamos" },
  { href: "#visitanos", texto: "Visítanos" },
];

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const [conSombra, setConSombra] = useState(false);
  const [activa, setActiva] = useState<string | null>(null);

  // Resalta en el menú la sección que se está viendo.
  useEffect(() => {
    const secciones = enlaces
      .map((e) => document.querySelector<HTMLElement>(e.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) setActiva(`#${entrada.target.id}`);
          // Al salir de una sección hacia otra que no está en el menú, no queda nada resaltado.
          else setActiva((actual) => (actual === `#${entrada.target.id}` ? null : actual));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secciones.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const alScroll = () => setConSombra(window.scrollY > 8);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const alEscape = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", alEscape);
    return () => document.removeEventListener("keydown", alEscape);
  }, [abierto]);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/95 backdrop-blur transition-shadow ${
        conSombra ? "shadow-[0_1px_0_var(--color-line)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#inicio" className="display text-2xl" aria-label="Rodada, ir al inicio">
          rodada
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[15px] font-medium">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  aria-current={activa === e.href ? "location" : undefined}
                  className="relative py-1 hover:text-cobalt aria-[current=location]:text-cobalt after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-lane after:transition-transform aria-[current=location]:after:scale-x-100"
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#reservar" className="btn-primary hidden !py-2 md:inline-flex">
          Reservar turno
        </a>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center md:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
            {abierto ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="menu-movil"
        aria-label="Principal móvil"
        hidden={!abierto}
        className="border-t border-line bg-paper px-5 pb-6 md:hidden"
      >
        <ul className="flex flex-col text-lg font-medium">
          {enlaces.map((e) => (
            <li key={e.href}>
              <a href={e.href} className="block py-3" onClick={() => setAbierto(false)}>
                {e.texto}
              </a>
            </li>
          ))}
        </ul>
        <a href="#reservar" className="btn-primary mt-3 w-full" onClick={() => setAbierto(false)}>
          Reservar turno
        </a>
      </nav>
    </header>
  );
}
