import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";

export const metadata: Metadata = {
  title: "HotelPilot - Dashboard Hôtelier Intelligent",
  description:
    "Dashboard de gestion hôtelière avec analyse IA intégrée pour hôteliers indépendants",
  keywords: ["hotel", "dashboard", "gestion hôtelière", "revenue management", "PMS"],
  openGraph: {
    title: "HotelPilot - Dashboard Hôtelier Intelligent",
    description: "Optimisez la gestion de votre hôtel avec l'IA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
