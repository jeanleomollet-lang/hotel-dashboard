"use client";
import { useState, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DollarSign, CreditCard, PiggyBank, Landmark, ArrowUpRight, ArrowDownRight, ChevronDown, Info, Calendar } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import AIAnalysisPanel from "@/components/ai/AIAnalysisPanel";
import { monthlyFinancials, monthlyFinancialsN1 } from "@/data/mock-financial";
import { aiInsights } from "@/data/mock-ai-insights";
import { formatCurrency, getVariation } from "@/lib/utils";
import { FinancialData } from "@/types/hotel";

const MFR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

function getFiscal(month: number, year: number, data: FinancialData[]) {
  return data.filter((m) => {
    const d = new Date(m.date), mm = d.getMonth(), yy = d.getFullYear();
    if (month >= 3) return yy === year && mm >= 3 && mm <= month;
    return (yy === year - 1 && mm >= 3) || (yy === year && mm <= month);
  });
}
function sf(data: FinancialData[], fn: (m: FinancialData) => number) { return data.reduce((a, m) => a + fn(m), 0); }

const TIP: Record<string, string> = {
  "Marge brute": "Rentabilité après déduction des coûts directs. Indique combien il reste pour couvrir les charges fixes.",
  "Marge opérationnelle": "Rentabilité après toutes les charges d'exploitation (salaires, loyer, marketing…), hors éléments financiers.",
  "Marge nette": "Pourcentage du CA restant en bénéfice net après toutes les charges. Indicateur ultime de rentabilité.",
  "EBITDA": "Performance opérationnelle avant amortissements, intérêts et impôts. Reflète la capacité à générer du cash.",
};

