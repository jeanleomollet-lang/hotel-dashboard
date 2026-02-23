"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  PiggyBank,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import AIAnalysisPanel from "@/components/ai/AIAnalysisPanel";
import { monthlyFinancials, currentMonthFinancial } from "@/data/mock-financial";
import { aiInsights } from "@/data/mock-ai-insights";
import { formatCurrency, getVariation } from "@/lib/utils";

export default function FinancierPage() {
  const prevMonth = monthlyFinancials[monthlyFinancials.length - 2];
  const current = currentMonthFinancial;

  const revenueVariation = getVariation(current.revenue.total, prevMonth.revenue.total);
  const expenseVariation = getVariation(current.expenses.total, prevMonth.expenses.total);
  const profitVariation = getVariation(current.profit.netProfit, prevMonth.profit.netProfit);

  // P&L Evolution data
  const plData = monthlyFinancials.map((m) => ({
    month: new Date(m.date).toLocaleDateString("fr-FR", { month: "short" }).substring(0, 3),
    Revenus: m.revenue.total,
    Dépenses: m.expenses.total,
    "Profit Net": m.profit.netProfit,
  }));

  // Revenue breakdown for pie chart
  const revenuePie = [
    { name: "Chambres", value: current.revenue.rooms, color: "#4c6ef5" },
    { name: "F&B", value: current.revenue.foodAndBeverage, color: "#d4a843" },
    { name: "Spa", value: current.revenue.spa, color: "#22c55e" },
    { name: "Événements", value: current.revenue.events, color: "#8b5cf6" },
    { name: "Parking", value: current.revenue.parking, color: "#f59e0b" },
    { name: "Minibar", value: current.revenue.minibar, color: "#ec4899" },
    { name: "Autres", value: current.revenue.laundry + current.revenue.other, color: "#94a3b8" },
  ];

  // Expenses breakdown for pie chart
  const expensePie = [
    { name: "Salaires", value: current.expenses.salaries, color: "#ef4444" },
    { name: "Énergie", value: current.expenses.utilities, color: "#f59e0b" },
    { name: "Maintenance", value: current.expenses.maintenance, color: "#3b82f6" },
    { name: "Commissions OTA", value: current.expenses.commissions, color: "#8b5cf6" },
    { name: "Marketing", value: current.expenses.marketing, color: "#22c55e" },
    { name: "Taxes & Impôts", value: current.expenses.taxes, color: "#64748b" },
    { name: "Autres", value: current.expenses.supplies + current.expenses.insurance + current.expenses.depreciation + current.expenses.other, color: "#94a3b8" },
  ];

  // Cashflow evolution
  const cashflowData = monthlyFinancials.map((m) => ({
    month: new Date(m.date).toLocaleDateString("fr-FR", { month: "short" }).substring(0, 3),
    Solde: m.cashflow.closing,
    Entrées: m.cashflow.inflows,
    Sorties: m.cashflow.outflows,
  }));

  // Margin evolution
  const marginData = monthlyFinancials.map((m) => ({
    month: new Date(m.date).toLocaleDateString("fr-FR", { month: "short" }).substring(0, 3),
    "Marge brute": m.profit.grossMargin,
    "Marge opérationnelle": m.profit.operatingMargin,
    "Marge nette": m.profit.netMargin,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Module Financier"
        subtitle="Suivi complet de votre performance financière avec analyse IA"
      />

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Chiffre d'affaires"
          value={formatCurrency(current.revenue.total)}
          subtitle="vs mois précédent"
          variation={revenueVariation}
          icon={DollarSign}
          iconColor="text-emerald-600 bg-emerald-50"
        />
        <StatCard
          title="Charges totales"
          value={formatCurrency(current.expenses.total)}
          subtitle="vs mois précédent"
          variation={expenseVariation}
          icon={CreditCard}
          iconColor="text-red-600 bg-red-50"
        />
        <StatCard
          title="Résultat net"
          value={formatCurrency(current.profit.netProfit)}
          subtitle={`Marge: ${current.profit.netMargin.toFixed(1)}%`}
          variation={profitVariation}
          icon={PiggyBank}
          iconColor="text-violet-600 bg-violet-50"
        />
        <StatCard
          title="Trésorerie"
          value={formatCurrency(current.cashflow.closing)}
          subtitle="Solde bancaire"
          icon={Landmark}
          iconColor="text-blue-600 bg-blue-50"
        />
      </div>

      {/* P&L Evolution Chart */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-gray-900">Compte de résultat — Évolution mensuelle</h3>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={plData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => [`${formatCurrency(value)}`, undefined]}
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }}
              />
              <Legend iconType="circle" iconSize={8} />
              <Bar dataKey="Revenus" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Dépenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Profit Net" fill="#4c6ef5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue & Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Ventilation des revenus</h3>
          </div>
          <div className="card-body flex flex-col lg:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={revenuePie}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {revenuePie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [formatCurrency(value), undefined]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 min-w-[180px]">
              {revenuePie.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Ventilation des charges</h3>
          </div>
          <div className="card-body flex flex-col lg:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={expensePie}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expensePie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [formatCurrency(value), undefined]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 min-w-[180px]">
              {expensePie.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Margins + Cashflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Évolution des marges</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} unit="%" />
                <Tooltip
                  formatter={(value: number) => [`${value.toFixed(1)}%`, undefined]}
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }}
                />
                <Legend iconType="circle" iconSize={8} />
                <Line type="monotone" dataKey="Marge brute" stroke="#22c55e" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Marge opérationnelle" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Marge nette" stroke="#4c6ef5" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Trésorerie — Flux de trésorerie</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={cashflowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), undefined]}
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }}
                />
                <Legend iconType="circle" iconSize={8} />
                <Line type="monotone" dataKey="Solde" stroke="#4c6ef5" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Entrées" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="Sorties" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bank Connection Status + AI Financial Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-900">Connexion bancaire</h3>
              <span className="badge-success ml-auto">Connecté</span>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-[10px] text-gray-400 uppercase font-medium">Crédit Agricole — Compte pro</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(current.cashflow.bankBalance)}</p>
                <p className="text-[10px] text-gray-400 mt-1">Dernière synchronisation: 23/02/2026 08:00</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Encaissements février</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {formatCurrency(current.cashflow.inflows)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Décaissements février</span>
                  <span className="font-semibold text-red-500 flex items-center gap-1">
                    <ArrowDownRight className="w-3 h-3" />
                    {formatCurrency(current.cashflow.outflows)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-medium">Flux net</span>
                  <span className="font-bold text-gray-900">
                    {formatCurrency(current.cashflow.inflows - current.cashflow.outflows)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <AIAnalysisPanel
            insights={aiInsights}
            title="Analyse financière IA"
            category="financial"
          />
        </div>
      </div>

      {/* Detailed P&L Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-gray-900">Compte de résultat détaillé — Février 2026</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Poste</th>
                <th className="text-right">Montant</th>
                <th className="text-right">% du CA</th>
                <th className="text-right">vs M-1</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-emerald-50/50">
                <td className="font-semibold text-emerald-700">CHIFFRE D&apos;AFFAIRES</td>
                <td className="text-right font-bold text-emerald-700">{formatCurrency(current.revenue.total)}</td>
                <td className="text-right text-emerald-600">100%</td>
                <td className="text-right">
                  <span className={revenueVariation.isPositive ? "text-emerald-600" : "text-red-500"}>
                    {revenueVariation.isPositive ? "+" : "-"}{revenueVariation.value.toFixed(1)}%
                  </span>
                </td>
              </tr>
              {[
                { label: "Hébergement", value: current.revenue.rooms, prev: prevMonth.revenue.rooms },
                { label: "Restauration & Bar", value: current.revenue.foodAndBeverage, prev: prevMonth.revenue.foodAndBeverage },
                { label: "Spa & Bien-être", value: current.revenue.spa, prev: prevMonth.revenue.spa },
                { label: "Événements", value: current.revenue.events, prev: prevMonth.revenue.events },
                { label: "Autres revenus", value: current.revenue.parking + current.revenue.minibar + current.revenue.laundry + current.revenue.other, prev: prevMonth.revenue.parking + prevMonth.revenue.minibar + prevMonth.revenue.laundry + prevMonth.revenue.other },
              ].map((item) => {
                const v = getVariation(item.value, item.prev);
                return (
                  <tr key={item.label}>
                    <td className="pl-8 text-gray-600">{item.label}</td>
                    <td className="text-right">{formatCurrency(item.value)}</td>
                    <td className="text-right text-gray-400">{((item.value / current.revenue.total) * 100).toFixed(1)}%</td>
                    <td className="text-right">
                      <span className={v.isPositive ? "text-emerald-600" : "text-red-500"}>
                        {v.isPositive ? "+" : "-"}{v.value.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-red-50/50">
                <td className="font-semibold text-red-700">CHARGES TOTALES</td>
                <td className="text-right font-bold text-red-700">{formatCurrency(current.expenses.total)}</td>
                <td className="text-right text-red-600">{((current.expenses.total / current.revenue.total) * 100).toFixed(1)}%</td>
                <td className="text-right">
                  <span className={!expenseVariation.isPositive ? "text-emerald-600" : "text-red-500"}>
                    {expenseVariation.isPositive ? "+" : "-"}{expenseVariation.value.toFixed(1)}%
                  </span>
                </td>
              </tr>
              {[
                { label: "Salaires & charges sociales", value: current.expenses.salaries, prev: prevMonth.expenses.salaries },
                { label: "Énergie & Utilities", value: current.expenses.utilities, prev: prevMonth.expenses.utilities },
                { label: "Maintenance", value: current.expenses.maintenance, prev: prevMonth.expenses.maintenance },
                { label: "Commissions OTA", value: current.expenses.commissions, prev: prevMonth.expenses.commissions },
                { label: "Marketing", value: current.expenses.marketing, prev: prevMonth.expenses.marketing },
                { label: "Taxes & impôts", value: current.expenses.taxes, prev: prevMonth.expenses.taxes },
                { label: "Autres charges", value: current.expenses.supplies + current.expenses.insurance + current.expenses.depreciation + current.expenses.other, prev: prevMonth.expenses.supplies + prevMonth.expenses.insurance + prevMonth.expenses.depreciation + prevMonth.expenses.other },
              ].map((item) => {
                const v = getVariation(item.value, item.prev);
                return (
                  <tr key={item.label}>
                    <td className="pl-8 text-gray-600">{item.label}</td>
                    <td className="text-right">{formatCurrency(item.value)}</td>
                    <td className="text-right text-gray-400">{((item.value / current.revenue.total) * 100).toFixed(1)}%</td>
                    <td className="text-right">
                      <span className={!v.isPositive ? "text-emerald-600" : "text-red-500"}>
                        {v.isPositive ? "+" : "-"}{v.value.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-blue-50/50 font-bold">
                <td className="text-blue-800">RÉSULTAT NET</td>
                <td className="text-right text-blue-800">{formatCurrency(current.profit.netProfit)}</td>
                <td className="text-right text-blue-600">{current.profit.netMargin.toFixed(1)}%</td>
                <td className="text-right">
                  <span className={profitVariation.isPositive ? "text-emerald-600" : "text-red-500"}>
                    {profitVariation.isPositive ? "+" : "-"}{profitVariation.value.toFixed(1)}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
