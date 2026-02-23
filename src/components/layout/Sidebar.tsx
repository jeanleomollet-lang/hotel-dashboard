"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  DollarSign,
  Settings2,
  Users,
  TrendingUp,
  Plug,
  PenSquare,
  Hotel,
  BedDouble,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Financier", href: "/financier", icon: DollarSign },
  { name: "Opérationnel", href: "/operationnel", icon: BedDouble },
  { name: "Revenue Management", href: "/revenue", icon: TrendingUp },
  { name: "Clients & CRM", href: "/guests", icon: Users },
  { name: "Saisie manuelle", href: "/saisie", icon: PenSquare },
  { name: "Intégrations", href: "/integrations", icon: Plug },
  { name: "Paramètres", href: "/parametres", icon: Settings2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shrink-0">
          <Hotel className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in overflow-hidden">
            <h1 className="text-base font-bold text-gray-900 truncate">HotelPilot</h1>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Dashboard Pro</p>
          </div>
        )}
      </div>

      {/* AI Badge */}
      {!collapsed && (
        <div className="mx-4 mt-4 mb-2 px-3 py-2 bg-gradient-to-r from-violet-50 to-blue-50 rounded-lg border border-violet-200 animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-semibold text-violet-700">IA Active</span>
            <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
          </div>
          <p className="text-[10px] text-violet-500 mt-1">Analyse en temps réel</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                isActive ? "nav-item-active" : "nav-item-inactive",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-brand-600" : "text-gray-400")} />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Hotel Info */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-gray-100 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-hotel-gold/20 flex items-center justify-center">
              <span className="text-xs font-bold text-hotel-gold">CV</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-800 truncate">Le Clos des Vignes</p>
              <p className="text-[10px] text-gray-400">★★★★ · 42 chambres</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-gray-500" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-gray-500" />
        )}
      </button>
    </aside>
  );
}
