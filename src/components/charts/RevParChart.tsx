"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlyKPIs } from "@/data/mock-kpis";

export default function RevParChart() {
  const data = monthlyKPIs.map((m) => ({
    month: m.month.substring(0, 3),
    RevPAR: m.revpar,
    TRevPAR: m.trevpar,
    GOPPAR: m.goppar,
  }));

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-gray-900">RevPAR / TRevPAR / GOPPAR</h3>
        <p className="text-xs text-gray-400 mt-0.5">Indicateurs par chambre disponible</p>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} unit="€" />
            <Tooltip
              formatter={(value: number) => [`${value} €`, undefined]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend iconType="circle" iconSize={8} />
            <Line type="monotone" dataKey="RevPAR" stroke="#4c6ef5" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="TRevPAR" stroke="#d4a843" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="GOPPAR" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
