"use client";

import { useEffect, useState } from "react";
import { taller } from "@/data/taller";

/**
 * En el celular, después de pasar el inicio aparece una barra fija con las dos acciones
 * que más importan: reservar y escribir por WhatsApp. Se esconde al llegar al formulario.
 */
export function BarraMovil() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reserva = document.getElementById("reservar");
    const actualizar = () => {
      const pasoElInicio = window.scrollY > window.innerHeight * 0.8;
      const enReserva = reserva ? reserva.getBoundingClientRect().top < window.innerHeight * 0.6 && reserva.getBoundingClientRect().bottom > 0 : false;
      setVisible(pasoElInicio && !enReserva);
    };
    actualizar();
    window.addEventListener("scroll", actualizar, { passive: true });
    return () => window.removeEventListener("scroll", actualizar);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-30 flex gap-2 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-[150%]"
      }`}
      aria-hidden={!visible}
    >
      <a href="#reservar" className="btn-primary flex-1 shadow-lg" tabIndex={visible ? 0 : -1}>
        Reservar turno
      </a>
      <a
        href={`https://wa.me/${taller.whatsapp}`}
        className="btn grid size-[52px] place-items-center !p-0 bg-[#1f8f4e] text-white shadow-lg"
        aria-label="Escribir por WhatsApp"
        tabIndex={visible ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3z" />
        </svg>
      </a>
    </div>
  );
}
