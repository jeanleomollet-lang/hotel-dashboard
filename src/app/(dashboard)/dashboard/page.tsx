"use client";

import {
  BedDouble,
  DollarSign,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  CalendarClock,
  Star,
  Sparkles,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import OccupancyChart from "@/components/charts/OccupancyChart";
import RevenueChart from "@/components/charts/RevenueChart";
import RevParChart from "@/components/charts/RevParChart";
import AIAnalysisPanel from "@/components/ai/AIAnalysisPanel";
import { todayKPI, yesterdayKPI, currentMonthKPI, previousMonthKPI } from "@/data/mock-kpis";
import { currentMonthFinancial } from "@/data/mock-financial";
import { todayOperational } from "@/data/mock-operational";
import { aiInsights } from "@/data/mock-ai-insights";
import { formatCurrency, formatPercent, getVariation } from "@/lib/utils";

export default function DashboardPage() {
  const occVariation = getVariation(todayKPI.occupancyRate, yesterdayKPI.occupancyRate);
  const adrVariation = getVariation(todayKPI.adr, yesterdayKPI.adr);
  const revparVariation = getVariation(todayKPI.revpar, yesterdayKPI.revpar);
  const revenueVariation = getVariation(currentMonthKPI.totalRevenue, previousMonthKPI.totalRevenue);

  const criticalInsights = aiInsights.filter(
    (i) => i.severity === "critical" || i.severity === "warning"
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble de votre établissement en temps réel"
      />

      {/* Critical AI Alerts Banner */}
      {criticalInsights.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-red-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">
              {criticalInsights.length} alerte{criticalInsights.length > 1 ? "s" : ""} nécessitant votre attention
            </span>
          </div>
          <div className="space-y-1">
            {criticalInsights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="flex items-center gap-2 text-xs text-amber-700">
                <span className={`w-1.5 h-1.5 rounded-full ${insight.severity === "critical" ? "bg-red-500" : "bg-amber-500"}`} />
                <span className="font-medium">{insight.title}</span>
                <span className="text-amber-500">·</span>
                <span className="text-amber-600">{insight.description.substring(0, 80)}...</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's KPIs */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CalendarClock className="w-4 h-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-700">Aujourd&apos;hui — 23 février 2026</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Taux d'occupation"
            value={formatPercent(todayKPI.occupancyRate)}
            subtitle={`${todayKPI.roomsSold}/${todayKPI.roomsAvailable} ch.`}
            variation={occVariation}
            icon={BedDouble}
            iconColor="text-blue-600 bg-blue-50"
          />
          <StatCard
            title="ADR (Prix Moyen)"
            value={formatCurrency(todayKPI.adr)}
            subtitle="vs hier"
            variation={adrVariation}
            icon={DollarSign}
            iconColor="text-emerald-600 bg-emerald-50"
          />
          <StatCard
            title="RevPAR"
            value={formatCurrency(todayKPI.revpar)}
            subtitle="vs hier"
            variation={revparVariation}
            icon={TrendingUp}
            iconColor="text-violet-600 bg-violet-50"
          />
          <StatCard
            title="CA du jour"
            value={formatCurrency(todayKPI.totalRevenue)}
            subtitle={`Chambres: ${formatCurrency(todayKPI.roomRevenue)}`}
            icon={BarChart3}
            iconColor="text-amber-600 bg-amber-50"
          />
        </div>
      </div>

      {/* Monthly Summary KPIs */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-700">Résumé mensuel — Février 2026</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="stat-card">
            <p className="text-[10px] font-medium text-gray-400 uppercase">CA Total</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(currentMonthKPI.totalRevenue)}</p>
            <span className={`text-[10px] font-semibold mt-1 inline-flex items-center gap-0.5 ${revenueVariation.isPositive ? "text-emerald-600" : "text-red-500"}`}>
              {revenueVariation.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {revenueVariation.value.toFixed(1)}%
            </span>
          </div>
          <div className="stat-card">
            <p className="text-[10px] font-medium text-gray-400 uppercase">Marge nette</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{formatPercent(currentMonthFinancial.profit.netMargin)}</p>
            <span className="text-[10px] text-gray-400">EBITDA: {formatCurrency(currentMonthFinancial.profit.ebitda)}</span>
          </div>
          <div className="stat-card">
            <p className="text-[10px] font-medium text-gray-400 uppercase">Occupation moy.</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{formatPercent(currentMonthKPI.occupancyRate)}</p>
            <span className="text-[10px] text-gray-400">{currentMonthKPI.totalNightsSold} nuitées</span>
          </div>
          <div className="stat-card">
            <p className="text-[10px] font-medium text-gray-400 uppercase">Direct vs OTA</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{currentMonthKPI.directBookingRate}% / {currentMonthKPI.otaBookingRate}%</p>
            <span className="text-[10px] text-emerald-600 font-medium">Direct en hausse</span>
          </div>
          <div className="stat-card">
            <p className="text-[10px] font-medium text-gray-400 uppercase">Satisfaction</p>
            <p className="text-lg font-bold text-gray-900 mt-1 flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              {currentMonthKPI.guestSatisfactionScore}/10
            </p>
            <span className="text-[10px] text-gray-400">Online: {currentMonthKPI.onlineReviewScore}/5</span>
          </div>
          <div className="stat-card">
            <p className="text-[10px] font-medium text-gray-400 uppercase">Personnel</p>
            <p className="text-lg font-bold text-gray-900 mt-1 flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-400" />
              {todayOperational.staff.onDutyToday}/{todayOperational.staff.totalEmployees}
            </p>
            <span className="text-[10px] text-gray-400">Ratio salaires: {currentMonthKPI.laborCostRatio}%</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OccupancyChart />
        <RevenueChart />
      </div>

      {/* RevPAR Chart + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RevParChart />
        </div>
        <div className="lg:col-span-2">
          <AIAnalysisPanel
            insights={aiInsights}
            title="Insights IA du jour"
          />
        </div>
      </div>

      {/* Today's Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Mouvements du jour</h3>
          <div className="space-y-3">
            {[
              { label: "Arrivées", value: todayKPI.arrivals, color: "bg-emerald-500" },
              { label: "Départs", value: todayKPI.departures, color: "bg-blue-500" },
              { label: "Séjours en cours", value: todayKPI.stayovers, color: "bg-violet-500" },
              { label: "No-shows", value: todayKPI.noShows, color: "bg-red-500" },
              { label: "Walk-ins", value: todayKPI.walkIns, color: "bg-amber-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-gray-600">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Housekeeping</h3>
          <div className="space-y-3">
            {[
              { label: "Chambres nettoyées", value: todayOperational.housekeeping.roomsCleaned, total: todayOperational.housekeeping.roomsCleaned + todayOperational.housekeeping.roomsPending },
              { label: "En attente", value: todayOperational.housekeeping.roomsPending },
              { label: "Inspectées", value: todayOperational.housekeeping.roomsInspected },
              { label: "Personnel en service", value: todayOperational.housekeeping.staffOnDuty },
              { label: "Temps moyen", value: `${todayOperational.housekeeping.averageCleanTime} min` },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Maintenance</h3>
          <div className="space-y-3">
            {[
              { label: "Tickets ouverts", value: todayOperational.maintenance.openTickets, alert: todayOperational.maintenance.urgentIssues > 0 },
              { label: "Résolus aujourd'hui", value: todayOperational.maintenance.closedToday },
              { label: "Urgences", value: todayOperational.maintenance.urgentIssues, alert: true },
              { label: "Chambres hors service", value: todayOperational.maintenance.roomsOutOfOrder },
              { label: "Temps résolution moy.", value: `${todayOperational.maintenance.avgResolutionTime}h` },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{item.label}</span>
                <span className={`text-sm font-semibold ${item.alert ? "text-red-600" : "text-gray-900"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
