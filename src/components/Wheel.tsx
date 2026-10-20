"use client";

import { useEffect, useRef } from "react";

const RADIOS = 32;
const CENTRO = 200;
const RIN = 168;
const BUJE = 22;

/** Radios cruzados: cada radio sale del buje con un desfase angular, como en una rueda real. */
function generarRadios() {
  const lineas: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < RADIOS; i++) {
    const angulo = (i / RADIOS) * Math.PI * 2;
    const desfase = (i % 2 === 0 ? 1 : -1) * 0.42;
    lineas.push({
      x1: CENTRO + Math.cos(angulo + desfase) * BUJE,
      y1: CENTRO + Math.sin(angulo + desfase) * BUJE,
      x2: CENTRO + Math.cos(angulo) * RIN,
      y2: CENTRO + Math.sin(angulo) * RIN,
    });
  }
  return lineas;
}

const radios = generarRadios();

export function Wheel({ className = "" }: { className?: string }) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducir.matches) return;

    let frame = 0;
    const girar = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ref.current?.setAttribute("transform", `rotate(${window.scrollY * 0.25} ${CENTRO} ${CENTRO})`);
      });
    };

    window.addEventListener("scroll", girar, { passive: true });
    return () => {
      window.removeEventListener("scroll", girar);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <g ref={ref}>
        {/* Llanta con taco */}
        <circle cx={CENTRO} cy={CENTRO} r={186} fill="none" stroke="var(--color-ink)" strokeWidth={22} />
        <circle
          cx={CENTRO}
          cy={CENTRO}
          r={196}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth={4}
          strokeDasharray="6 9"
        />
        {/* Rin */}
        <circle cx={CENTRO} cy={CENTRO} r={RIN + 4} fill="none" stroke="var(--color-steel)" strokeWidth={8} />
        {radios.map((r, i) => (
          <line key={i} {...r} stroke="var(--color-steel)" strokeWidth={1.6} strokeLinecap="round" />
        ))}
        {/* Buje */}
        <circle cx={CENTRO} cy={CENTRO} r={BUJE + 6} fill="var(--color-cobalt)" />
        <circle cx={CENTRO} cy={CENTRO} r={8} fill="var(--color-paper)" />
        {/* Válvula */}
        <rect x={CENTRO - 4} y={CENTRO - RIN - 18} width={8} height={18} rx={2} fill="var(--color-lane)" />
      </g>
    </svg>
  );
}
