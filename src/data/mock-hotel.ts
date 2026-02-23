import { HotelProfile } from "@/types/hotel";

export const hotelProfile: HotelProfile = {
  id: "htl-001",
  name: "Le Clos des Vignes",
  address: "12 Avenue de la République",
  city: "Aix-en-Provence",
  country: "France",
  stars: 4,
  totalRooms: 42,
  roomTypes: [
    { id: "rt-1", name: "Standard", count: 15, basePrice: 120, description: "Chambre standard 22m²" },
    { id: "rt-2", name: "Supérieure", count: 12, basePrice: 180, description: "Chambre supérieure 28m²" },
    { id: "rt-3", name: "Deluxe", count: 8, basePrice: 260, description: "Chambre deluxe 35m²" },
    { id: "rt-4", name: "Suite Junior", count: 5, basePrice: 380, description: "Suite junior 45m²" },
    { id: "rt-5", name: "Suite Prestige", count: 2, basePrice: 520, description: "Suite prestige 65m²" },
  ],
  currency: "EUR",
  timezone: "Europe/Paris",
  createdAt: "2024-01-15",
};
