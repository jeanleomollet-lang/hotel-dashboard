"use client";

import { AIInsight } from "@/types/hotel";
import { getSeverityColor } from "@/lib/utils";
import {
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Activity,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

interface AIInsightCardProps {
  insight: AIInsight;
  compact?: boolean;
}

export default function AIInsightCard({ insight, compact = false }: AIInsightCardProps) {
  const [expanded, setExpanded] = useState(false);

  const typeIcon = {
    alert: AlertTriangle,
    recommendation: Lightbulb,
    prediction: TrendingUp,
    anomaly: Activity,
  };

  const Icon = typeIcon[insight.type];

  const typeLabel = {
    alert: "Alerte",
    recommendation: "Recommandation",
    prediction: "Prédiction",
    anomaly: "Anomalie",
  };

  return (
    <div className={`ai-insight-card ${getSeverityColor(insight.severity)}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Sparkles className="w-4 h-4 text-violet-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
              <Icon className="w-3 h-3" />
              {typeLabel[insight.type]}
            </span>
            {insight.trend && (
              <span className={`text-[10px] font-semibold ${insight.trend === "up" ? "text-emerald-600" : insight.trend === "down" ? "text-red-500" : "text-gray-400"}`}>
                {insight.trend === "up" ? "↑" : insight.trend === "down" ? "↓" : "→"}
              </span>
            )}
          </div>
          <h4 className="text-sm font-semibold text-gray-900">{insight.title}</h4>
          {!compact && (
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{insight.description}</p>
          )}

          {/* Action Items */}
          {!compact && insight.actionItems && insight.actionItems.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
              >
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {insight.actionItems.length} action{insight.actionItems.length > 1 ? "s" : ""} recommandée{insight.actionItems.length > 1 ? "s" : ""}
              </button>
              {expanded && (
                <ul className="mt-2 space-y-1.5 animate-fade-in">
                  {insight.actionItems.map((action, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gray-300 mt-0.5 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
