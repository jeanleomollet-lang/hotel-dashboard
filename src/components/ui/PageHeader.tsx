"use client";

import { Sparkles } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  showAI?: boolean;
}

export default function PageHeader({ title, subtitle, showAI = true }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      {showAI && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 rounded-full border border-violet-200">
          <Sparkles className="w-3.5 h-3.5 text-violet-600" />
          <span className="text-xs font-medium text-violet-700">Analyse IA activée</span>
        </div>
      )}
    </div>
  );
}
