"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hotel, Plus, ArrowRight, Star, Users, Building2 } from "lucide-react";

interface HotelItem {
  id: string;
  name: string;
  slug: string;
  city: string;
  stars: number;
  totalRooms: number;
  role: string;
  memberCount: number;
}

export default function SelectHotelPage() {
  const router = useRouter();
  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/hotels")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data.hotels || []);
        // Auto-redirect if only one hotel
        if (data.hotels?.length === 1) {
          router.push(`/dashboard?hotel=${data.hotels[0].id}`);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

  const selectHotel = (hotelId: string) => {
    router.push(`/dashboard?hotel=${hotelId}`);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 mb-4">
          <Hotel className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Sélectionnez un hôtel
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Choisissez l&apos;établissement que vous souhaitez gérer
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Chargement...</div>
      ) : (
        <div className="space-y-4">
          {hotels.map((hotel) => (
            <button
              key={hotel.id}
              onClick={() => selectHotel(hotel.id)}
              className="w-full bg-white rounded-xl border border-gray-200 p-6 hover:border-brand-300 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-hotel-gold" />
                        {hotel.stars} étoiles
                      </span>
                      <span>{hotel.totalRooms} chambres</span>
                      <span>{hotel.city}</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {hotel.memberCount}
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-600 transition-colors" />
              </div>
            </button>
          ))}

          <button
            onClick={() => router.push("/onboarding")}
            className="w-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-brand-400 hover:bg-brand-50 transition-all text-center"
          >
            <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-600">
              Ajouter un nouvel hôtel
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
