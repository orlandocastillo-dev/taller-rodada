# Rodada: landing page para un taller de bicicletas

Sitio de una página para **Rodada**, un taller de bicicletas (ficticio) en el barrio El Rosario, Barranquilla. El objetivo del sitio es que una persona entienda en segundos qué hace el taller, cuánto le va a costar y pueda reservar un turno sin llamar.

![Vista de escritorio](docs/captura-inicio.png)

## Qué incluye

- **Cotizador interactivo.** El cliente elige tipo de bici y servicios y ve el precio estimado, el tiempo de trabajo y la fecha de entrega. El cálculo vive en una función pura (`src/lib/quote.ts`) con pruebas unitarias.
- **Reserva con validación en cliente y servidor.** El mismo esquema de [Zod](https://zod.dev) se usa en el formulario y en el endpoint `POST /api/reservas`, así las reglas no se duplican. Incluye honeypot contra bots y límite de solicitudes por IP.
- **Estado "abierto / cerrado" en vivo**, calculado con la hora de Colombia sin importar desde dónde se visite el sitio.
- **El cotizador y el formulario comparten estado** con React Context: lo que se cotiza llega ya marcado a la reserva. La cotización también se puede enviar por WhatsApp.
- **Turnos por franja** (mañana o tarde) con reglas del negocio validadas en el esquema: los domingos solo hay turnos en la mañana.
- **Confirmación útil:** al reservar se muestra el resumen, un botón para confirmar por WhatsApp con el mensaje ya escrito y un archivo **.ics** para agregar la cita al calendario (Google, Outlook o el del celular) con recordatorio dos horas antes.
- **Navegación que acompaña:** el menú resalta la sección visible y en el celular aparece una barra fija con "Reservar" y WhatsApp.
- **Imagen para redes generada con código** (`opengraph-image.tsx`): así se ve el enlace al compartirlo por WhatsApp o LinkedIn. Página 404 propia.
- **SEO técnico:** metadatos Open Graph, datos estructurados `BicycleStore` (JSON-LD), `sitemap.xml` y `robots.txt` generados por Next.js.
- **Accesibilidad:** HTML semántico, enlace "saltar al contenido", foco visible, errores asociados con `aria-describedby`, menú móvil con `aria-expanded` y cierre con Escape, respeto a `prefers-reduced-motion`.
- **Responsive** desde 360 px.

<p align="center"><img src="docs/captura-movil.png" alt="Vista móvil" width="300"></p>

## Stack

| Área | Herramienta |
| --- | --- |
| Framework | Next.js 16 (App Router) con React 19 |
| Lenguaje | TypeScript en modo estricto |
| Estilos | Tailwind CSS 4 con tokens de diseño propios |
| Validación | Zod |
| Pruebas | Vitest |
| Calidad | ESLint, `tsc --noEmit`, GitHub Actions |
| Tipografía | Archivo (variable, eje de ancho) autoalojada con Fontsource |

## Cómo correrlo

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
```

Otros comandos:

```bash
npm test           # pruebas unitarias
npm run typecheck  # verificación de tipos
npm run lint
npm run build && npm start
```

## Estructura

```
src/
├── app/
│   ├── api/reservas/route.ts   # endpoint de reservas (validación + rate limit)
│   ├── layout.tsx              # metadatos, JSON-LD, fuente
│   ├── page.tsx                # composición de secciones
│   ├── opengraph-image.tsx     # imagen para compartir en redes
│   ├── not-found.tsx
│   ├── sitemap.ts / robots.ts
│   └── globals.css             # tokens de color y utilidades
├── components/                 # una sección por archivo
├── data/taller.ts              # servicios, precios, horario y textos
└── lib/
    ├── quote.ts                # lógica del cotizador
    ├── horario.ts              # estado abierto/cerrado en hora de Colombia
    ├── reserva.ts              # esquema Zod compartido y franjas horarias
    ├── calendario.ts           # archivo .ics y mensaje de confirmación
    └── format.ts               # formato de pesos y duraciones
tests/                          # pruebas de cotizador, horario, reserva y calendario
```

Todo el contenido del negocio (precios, servicios, horario, preguntas frecuentes) está en `src/data/taller.ts`. Para adaptar el sitio a otro negocio basta con editar ese archivo y los textos de las secciones.

## Decisiones de diseño

- **Identidad visual tomada de la señalización vial para ciclistas:** azul cobalto de señalización, amarillo de demarcación vial y la línea discontinua como elemento gráfico que separa secciones y conecta los pasos del proceso.
- **Una sola familia tipográfica** (Archivo) usando su eje de ancho: expandida para titulares, normal para lectura.
- La rueda del encabezado es un SVG generado por código (radios cruzados como en una rueda real) que gira con el scroll y se detiene si el usuario pidió reducir movimiento.
- Los precios se muestran como una lista con columnas alineadas y números tabulares, como la carta de un taller, en lugar de tarjetas.

## Despliegue

Pensado para [Vercel](https://vercel.com): importar el repositorio y desplegar, no requiere variables de entorno. En `src/app/api/reservas/route.ts` está marcado el punto donde conectar un servicio de correo (por ejemplo Resend) o una base de datos para guardar las reservas.

## Próximos pasos

- Guardar reservas en Supabase y enviar confirmación por correo.
- Panel interno para que el taller vea las reservas del día.
- Pruebas end-to-end del flujo de reserva con Playwright.

---

Proyecto de portafolio de Orlando Castillo. El negocio, la dirección y los datos de contacto son ficticios.
