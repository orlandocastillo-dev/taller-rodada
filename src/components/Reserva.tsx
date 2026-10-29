"use client";

import { useState, type FormEvent } from "react";
import { servicios, tiposBici, type TipoBiciId } from "@/data/taller";
import { crearIcs, mensajeConfirmacion } from "@/lib/calendario";
import { diaSemana, erroresDe, franjas, reservaSchema, type ErroresReserva, type FranjaId } from "@/lib/reserva";
import { taller } from "@/data/taller";
import { useQuote } from "./QuoteContext";

type Estado =
  | { tipo: "inactivo" }
  | { tipo: "enviando" }
  | { tipo: "exito"; codigo: string; nombre: string; fecha: string; franja: FranjaId; servicios: string[] }
  | { tipo: "error"; mensaje: string };

function fechaMinima(): string {
  // Fecha de hoy en Colombia en formato AAAA-MM-DD para el atributo min del input.
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date());
}

export function Reserva() {
  const { tipoBici, servicioIds, setTipoBici, toggleServicio } = useQuote();
  const [errores, setErrores] = useState<ErroresReserva>({});
  const [estado, setEstado] = useState<Estado>({ tipo: "inactivo" });
  const [fecha, setFecha] = useState("");
  const [franja, setFranja] = useState<FranjaId>("manana");
  const esDomingo = /^\d{4}-\d{2}-\d{2}$/.test(fecha) && diaSemana(fecha) === 0;

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const datos = {
      nombre: String(form.get("nombre") ?? ""),
      telefono: String(form.get("telefono") ?? ""),
      email: String(form.get("email") ?? ""),
      fecha: String(form.get("fecha") ?? ""),
      franja,
      comentarios: String(form.get("comentarios") ?? ""),
      empresa: String(form.get("empresa") ?? ""),
      tipoBici,
      servicioIds,
    };

    const validacion = reservaSchema.safeParse(datos);
    if (!validacion.success) {
      const errs = erroresDe(validacion.error);
      setErrores(errs);
      const primero = Object.keys(errs)[0];
      document.querySelector<HTMLElement>(`[data-campo="${primero}"]`)?.focus();
      return;
    }

    setErrores({});
    setEstado({ tipo: "enviando" });

    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const cuerpo = await res.json();
      if (!res.ok) {
        if (cuerpo.errores) setErrores(cuerpo.errores);
        setEstado({ tipo: "error", mensaje: cuerpo.mensaje ?? "No pudimos registrar la reserva." });
        return;
      }
      setEstado({
        tipo: "exito",
        codigo: cuerpo.codigo,
        nombre: validacion.data.nombre.split(" ")[0],
        fecha: validacion.data.fecha,
        franja: validacion.data.franja,
        servicios: servicios.filter((s) => servicioIds.includes(s.id)).map((s) => s.nombre),
      });
    } catch {
      setEstado({
        tipo: "error",
        mensaje: "No hay conexión con el servidor. Revisa tu internet o escríbenos por WhatsApp.",
      });
    }
  }

  if (estado.tipo === "exito") {
    const icsUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(crearIcs(estado))}`;
    const whatsapp = `https://wa.me/${taller.whatsapp}?text=${encodeURIComponent(
      mensajeConfirmacion(estado.nombre, estado.codigo, estado.fecha, estado.franja),
    )}`;
    const f = franjas.find((x) => x.id === estado.franja)!;
    const dia = new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Bogota" }).format(
      new Date(`${estado.fecha}T12:00:00-05:00`),
    );
    return (
      <Contenedor>
        <div className="rounded-2xl border-2 border-cobalt bg-white p-8" role="status">
          <p className="tabular text-sm font-semibold text-cobalt">Reserva {estado.codigo}</p>
          <h3 className="heading mt-2 text-3xl">Listo, {estado.nombre}. Te esperamos.</h3>
          <dl className="mt-6 grid gap-3 border-y border-line py-5 text-[15px] sm:grid-cols-[120px_1fr]">
            <dt className="text-steel">Día</dt>
            <dd className="font-semibold first-letter:uppercase">{dia}</dd>
            <dt className="text-steel">Hora</dt>
            <dd className="font-semibold">
              {f.nombre}, de {f.horas}
            </dd>
            <dt className="text-steel">Servicios</dt>
            <dd className="font-semibold">{estado.servicios.join(", ")}</dd>
            <dt className="text-steel">Dónde</dt>
            <dd className="font-semibold">{taller.direccion}</dd>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary">
              Confirmar por WhatsApp
            </a>
            <a href={icsUrl} download={`rodada-${estado.codigo}.ics`} className="btn-ghost">
              Agregar a mi calendario
            </a>
          </div>
          <button type="button" className="mt-6 text-[15px] font-semibold text-steel underline underline-offset-4 hover:text-ink" onClick={() => setEstado({ tipo: "inactivo" })}>
            Hacer otra reserva
          </button>
        </div>
      </Contenedor>
    );
  }

  return (
    <Contenedor>
      <form noValidate onSubmit={enviar} className="grid gap-6 sm:grid-cols-2">
        <Campo id="nombre" etiqueta="Nombre" error={errores.nombre}>
          <input id="nombre" name="nombre" data-campo="nombre" autoComplete="name" className="field" aria-invalid={!!errores.nombre} aria-describedby={errores.nombre ? "nombre-error" : undefined} />
        </Campo>

        <Campo id="telefono" etiqueta="Celular" error={errores.telefono}>
          <input id="telefono" name="telefono" data-campo="telefono" type="tel" inputMode="tel" autoComplete="tel" placeholder="300 555 0182" className="field" aria-invalid={!!errores.telefono} aria-describedby={errores.telefono ? "telefono-error" : undefined} />
        </Campo>

        <Campo id="email" etiqueta="Correo (opcional)" error={errores.email}>
          <input id="email" name="email" data-campo="email" type="email" autoComplete="email" className="field" aria-invalid={!!errores.email} aria-describedby={errores.email ? "email-error" : undefined} />
        </Campo>

        <Campo id="fecha" etiqueta="¿Qué día la traes?" error={errores.fecha}>
          <input id="fecha" name="fecha" data-campo="fecha" type="date" value={fecha} onChange={(e) => { setFecha(e.target.value); if (/^\d{4}-\d{2}-\d{2}$/.test(e.target.value) && diaSemana(e.target.value) === 0) setFranja("manana"); }} onFocus={(e) => (e.currentTarget.min = fechaMinima())} className="field" aria-invalid={!!errores.fecha} aria-describedby={errores.fecha ? "fecha-error" : undefined} />
        </Campo>

        <fieldset className="sm:col-span-2" aria-describedby={errores.franja ? "franja-error" : undefined}>
          <legend className="mb-2 font-semibold">¿A qué hora?</legend>
          <div className="grid grid-cols-2 gap-2">
            {franjas.map((f) => {
              const deshabilitada = esDomingo && f.id === "tarde";
              return (
                <label
                  key={f.id}
                  className={`cursor-pointer rounded-lg border-2 px-4 py-3 transition-colors has-[:checked]:border-cobalt has-[:checked]:bg-cobalt/5 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-cobalt ${
                    deshabilitada ? "cursor-not-allowed border-line opacity-50" : "border-line"
                  }`}
                >
                  <input
                    type="radio"
                    name="franja"
                    value={f.id}
                    checked={franja === f.id}
                    disabled={deshabilitada}
                    onChange={() => setFranja(f.id)}
                    className="sr-only"
                  />
                  <span className="block font-semibold">{f.nombre}</span>
                  <span className="text-sm text-steel">{deshabilitada ? "Domingo cerramos a la 1:00 p. m." : f.horas}</span>
                </label>
              );
            })}
          </div>
          {errores.franja && <Error id="franja-error">{errores.franja}</Error>}
        </fieldset>

        <Campo id="tipoBici" etiqueta="Tipo de bici" error={errores.tipoBici}>
          <select
            id="tipoBici"
            data-campo="tipoBici"
            className="field"
            value={tipoBici}
            onChange={(e) => setTipoBici(e.target.value as TipoBiciId)}
          >
            {tiposBici.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </Campo>

        <fieldset className="sm:col-span-2" aria-describedby={errores.servicioIds ? "servicioIds-error" : undefined}>
          <legend className="mb-2 font-semibold">Servicios</legend>
          <div className="flex flex-wrap gap-2" data-campo="servicioIds" tabIndex={-1}>
            {servicios.map((s) => {
              const activo = servicioIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={activo}
                  onClick={() => toggleServicio(s.id)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${
                    activo ? "border-cobalt bg-cobalt text-white" : "border-line bg-white hover:border-steel"
                  }`}
                >
                  {s.nombre}
                </button>
              );
            })}
          </div>
          {errores.servicioIds && <Error id="servicioIds-error">{errores.servicioIds}</Error>}
        </fieldset>

        <Campo id="comentarios" etiqueta="¿Qué le notas a la bici?" error={errores.comentarios} ancho>
          <textarea id="comentarios" name="comentarios" data-campo="comentarios" rows={4} maxLength={500} placeholder="Ej.: suena la cadena al cambiar a los piñones grandes" className="field resize-y" aria-invalid={!!errores.comentarios} />
        </Campo>

        {/* Honeypot: invisible para personas, los bots suelen llenarlo. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="empresa">Empresa</label>
          <input id="empresa" name="empresa" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
          <button type="submit" className="btn-primary sm:w-auto" disabled={estado.tipo === "enviando"}>
            {estado.tipo === "enviando" ? "Reservando…" : "Reservar turno"}
          </button>
          {estado.tipo === "error" && (
            <p role="alert" className="text-[15px] font-medium text-red-700">
              {estado.mensaje}
            </p>
          )}
        </div>
      </form>
    </Contenedor>
  );
}

function Contenedor({ children }: { children: React.ReactNode }) {
  return (
    <section id="reservar" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.6fr] md:py-28">
        <div>
          <h2 className="heading text-4xl md:text-5xl">Reserva tu turno</h2>
          <p className="mt-4 text-lg text-steel">
            Te confirmamos por WhatsApp en menos de una hora en horario de atención. Si cambias de planes, solo
            avísanos.
          </p>
          <ol className="mt-10 space-y-5 border-l-2 border-dashed border-lane pl-6">
            {[
              ["Te escribimos", "Confirmamos el día y la hora por WhatsApp."],
              ["Traes la bici", "Diagnóstico gratis en 15 minutos, frente a ti."],
              ["Apruebas el precio", "No tocamos nada sin que digas que sí."],
            ].map(([t, d], i) => (
              <li key={t} className="relative">
                <span className="tabular absolute -left-[37px] grid h-6 w-6 place-items-center rounded-full bg-ink text-xs font-bold text-lane">{i + 1}</span>
                <p className="font-semibold">{t}</p>
                <p className="text-[15px] text-steel">{d}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function Campo({
  id,
  etiqueta,
  error,
  ancho,
  children,
}: {
  id: string;
  etiqueta: string;
  error?: string;
  ancho?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={ancho ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="mb-2 block font-semibold">
        {etiqueta}
      </label>
      {children}
      {error && <Error id={`${id}-error`}>{error}</Error>}
    </div>
  );
}

function Error({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-700">
      {children}
    </p>
  );
}
