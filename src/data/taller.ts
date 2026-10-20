export const taller = {
  nombre: "Rodada",
  descripcion: "Taller de bicicletas en El Rosario, Barranquilla",
  direccion: "Cra. 44 # 49-30, El Rosario, Barranquilla",
  telefono: "+57 605 555 0182",
  whatsapp: "573005550182",
  email: "hola@rodada.co",
  url: "https://rodada.vercel.app",
  coordenadas: { lat: 10.9876, lng: -74.7874 },
} as const;

export type CategoriaServicio = "Mantenimiento" | "Reparación" | "Ensamble y ajuste";

export interface Servicio {
  id: string;
  nombre: string;
  detalle: string;
  categoria: CategoriaServicio;
  /** Tiempo de mano de obra en minutos. */
  minutos: number;
  /** Precio base en pesos colombianos, sin repuestos. */
  precio: number;
  unidad?: string;
  /** Se marca como "el más pedido" en la carta de servicios. */
  destacado?: boolean;
}

export const servicios: Servicio[] = [
  {
    id: "ajuste-rapido",
    nombre: "Ajuste rápido",
    detalle: "Frenos y cambios calibrados, presión de llantas y revisión de tornillería.",
    categoria: "Mantenimiento",
    minutos: 40,
    precio: 45000,
  },
  {
    id: "mantenimiento-general",
    nombre: "Mantenimiento general",
    detalle: "Limpieza completa, lubricación de transmisión, ajuste de frenos, cambios y dirección.",
    categoria: "Mantenimiento",
    minutos: 240,
    precio: 120000,
    destacado: true,
  },
  {
    id: "mantenimiento-full",
    nombre: "Mantenimiento full",
    detalle: "Desarme total, limpieza en ultrasonido, engrase de rodamientos y centrado de ruedas.",
    categoria: "Mantenimiento",
    minutos: 720,
    precio: 240000,
  },
  {
    id: "despinche",
    nombre: "Despinche o cambio de neumático",
    detalle: "Parche o neumático nuevo, revisión de la cubierta y de la cinta de rin.",
    categoria: "Reparación",
    minutos: 20,
    precio: 15000,
    unidad: "por rueda",
  },
  {
    id: "centrado",
    nombre: "Centrado de rueda",
    detalle: "Tensión de radios pareja y rin sin saltos laterales ni radiales.",
    categoria: "Reparación",
    minutos: 60,
    precio: 35000,
    unidad: "por rueda",
  },
  {
    id: "purga-frenos",
    nombre: "Purga de frenos hidráulicos",
    detalle: "Cambio de líquido, sangrado del sistema y centrado de cálipers.",
    categoria: "Reparación",
    minutos: 60,
    precio: 60000,
    unidad: "por freno",
  },
  {
    id: "tubeless",
    nombre: "Montaje tubeless",
    detalle: "Cinta, válvula y sellante. Incluye prueba de presión durante 24 horas.",
    categoria: "Reparación",
    minutos: 45,
    precio: 50000,
    unidad: "por rueda",
  },
  {
    id: "ensamble",
    nombre: "Ensamble de bici nueva",
    detalle: "Armado desde la caja con torque de fábrica y primer ajuste gratis al mes.",
    categoria: "Ensamble y ajuste",
    minutos: 300,
    precio: 150000,
  },
  {
    id: "bike-fit",
    nombre: "Bike fit básico",
    detalle: "Altura y retroceso de sillín, potencia y calas según tu postura y tu uso.",
    categoria: "Ensamble y ajuste",
    minutos: 90,
    precio: 180000,
  },
];

export const categorias: CategoriaServicio[] = ["Mantenimiento", "Reparación", "Ensamble y ajuste"];

export const tiposBici = [
  { id: "urbana", nombre: "Urbana o plegable", factor: 1 },
  { id: "ruta", nombre: "Ruta o gravel", factor: 1.1 },
  { id: "mtb", nombre: "Montaña (MTB)", factor: 1.15 },
  { id: "electrica", nombre: "Eléctrica", factor: 1.25 },
] as const;

export type TipoBiciId = (typeof tiposBici)[number]["id"];

/** Horario por día de la semana: 0 = domingo ... 6 = sábado. Horas en formato 24 h. */
export const horario: Record<number, { abre: number; cierra: number } | null> = {
  0: { abre: 7, cierra: 13 },
  1: { abre: 8, cierra: 19 },
  2: { abre: 8, cierra: 19 },
  3: { abre: 8, cierra: 19 },
  4: { abre: 8, cierra: 19 },
  5: { abre: 8, cierra: 19 },
  6: { abre: 8, cierra: 17 },
};

export const pasos = [
  {
    titulo: "Recibimos tu bici",
    texto: "Llegas con o sin reserva. Anotamos lo que notas: ruidos, frenos blandos, cambios que saltan.",
  },
  {
    titulo: "Diagnóstico en 15 minutos",
    texto: "Revisamos frente a ti y te damos el precio cerrado por WhatsApp antes de tocar una sola pieza.",
  },
  {
    titulo: "Reparamos",
    texto: "Solo hacemos lo que aprobaste. Si aparece algo nuevo, te escribimos primero.",
  },
  {
    titulo: "Prueba y entrega",
    texto: "Rodamos la bici en la calle antes de entregarla. Tienes 30 días de garantía en mano de obra.",
  },
];

export const preguntas = [
  {
    pregunta: "¿Necesito reserva?",
    respuesta:
      "No para despinches ni ajustes rápidos. Para mantenimientos y ensambles sí conviene reservar, así tu bici entra a banco el mismo día.",
  },
  {
    pregunta: "¿Los precios incluyen repuestos?",
    respuesta:
      "No. Los precios son de mano de obra. Si hace falta un repuesto te mostramos dos opciones de precio y tú decides; también puedes traer el tuyo.",
  },
  {
    pregunta: "¿Trabajan con bicis eléctricas?",
    respuesta:
      "Sí, en la parte mecánica: frenos, transmisión, ruedas y suspensión. Para batería y controlador te remitimos al servicio técnico de la marca.",
  },
  {
    pregunta: "¿Qué pasa los domingos?",
    respuesta:
      "Abrimos de 7:00 a. m. a 1:00 p. m. para quienes salen a rodar temprano, antes del calor: despinches, ajustes y préstamo de bomba sin costo.",
  },
  {
    pregunta: "¿Cómo pago?",
    respuesta: "Efectivo, tarjeta, Nequi o transferencia. Pagas al recoger la bici, nunca por adelantado.",
  },
];
