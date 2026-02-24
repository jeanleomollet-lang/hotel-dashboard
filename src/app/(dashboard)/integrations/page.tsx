"use client";

import {
  Plug,
  Server,
  Landmark,
  Globe,
  Calculator,
  CreditCard,
  Layers,
  Home,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Clock,
  Zap,
  Settings,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { integrations } from "@/data/mock-integrations";
import { Integration } from "@/types/hotel";

function getStatusBadge(status: Integration["status"]) {
  switch (status) {
    case "connected":
      return (
        <span className="badge-success flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Connecté
        </span>
      );
    case "syncing":
      return (
        <span className="badge-info flex items-center gap-1">
          <RefreshCw className="w-3 h-3 animate-spin" /> Synchronisation
        </span>
      );
    case "error":
      return (
        <span className="badge-danger flex items-center gap-1">
          <XCircle className="w-3 h-3" /> Erreur
        </span>
      );
    case "disconnected":
      return (
        <span className="badge flex items-center gap-1 bg-gray-100 text-gray-500">
          <AlertTriangle className="w-3 h-3" /> Déconnecté
        </span>
      );
  }
}

function getTypeIcon(type: Integration["type"]) {
  const iconMap = {
    pms: Server,
    bank: Landmark,
    ota: Globe,
    accounting: Calculator,
    pos: CreditCard,
    crm: Home,
    channel_manager: Layers,
  };
  const Icon = iconMap[type];
  return <Icon className="w-5 h-5" />;
}

function getTypeLabel(type: Integration["type"]) {
  const labels = {
    pms: "PMS",
    bank: "Banque",
    ota: "OTA",
    accounting: "Comptabilité",
    pos: "Point de vente",
    crm: "CRM",
    channel_manager: "Channel Manager",
  };
  return labels[type];
}

export default function IntegrationsPage() {
  const connected = integrations.filter((i) => i.status === "connected" || i.status === "syncing").length;
  const errored = integrations.filter((i) => i.status === "error").length;

  const availableIntegrations = [
    { name: "Mews PMS", type: "pms", description: "Système de gestion hôtelière cloud" },
    { name: "Cloudbeds", type: "pms", description: "PMS & Channel Manager intégré" },
    { name: "BNP Paribas", type: "bank", description: "Connexion bancaire sécurisée" },
    { name: "Société Générale", type: "bank", description: "Synchronisation automatique" },
    { name: "Stripe", type: "pos", description: "Paiements en ligne" },
    { name: "Google Hotel Ads", type: "ota", description: "Metasearch direct" },
    { name: "TripAdvisor", type: "ota", description: "Avis et réservations" },
    { name: "QuickBooks", type: "accounting", description: "Comptabilité en ligne" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Intégrations & Connexions"
        subtitle="Gérez vos connexions PMS, bancaires, OTA et autres systèmes"
        showAI={false}
      />

      {/* Status summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Plug className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{connected}/{integrations.length}</p>
              <p className="text-xs text-gray-500">Intégrations actives</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-xs text-gray-500">Synchronisation automatique</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${errored > 0 ? "bg-red-50" : "bg-emerald-50"} flex items-center justify-center`}>
              {errored > 0 ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{errored > 0 ? `${errored} erreur(s)` : "Tout OK"}</p>
              <p className="text-xs text-gray-500">{errored > 0 ? "Action requise" : "Aucun problème détecté"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Integrations */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-gray-900">Intégrations configurées</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className={`px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                integration.status === "error" ? "bg-red-50/30" : ""
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                integration.status === "error"
                  ? "bg-red-100 text-red-600"
                  : integration.status === "syncing"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-brand-50 text-brand-600"
              }`}>
                {getTypeIcon(integration.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-900">{integration.name}</h4>
                  <span className="text-[10px] font-medium text-gray-400 uppercase">{getTypeLabel(integration.type)}</span>
                </div>
                <p className="text-xs text-gray-500">{integration.provider}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Dernière sync: {new Date(integration.lastSync).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" })}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 max-w-[200px]">
                {integration.dataPoints.slice(0, 3).map((dp) => (
                  <span key={dp} className="badge bg-gray-100 text-gray-500 text-[9px]">{dp}</span>
                ))}
                {integration.dataPoints.length > 3 && (
                  <span className="badge bg-gray-100 text-gray-400 text-[9px]">+{integration.dataPoints.length - 3}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(integration.status)}
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Integrations */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-gray-900">Intégrations disponibles</h3>
          <p className="text-xs text-gray-400 mt-0.5">Connectez de nouveaux services pour enrichir votre dashboard</p>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {availableIntegrations.map((ai) => (
              <div
                key={ai.name}
                className="p-4 border border-dashed border-gray-200 rounded-lg hover:border-brand-300 hover:bg-brand-50/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700 group-hover:text-brand-700">{ai.name}</h4>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-500 transition-colors" />
                </div>
                <p className="text-[10px] text-gray-400">{ai.description}</p>
                <span className="mt-2 inline-block text-[9px] font-medium text-gray-400 uppercase">{ai.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sync Log */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-gray-900">Journal de synchronisation</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Horodatage</th>
                <th>Intégration</th>
                <th>Type</th>
                <th>Statut</th>
                <th>Données</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: "09:55", integration: "SiteMinder", type: "Sync auto", status: "En cours", data: "Disponibilités + tarifs" },
                { time: "09:50", integration: "Lightspeed POS", type: "Sync auto", status: "Succès", data: "42 transactions" },
                { time: "09:45", integration: "Opera PMS", type: "Sync auto", status: "Succès", data: "Réservations + check-in/out" },
                { time: "09:30", integration: "Booking.com", type: "Webhook", status: "Succès", data: "3 nouvelles réservations" },
                { time: "09:30", integration: "Expedia", type: "Sync auto", status: "Succès", data: "1 réservation + 2 avis" },
                { time: "08:00", integration: "Crédit Agricole", type: "Sync auto", status: "Succès", data: "Solde + 12 transactions" },
                { time: "02:00", integration: "Airbnb", type: "Sync auto", status: "Échec", data: "Erreur API timeout" },
              ].map((log, i) => (
                <tr key={i}>
                  <td className="text-gray-500">{log.time}</td>
                  <td className="font-medium">{log.integration}</td>
                  <td><span className="badge bg-gray-100 text-gray-500">{log.type}</span></td>
                  <td>
                    <span className={`badge ${log.status === "Succès" ? "badge-success" : log.status === "En cours" ? "badge-info" : "badge-danger"}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="text-gray-500">{log.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