function TT({ k }: { k: string }) {
  const t = TIP[k]; if (!t) return null;
  return (<span className="relative group inline-flex ml-1 cursor-help"><Info className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-600 transition-colors" /><span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 rounded-lg bg-gray-900 text-white text-[11px] leading-relaxed p-3 opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg"><span className="font-semibold block mb-1">{k}</span>{t}<span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" /></span></span>);
}

export default function FinancierPage() {
  const avail = monthlyFinancials.map((m, i) => { const d = new Date(m.date); return { month: d.getMonth(), year: d.getFullYear(), label: `${MFR[d.getMonth()]} ${d.getFullYear()}`, i }; });
  const [idx, setIdx] = useState(avail.length - 1);
  const sm = avail[idx].month, sy = avail[idx].year, sL = MFR[sm];
  const cur = monthlyFinancials[idx];
  const prev = idx > 0 ? monthlyFinancials[idx - 1] : null;
  const n1 = useMemo(() => monthlyFinancialsN1.find(m => { const d = new Date(m.date); return d.getMonth() === sm && d.getFullYear() === sy - 1; }), [sm, sy]);
  const rv = prev ? getVariation(cur.revenue.total, prev.revenue.total) : null;
  const ev = prev ? getVariation(cur.expenses.total, prev.expenses.total) : null;
  const pv = prev ? getVariation(cur.profit.netProfit, prev.profit.netProfit) : null;
  const fN = useMemo(() => getFiscal(sm, sy, monthlyFinancials), [sm, sy]);
  const fN1 = useMemo(() => getFiscal(sm, sy - 1, monthlyFinancialsN1), [sm, sy]);

  const plData = monthlyFinancials.map(m => ({ month: new Date(m.date).toLocaleDateString("fr-FR", { month: "short" }).substring(0, 3), Revenus: m.revenue.total, Dépenses: m.expenses.total, "Profit Net": m.profit.netProfit }));
  const revPie = [
    { name: "Chambres", value: cur.revenue.rooms, color: "#4c6ef5" },
    { name: "F&B", value: cur.revenue.foodAndBeverage, color: "#d4a843" },
    { name: "Spa", value: cur.revenue.spa, color: "#22c55e" },
    { name: "Événements", value: cur.revenue.events, color: "#8b5cf6" },
    { name: "Parking", value: cur.revenue.parking, color: "#f59e0b" },
    { name: "Minibar", value: cur.revenue.minibar, color: "#ec4899" },
    { name: "Autres", value: cur.revenue.laundry + cur.revenue.other, color: "#94a3b8" },
  ];
  const expPie = [
    { name: "Salaires", value: cur.expenses.salaries, color: "#ef4444" },
    { name: "Énergie", value: cur.expenses.utilities, color: "#f59e0b" },
    { name: "Maintenance", value: cur.expenses.maintenance, color: "#3b82f6" },
    { name: "Commissions OTA", value: cur.expenses.commissions, color: "#8b5cf6" },
    { name: "Marketing", value: cur.expenses.marketing, color: "#22c55e" },
    { name: "Taxes & Impôts", value: cur.expenses.taxes, color: "#64748b" },
    { name: "Autres", value: cur.expenses.supplies + cur.expenses.insurance + cur.expenses.depreciation + cur.expenses.other, color: "#94a3b8" },
  ];
  const cashData = monthlyFinancials.map(m => ({ month: new Date(m.date).toLocaleDateString("fr-FR", { month: "short" }).substring(0, 3), Solde: m.cashflow.closing, Entrées: m.cashflow.inflows, Sorties: m.cashflow.outflows }));
  const margData = monthlyFinancials.map(m => ({ month: new Date(m.date).toLocaleDateString("fr-FR", { month: "short" }).substring(0, 3), "Marge brute": m.profit.grossMargin, "Marge opérationnelle": m.profit.operatingMargin, "Marge nette": m.profit.netMargin }));

  const oc = (fn: (m: FinancialData) => number) => fN1.length > 0 ? sf(fN1, fn) : null;
  const on1 = (fn: (m: FinancialData) => number) => n1 ? fn(n1) : null;
  type R = { l: string; c: number; cn: number; v1: number | null; cn1: number | null; h?: string; ind?: boolean };
  const rows: R[] = [
    { l: "CHIFFRE D'AFFAIRES", c: cur.revenue.total, cn: sf(fN, m => m.revenue.total), v1: on1(m => m.revenue.total), cn1: oc(m => m.revenue.total), h: "bg-emerald-50/50 text-emerald-700" },
    { l: "Hébergement", c: cur.revenue.rooms, cn: sf(fN, m => m.revenue.rooms), v1: on1(m => m.revenue.rooms), cn1: oc(m => m.revenue.rooms), ind: true },
    { l: "Restauration & Bar", c: cur.revenue.foodAndBeverage, cn: sf(fN, m => m.revenue.foodAndBeverage), v1: on1(m => m.revenue.foodAndBeverage), cn1: oc(m => m.revenue.foodAndBeverage), ind: true },
    { l: "Spa & Bien-être", c: cur.revenue.spa, cn: sf(fN, m => m.revenue.spa), v1: on1(m => m.revenue.spa), cn1: oc(m => m.revenue.spa), ind: true },
    { l: "Événements", c: cur.revenue.events, cn: sf(fN, m => m.revenue.events), v1: on1(m => m.revenue.events), cn1: oc(m => m.revenue.events), ind: true },
    { l: "Autres revenus", c: cur.revenue.parking+cur.revenue.minibar+cur.revenue.laundry+cur.revenue.other, cn: sf(fN, m => m.revenue.parking+m.revenue.minibar+m.revenue.laundry+m.revenue.other), v1: n1?n1.revenue.parking+n1.revenue.minibar+n1.revenue.laundry+n1.revenue.other:null, cn1: oc(m => m.revenue.parking+m.revenue.minibar+m.revenue.laundry+m.revenue.other), ind: true },
    { l: "CHARGES TOTALES", c: cur.expenses.total, cn: sf(fN, m => m.expenses.total), v1: on1(m => m.expenses.total), cn1: oc(m => m.expenses.total), h: "bg-red-50/50 text-red-700" },
    { l: "Salaires & charges sociales", c: cur.expenses.salaries, cn: sf(fN, m => m.expenses.salaries), v1: on1(m => m.expenses.salaries), cn1: oc(m => m.expenses.salaries), ind: true },
    { l: "Énergie & Utilities", c: cur.expenses.utilities, cn: sf(fN, m => m.expenses.utilities), v1: on1(m => m.expenses.utilities), cn1: oc(m => m.expenses.utilities), ind: true },
    { l: "Maintenance", c: cur.expenses.maintenance, cn: sf(fN, m => m.expenses.maintenance), v1: on1(m => m.expenses.maintenance), cn1: oc(m => m.expenses.maintenance), ind: true },
    { l: "Commissions OTA", c: cur.expenses.commissions, cn: sf(fN, m => m.expenses.commissions), v1: on1(m => m.expenses.commissions), cn1: oc(m => m.expenses.commissions), ind: true },
    { l: "Marketing", c: cur.expenses.marketing, cn: sf(fN, m => m.expenses.marketing), v1: on1(m => m.expenses.marketing), cn1: oc(m => m.expenses.marketing), ind: true },
    { l: "Taxes & impôts", c: cur.expenses.taxes, cn: sf(fN, m => m.expenses.taxes), v1: on1(m => m.expenses.taxes), cn1: oc(m => m.expenses.taxes), ind: true },
    { l: "Autres charges", c: cur.expenses.supplies+cur.expenses.insurance+cur.expenses.depreciation+cur.expenses.other, cn: sf(fN, m => m.expenses.supplies+m.expenses.insurance+m.expenses.depreciation+m.expenses.other), v1: n1?n1.expenses.supplies+n1.expenses.insurance+n1.expenses.depreciation+n1.expenses.other:null, cn1: oc(m => m.expenses.supplies+m.expenses.insurance+m.expenses.depreciation+m.expenses.other), ind: true },
    { l: "RÉSULTAT NET", c: cur.profit.netProfit, cn: sf(fN, m => m.profit.netProfit), v1: on1(m => m.profit.netProfit), cn1: oc(m => m.profit.netProfit), h: "bg-blue-50/50 text-blue-800" },
  ];

  const inds = [
    { label: "Marge brute", val: cur.profit.grossMargin, v1: n1?.profit.grossMargin??null, color: "#22c55e", pct: true },
    { label: "Marge opérationnelle", val: cur.profit.operatingMargin, v1: n1?.profit.operatingMargin??null, color: "#f59e0b", pct: true },
    { label: "Marge nette", val: cur.profit.netMargin, v1: n1?.profit.netMargin??null, color: "#4c6ef5", pct: true },
    { label: "EBITDA", val: cur.profit.ebitda, v1: n1?.profit.ebitda??null, color: "#8b5cf6", pct: false },
  ];

  function N1L({ label, val, valN1 }: { label: string; val: number; valN1: number }) {
    const v = getVariation(val, valN1); const inv = label === "Charges totales"; const pos = inv ? !v.isPositive : v.isPositive;
    return (<div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between"><span className="text-[11px] text-gray-400">N-1</span><span className="text-xs font-semibold text-gray-500">{formatCurrency(valN1)}</span><span className={`text-[11px] font-semibold ${pos?"text-emerald-600":"text-red-500"}`}>{v.isPositive?"+":"-"}{v.value.toFixed(1)}%</span></div>);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Module Financier" subtitle="Suivi complet de votre performance financière avec analyse IA" />

      {/* Sélecteur */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
          <Calendar className="w-4 h-4 text-brand-600" />
          <span className="text-sm font-medium text-gray-600">Période :</span>
          <div className="relative">
            <select value={idx} onChange={e => setIdx(Number(e.target.value))} className="appearance-none bg-transparent text-sm font-semibold text-gray-900 pr-6 cursor-pointer focus:outline-none">
              {avail.map((m, i) => <option key={i} value={i}>{m.label}</option>)}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        {n1 && <span className="text-xs text-gray-400">Comparaison N-1 : {sL} {sy-1}</span>}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-start justify-between mb-3"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Chiffre d&apos;affaires</p><div className="w-9 h-9 rounded-lg flex items-center justify-center text-emerald-600 bg-emerald-50"><DollarSign className="w-4 h-4" /></div></div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(cur.revenue.total)}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{sL} {sy}</p>
          {rv && <div className="flex items-center gap-2 mt-2"><span className={`inline-flex items-center gap-1 text-xs font-semibold ${rv.isPositive?"text-emerald-600":"text-red-500"}`}>{rv.isPositive?<ArrowUpRight className="w-3 h-3"/>:<ArrowDownRight className="w-3 h-3"/>}{rv.value.toFixed(1)}%</span><span className="text-xs text-gray-400">vs mois préc.</span></div>}
          {n1 && <N1L label="CA" val={cur.revenue.total} valN1={n1.revenue.total} />}
        </div>
        <div className="stat-card">
          <div className="flex items-start justify-between mb-3"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Charges totales</p><div className="w-9 h-9 rounded-lg flex items-center justify-center text-red-600 bg-red-50"><CreditCard className="w-4 h-4" /></div></div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(cur.expenses.total)}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{sL} {sy}</p>
          {ev && <div className="flex items-center gap-2 mt-2"><span className={`inline-flex items-center gap-1 text-xs font-semibold ${!ev.isPositive?"text-emerald-600":"text-red-500"}`}>{ev.isPositive?<ArrowUpRight className="w-3 h-3"/>:<ArrowDownRight className="w-3 h-3"/>}{ev.value.toFixed(1)}%</span><span className="text-xs text-gray-400">vs mois préc.</span></div>}
          {n1 && <N1L label="Charges totales" val={cur.expenses.total} valN1={n1.expenses.total} />}
        </div>
        <div className="stat-card">
          <div className="flex items-start justify-between mb-3"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Résultat net</p><div className="w-9 h-9 rounded-lg flex items-center justify-center text-violet-600 bg-violet-50"><PiggyBank className="w-4 h-4" /></div></div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(cur.profit.netProfit)}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{sL} {sy} — Marge: {cur.profit.netMargin.toFixed(1)}%</p>
          {pv && <div className="flex items-center gap-2 mt-2"><span className={`inline-flex items-center gap-1 text-xs font-semibold ${pv.isPositive?"text-emerald-600":"text-red-500"}`}>{pv.isPositive?<ArrowUpRight className="w-3 h-3"/>:<ArrowDownRight className="w-3 h-3"/>}{pv.value.toFixed(1)}%</span><span className="text-xs text-gray-400">vs mois préc.</span></div>}
          {n1 && <N1L label="Résultat" val={cur.profit.netProfit} valN1={n1.profit.netProfit} />}
        </div>
        <div className="stat-card">
          <div className="flex items-start justify-between mb-3"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Trésorerie</p><div className="w-9 h-9 rounded-lg flex items-center justify-center text-blue-600 bg-blue-50"><Landmark className="w-4 h-4" /></div></div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(cur.cashflow.closing)}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Solde bancaire</p>
        </div>
      </div>

      {/* Indicateurs marges + tooltips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {inds.map(ind => (
          <div key={ind.label} className="card p-4">
            <div className="flex items-center gap-1.5 mb-2"><span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:ind.color}} /><span className="text-xs font-medium text-gray-600">{ind.label}</span><TT k={ind.label} /></div>
            <p className="text-xl font-bold text-gray-900">{ind.pct?`${ind.val.toFixed(1)}%`:formatCurrency(ind.val)}</p>
            {ind.v1!==null && <div className="flex items-center gap-2 mt-1"><span className="text-[11px] text-gray-400">N-1 :</span><span className="text-xs font-semibold text-gray-500">{ind.pct?`${ind.v1.toFixed(1)}%`:formatCurrency(ind.v1)}</span><span className={`text-[11px] font-semibold ${ind.val-ind.v1>=0?"text-emerald-600":"text-red-500"}`}>{ind.val-ind.v1>=0?"+":""}{ind.pct?`${(ind.val-ind.v1).toFixed(1)}pp`:formatCurrency(ind.val-ind.v1)}</span></div>}
          </div>
        ))}
      </div>

      {/* P&L Evolution */}
      <div className="card"><div className="card-header"><h3 className="text-sm font-semibold text-gray-900">Compte de résultat — Évolution mensuelle</h3></div><div className="card-body"><ResponsiveContainer width="100%" height={320}><BarChart data={plData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="month" tick={{fontSize:10}} /><YAxis tick={{fontSize:10}} tickFormatter={v=>`${(v/1000).toFixed(0)}k`} /><Tooltip formatter={(value: number) => [`${formatCurrency(value)}`,undefined]} contentStyle={{backgroundColor:"#fff",border:"1px solid #e2e8f0",borderRadius:"8px",fontSize:"12px"}} /><Legend iconType="circle" iconSize={8} /><Bar dataKey="Revenus" fill="#22c55e" radius={[4,4,0,0]} /><Bar dataKey="Dépenses" fill="#ef4444" radius={[4,4,0,0]} /><Bar dataKey="Profit Net" fill="#4c6ef5" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div></div>

      {/* Pie charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card"><div className="card-header"><h3 className="text-sm font-semibold text-gray-900">Ventilation des revenus — {sL}</h3></div><div className="card-body flex flex-col lg:flex-row items-center gap-4"><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={revPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value">{revPie.map((e,i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => [formatCurrency(v),undefined]} /></PieChart></ResponsiveContainer><div className="space-y-2 min-w-[180px]">{revPie.map(it=>(<div key={it.name} className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:it.color}} /><span className="text-gray-600">{it.name}</span></div><span className="font-semibold text-gray-800">{formatCurrency(it.value)}</span></div>))}</div></div></div>
        <div className="card"><div className="card-header"><h3 className="text-sm font-semibold text-gray-900">Ventilation des charges — {sL}</h3></div><div className="card-body flex flex-col lg:flex-row items-center gap-4"><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={expPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value">{expPie.map((e,i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip formatter={(v: number) => [formatCurrency(v),undefined]} /></PieChart></ResponsiveContainer><div className="space-y-2 min-w-[180px]">{expPie.map(it=>(<div key={it.name} className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:it.color}} /><span className="text-gray-600">{it.name}</span></div><span className="font-semibold text-gray-800">{formatCurrency(it.value)}</span></div>))}</div></div></div>
      </div>

      {/* Margins + Cashflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card"><div className="card-header"><div className="flex items-center gap-2"><h3 className="text-sm font-semibold text-gray-900">Évolution des marges</h3><TT k="Marge brute" /></div></div><div className="card-body"><ResponsiveContainer width="100%" height={260}><LineChart data={margData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="month" tick={{fontSize:10}} /><YAxis tick={{fontSize:10}} unit="%" /><Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`,undefined]} contentStyle={{backgroundColor:"#fff",border:"1px solid #e2e8f0",borderRadius:"8px",fontSize:"12px"}} /><Legend iconType="circle" iconSize={8} /><Line type="monotone" dataKey="Marge brute" stroke="#22c55e" strokeWidth={2} dot={{r:2}} /><Line type="monotone" dataKey="Marge opérationnelle" stroke="#f59e0b" strokeWidth={2} dot={{r:2}} /><Line type="monotone" dataKey="Marge nette" stroke="#4c6ef5" strokeWidth={2} dot={{r:2}} /></LineChart></ResponsiveContainer></div></div>
        <div className="card"><div className="card-header"><h3 className="text-sm font-semibold text-gray-900">Trésorerie — Flux de trésorerie</h3></div><div className="card-body"><ResponsiveContainer width="100%" height={260}><LineChart data={cashData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="month" tick={{fontSize:10}} /><YAxis tick={{fontSize:10}} tickFormatter={v=>`${(v/1000).toFixed(0)}k`} /><Tooltip formatter={(value: number) => [formatCurrency(value),undefined]} contentStyle={{backgroundColor:"#fff",border:"1px solid #e2e8f0",borderRadius:"8px",fontSize:"12px"}} /><Legend iconType="circle" iconSize={8} /><Line type="monotone" dataKey="Solde" stroke="#4c6ef5" strokeWidth={2.5} dot={{r:3}} /><Line type="monotone" dataKey="Entrées" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="4 4" dot={false} /><Line type="monotone" dataKey="Sorties" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 4" dot={false} /></LineChart></ResponsiveContainer></div></div>
      </div>

      {/* Bank + AI */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2"><div className="card p-5"><div className="flex items-center gap-2 mb-4"><Landmark className="w-4 h-4 text-blue-600" /><h3 className="text-sm font-semibold text-gray-900">Connexion bancaire</h3><span className="badge-success ml-auto">Connecté</span></div><div className="space-y-4"><div className="p-3 bg-gray-50 rounded-lg"><p className="text-[10px] text-gray-400 uppercase font-medium">Crédit Agricole — Compte pro</p><p className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(cur.cashflow.bankBalance)}</p><p className="text-[10px] text-gray-400 mt-1">Dernière synchronisation: 23/02/2026 08:00</p></div><div className="space-y-2"><div className="flex items-center justify-between text-xs"><span className="text-gray-500">Encaissements {sL.toLowerCase()}</span><span className="font-semibold text-emerald-600 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" />{formatCurrency(cur.cashflow.inflows)}</span></div><div className="flex items-center justify-between text-xs"><span className="text-gray-500">Décaissements {sL.toLowerCase()}</span><span className="font-semibold text-red-500 flex items-center gap-1"><ArrowDownRight className="w-3 h-3" />{formatCurrency(cur.cashflow.outflows)}</span></div><div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200"><span className="text-gray-700 font-medium">Flux net</span><span className="font-bold text-gray-900">{formatCurrency(cur.cashflow.inflows-cur.cashflow.outflows)}</span></div></div></div></div></div>
        <div className="lg:col-span-3"><AIAnalysisPanel insights={aiInsights} title="Analyse financière IA" category="financial" /></div>
      </div>

      {/* Compte de résultat détaillé */}
      <div className="card"><div className="card-header"><h3 className="text-sm font-semibold text-gray-900">Compte de résultat détaillé — {sL} {sy}</h3></div><div className="overflow-x-auto"><table className="table text-xs"><thead><tr><th className="min-w-[180px]">Poste</th><th className="text-right">{sL} {sy}</th><th className="text-right">% CA</th><th className="text-right">Cumul exercice N</th><th className="text-right">{sL} {sy-1}</th><th className="text-right">Cumul exercice N-1</th></tr></thead><tbody>
        {rows.map(r => (<tr key={r.l} className={r.h??""}><td className={r.ind?"pl-8 text-gray-600":r.h?"font-semibold":""}>{r.l}</td><td className={`text-right ${r.h?"font-bold":""}`}>{formatCurrency(r.c)}</td><td className="text-right text-gray-400">{r.l==="CHIFFRE D'AFFAIRES"?"100%":cur.revenue.total>0?`${((r.c/cur.revenue.total)*100).toFixed(1)}%`:"—"}</td><td className="text-right text-gray-600">{formatCurrency(r.cn)}</td><td className="text-right text-gray-500">{r.v1!==null?formatCurrency(r.v1):"—"}</td><td className="text-right text-gray-500">{r.cn1!==null?formatCurrency(r.cn1):"—"}</td></tr>))}
      </tbody></table></div></div>
    </div>
  );
}
