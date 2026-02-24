"use client";

import Link from "next/link";
import {
  Hotel,
  BarChart3,
  Brain,
  Shield,
  CreditCard,
  Users,
  TrendingUp,
  ArrowRight,
  Check,
  Star,
  Sparkles,
  Globe,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard Intelligent",
    description:
      "Visualisez tous vos KPIs en temps réel : taux d'occupation, ADR, RevPAR, GOP et plus encore.",
  },
  {
    icon: Brain,
    title: "Analyse IA",
    description:
      "L'intelligence artificielle analyse vos données et vous fournit des recommandations personnalisées.",
  },
  {
    icon: CreditCard,
    title: "Gestion Financière",
    description:
      "Suivi complet de votre P&L, marges, cashflow et comparaison N/N-1 automatique.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Management",
    description:
      "Optimisez vos tarifs avec l'analyse ADR, RevPAR, TRevPAR et le suivi du booking pace.",
  },
  {
    icon: Users,
    title: "CRM & Clients",
    description:
      "Gérez vos clients, analysez la satisfaction et suivez les avis sur tous les canaux.",
  },
  {
    icon: Globe,
    title: "Intégrations",
    description:
      "Connectez votre PMS, channel manager, comptabilité et systèmes de paiement.",
  },
];

const testimonials = [
  {
    name: "Marie Laurent",
    role: "Directrice, Hôtel Le Provence",
    text: "HotelPilot a transformé notre gestion quotidienne. Nous avons gagné 15% de RevPAR en 3 mois.",
    stars: 5,
  },
  {
    name: "Pierre Durand",
    role: "Propriétaire, Château de la Loire",
    text: "Enfin un outil pensé pour les hôteliers indépendants. L'analyse IA est remarquable.",
    stars: 5,
  },
  {
    name: "Sophie Martin",
    role: "Revenue Manager, Boutique Hôtel Paris",
    text: "Le suivi financier et le revenue management sont exactement ce dont nous avions besoin.",
    stars: 5,
  },
];

const stats = [
  { value: "500+", label: "Hôtels" },
  { value: "15%", label: "RevPAR moyen gagné" },
  { value: "2h/jour", label: "De temps gagné" },
  { value: "98%", label: "Satisfaction client" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center">
                <Hotel className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                HotelPilot
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Fonctionnalités
              </a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Tarifs
              </a>
              <a href="#testimonials" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Témoignages
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Connexion
              </Link>
              <Link href="/auth/register" className="btn-primary text-sm">
                Essai gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-blue-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-200 rounded-full text-sm text-brand-700 font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Propulsé par l&apos;Intelligence Artificielle
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Le tableau de bord
              <br />
              <span className="bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">
                qui fait grandir votre hôtel
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              HotelPilot centralise vos données, automatise vos analyses et vous aide
              à prendre les meilleures décisions pour maximiser vos revenus.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="btn-primary text-base px-8 py-3"
              >
                Démarrer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/dashboard"
                className="btn-secondary text-base px-8 py-3"
              >
                Voir la démo
              </Link>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              14 jours d&apos;essai gratuit · Sans carte bancaire · Annulation à tout moment
            </p>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Tout ce dont votre hôtel a besoin
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète conçue spécifiquement pour les hôteliers
              indépendants et les groupes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Des tarifs simples et transparents
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choisissez le plan adapté à votre établissement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900">Starter</h3>
              <p className="text-sm text-gray-500 mt-1">Petits hôtels</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">49</span>
                <span className="text-gray-500">€/mois</span>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  "Jusqu'à 30 chambres",
                  "2 utilisateurs",
                  "Dashboard & KPIs",
                  "Rapports financiers",
                  "Export PDF",
                  "Support email",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register"
                className="mt-8 w-full btn-secondary justify-center py-2.5 block text-center"
              >
                Commencer
              </Link>
            </div>

            {/* Professional */}
            <div className="bg-white rounded-2xl border-2 border-brand-600 p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-600 text-white text-xs font-semibold rounded-full">
                Populaire
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Professional
              </h3>
              <p className="text-sm text-gray-500 mt-1">Hôtels & boutiques</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">149</span>
                <span className="text-gray-500">€/mois</span>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  "Jusqu'à 100 chambres",
                  "10 utilisateurs",
                  "Tous les modules",
                  "Analyse IA",
                  "Revenue Management",
                  "Export PDF & Excel",
                  "Intégrations PMS",
                  "Support prioritaire",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register"
                className="mt-8 w-full btn-primary justify-center py-2.5 block text-center"
              >
                Commencer
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900">
                Enterprise
              </h3>
              <p className="text-sm text-gray-500 mt-1">Groupes hôteliers</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">349</span>
                <span className="text-gray-500">€/mois</span>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  "Chambres illimitées",
                  "Utilisateurs illimités",
                  "IA avancée & prédictions",
                  "API complète",
                  "Intégrations illimitées",
                  "Multi-établissements",
                  "Support dédié 24/7",
                  "Formation personnalisée",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register"
                className="mt-8 w-full btn-secondary justify-center py-2.5 block text-center"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-hotel-gold text-hotel-gold"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-brand-600 to-blue-600 rounded-3xl p-12 sm:p-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Prêt à transformer votre gestion hôtelière ?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Rejoignez plus de 500 hôteliers qui utilisent HotelPilot pour
              optimiser leurs revenus et simplifier leur quotidien.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand-700 rounded-lg font-semibold text-base hover:bg-gray-50 transition-colors"
              >
                Démarrer gratuitement
                <Zap className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center">
                  <Hotel className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900">HotelPilot</span>
              </div>
              <p className="text-sm text-gray-500">
                Dashboard hôtelier intelligent propulsé par l&apos;IA.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#features" className="hover:text-gray-700">Fonctionnalités</a></li>
                <li><a href="#pricing" className="hover:text-gray-700">Tarifs</a></li>
                <li><Link href="/dashboard" className="hover:text-gray-700">Démo</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-700">À propos</a></li>
                <li><a href="#" className="hover:text-gray-700">Blog</a></li>
                <li><a href="#" className="hover:text-gray-700">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-700">Conditions d&apos;utilisation</a></li>
                <li><a href="#" className="hover:text-gray-700">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-gray-700">RGPD</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} HotelPilot. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
