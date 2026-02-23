"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dailyKPIs } from "@/data/mock-kpis";

export default function OccupancyChart() {
  const data = dailyKPIs.map((d) => ({
    date: new Date(d.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
    occupancy: d.occupancyRate,
    adr: d.adr,
  }));

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-gray-900">Taux d&apos;occupation & ADR</h3>
        <p className="text-xs text-gray-400 mt-0.5">Évolution sur les 23 derniers jours</p>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4c6ef5" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4c6ef5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAdr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4a843" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#d4a843" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 10 }} domain={[0, 100]} unit="%" />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} unit="€" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="occupancy"
              name="Occupation (%)"
              stroke="#4c6ef5"
              strokeWidth={2}
              fill="url(#colorOcc)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="adr"
              name="ADR (€)"
              stroke="#d4a843"
              strokeWidth={2}
              fill="url(#colorAdr)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
