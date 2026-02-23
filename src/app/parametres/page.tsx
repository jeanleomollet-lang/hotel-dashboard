"use client";

import { useState } from "react";
import {
  Settings2,
  Hotel,
  Star,
  MapPin,
  BedDouble,
  Globe,
  Bell,
  Shield,
  Palette,
  Download,
  Save,
  CheckCircle2,
  Users,
  Mail,
  Key,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { hotelProfile } from "@/data/mock-hotel";

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState("hotel");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "hotel", label: "Établissement", icon: Hotel },
    { id: "users", label: "Utilisateurs", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "display", label: "Affichage", icon: Palette },
    { id: "export", label: "Export", icon: Download },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Paramètres"
        subtitle="Configuration de votre établissement et de votre compte"
        showAI={false}
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-white text-brand-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hotel Tab */}
      {activeTab === "hotel" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card">
            <div className="card-header">
              <h3 className="text-sm font-semibold text-gray-900">Informations de l&apos;établissement</h3>
            </div>
            <div className="card-body space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Nom de l&apos;hôtel</label>
                  <input type="text" className="input" defaultValue={hotelProfile.name} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Classement</label>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 cursor-pointer ${
                          i < hotelProfile.stars ? "text-amber-400 fill-amber-400" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  Adresse
                </label>
                <input type="text" className="input" defaultValue={hotelProfile.address} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Ville</label>
                  <input type="text" className="input" defaultValue={hotelProfile.city} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Pays</label>
                  <input type="text" className="input" defaultValue={hotelProfile.country} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    <BedDouble className="w-3 h-3 inline mr-1" />
                    Nombre de chambres
                  </label>
                  <input type="number" className="input" defaultValue={hotelProfile.totalRooms} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Devise</label>
                  <select className="select" defaultValue={hotelProfile.currency}>
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CHF">CHF</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    <Globe className="w-3 h-3 inline mr-1" />
                    Fuseau horaire
                  </label>
                  <select className="select" defaultValue={hotelProfile.timezone}>
                    <option value="Europe/Paris">Europe/Paris</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="Europe/Berlin">Europe/Berlin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Types de chambres</label>
                <div className="space-y-2">
                  {hotelProfile.roomTypes.map((rt) => (
                    <div key={rt.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <input type="text" className="input flex-1" defaultValue={rt.name} />
                      <input type="number" className="input w-20" defaultValue={rt.count} />
                      <div className="relative">
                        <input type="number" className="input w-28" defaultValue={rt.basePrice} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">€</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleSave} className="btn-primary">
                {saved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Enregistré !
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Enregistrer les modifications
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Résumé</h3>
              <div className="space-y-3">
                {[
                  { label: "Nom", value: hotelProfile.name },
                  { label: "Ville", value: hotelProfile.city },
                  { label: "Chambres", value: `${hotelProfile.totalRooms} chambres` },
                  { label: "Types", value: `${hotelProfile.roomTypes.length} catégories` },
                  { label: "Classement", value: `${"★".repeat(hotelProfile.stars)}` },
                  { label: "Devise", value: hotelProfile.currency },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <span className="text-xs font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Plan & Abonnement</h3>
              <div className="p-3 bg-gradient-to-r from-brand-50 to-violet-50 rounded-lg border border-brand-200">
                <p className="text-xs font-bold text-brand-700">HotelPilot Pro</p>
                <p className="text-[10px] text-brand-500 mt-0.5">Toutes les fonctionnalités + IA avancée</p>
                <p className="text-lg font-bold text-brand-800 mt-2">149€<span className="text-xs font-normal text-brand-500">/mois</span></p>
              </div>
              <p className="text-[10px] text-gray-400 mt-2">Prochain renouvellement: 01/03/2026</p>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Gestion des utilisateurs</h3>
            <button className="btn-primary text-xs">
              <Plus className="w-3.5 h-3.5" />
              Ajouter un utilisateur
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Dernière connexion</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Jean-Louis Martin", email: "jl.martin@closdesvignes.fr", role: "Administrateur", lastLogin: "23/02/2026 09:15", status: "Actif" },
                  { name: "Marie Dubois", email: "m.dubois@closdesvignes.fr", role: "Réception", lastLogin: "23/02/2026 08:00", status: "Actif" },
                  { name: "Sophie Lambert", email: "s.lambert@closdesvignes.fr", role: "Housekeeping Manager", lastLogin: "22/02/2026 17:30", status: "Actif" },
                  { name: "Pierre Moreau", email: "p.moreau@closdesvignes.fr", role: "Maintenance", lastLogin: "21/02/2026 16:20", status: "Actif" },
                  { name: "Claire Petit", email: "c.petit@closdesvignes.fr", role: "Comptabilité", lastLogin: "20/02/2026 14:00", status: "Inactif" },
                ].map((user, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-brand-700">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="text-gray-500">{user.email}</td>
                    <td><span className="badge bg-brand-50 text-brand-700">{user.role}</span></td>
                    <td className="text-gray-500">{user.lastLogin}</td>
                    <td>
                      <span className={`badge ${user.status === "Actif" ? "badge-success" : "bg-gray-100 text-gray-500"}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Préférences de notification</h3>
          </div>
          <div className="card-body space-y-4">
            {[
              { label: "Alertes IA critiques", description: "Recevoir les alertes critiques de l'IA par email", enabled: true },
              { label: "Rapport quotidien", description: "Résumé quotidien des KPIs par email à 8h", enabled: true },
              { label: "Erreurs d'intégration", description: "Notification en cas d'erreur de synchronisation", enabled: true },
              { label: "Nouveaux avis clients", description: "Notification pour chaque nouvel avis reçu", enabled: false },
              { label: "Stocks bas", description: "Alerte quand un stock passe sous le seuil minimum", enabled: true },
              { label: "Rapport hebdomadaire", description: "Synthèse financière et opérationnelle chaque lundi", enabled: true },
              { label: "Réservations directes", description: "Notification pour chaque nouvelle réservation directe", enabled: false },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{pref.label}</p>
                  <p className="text-xs text-gray-500">{pref.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={pref.enabled} />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-4">
          <div className="card">
            <div className="card-header">
              <h3 className="text-sm font-semibold text-gray-900">Sécurité du compte</h3>
            </div>
            <div className="card-body space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  <Mail className="w-3 h-3 inline mr-1" />
                  Email
                </label>
                <input type="email" className="input max-w-md" defaultValue="jl.martin@closdesvignes.fr" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  <Key className="w-3 h-3 inline mr-1" />
                  Mot de passe
                </label>
                <button className="btn-secondary text-xs">Modifier le mot de passe</button>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">Authentification à deux facteurs</p>
                  <p className="text-xs text-gray-500">Sécurisez votre compte avec la 2FA</p>
                </div>
                <span className="badge-success">Activée</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display Tab */}
      {activeTab === "display" && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Préférences d&apos;affichage</h3>
          </div>
          <div className="card-body space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Langue</label>
              <select className="select max-w-xs" defaultValue="fr">
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Format de date</label>
              <select className="select max-w-xs" defaultValue="dd/mm/yyyy">
                <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                <option value="yyyy-mm-dd">YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Page d&apos;accueil par défaut</label>
              <select className="select max-w-xs" defaultValue="/dashboard">
                <option value="/dashboard">Tableau de bord</option>
                <option value="/financier">Financier</option>
                <option value="/operationnel">Opérationnel</option>
                <option value="/revenue">Revenue Management</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === "export" && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-sm font-semibold text-gray-900">Export de données</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Rapport KPI mensuel", format: "PDF", description: "Synthèse de tous les KPIs du mois" },
                { label: "Données financières", format: "Excel", description: "P&L détaillé, revenus et charges" },
                { label: "Données clients", format: "CSV", description: "Liste des clients et segments" },
                { label: "Historique occupation", format: "Excel", description: "Taux d'occupation quotidien" },
                { label: "Rapport IA", format: "PDF", description: "Toutes les recommandations IA" },
                { label: "Export complet", format: "ZIP", description: "Toutes les données de l'établissement" },
              ].map((exp, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-brand-300 hover:bg-brand-50/30 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900">{exp.label}</h4>
                    <span className="badge bg-gray-100 text-gray-500">{exp.format}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{exp.description}</p>
                  <button className="mt-3 text-xs font-medium text-brand-600 flex items-center gap-1 hover:text-brand-700">
                    <Download className="w-3 h-3" />
                    Télécharger
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
