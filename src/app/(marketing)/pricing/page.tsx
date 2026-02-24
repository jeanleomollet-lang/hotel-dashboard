"use client";

import Link from "next/link";
import { Hotel, Check, ArrowLeft, Zap } from "lucide-react";

const plans = [
  {
    key: "STARTER",
    name: "Starter",
    description: "Pour les petits hôtels indépendants",
    price: 49,
    popular: false,
    features: [
      { text: "Jusqu'à 30 chambres", included: true },
      { text: "2 utilisateurs", included: true },
      { text: "Dashboard & KPIs", included: true },
      { text: "Rapports financiers basiques", included: true },
      { text: "Saisie manuelle", included: true },
      { text: "Export PDF", included: true },
      { text: "Support email (48h)", included: true },
      { text: "Revenue Management", included: false },
      { text: "Analyse IA", included: false },
      { text: "Intégrations PMS", included: false },
    ],
  },
  {
    key: "PROFESSIONAL",
    name: "Professional",
    description: "Pour les hôtels et boutique-hôtels",
    price: 149,
    popular: true,
    features: [
      { text: "Jusqu'à 100 chambres", included: true },
      { text: "10 utilisateurs", included: true },
      { text: "Tous les modules inclus", included: true },
      { text: "Rapports financiers complets", included: true },
      { text: "Revenue Management avancé", included: true },
      { text: "Analyse IA & recommandations", included: true },
      { text: "Export PDF, Excel & CSV", included: true },
      { text: "5 intégrations PMS/OTA", included: true },
      { text: "CRM & gestion clients", included: true },
      { text: "Support prioritaire (24h)", included: true },
    ],
  },
  {
    key: "ENTERPRISE",
    name: "Enterprise",
    description: "Pour les groupes hôteliers",
    price: 349,
    popular: false,
    features: [
      { text: "Chambres illimitées", included: true },
      { text: "Utilisateurs illimités", included: true },
      { text: "Tous les modules + API", included: true },
      { text: "IA avancée & prédictions", included: true },
      { text: "Multi-établissements", included: true },
      { text: "Intégrations illimitées", included: true },
      { text: "Dashboard consolidé groupe", included: true },
      { text: "Support dédié 24/7", included: true },
      { text: "Formation personnalisée", included: true },
      { text: "SLA garanti 99.9%", included: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/landing" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center">
                <Hotel className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">HotelPilot</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Connexion
              </Link>
              <Link href="/auth/register" className="btn-primary text-sm">
                Essai gratuit
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Choisissez votre plan
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            14 jours d&apos;essai gratuit sur tous les plans. Sans carte bancaire.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`bg-white rounded-2xl p-8 relative ${
                plan.popular
                  ? "border-2 border-brand-600 shadow-xl"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Le plus populaire
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-gray-900">
                  {plan.price}
                </span>
                <div className="text-gray-500">
                  <span className="text-lg">€</span>
                  <span className="text-sm">/mois HT</span>
                </div>
              </div>

              <Link
                href="/auth/register"
                className={`mt-8 w-full block text-center py-3 rounded-lg font-medium text-sm transition-colors ${
                  plan.popular
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Démarrer l&apos;essai gratuit
              </Link>

              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex items-start gap-3 text-sm ${
                      f.included ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        f.included ? "text-emerald-500" : "text-gray-300"
                      }`}
                    />
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Questions fréquentes
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Puis-je changer de plan à tout moment ?",
                a: "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Le changement prend effet immédiatement, avec un prorata sur votre facture.",
              },
              {
                q: "Y a-t-il un engagement ?",
                a: "Non, tous nos plans sont sans engagement. Vous pouvez annuler à tout moment. L'abonnement reste actif jusqu'à la fin de la période payée.",
              },
              {
                q: "Mes données sont-elles sécurisées ?",
                a: "Absolument. Nous utilisons le chiffrement SSL/TLS, le stockage sécurisé et nos serveurs sont hébergés en Europe (RGPD compliant).",
              },
              {
                q: "Comment fonctionne l'essai gratuit ?",
                a: "Vous bénéficiez de 14 jours d'essai gratuit avec accès complet au plan Professional. Aucune carte bancaire n'est requise pour commencer.",
              },
              {
                q: "Proposez-vous des réductions annuelles ?",
                a: "Oui, nous offrons 2 mois gratuits sur l'abonnement annuel, soit une réduction de 17% par rapport au tarif mensuel.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
