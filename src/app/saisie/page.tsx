"use client";

import { useState } from "react";
import {
  PenSquare,
  Save,
  Plus,
  Calendar,
  DollarSign,
  BedDouble,
  Users,
  Package,
  Wrench,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  Upload,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

interface EntryField {
  id: string;
  label: string;
  type: "number" | "text" | "date" | "select";
  unit?: string;
  placeholder?: string;
  options?: string[];
}

interface EntryCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  fields: EntryField[];
}

const categories: EntryCategory[] = [
  {
    id: "revenue",
    name: "Revenus",
    icon: DollarSign,
    color: "text-emerald-600 bg-emerald-50",
    fields: [
      { id: "room_revenue", label: "CA Hébergement", type: "number", unit: "€", placeholder: "0" },
      { id: "fb_revenue", label: "CA Restauration", type: "number", unit: "€", placeholder: "0" },
      { id: "spa_revenue", label: "CA Spa", type: "number", unit: "€", placeholder: "0" },
      { id: "event_revenue", label: "CA Événements", type: "number", unit: "€", placeholder: "0" },
      { id: "other_revenue", label: "Autres revenus", type: "number", unit: "€", placeholder: "0" },
    ],
  },
  {
    id: "occupancy",
    name: "Occupation",
    icon: BedDouble,
    color: "text-blue-600 bg-blue-50",
    fields: [
      { id: "rooms_sold", label: "Chambres vendues", type: "number", placeholder: "0" },
      { id: "arrivals", label: "Arrivées", type: "number", placeholder: "0" },
      { id: "departures", label: "Départs", type: "number", placeholder: "0" },
      { id: "no_shows", label: "No-shows", type: "number", placeholder: "0" },
      { id: "walk_ins", label: "Walk-ins", type: "number", placeholder: "0" },
      { id: "cancellations", label: "Annulations", type: "number", placeholder: "0" },
    ],
  },
  {
    id: "expenses",
    name: "Dépenses",
    icon: Package,
    color: "text-red-600 bg-red-50",
    fields: [
      { id: "salaries", label: "Salaires & charges", type: "number", unit: "€", placeholder: "0" },
      { id: "utilities", label: "Énergie & fluides", type: "number", unit: "€", placeholder: "0" },
      { id: "maintenance_cost", label: "Maintenance", type: "number", unit: "€", placeholder: "0" },
      { id: "supplies_cost", label: "Fournitures", type: "number", unit: "€", placeholder: "0" },
      { id: "marketing_cost", label: "Marketing", type: "number", unit: "€", placeholder: "0" },
      { id: "other_expenses", label: "Autres dépenses", type: "number", unit: "€", placeholder: "0" },
    ],
  },
  {
    id: "staff",
    name: "Personnel",
    icon: Users,
    color: "text-violet-600 bg-violet-50",
    fields: [
      { id: "staff_on_duty", label: "Personnel en service", type: "number", placeholder: "0" },
      { id: "staff_on_leave", label: "En congé", type: "number", placeholder: "0" },
      { id: "overtime_hours", label: "Heures supplémentaires", type: "number", unit: "h", placeholder: "0" },
    ],
  },
  {
    id: "maintenance",
    name: "Maintenance",
    icon: Wrench,
    color: "text-amber-600 bg-amber-50",
    fields: [
      { id: "new_tickets", label: "Nouveaux tickets", type: "number", placeholder: "0" },
      { id: "closed_tickets", label: "Tickets résolus", type: "number", placeholder: "0" },
      { id: "rooms_oos", label: "Chambres hors service", type: "number", placeholder: "0" },
      { id: "maintenance_notes", label: "Notes", type: "text", placeholder: "Détails maintenance..." },
    ],
  },
];

const recentEntries = [
  { date: "23/02/2026", category: "Revenus", user: "Jean-Louis", time: "09:15", fields: 5 },
  { date: "22/02/2026", category: "Occupation", user: "Marie", time: "18:30", fields: 6 },
  { date: "22/02/2026", category: "Dépenses", user: "Jean-Louis", time: "17:45", fields: 4 },
  { date: "21/02/2026", category: "Personnel", user: "Sophie", time: "08:00", fields: 3 },
  { date: "21/02/2026", category: "Maintenance", user: "Pierre", time: "16:20", fields: 2 },
  { date: "20/02/2026", category: "Revenus", user: "Jean-Louis", time: "19:00", fields: 5 },
];

export default function SaisiePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("revenue");
  const [selectedDate, setSelectedDate] = useState("2026-02-23");
  const [saved, setSaved] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const currentCategory = categories.find((c) => c.id === selectedCategory)!;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Saisie manuelle"
        subtitle="Mettez à jour les données de votre établissement manuellement"
        showAI={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Category Selector */}
        <div className="lg:col-span-1 space-y-3">
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Catégorie</h3>
            <div className="space-y-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-brand-50 text-brand-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color}`}>
                      <cat.icon className="w-4 h-4" />
                    </div>
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Import */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Import de données</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-brand-300 hover:bg-brand-50/30 transition-all cursor-pointer">
              <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Glissez un fichier CSV ou Excel</p>
              <p className="text-[10px] text-gray-400 mt-1">ou cliquez pour parcourir</p>
            </div>
            <button className="mt-3 w-full btn-secondary justify-center text-xs">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Télécharger le template
            </button>
          </div>
        </div>

        {/* Center: Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PenSquare className="w-4 h-4 text-brand-600" />
                  <h3 className="text-sm font-semibold text-gray-900">{currentCategory.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input w-auto text-xs"
                  />
                </div>
              </div>
            </div>
            <div className="card-body space-y-4">
              {currentCategory.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    {field.label}
                  </label>
                  <div className="relative">
                    {field.type === "text" ? (
                      <textarea
                        className="input min-h-[80px] resize-none"
                        placeholder={field.placeholder}
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                      />
                    ) : field.type === "select" ? (
                      <select
                        className="select"
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                      >
                        <option value="">Sélectionner...</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        className="input"
                        placeholder={field.placeholder}
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                      />
                    )}
                    {field.unit && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {field.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Notes additionnelles
                </label>
                <textarea
                  className="input min-h-[60px] resize-none"
                  placeholder="Ajouter un commentaire optionnel..."
                  value={formValues["notes"] || ""}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button onClick={handleSave} className="btn-primary flex-1 justify-center">
                  {saved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Enregistré !
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </>
                  )}
                </button>
                <button
                  onClick={() => setFormValues({})}
                  className="btn-secondary"
                >
                  Effacer
                </button>
              </div>

              {saved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg animate-fade-in">
                  <p className="text-xs text-emerald-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Données enregistrées avec succès. L&apos;analyse IA sera mise à jour.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Recent entries */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-900">Dernières saisies</h3>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {recentEntries.map((entry, i) => (
                <div key={i} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-900">{entry.category}</span>
                    <span className="text-[10px] text-gray-400">{entry.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">par {entry.user}</span>
                    <span className="text-[10px] text-gray-400">{entry.time} · {entry.fields} champs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
