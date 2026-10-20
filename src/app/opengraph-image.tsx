import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { taller } from "@/data/taller";

export const alt = "Rodada, taller de bicicletas en El Rosario, Barranquilla";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen que aparece al compartir el enlace por WhatsApp, Facebook o LinkedIn. */
const fuente = (peso: number) =>
  readFile(join(process.cwd(), `node_modules/@fontsource/archivo/files/archivo-latin-${peso}-normal.woff`));

export default async function Imagen() {
  const [regular, negrita] = await Promise.all([fuente(400), fuente(800)]);
  const radios = Array.from({ length: 24 }, (_, i) => (i / 24) * 360);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#eceff3",
          position: "relative",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", width: 760 }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#14213d" }}>rodada</div>
          <div style={{ fontSize: 74, fontWeight: 800, color: "#14213d", lineHeight: 1.02, marginTop: 28, letterSpacing: -2 }}>
            Tu bici lista para rodar, sin esperar semanas.
          </div>
          <div style={{ fontSize: 30, color: "#5b6475", marginTop: 28 }}>{taller.direccion}</div>
        </div>
        <div
          style={{
            position: "absolute",
            right: -120,
            top: 75,
            width: 480,
            height: 480,
            borderRadius: 480,
            border: "34px solid #14213d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {radios.map((grados) => (
            <div
              key={grados}
              style={{
                position: "absolute",
                width: 390,
                height: 3,
                background: "#5b6475",
                transform: `rotate(${grados}deg)`,
              }}
            />
          ))}
          <div style={{ width: 70, height: 70, borderRadius: 70, background: "#2442d8", display: "flex" }} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18, display: "flex", background: "#14213d" }}>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} style={{ width: 60, height: 18, marginRight: 22, background: "#f4c430" }} />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo", data: negrita, weight: 800, style: "normal" },
      ],
    },
  );
}
