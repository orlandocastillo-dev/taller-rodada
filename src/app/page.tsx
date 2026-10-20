import { BarraMovil } from "@/components/BarraMovil";
import { Cotizador } from "@/components/Cotizador";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Proceso } from "@/components/Proceso";
import { QuoteProvider } from "@/components/QuoteContext";
import { Reserva } from "@/components/Reserva";
import { Servicios } from "@/components/Servicios";
import { Visitanos } from "@/components/Visitanos";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Servicios />
        <QuoteProvider>
          <Cotizador />
          <Proceso />
          <Faq />
          <Reserva />
        </QuoteProvider>
        <Visitanos />
      </main>
      <Footer />
      <BarraMovil />
    </>
  );
}
