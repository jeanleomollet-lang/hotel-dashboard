"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  Activity,
  AlertTriangle,
  DollarSign,
  BarChart3,
} from "lucide-react";

interface AdminStats {
  totalHotels: number;
  activeSubscriptions: number;
  totalUsers: number;
  mrr: number;
  trialUsers: number;
  churnRate: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalHotels: 0,
    activeSubscriptions: 0,
    totalUsers: 0,
    mrr: 0,
    trialUsers: 0,
    churnRate: 0,
  });

  useEffect(() => {
    // In production, fetch from /api/admin/stats
    setStats({
      totalHotels: 47,
      activeSubscriptions: 38,
      totalUsers: 124,
      mrr: 8750,
      trialUsers: 9,
      churnRate: 2.3,
    });
  }, []);

  const statCards = [
    {
      label: "Hôtels inscrits",
      value: stats.totalHotels,
      icon: Building2,
      color: "text-brand-600",
      bg: "bg-brand-50",
    },
    {
      label: "Abonnements actifs",
      value: stats.activeSubscriptions,
      icon: CreditCard,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Utilisateurs",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "MRR",
      value: `${stats.mrr.toLocaleString("fr-FR")} €`,
      icon: DollarSign,
      color: "text-hotel-gold",
      bg: "bg-amber-50",
    },
    {
      label: "En essai",
      value: stats.trialUsers,
      icon: Activity,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Taux de churn",
      value: `${stats.churnRate}%`,
      icon: AlertTriangle,
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Administration SaaS
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Vue d&apos;ensemble de la plateforme HotelPilot
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="stat-card">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}
              >
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{card.label}</p>
                <p className="text-lg font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              Répartition des plans
            </h3>
          </div>
          <div className="card-body space-y-4">
            {[
              { plan: "Starter", count: 18, color: "bg-blue-500", revenue: 882 },
              { plan: "Professional", count: 15, color: "bg-brand-600", revenue: 2235 },
              { plan: "Enterprise", count: 5, color: "bg-violet-600", revenue: 1745 },
            ].map((p) => (
              <div key={p.plan} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${p.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {p.plan}
                    </span>
                    <span className="text-xs text-gray-500">
                      {p.count} hôtels · {p.revenue.toLocaleString("fr-FR")} €/mois
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`${p.color} h-2 rounded-full transition-all`}
                      style={{ width: `${(p.count / 38) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              Métriques clés
            </h3>
          </div>
          <div className="card-body space-y-4">
            {[
              { label: "ARPU", value: "230 €", desc: "Revenu moyen par utilisateur" },
              { label: "LTV", value: "4 140 €", desc: "Valeur vie client (18 mois)" },
              { label: "CAC", value: "320 €", desc: "Coût d'acquisition client" },
              { label: "LTV/CAC", value: "12.9x", desc: "Ratio LTV/CAC" },
              { label: "NRR", value: "108%", desc: "Net Revenue Retention" },
            ].map((m) => (
              <div key={m.label} className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    {m.label}
                  </span>
                  <p className="text-xs text-gray-400">{m.desc}</p>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent signups */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-gray-900">
            Inscriptions récentes
          </h3>
        </div>
        <div className="table-container border-0">
          <table className="table">
            <thead>
              <tr>
                <th>Hôtel</th>
                <th>Plan</th>
                <th>Chambres</th>
                <th>Ville</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Hôtel Le Marais", plan: "Professional", rooms: 45, city: "Paris", status: "Actif", date: "24/02/2026" },
                { name: "Villa Méditerranée", plan: "Starter", rooms: 22, city: "Nice", status: "Essai", date: "23/02/2026" },
                { name: "Château Royal", plan: "Enterprise", rooms: 120, city: "Bordeaux", status: "Actif", date: "22/02/2026" },
                { name: "Boutique Saint-Germain", plan: "Professional", rooms: 32, city: "Paris", status: "Essai", date: "21/02/2026" },
                { name: "Hôtel des Alpes", plan: "Starter", rooms: 28, city: "Annecy", status: "Actif", date: "20/02/2026" },
              ].map((h) => (
                <tr key={h.name}>
                  <td className="font-medium">{h.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        h.plan === "Enterprise"
                          ? "badge-info"
                          : h.plan === "Professional"
                          ? "badge-success"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {h.plan}
                    </span>
                  </td>
                  <td>{h.rooms}</td>
                  <td>{h.city}</td>
                  <td>
                    <span
                      className={
                        h.status === "Actif"
                          ? "text-emerald-600 font-medium"
                          : "text-amber-600 font-medium"
                      }
                    >
                      {h.status}
                    </span>
                  </td>
                  <td className="text-gray-500">{h.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
