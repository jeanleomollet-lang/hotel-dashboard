"use client";

import { AIInsight } from "@/types/hotel";
import AIInsightCard from "./AIInsightCard";
import { Sparkles, Filter } from "lucide-react";
import { useState } from "react";

interface AIAnalysisPanelProps {
  insights: AIInsight[];
  title?: string;
  category?: string;
}

export default function AIAnalysisPanel({
  insights,
  title = "Analyse IA",
  category,
}: AIAnalysisPanelProps) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = insights.filter((i) => {
    if (category && i.category !== category) return false;
    if (filter === "all") return true;
    return i.type === filter;
  });

  const filterOptions = [
    { key: "all", label: "Tout" },
    { key: "alert", label: "Alertes" },
    { key: "recommendation", label: "Recommandations" },
    { key: "prediction", label: "Prédictions" },
    { key: "anomaly", label: "Anomalies" },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <span className="badge bg-violet-100 text-violet-700">{filtered.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-gray-400 mr-1" />
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key)}
                className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                  filter === opt.key
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">Aucun insight pour ce filtre</p>
        ) : (
          filtered.map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))
        )}
      </div>
    </div>
  );
}
