import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create demo user
  const passwordHash = await bcrypt.hash("demo1234", 12);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@hotelpilot.com" },
    update: {},
    create: {
      email: "demo@hotelpilot.com",
      passwordHash,
      firstName: "Jean-Louis",
      lastName: "Martin",
      role: "ADMIN",
    },
  });

  console.log(`Created demo user: ${demoUser.email}`);

  // Create subscription
  const subscription = await prisma.subscription.create({
    data: {
      stripeCustomerId: `demo_${demoUser.id}`,
      plan: "PROFESSIONAL",
      status: "ACTIVE",
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // Create demo hotel
  const hotel = await prisma.hotel.upsert({
    where: { slug: "le-clos-des-vignes" },
    update: {},
    create: {
      name: "Le Clos des Vignes",
      slug: "le-clos-des-vignes",
      address: "12 Avenue de la République",
      city: "Aix-en-Provence",
      country: "France",
      stars: 4,
      totalRooms: 42,
      currency: "EUR",
      timezone: "Europe/Paris",
      email: "contact@closdesvignes.fr",
      phone: "+33 4 42 00 00 00",
      onboarded: true,
      subscriptionId: subscription.id,
    },
  });

  console.log(`Created demo hotel: ${hotel.name}`);

  // Create membership
  await prisma.hotelMember.upsert({
    where: {
      userId_hotelId: { userId: demoUser.id, hotelId: hotel.id },
    },
    update: {},
    create: {
      userId: demoUser.id,
      hotelId: hotel.id,
      role: "OWNER",
    },
  });

  // Create room types
  const roomTypes = [
    { name: "Standard", count: 15, basePrice: 120, description: "Chambre standard 22m²" },
    { name: "Supérieure", count: 12, basePrice: 180, description: "Chambre supérieure 28m²" },
    { name: "Deluxe", count: 8, basePrice: 260, description: "Chambre deluxe 35m²" },
    { name: "Suite Junior", count: 5, basePrice: 380, description: "Suite junior 45m²" },
    { name: "Suite Prestige", count: 2, basePrice: 520, description: "Suite prestige 65m²" },
  ];

  for (const rt of roomTypes) {
    await prisma.roomType.create({
      data: { hotelId: hotel.id, ...rt },
    });
  }

  console.log("Created room types");

  // Generate daily KPIs for the last 30 days
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - 30);

  for (let i = 0; i < 30; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const seasonFactor = 0.7 + Math.random() * 0.25;
    const weekendBoost = isWeekend ? 1.15 : 1;

    const occupancy = Math.min(98, Math.round((65 + Math.random() * 25) * weekendBoost * seasonFactor));
    const roomsSold = Math.round((42 * occupancy) / 100);
    const adr = Math.round((175 + Math.random() * 60) * weekendBoost);
    const roomRevenue = roomsSold * adr;
    const fbRevenue = Math.round(roomsSold * (35 + Math.random() * 25));
    const otherRevenue = Math.round(roomsSold * (12 + Math.random() * 10));

    await prisma.dailyKPI.upsert({
      where: { hotelId_date: { hotelId: hotel.id, date } },
      update: {},
      create: {
        hotelId: hotel.id,
        date,
        occupancyRate: occupancy,
        adr,
        revpar: Math.round((adr * occupancy) / 100),
        totalRevenue: roomRevenue + fbRevenue + otherRevenue,
        roomRevenue,
        fbRevenue,
        otherRevenue,
        roomsSold,
        roomsAvailable: 42,
        arrivals: Math.round(roomsSold * 0.4 + Math.random() * 5),
        departures: Math.round(roomsSold * 0.35 + Math.random() * 5),
        stayovers: Math.round(roomsSold * 0.6),
        noShows: Math.round(Math.random() * 2),
        cancellations: Math.round(Math.random() * 3),
        walkIns: Math.round(Math.random() * 4),
        averageLOS: 2.1 + Math.random() * 0.8,
        goppar: Math.round((adr * occupancy * 0.35) / 100),
      },
    });
  }

  console.log("Created daily KPIs");

  // Create AI insights
  const insights = [
    {
      category: "revenue",
      type: "recommendation",
      severity: "success",
      title: "Opportunité tarifaire week-end",
      description:
        "Votre taux d'occupation moyen du week-end est de 92%. Vous pourriez augmenter vos tarifs de 8-12% les vendredis et samedis sans impact significatif sur la demande.",
      actionItems: [
        "Augmenter ADR de 8% le vendredi",
        "Augmenter ADR de 12% le samedi",
        "Surveiller le taux de conversion pendant 2 semaines",
      ],
    },
    {
      category: "operational",
      type: "alert",
      severity: "warning",
      title: "Stock produits d'accueil bas",
      description:
        "Le niveau de stock des produits d'accueil est passé en dessous du seuil minimum (150/180). Commande recommandée sous 48h.",
      actionItems: ["Commander produits d'accueil", "Vérifier autres stocks"],
    },
    {
      category: "kpi",
      type: "prediction",
      severity: "info",
      title: "Prévision occupation Mars",
      description:
        "Basé sur les tendances actuelles et les données historiques, nous prévoyons un taux d'occupation de 62% pour Mars 2026, en hausse de 4 points par rapport à Février.",
    },
    {
      category: "financial",
      type: "anomaly",
      severity: "critical",
      title: "Hausse inhabituelle des charges",
      description:
        "Les charges d'énergie ont augmenté de 23% par rapport au mois précédent. Cela dépasse la variation saisonnière attendue de 8-10%.",
      actionItems: [
        "Vérifier les compteurs",
        "Auditer la consommation par zone",
        "Contacter le fournisseur",
      ],
    },
    {
      category: "guest",
      type: "recommendation",
      severity: "info",
      title: "Satisfaction en hausse",
      description:
        "La note moyenne de satisfaction est passée de 8.5 à 8.7 ce mois. Le restaurant et le spa sont les mieux notés.",
    },
  ];

  for (const insight of insights) {
    await prisma.aIInsight.create({
      data: {
        hotelId: hotel.id,
        ...insight,
        actionItems: insight.actionItems || [],
      },
    });
  }

  console.log("Created AI insights");

  // Create sample guest reviews
  const reviews = [
    { guest: "Sophie L.", channel: "Booking.com", rating: 9.2, comment: "Séjour parfait, personnel attentionné et chambre magnifique.", sentiment: "positive" },
    { guest: "Marco R.", channel: "Google", rating: 8.5, comment: "Très bel hôtel, bonne situation. Le petit-déjeuner pourrait être amélioré.", sentiment: "neutral" },
    { guest: "Elena K.", channel: "TripAdvisor", rating: 9.8, comment: "Meilleur hôtel de la région ! Le spa est exceptionnel.", sentiment: "positive" },
    { guest: "Pierre D.", channel: "Direct", rating: 7.2, comment: "Chambre correcte mais bruyante côté rue. Dommage.", sentiment: "negative" },
    { guest: "Anna M.", channel: "Expedia", rating: 9.0, comment: "Excellent rapport qualité-prix. Nous reviendrons.", sentiment: "positive" },
  ];

  for (const review of reviews) {
    await prisma.guestReview.create({
      data: {
        hotelId: hotel.id,
        ...review,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  console.log("Created guest reviews");
  console.log("Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
