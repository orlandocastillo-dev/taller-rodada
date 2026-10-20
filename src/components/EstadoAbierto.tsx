"use client";

import { useEffect, useState } from "react";
import { estadoTaller, type EstadoTaller } from "@/lib/horario";

/** Se calcula en el navegador para reflejar la hora real del visitante (convertida a la hora de Colombia). */
export function EstadoAbierto() {
  const [estado, setEstado] = useState<EstadoTaller | null>(null);

  useEffect(() => {
    const actualizar = () => setEstado(estadoTaller(new Date()));
    actualizar();
    const id = setInterval(actualizar, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="flex items-center gap-2.5 font-semibold" aria-live="polite">
      <span
        className={`size-2.5 rounded-full ${
          estado === null ? "bg-steel/40" : estado.abierto ? "bg-emerald-600" : "bg-red-600"
        }`}
        aria-hidden="true"
      />
      {estado?.mensaje ?? "Consultando horario…"}
    </p>
  );
}
