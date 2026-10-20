import type { Metadata, Viewport } from "next";
import { taller } from "@/data/taller";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(taller.url),
  title: "Rodada | Taller de bicicletas en El Rosario, Barranquilla",
  description:
    "Mantenimiento, reparación y ensamble de bicicletas en El Rosario, Barranquilla. Diagnóstico gratis en 15 minutos y precio cerrado antes de empezar.",
  keywords: ["taller de bicicletas", "mantenimiento bicicleta Barranquilla", "El Rosario", "bike fit", "despinche"],
  openGraph: {
    title: "Rodada, taller de bicicletas",
    description: "Tu bici lista para rodar, sin esperar semanas.",
    url: taller.url,
    siteName: "Rodada",
    locale: "es_CO",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#14213d",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BicycleStore",
  name: taller.nombre,
  description: taller.descripcion,
  url: taller.url,
  telephone: taller.telefono,
  email: taller.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cra. 44 # 49-30",
    addressLocality: "Barranquilla",
    addressRegion: "Atlántico",
    addressCountry: "CO",
  },
  geo: { "@type": "GeoCoordinates", latitude: taller.coordenadas.lat, longitude: taller.coordenadas.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "07:00", closes: "13:00" },
  ],
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Saltar al contenido
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
