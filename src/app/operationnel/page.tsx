"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BedDouble,
  Wrench,
  Users,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  Timer,
  UserCheck,
  ShieldAlert,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import ProgressBar from "@/components/ui/ProgressBar";
import AIAnalysisPanel from "@/components/ai/AIAnalysisPanel";
import { todayOperational } from "@/data/mock-operational";
import { aiInsights } from "@/data/mock-ai-insights";
import { formatCurrency } from "@/lib/utils";

export default function OperationnelPage() {
  const hk = todayOperational.housekeeping;
  const mt = todayOperational.maintenance;
  const staff = todayOperational.staff;
  const inv = todayOperational.inventory;

  const roomStatusData = [
    { name: "Nettoyées", value: hk.roomsCleaned, color: "#22c55e" },
    { name: "En attente", value: hk.roomsPending, color: "#f59e0b" },
    { name: "Hors service", value: mt.roomsOutOfOrder, color: "#ef4444" },
    { name: "Disponibles", value: 42 - hk.roomsCleaned - hk.roomsPending - mt.roomsOutOfOrder, color: "#3b82f6" },
  ];

  const deptData = staff.departments.map((d) => ({
    name: d.name,
    "En service": d.onDuty,
    Total: d.headcount,
    Coût: d.cost,
  }));

  const inventoryItems = Object.values(inv);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Module Opérationnel"
        subtitle="Suivi en temps réel des opérations quotidiennes"
      />

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Chambres prêtes"
          value={`${hk.roomsCleaned}/${hk.roomsCleaned + hk.roomsPending}`}
          subtitle={`${hk.roomsInspected} inspectées`}
          icon={BedDouble}
          iconColor="text-emerald-600 bg-emerald-50"
        />
        <StatCard
          title="Tickets maintenance"
          value={`${mt.openTickets} ouverts`}
          subtitle={`${mt.closedToday} résolus aujourd'hui`}
          icon={Wrench}
          iconColor="text-amber-600 bg-amber-50"
        />
        <StatCard
          title="Personnel en service"
          value={`${staff.onDutyToday}/${staff.totalEmployees}`}
          subtitle={`${staff.onLeave} en congé`}
          icon={Users}
          iconColor="text-blue-600 bg-blue-50"
        />
        <StatCard
          title="Chambres hors service"
          value={`${mt.roomsOutOfOrder}`}
          subtitle={`${mt.urgentIssues} urgence(s)`}
          icon={ShieldAlert}
          iconColor="text-red-600 bg-red-50"
        />
      </div>

      {/* Housekeeping + Room Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Housekeeping — État des chambres</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={roomStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {roomStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4 flex flex-col justify-center">
                {roomStatusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Housekeeping details */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Timer, label: "Temps moyen nettoyage", value: `${hk.averageCleanTime} min`, color: "text-blue-600" },
                { icon: UserCheck, label: "Effectif ménage", value: `${hk.staffOnDuty} personnes`, color: "text-emerald-600" },
                { icon: Clock, label: "Late check-outs", value: `${hk.lateCheckouts}`, color: "text-amber-600" },
                { icon: CheckCircle, label: "Early check-ins", value: `${hk.earlyCheckins}`, color: "text-violet-600" },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
                  <item.icon className={`w-4 h-4 ${item.color} mb-1`} />
                  <p className="text-[10px] text-gray-400 uppercase">{item.label}</p>
                  <p className="text-sm font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Maintenance</h3>
          </div>
          <div className="card-body space-y-4">
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-xs font-semibold text-red-700">Urgences actives</span>
              </div>
              <p className="text-2xl font-bold text-red-700">{mt.urgentIssues}</p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Tickets ouverts", value: mt.openTickets },
                { label: "Résolus aujourd'hui", value: mt.closedToday },
                { label: "Temps résolution moy.", value: `${mt.avgResolutionTime}h` },
                { label: "Tâches préventives", value: mt.preventiveTasks },
                { label: "Chambres hors service", value: mt.roomsOutOfOrder },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-500">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Staff by Department */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Personnel par département</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={deptData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={100} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="En service" fill="#4c6ef5" radius={[0, 4, 4, 0]} />
                <Bar dataKey="Total" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Département</th>
                    <th className="text-right">Effectif</th>
                    <th className="text-right">En service</th>
                    <th className="text-right">Coût mensuel</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.departments.map((dept) => (
                    <tr key={dept.name}>
                      <td className="font-medium">{dept.name}</td>
                      <td className="text-right">{dept.headcount}</td>
                      <td className="text-right">{dept.onDuty}</td>
                      <td className="text-right">{formatCurrency(dept.cost)}</td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-gray-50">
                    <td>Total</td>
                    <td className="text-right">{staff.totalEmployees}</td>
                    <td className="text-right">{staff.onDutyToday}</td>
                    <td className="text-right">{formatCurrency(staff.departments.reduce((s, d) => s + d.cost, 0))}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <AIAnalysisPanel
            insights={aiInsights}
            title="Analyse opérationnelle IA"
            category="operational"
          />
        </div>
      </div>

      {/* Inventory */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-900">Gestion des stocks</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {inventoryItems.map((item) => (
              <div key={item.name} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-gray-700">{item.name}</p>
                  <span className={`badge ${item.status === "ok" ? "badge-success" : item.status === "low" ? "badge-warning" : "badge-danger"}`}>
                    {item.status === "ok" ? "OK" : item.status === "low" ? "Bas" : "Critique"}
                  </span>
                </div>
                <ProgressBar
                  value={item.currentStock}
                  max={Math.max(item.currentStock, item.minimumStock) * 1.3}
                  color={item.status === "ok" ? "bg-emerald-500" : item.status === "low" ? "bg-amber-500" : "bg-red-500"}
                  size="sm"
                />
                <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400">
                  <span>Stock: {item.currentStock} / Min: {item.minimumStock}</span>
                  <span>{formatCurrency(item.monthlyCost)}/mois</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
