import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/shared/theme-provider";

// Fontes Nunito e Nunito_Sans implementadas
// subsets esta "latin", mas por hora o projeto esta em inglês por conta da api
// OBS: i18n a ser implementado
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty Portal",
  description: "Pesquise e descubra tudo sobre o universo de Rick aqui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn( 
          "min-h-screen bg-background font-sans antialiased",
          nunito.className,
          nunitoSans.className
        )}
      >
        {/* Provedor de tema nos modos claro e escuro - shadcn */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
