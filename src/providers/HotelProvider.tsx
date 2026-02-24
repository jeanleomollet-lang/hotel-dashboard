"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface HotelContext {
  currentHotelId: string | null;
  currentHotelName: string | null;
  currentPlan: string | null;
  setCurrentHotel: (hotelId: string) => void;
  isDemo: boolean;
}

const HotelContext = createContext<HotelContext>({
  currentHotelId: null,
  currentHotelName: null,
  currentPlan: null,
  setCurrentHotel: () => {},
  isDemo: true,
});

export function useHotel() {
  return useContext(HotelContext);
}

export default function HotelProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [currentHotelId, setCurrentHotelId] = useState<string | null>(null);
  const [currentHotelName, setCurrentHotelName] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  const isDemo = !session?.user;

  useEffect(() => {
    const hotelParam = searchParams.get("hotel");
    if (hotelParam) {
      setCurrentHotelId(hotelParam);
      localStorage.setItem("currentHotelId", hotelParam);
    } else {
      const stored = localStorage.getItem("currentHotelId");
      if (stored) setCurrentHotelId(stored);
    }
  }, [searchParams]);

  useEffect(() => {
    if (session?.user && currentHotelId) {
      const membership = (session.user as any).memberships?.find(
        (m: any) => m.hotelId === currentHotelId
      );
      if (membership) {
        setCurrentHotelName(membership.hotelName);
      }
    }
  }, [session, currentHotelId]);

  const setCurrentHotel = (hotelId: string) => {
    setCurrentHotelId(hotelId);
    localStorage.setItem("currentHotelId", hotelId);
  };

  return (
    <HotelContext.Provider
      value={{
        currentHotelId,
        currentHotelName,
        currentPlan,
        setCurrentHotel,
        isDemo,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}
