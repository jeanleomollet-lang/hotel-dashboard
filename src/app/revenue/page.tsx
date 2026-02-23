"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Target,
  Percent,
  Zap,
  Scale,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import AIAnalysisPanel from "@/components/ai/AIAnalysisPanel";
import { monthlyKPIs, currentMonthKPI, previousMonthKPI, dailyKPIs } from "@/data/mock-kpis";
import { aiInsights } from "@/data/mock-ai-insights";
import { formatCurrency, formatPercent, getVariation } from "@/lib/utils";
import { hotelProfile } from "@/data/mock-hotel";

export default function RevenuePage() {
  const adrVariation = getVariation(currentMonthKPI.adr, previousMonthKPI.adr);
  const revparVariation = getVariation(currentMonthKPI.revpar, previousMonthKPI.revpar);
  const trevparVariation = getVariation(currentMonthKPI.trevpar, previousMonthKPI.trevpar);
  const gopparVariation = getVariation(currentMonthKPI.goppar, previousMonthKPI.goppar);

  // ADR by room type simulation
  const roomTypeRevenue = hotelProfile.roomTypes.map((rt) => {
    const occupancy = 40 + Math.random() * 40;
    const actualAdr = rt.basePrice * (0.85 + Math.random() * 0.3);
    return {
      type: rt.name,
      "Prix rack": rt.basePrice,
      "ADR réel": Math.round(actualAdr),
      "Occupation": Math.round(occupancy),
      RevPAR: Math.round((actualAdr * occupancy) / 100),
      chambres: rt.count,
    };
  });

  // Monthly RevPAR evolution
  const revparEvolution = monthlyKPIs.map((m) => ({
    month: m.month.substring(0, 3),
    ADR: m.adr,
    RevPAR: m.revpar,
    TRevPAR: m.trevpar,
    GOPPAR: m.goppar,
  }));

  // Booking pace (simulated)
  const bookingPace = [
    { jour: "J-30", "Cette année": 15, "Année dernière": 12 },
    { jour: "J-25", "Cette année": 28, "Année dernière": 22 },
    { jour: "J-20", "Cette année": 38, "Année dernière": 35 },
    { jour: "J-15", "Cette année": 52, "Année dernière": 48 },
    { jour: "J-10", "Cette année": 62, "Année dernière": 58 },
    { jour: "J-7", "Cette année": 72, "Année dernière": 65 },
    { jour: "J-3", "Cette année": 82, "Année dernière": 75 },
    { jour: "J-1", "Cette année": 88, "Année dernière": 82 },
    { jour: "Jour J", "Cette année": 92, "Année dernière": 85 },
  ];

  // Channel mix evolution
  const channelMix = monthlyKPIs.map((m) => ({
    month: m.month.substring(0, 3),
    Direct: m.directBookingRate,
    OTA: m.otaBookingRate,
    Autres: 100 - m.directBookingRate - m.otaBookingRate,
  }));

  // Daily pricing (last 23 days)
  const dailyPricing = dailyKPIs.map((d) => ({
    date: new Date(d.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
    ADR: d.adr,
    Occupation: d.occupancyRate,
    RevPAR: d.revpar,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Revenue Management"
        subtitle="Optimisation tarifaire et gestion du yield avec intelligence artificielle"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="ADR (Prix moyen)"
          value={formatCurrency(currentMonthKPI.adr)}
          subtitle="vs mois précédent"
          variation={adrVariation}
          icon={DollarSign}
          iconColor="text-emerald-600 bg-emerald-50"
        />
        <StatCard
          title="RevPAR"
          value={formatCurrency(currentMonthKPI.revpar)}
          subtitle="Revenue per available room"
          variation={revparVariation}
          icon={TrendingUp}
          iconColor="text-blue-600 bg-blue-50"
        />
        <StatCard
          title="TRevPAR"
          value={formatCurrency(currentMonthKPI.trevpar)}
          subtitle="Total revenue per available room"
          variation={trevparVariation}
          icon={BarChart3}
          iconColor="text-violet-600 bg-violet-50"
        />
        <StatCard
          title="GOPPAR"
          value={formatCurrency(currentMonthKPI.goppar)}
          subtitle="Gross operating profit / room"
          variation={gopparVariation}
          icon={Target}
          iconColor="text-amber-600 bg-amber-50"
        />
      </div>

      {/* Revenue per room type */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-gray-900">Performance par type de chambre</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Type de chambre</th>
                <th className="text-right">Nb chambres</th>
                <th className="text-right">Prix rack</th>
                <th className="text-right">ADR réel</th>
                <th className="text-right">Écart</th>
                <th className="text-right">Occupation</th>
                <th className="text-right">RevPAR</th>
              </tr>
            </thead>
            <tbody>
              {roomTypeRevenue.map((rt) => {
                const gap = rt["ADR réel"] - rt["Prix rack"];
                return (
                  <tr key={rt.type}>
                    <td className="font-medium">{rt.type}</td>
                    <td className="text-right">{rt.chambres}</td>
                    <td className="text-right">{formatCurrency(rt["Prix rack"])}</td>
                    <td className="text-right font-semibold">{formatCurrency(rt["ADR réel"])}</td>
                    <td className={`text-right font-medium ${gap >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {gap >= 0 ? "+" : ""}{formatCurrency(gap)}
                    </td>
                    <td className="text-right">{formatPercent(rt.Occupation)}</td>
                    <td className="text-right font-semibold">{formatCurrency(rt.RevPAR)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RevPAR Evolution */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Évolution indicateurs / chambre disponible</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revparEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} unit="€" />
                <Tooltip formatter={(value: number) => [`${value} €`, undefined]} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} />
                <Line type="monotone" dataKey="ADR" stroke="#d4a843" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="RevPAR" stroke="#4c6ef5" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="TRevPAR" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="GOPPAR" stroke="#22c55e" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Pace */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-gray-900">Booking Pace — Rythme de réservation</h3>
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={bookingPace}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="jour" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} unit="%" />
                <Tooltip formatter={(value: number) => [`${value}%`, undefined]} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} />
                <Area type="monotone" dataKey="Cette année" stroke="#4c6ef5" fill="#4c6ef5" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="Année dernière" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Channel Mix + Daily Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-gray-900">Mix canaux de distribution</h3>
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={channelMix}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} unit="%" />
                <Tooltip formatter={(value: number) => [`${value}%`, undefined]} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="Direct" stackId="a" fill="#22c55e" />
                <Bar dataKey="OTA" stackId="a" fill="#ef4444" />
                <Bar dataKey="Autres" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Pricing quotidien — ADR vs Occupation</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dailyPricing}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} unit="€" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} unit="%" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} />
                <Line yAxisId="left" type="monotone" dataKey="ADR" stroke="#d4a843" strokeWidth={2} dot={{ r: 2 }} />
                <Line yAxisId="left" type="monotone" dataKey="RevPAR" stroke="#4c6ef5" strokeWidth={2} dot={{ r: 2 }} />
                <Line yAxisId="right" type="monotone" dataKey="Occupation" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Revenue Insights */}
      <AIAnalysisPanel
        insights={aiInsights}
        title="Analyse IA — Revenue Management"
        category="revenue"
      />
    </div>
  );
}
