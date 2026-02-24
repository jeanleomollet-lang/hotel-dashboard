import { Suspense } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import HotelProvider from "@/providers/HotelProvider";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <HotelProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-[260px]">
            <Header />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </HotelProvider>
    </Suspense>
  );
}
