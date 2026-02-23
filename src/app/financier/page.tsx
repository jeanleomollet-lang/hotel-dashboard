"use client";

import { useState } from "react";
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
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import AIAnalysisPanel from "@/components/ai/AIAnalysisPanel";
import {
  monthlyFinancials,
  getFinancialByMonthYear,
  getN1Financial,
  getCumulFiscalYear,
  getCumulFiscalYearN1,
  getAvailableMonths,
} from "@/data/mock-financial";
import { aiInsights } from "@/data/mock-ai-insights";
import { formatCurrency, getVariation } from "@/lib/utils";

const MONTH_NAMES = [
  "", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

// Définitions des tooltips pour les indicateurs
const MARGIN_TOOLTIPS: Record<string, string> = {
  "Marge brute": "La marge brute mesure la rentabilité après déduction des coûts directs (achats, matières premières). Formule : (CA - Coûts directs) / CA x 100. Elle indique la capacité de l'hôtel à couvrir ses coûts de production.",
  "Marge opérationnelle": "La marge opérationnelle mesure la rentabilité de l'exploitation courante, après toutes les charges d'exploitation (salaires, énergie, marketing, etc.). Formule : Résultat d'exploitation / CA x 100.",
  "Marge nette": "La marge nette représente le pourcentage du chiffre d'affaires qui se transforme en bénéfice final, après toutes les charges y compris impôts et amortissements. Formule : Résultat net / CA x 100.",
  "EBITDA": "L'EBITDA (Excédent Brut d'Exploitation) mesure la performance opérationnelle avant amortissements, provisions, intérêts et impôts. C'est un indicateur clé de la capacité de génération de trésorerie.",
  "GOP": "Le Gross Operating Profit (Résultat Brut d'Exploitation) est le bénéfice généré par les opérations hôtelières avant déduction des charges fixes (loyer, assurances, amortissements).",
};

function TooltipBadge({ label, color }: { label: string; color: string }) {
  const tooltip = MARGIN_TOOLTIPS[label];
  if (!tooltip) return null;
  return (
    <span className="relative group inline-flex">
      <span
        className="w-2.5 h-2.5 rounded-full cursor-help border border-white shadow-sm"
        style={{ backgroundColor: color }}
      />
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-lg bg-gray-900 text-white text-[11px] leading-relaxed px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-xl">
        <span className="font-semibold text-white/90">{label}</span>
        <br />
        <span className="text-white/75">{tooltip}</span>
        <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900" />
      </span>
    </span>
  );
}

export default function FinancierPage() {
  const available = getAvailableMonths();
  const defaultMonth = available[available.length - 1];
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth.month);
  const [selectedYear, setSelectedYear] = useState(defaultMonth.year);

  const current = getFinancialByMonthYear(selectedMonth, selectedYear);
  const n1 = getN1Financial(selectedMonth, selectedYear);
  const cumul = getCumulFiscalYear(selectedMonth, selectedYear);
  const cumulN1 = getCumulFiscalYearN1(selectedMonth, selectedYear);

  // Navigation mois précédent / suivant
  const currentIdx = available.findIndex((a) => a.month === selectedMonth && a.year === selectedYear);
  const canPrev = currentIdx > 0;
  const canNext = currentIdx < available.length - 1;

  const goToPrev = () => {
    if (canPrev) {
      const prev = available[currentIdx - 1];
      setSelectedMonth(prev.month);
      setSelectedYear(prev.year);
    }
  };
  const goToNext = () => {
    if (canNext) {
      const next = available[currentIdx + 1];
      setSelectedMonth(next.month);
      setSelectedYear(next.year);
    }
  };

  // Années et mois disponibles pour les sélecteurs séparés
  const availableYears = Array.from(new Set(available.map((a) => a.year))).sort();
  const monthsForSelectedYear = available.filter((a) => a.year === selectedYear).map((a) => a.month);

  if (!current) return <div className="p-8 text-gray-500">Aucune donnée pour ce mois.</div>;

  const monthLabel = `${MONTH_NAMES[selectedMonth]} ${selectedYear}`;
  const n1Label = `${MONTH_NAMES[selectedMonth]} ${selectedYear - 1}`;

  // Variations vs N-1
  const revenueVsN1 = n1 ? getVariation(current.revenue.total, n1.revenue.total) : null;
  const expenseVsN1 = n1 ? getVariation(current.expenses.total, n1.expenses.total) : null;
  const profitVsN1 = n1 ? getVariation(current.profit.netProfit, n1.profit.netProfit) : null;

  // P&L Evolution data (12 derniers mois glissants à partir du mois sélectionné)
  const selectedDate = new Date(selectedYear, selectedMonth - 1, 1);
  const plMonths = monthlyFinancials.filter((m) => {
    const d = new Date(m.date);
    const diffMonths = (selectedDate.getFullYear() - d.getFullYear()) * 12 + (selectedDate.getMonth() - d.getMonth());
    return diffMonths >= 0 && diffMonths < 12;
  });

  const plData = plMonths.map((m) => ({
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
  const cashflowData = plMonths.map((m) => ({
    month: new Date(m.date).toLocaleDateString("fr-FR", { month: "short" }).substring(0, 3),
    Solde: m.cashflow.closing,
    Entrées: m.cashflow.inflows,
    Sorties: m.cashflow.outflows,
  }));

  // Margin evolution
  const marginData = plMonths.map((m) => ({
    month: new Date(m.date).toLocaleDateString("fr-FR", { month: "short" }).substring(0, 3),
    "Marge brute": m.profit.grossMargin,
    "Marge opérationnelle": m.profit.operatingMargin,
    "Marge nette": m.profit.netMargin,
  }));

  // === Données pour le tableau du compte de résultat détaillé ===
  const revenueRows = [
    { label: "Hébergement", key: "rooms" as const },
    { label: "Restauration & Bar", key: "foodAndBeverage" as const },
    { label: "Spa & Bien-être", key: "spa" as const },
    { label: "Événements", key: "events" as const },
  ];
  const expenseRows = [
    { label: "Salaires & charges sociales", key: "salaries" as const },
    { label: "Énergie & Utilities", key: "utilities" as const },
    { label: "Maintenance", key: "maintenance" as const },
    { label: "Commissions OTA", key: "commissions" as const },
    { label: "Marketing", key: "marketing" as const },
    { label: "Taxes & impôts", key: "taxes" as const },
  ];

  const getOtherRevenue = (data: typeof current) =>
    data.revenue.parking + data.revenue.minibar + data.revenue.laundry + data.revenue.other;
  const getOtherExpenses = (data: typeof current) =>
    data.expenses.supplies + data.expenses.insurance + data.expenses.depreciation + data.expenses.other;

  const fiscalYearLabel = `Cumul ${selectedYear}`;
  const fiscalYearN1Label = `Cumul ${selectedYear - 1}`;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Module Financier"
        subtitle="Suivi complet de votre performance financière avec analyse IA"
      />

      {/* === Sélecteur Mois / Année === */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
            <CalendarDays className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Période sélectionnée</p>
            <p className="text-sm font-bold text-gray-900 capitalize">{monthLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => {
              const m = Number(e.target.value);
              setSelectedMonth(m);
            }}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-pointer"
          >
            {monthsForSelectedYear.map((m) => (
              <option key={m} value={m}>
                {MONTH_NAMES[m]}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => {
              const y = Number(e.target.value);
              setSelectedYear(y);
              const monthsForYear = available.filter((a) => a.year === y).map((a) => a.month);
              if (!monthsForYear.includes(selectedMonth)) {
                setSelectedMonth(monthsForYear[monthsForYear.length - 1]);
              }
            }}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-pointer"
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={goToPrev}
              disabled={!canPrev}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              disabled={!canNext}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* === Top KPIs === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CA */}
        <div className="stat-card">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Chiffre d&apos;affaires</p>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-emerald-600 bg-emerald-50">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(current.revenue.total)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{monthLabel}</p>
          <div className="flex items-center gap-2 mt-2">
            {revenueVsN1 && (
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${revenueVsN1.isPositive ? "text-emerald-600" : "text-red-500"}`}>
                {revenueVsN1.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {revenueVsN1.value.toFixed(1)}%
              </span>
            )}
            <span className="text-xs text-gray-400">vs N-1</span>
          </div>
          {n1 && (
            <p className="text-[11px] text-gray-400 mt-1">
              {n1Label} : <span className="font-medium text-gray-500">{formatCurrency(n1.revenue.total)}</span>
            </p>
          )}
        </div>

        {/* Charges */}
        <div className="stat-card">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Charges totales</p>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-red-600 bg-red-50">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(current.expenses.total)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{monthLabel}</p>
          <div className="flex items-center gap-2 mt-2">
            {expenseVsN1 && (
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${!expenseVsN1.isPositive ? "text-emerald-600" : "text-red-500"}`}>
                {expenseVsN1.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {expenseVsN1.value.toFixed(1)}%
              </span>
            )}
            <span className="text-xs text-gray-400">vs N-1</span>
          </div>
          {n1 && (
            <p className="text-[11px] text-gray-400 mt-1">
              {n1Label} : <span className="font-medium text-gray-500">{formatCurrency(n1.expenses.total)}</span>
            </p>
          )}
        </div>

        {/* Résultat net */}
        <div className="stat-card">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Résultat net</p>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-violet-600 bg-violet-50">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(current.profit.netProfit)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{monthLabel} — Marge : {current.profit.netMargin.toFixed(1)}%</p>
          <div className="flex items-center gap-2 mt-2">
            {profitVsN1 && (
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${profitVsN1.isPositive ? "text-emerald-600" : "text-red-500"}`}>
                {profitVsN1.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {profitVsN1.value.toFixed(1)}%
              </span>
            )}
            <span className="text-xs text-gray-400">vs N-1</span>
          </div>
          {n1 && (
            <p className="text-[11px] text-gray-400 mt-1">
              {n1Label} : <span className="font-medium text-gray-500">{formatCurrency(n1.profit.netProfit)}</span>
            </p>
          )}
        </div>

        {/* Trésorerie */}
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
                <Legend
                  content={() => (
                    <div className="flex items-center justify-center gap-6 mt-2">
                      {[
                        { label: "Marge brute", color: "#22c55e" },
                        { label: "Marge opérationnelle", color: "#f59e0b" },
                        { label: "Marge nette", color: "#4c6ef5" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                          <TooltipBadge label={item.label} color={item.color} />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
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
                  <span className="text-gray-500">Encaissements {MONTH_NAMES[selectedMonth].toLowerCase()}</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {formatCurrency(current.cashflow.inflows)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Décaissements {MONTH_NAMES[selectedMonth].toLowerCase()}</span>
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

      {/* === Compte de résultat détaillé === */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-gray-900">
            Compte de résultat détaillé — <span className="capitalize">{monthLabel}</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "26%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "16%" }} />
              <col style={{ width: "16%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Poste</th>
                <th className="text-right capitalize">{MONTH_NAMES[selectedMonth]} {selectedYear}</th>
                <th className="text-right">% du CA</th>
                <th className="text-right">{fiscalYearLabel}</th>
                <th className="text-right capitalize">{MONTH_NAMES[selectedMonth]} {selectedYear - 1}</th>
                <th className="text-right">{fiscalYearN1Label}</th>
              </tr>
            </thead>
            <tbody>
              {/* === CHIFFRE D'AFFAIRES === */}
              <tr className="bg-emerald-50/50">
                <td className="font-semibold text-emerald-700">CHIFFRE D&apos;AFFAIRES</td>
                <td className="text-right font-bold text-emerald-700">{formatCurrency(current.revenue.total)}</td>
                <td className="text-right text-emerald-600">100%</td>
                <td className="text-right font-semibold text-emerald-700">{cumul ? formatCurrency(cumul.revenue.total) : "—"}</td>
                <td className="text-right text-gray-600">{n1 ? formatCurrency(n1.revenue.total) : "—"}</td>
                <td className="text-right text-gray-600">{cumulN1 ? formatCurrency(cumulN1.revenue.total) : "—"}</td>
              </tr>
              {revenueRows.map((row) => {
                const val = current.revenue[row.key];
                const pct = current.revenue.total > 0 ? ((val / current.revenue.total) * 100).toFixed(1) : "0.0";
                const cumulVal = cumul ? cumul.revenue[row.key] : null;
                const n1Val = n1 ? n1.revenue[row.key] : null;
                const cumulN1Val = cumulN1 ? cumulN1.revenue[row.key] : null;
                return (
                  <tr key={row.label}>
                    <td className="pl-8 text-gray-600">{row.label}</td>
                    <td className="text-right">{formatCurrency(val)}</td>
                    <td className="text-right text-gray-400">{pct}%</td>
                    <td className="text-right text-gray-500">{cumulVal !== null ? formatCurrency(cumulVal) : "—"}</td>
                    <td className="text-right text-gray-400">{n1Val !== null ? formatCurrency(n1Val) : "—"}</td>
                    <td className="text-right text-gray-400">{cumulN1Val !== null ? formatCurrency(cumulN1Val) : "—"}</td>
                  </tr>
                );
              })}
              {/* Autres revenus */}
              <tr>
                <td className="pl-8 text-gray-600">Autres revenus</td>
                <td className="text-right">{formatCurrency(getOtherRevenue(current))}</td>
                <td className="text-right text-gray-400">{current.revenue.total > 0 ? ((getOtherRevenue(current) / current.revenue.total) * 100).toFixed(1) : "0.0"}%</td>
                <td className="text-right text-gray-500">{cumul ? formatCurrency(getOtherRevenue(cumul)) : "—"}</td>
                <td className="text-right text-gray-400">{n1 ? formatCurrency(getOtherRevenue(n1)) : "—"}</td>
                <td className="text-right text-gray-400">{cumulN1 ? formatCurrency(getOtherRevenue(cumulN1)) : "—"}</td>
              </tr>

              {/* === CHARGES TOTALES === */}
              <tr className="bg-red-50/50">
                <td className="font-semibold text-red-700">CHARGES TOTALES</td>
                <td className="text-right font-bold text-red-700">{formatCurrency(current.expenses.total)}</td>
                <td className="text-right text-red-600">{((current.expenses.total / current.revenue.total) * 100).toFixed(1)}%</td>
                <td className="text-right font-semibold text-red-700">{cumul ? formatCurrency(cumul.expenses.total) : "—"}</td>
                <td className="text-right text-gray-600">{n1 ? formatCurrency(n1.expenses.total) : "—"}</td>
                <td className="text-right text-gray-600">{cumulN1 ? formatCurrency(cumulN1.expenses.total) : "—"}</td>
              </tr>
              {expenseRows.map((row) => {
                const val = current.expenses[row.key];
                const pct = current.revenue.total > 0 ? ((val / current.revenue.total) * 100).toFixed(1) : "0.0";
                const cumulVal = cumul ? cumul.expenses[row.key] : null;
                const n1Val = n1 ? n1.expenses[row.key] : null;
                const cumulN1Val = cumulN1 ? cumulN1.expenses[row.key] : null;
                return (
                  <tr key={row.label}>
                    <td className="pl-8 text-gray-600">{row.label}</td>
                    <td className="text-right">{formatCurrency(val)}</td>
                    <td className="text-right text-gray-400">{pct}%</td>
                    <td className="text-right text-gray-500">{cumulVal !== null ? formatCurrency(cumulVal) : "—"}</td>
                    <td className="text-right text-gray-400">{n1Val !== null ? formatCurrency(n1Val) : "—"}</td>
                    <td className="text-right text-gray-400">{cumulN1Val !== null ? formatCurrency(cumulN1Val) : "—"}</td>
                  </tr>
                );
              })}
              {/* Autres charges */}
              <tr>
                <td className="pl-8 text-gray-600">Autres charges</td>
                <td className="text-right">{formatCurrency(getOtherExpenses(current))}</td>
                <td className="text-right text-gray-400">{current.revenue.total > 0 ? ((getOtherExpenses(current) / current.revenue.total) * 100).toFixed(1) : "0.0"}%</td>
                <td className="text-right text-gray-500">{cumul ? formatCurrency(getOtherExpenses(cumul)) : "—"}</td>
                <td className="text-right text-gray-400">{n1 ? formatCurrency(getOtherExpenses(n1)) : "—"}</td>
                <td className="text-right text-gray-400">{cumulN1 ? formatCurrency(getOtherExpenses(cumulN1)) : "—"}</td>
              </tr>

              {/* === RÉSULTAT NET === */}
              <tr className="bg-blue-50/50 font-bold">
                <td className="text-blue-800">RÉSULTAT NET</td>
                <td className="text-right text-blue-800">{formatCurrency(current.profit.netProfit)}</td>
                <td className="text-right text-blue-600">{current.profit.netMargin.toFixed(1)}%</td>
                <td className="text-right text-blue-800">{cumul ? formatCurrency(cumul.profit.netProfit) : "—"}</td>
                <td className="text-right text-gray-600">{n1 ? formatCurrency(n1.profit.netProfit) : "—"}</td>
                <td className="text-right text-gray-600">{cumulN1 ? formatCurrency(cumulN1.profit.netProfit) : "—"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Indicateurs clés sous le tableau avec tooltips */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-wrap items-center gap-x-8 gap-y-3">
          {[
            { label: "Marge brute", value: current.profit.grossMargin, color: "#22c55e" },
            { label: "Marge opérationnelle", value: current.profit.operatingMargin, color: "#f59e0b" },
            { label: "Marge nette", value: current.profit.netMargin, color: "#4c6ef5" },
            { label: "EBITDA", value: current.profit.ebitda, color: "#8b5cf6", isCurrency: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 text-xs">
              <TooltipBadge label={item.label} color={item.color} />
              <span className="text-gray-500">{item.label}</span>
              <span className="font-bold text-gray-800">
                {"isCurrency" in item && item.isCurrency
                  ? formatCurrency(item.value)
                  : `${item.value.toFixed(1)}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
