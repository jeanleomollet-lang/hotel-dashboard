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
} from "recharts";
import { monthlyKPIs } from "@/data/mock-kpis";

export default function RevenueChart() {
  const data = monthlyKPIs.map((m) => ({
    month: m.month.substring(0, 3),
    "Chambres": m.roomRevenue,
    "F&B": m.fbRevenue,
    "Autres": m.otherRevenue,
  }));

  const formatValue = (value: number) =>
    `${(value / 1000).toFixed(0)}k€`;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-gray-900">Revenu mensuel par catégorie</h3>
        <p className="text-xs text-gray-400 mt-0.5">12 derniers mois</p>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={formatValue} />
            <Tooltip
              formatter={(value: number) => [`${(value / 1000).toFixed(1)}k €`, undefined]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend iconType="circle" iconSize={8} />
            <Bar dataKey="Chambres" stackId="a" fill="#4c6ef5" radius={[0, 0, 0, 0]} />
            <Bar dataKey="F&B" stackId="a" fill="#d4a843" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Autres" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
