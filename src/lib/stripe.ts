import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export const PLANS = {
  STARTER: {
    name: "Starter",
    description: "Pour les petits hôtels jusqu'à 30 chambres",
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    price: 49,
    currency: "eur",
    features: [
      "Jusqu'à 30 chambres",
      "2 utilisateurs",
      "Dashboard & KPIs",
      "Rapports financiers basiques",
      "Export PDF",
      "Support email",
    ],
    limits: {
      maxRooms: 30,
      maxUsers: 2,
      modules: ["dashboard", "financier", "saisie", "parametres"],
      exports: ["pdf"],
      aiInsights: false,
      integrations: 1,
    },
  },
  PROFESSIONAL: {
    name: "Professional",
    description: "Pour les hôtels jusqu'à 100 chambres",
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    price: 149,
    currency: "eur",
    features: [
      "Jusqu'à 100 chambres",
      "10 utilisateurs",
      "Tous les modules",
      "Analyse IA",
      "Revenue Management",
      "Export PDF & Excel",
      "Intégrations PMS",
      "Support prioritaire",
    ],
    limits: {
      maxRooms: 100,
      maxUsers: 10,
      modules: ["dashboard", "financier", "operationnel", "revenue", "guests", "saisie", "integrations", "parametres"],
      exports: ["pdf", "excel", "csv"],
      aiInsights: true,
      integrations: 5,
    },
  },
  ENTERPRISE: {
    name: "Enterprise",
    description: "Pour les hôtels et groupes sans limite",
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    price: 349,
    currency: "eur",
    features: [
      "Chambres illimitées",
      "Utilisateurs illimités",
      "Tous les modules",
      "IA avancée & prédictions",
      "API complète",
      "Intégrations illimitées",
      "Multi-établissements",
      "Support dédié 24/7",
      "Formation personnalisée",
    ],
    limits: {
      maxRooms: Infinity,
      maxUsers: Infinity,
      modules: ["dashboard", "financier", "operationnel", "revenue", "guests", "saisie", "integrations", "parametres", "admin"],
      exports: ["pdf", "excel", "csv", "api"],
      aiInsights: true,
      integrations: Infinity,
    },
  },
} as const;

export type PlanKey = keyof typeof PLANS;
