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
  Users,
  UserPlus,
  UserCheck,
  Crown,
  Globe,
  Star,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Minus,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import AIAnalysisPanel from "@/components/ai/AIAnalysisPanel";
import { guestData } from "@/data/mock-guests";
import { aiInsights } from "@/data/mock-ai-insights";
import { formatCurrency } from "@/lib/utils";

export default function GuestsPage() {
  const channelColors = ["#4c6ef5", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899", "#64748b", "#3b82f6", "#94a3b8"];

  const nationalityData = guestData.nationalities.slice(0, 8).map((n) => ({
    name: n.country,
    value: n.count,
  }));

  const segmentData = guestData.segments.map((s) => ({
    name: s.name,
    Clients: s.count,
    "Panier moyen": s.avgSpend,
    "Séjour moyen": s.avgLOS,
  }));

  const satisfactionData = guestData.satisfactionTrend.map((s) => ({
    date: s.date,
    Score: s.score,
    Avis: s.reviews,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Clients & CRM"
        subtitle="Analyse de votre clientèle et gestion de la relation client"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total clients (12 mois)"
          value={guestData.totalGuests.toLocaleString("fr-FR")}
          subtitle="Depuis mars 2025"
          icon={Users}
          iconColor="text-blue-600 bg-blue-50"
        />
        <StatCard
          title="Nouveaux clients"
          value={guestData.newGuests.toLocaleString("fr-FR")}
          subtitle={`${((guestData.newGuests / guestData.totalGuests) * 100).toFixed(0)}% du total`}
          icon={UserPlus}
          iconColor="text-emerald-600 bg-emerald-50"
        />
        <StatCard
          title="Clients fidèles"
          value={guestData.returningGuests.toLocaleString("fr-FR")}
          subtitle={`${((guestData.returningGuests / guestData.totalGuests) * 100).toFixed(0)}% taux de retour`}
          icon={UserCheck}
          iconColor="text-violet-600 bg-violet-50"
        />
        <StatCard
          title="Clients VIP"
          value={guestData.vipGuests.toString()}
          subtitle="Panier moyen: 1 200€"
          icon={Crown}
          iconColor="text-amber-600 bg-amber-50"
        />
      </div>

      {/* Nationalities + Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-gray-900">Répartition par nationalité</h3>
            </div>
          </div>
          <div className="card-body flex flex-col lg:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={nationalityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {nationalityData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={channelColors[index % channelColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 min-w-[160px]">
              {guestData.nationalities.map((nat, i) => (
                <div key={nat.country} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channelColors[i % channelColors.length] }} />
                    <span className="text-gray-600">{nat.country}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{nat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Canaux de réservation</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Canal</th>
                  <th className="text-right">Résa.</th>
                  <th className="text-right">CA</th>
                  <th className="text-right">Commission</th>
                  <th className="text-right">%</th>
                </tr>
              </thead>
              <tbody>
                {guestData.bookingChannels.map((channel) => (
                  <tr key={channel.name}>
                    <td className="font-medium">{channel.name}</td>
                    <td className="text-right">{channel.bookings}</td>
                    <td className="text-right">{formatCurrency(channel.revenue)}</td>
                    <td className="text-right">
                      {channel.commission > 0 ? (
                        <span className="text-red-500">{formatCurrency(channel.commission)}</span>
                      ) : (
                        <span className="text-emerald-600">-</span>
                      )}
                    </td>
                    <td className="text-right font-semibold">{channel.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Segments + Satisfaction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Segments de clientèle</h3>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={110} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="Clients" fill="#4c6ef5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-gray-900">Évolution de la satisfaction</h3>
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} domain={[7, 10]} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                <Legend iconType="circle" iconSize={8} />
                <Line yAxisId="left" type="monotone" dataKey="Score" stroke="#d4a843" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="Avis" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-gray-900">Derniers avis clients</h3>
            </div>
          </div>
          <div className="card-body space-y-3">
            {guestData.topReviews.map((review) => (
              <div
                key={review.id}
                className={`p-4 rounded-lg border ${
                  review.sentiment === "positive"
                    ? "bg-emerald-50/50 border-emerald-200"
                    : review.sentiment === "negative"
                    ? "bg-red-50/50 border-red-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{review.guest}</span>
                    <span className="text-[10px] text-gray-400">via {review.channel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < review.rating / 2 ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-700">{review.rating}/10</span>
                    {review.sentiment === "positive" ? (
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
                    ) : review.sentiment === "negative" ? (
                      <ThumbsDown className="w-3.5 h-3.5 text-red-500" />
                    ) : (
                      <Minus className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{review.comment}</p>
                <p className="text-[10px] text-gray-400 mt-2">{new Date(review.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <AIAnalysisPanel
            insights={aiInsights}
            title="Analyse IA — Clientèle"
            category="guest"
          />
        </div>
      </div>
    </div>
  );
}
