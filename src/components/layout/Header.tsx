"use client";

import { Bell, Search, Calendar, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [dateRange, setDateRange] = useState("month");

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Left: Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher (chambres, clients, réservations...)"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        {/* Date Filter */}
        <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
          <Calendar className="w-4 h-4 text-gray-400 ml-2" />
          {[
            { key: "today", label: "Aujourd'hui" },
            { key: "week", label: "Semaine" },
            { key: "month", label: "Mois" },
            { key: "year", label: "Année" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setDateRange(item.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                dateRange === item.key
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Rafraîchir les données">
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
            <span className="text-xs font-bold text-brand-700">JL</span>
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-gray-800">Jean-Louis</p>
            <p className="text-[10px] text-gray-400">Directeur</p>
          </div>
        </div>
      </div>
    </header>
  );
}
