const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function pesos(valor: number): string {
  return cop.format(valor).replace(/ /g, " ");
}

export function duracion(minutos: number): string {
  if (minutos < 60) return `${minutos} min`;
  const horas = minutos / 60;
  return Number.isInteger(horas) ? `${horas} h` : `${horas.toFixed(1).replace(".", ",")} h`;
}
