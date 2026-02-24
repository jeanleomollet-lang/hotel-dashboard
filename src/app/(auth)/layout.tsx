import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HotelPilot - Connexion",
};

export const dynamic = "force-dynamic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-blue-50 flex items-center justify-center p-4">
        {children}
      </div>
    </Suspense>
  );
}
