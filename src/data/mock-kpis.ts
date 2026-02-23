import { DailyKPI, MonthlyKPI } from "@/types/hotel";

// Generate 30 days of daily KPIs
function generateDailyKPIs(): DailyKPI[] {
  const days: DailyKPI[] = [];
  const baseDate = new Date("2026-02-01");

  for (let i = 0; i < 23; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const seasonFactor = 0.7 + Math.random() * 0.25;
    const weekendBoost = isWeekend ? 1.15 : 1;

    const occupancy = Math.min(98, Math.round((65 + Math.random() * 25) * weekendBoost * seasonFactor));
    const roomsSold = Math.round((42 * occupancy) / 100);
    const adr = Math.round((175 + Math.random() * 60) * weekendBoost);
    const roomRevenue = roomsSold * adr;
    const fbRevenue = Math.round(roomsSold * (35 + Math.random() * 25));
    const otherRevenue = Math.round(roomsSold * (12 + Math.random() * 10));

    days.push({
      date: date.toISOString().split("T")[0],
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
      goppar: Math.round(adr * occupancy * 0.35 / 100),
    });
  }
  return days;
}

export const dailyKPIs = generateDailyKPIs();

export const todayKPI = dailyKPIs[dailyKPIs.length - 1];

export const yesterdayKPI = dailyKPIs[dailyKPIs.length - 2];

// Monthly KPIs for the last 12 months
export const monthlyKPIs: MonthlyKPI[] = [
  {
    date: "2025-03-01", month: "Mars", year: 2025,
    occupancyRate: 58, adr: 165, revpar: 96, totalRevenue: 178500,
    roomRevenue: 124800, fbRevenue: 35200, otherRevenue: 18500,
    roomsSold: 756, roomsAvailable: 1302, arrivals: 380, departures: 365,
    stayovers: 520, noShows: 12, cancellations: 28, walkIns: 45,
    averageLOS: 2.0, goppar: 58,
    totalNightsAvailable: 1302, totalNightsSold: 756,
    trevpar: 137, cpor: 62, laborCostRatio: 32, energyCostRatio: 8,
    guestSatisfactionScore: 8.4, onlineReviewScore: 4.2,
    repeatGuestRate: 18, directBookingRate: 35, otaBookingRate: 52,
  },
  {
    date: "2025-04-01", month: "Avril", year: 2025,
    occupancyRate: 72, adr: 185, revpar: 133, totalRevenue: 225600,
    roomRevenue: 166800, fbRevenue: 38400, otherRevenue: 20400,
    roomsSold: 907, roomsAvailable: 1260, arrivals: 450, departures: 440,
    stayovers: 610, noShows: 8, cancellations: 22, walkIns: 52,
    averageLOS: 2.1, goppar: 72,
    totalNightsAvailable: 1260, totalNightsSold: 907,
    trevpar: 179, cpor: 58, laborCostRatio: 30, energyCostRatio: 7,
    guestSatisfactionScore: 8.6, onlineReviewScore: 4.3,
    repeatGuestRate: 20, directBookingRate: 38, otaBookingRate: 48,
  },
  {
    date: "2025-05-01", month: "Mai", year: 2025,
    occupancyRate: 78, adr: 195, revpar: 152, totalRevenue: 265400,
    roomRevenue: 196200, fbRevenue: 44800, otherRevenue: 24400,
    roomsSold: 1006, roomsAvailable: 1302, arrivals: 510, departures: 495,
    stayovers: 680, noShows: 6, cancellations: 18, walkIns: 58,
    averageLOS: 2.2, goppar: 82,
    totalNightsAvailable: 1302, totalNightsSold: 1006,
    trevpar: 204, cpor: 55, laborCostRatio: 28, energyCostRatio: 6,
    guestSatisfactionScore: 8.7, onlineReviewScore: 4.4,
    repeatGuestRate: 22, directBookingRate: 40, otaBookingRate: 46,
  },
  {
    date: "2025-06-01", month: "Juin", year: 2025,
    occupancyRate: 85, adr: 220, revpar: 187, totalRevenue: 315200,
    roomRevenue: 237600, fbRevenue: 49800, otherRevenue: 27800,
    roomsSold: 1080, roomsAvailable: 1260, arrivals: 540, departures: 530,
    stayovers: 720, noShows: 5, cancellations: 15, walkIns: 42,
    averageLOS: 2.4, goppar: 98,
    totalNightsAvailable: 1260, totalNightsSold: 1080,
    trevpar: 250, cpor: 52, laborCostRatio: 26, energyCostRatio: 7,
    guestSatisfactionScore: 8.8, onlineReviewScore: 4.5,
    repeatGuestRate: 24, directBookingRate: 42, otaBookingRate: 44,
  },
  {
    date: "2025-07-01", month: "Juillet", year: 2025,
    occupancyRate: 92, adr: 248, revpar: 228, totalRevenue: 398500,
    roomRevenue: 302400, fbRevenue: 62100, otherRevenue: 34000,
    roomsSold: 1219, roomsAvailable: 1302, arrivals: 580, departures: 570,
    stayovers: 810, noShows: 3, cancellations: 10, walkIns: 35,
    averageLOS: 2.8, goppar: 118,
    totalNightsAvailable: 1302, totalNightsSold: 1219,
    trevpar: 306, cpor: 48, laborCostRatio: 24, energyCostRatio: 8,
    guestSatisfactionScore: 8.5, onlineReviewScore: 4.3,
    repeatGuestRate: 15, directBookingRate: 30, otaBookingRate: 55,
  },
  {
    date: "2025-08-01", month: "Août", year: 2025,
    occupancyRate: 95, adr: 260, revpar: 247, totalRevenue: 428600,
    roomRevenue: 326400, fbRevenue: 65800, otherRevenue: 36400,
    roomsSold: 1256, roomsAvailable: 1302, arrivals: 600, departures: 590,
    stayovers: 830, noShows: 2, cancellations: 8, walkIns: 28,
    averageLOS: 3.0, goppar: 125,
    totalNightsAvailable: 1302, totalNightsSold: 1256,
    trevpar: 329, cpor: 46, laborCostRatio: 23, energyCostRatio: 9,
    guestSatisfactionScore: 8.3, onlineReviewScore: 4.2,
    repeatGuestRate: 12, directBookingRate: 28, otaBookingRate: 58,
  },
  {
    date: "2025-09-01", month: "Septembre", year: 2025,
    occupancyRate: 82, adr: 210, revpar: 172, totalRevenue: 290400,
    roomRevenue: 218400, fbRevenue: 46200, otherRevenue: 25800,
    roomsSold: 1040, roomsAvailable: 1260, arrivals: 520, departures: 510,
    stayovers: 700, noShows: 7, cancellations: 20, walkIns: 48,
    averageLOS: 2.3, goppar: 90,
    totalNightsAvailable: 1260, totalNightsSold: 1040,
    trevpar: 230, cpor: 54, laborCostRatio: 27, energyCostRatio: 6,
    guestSatisfactionScore: 8.9, onlineReviewScore: 4.6,
    repeatGuestRate: 26, directBookingRate: 44, otaBookingRate: 42,
  },
  {
    date: "2025-10-01", month: "Octobre", year: 2025,
    occupancyRate: 70, adr: 190, revpar: 133, totalRevenue: 231000,
    roomRevenue: 172800, fbRevenue: 37800, otherRevenue: 20400,
    roomsSold: 910, roomsAvailable: 1302, arrivals: 460, departures: 450,
    stayovers: 620, noShows: 9, cancellations: 25, walkIns: 50,
    averageLOS: 2.1, goppar: 70,
    totalNightsAvailable: 1302, totalNightsSold: 910,
    trevpar: 177, cpor: 58, laborCostRatio: 30, energyCostRatio: 7,
    guestSatisfactionScore: 8.7, onlineReviewScore: 4.4,
    repeatGuestRate: 25, directBookingRate: 42, otaBookingRate: 45,
  },
  {
    date: "2025-11-01", month: "Novembre", year: 2025,
    occupancyRate: 55, adr: 158, revpar: 87, totalRevenue: 156800,
    roomRevenue: 109200, fbRevenue: 31200, otherRevenue: 16400,
    roomsSold: 693, roomsAvailable: 1260, arrivals: 350, departures: 340,
    stayovers: 480, noShows: 14, cancellations: 32, walkIns: 38,
    averageLOS: 1.9, goppar: 48,
    totalNightsAvailable: 1260, totalNightsSold: 693,
    trevpar: 124, cpor: 65, laborCostRatio: 34, energyCostRatio: 9,
    guestSatisfactionScore: 8.5, onlineReviewScore: 4.3,
    repeatGuestRate: 28, directBookingRate: 45, otaBookingRate: 40,
  },
  {
    date: "2025-12-01", month: "Décembre", year: 2025,
    occupancyRate: 62, adr: 175, revpar: 109, totalRevenue: 195600,
    roomRevenue: 140400, fbRevenue: 36000, otherRevenue: 19200,
    roomsSold: 808, roomsAvailable: 1302, arrivals: 410, departures: 400,
    stayovers: 550, noShows: 10, cancellations: 26, walkIns: 55,
    averageLOS: 2.0, goppar: 58,
    totalNightsAvailable: 1302, totalNightsSold: 808,
    trevpar: 150, cpor: 60, laborCostRatio: 31, energyCostRatio: 10,
    guestSatisfactionScore: 8.6, onlineReviewScore: 4.4,
    repeatGuestRate: 30, directBookingRate: 46, otaBookingRate: 38,
  },
  {
    date: "2026-01-01", month: "Janvier", year: 2026,
    occupancyRate: 48, adr: 148, revpar: 71, totalRevenue: 132400,
    roomRevenue: 92400, fbRevenue: 26400, otherRevenue: 13600,
    roomsSold: 624, roomsAvailable: 1302, arrivals: 310, departures: 300,
    stayovers: 420, noShows: 16, cancellations: 35, walkIns: 30,
    averageLOS: 1.8, goppar: 38,
    totalNightsAvailable: 1302, totalNightsSold: 624,
    trevpar: 102, cpor: 68, laborCostRatio: 36, energyCostRatio: 12,
    guestSatisfactionScore: 8.8, onlineReviewScore: 4.5,
    repeatGuestRate: 32, directBookingRate: 48, otaBookingRate: 36,
  },
  {
    date: "2026-02-01", month: "Février", year: 2026,
    occupancyRate: 52, adr: 155, revpar: 81, totalRevenue: 148200,
    roomRevenue: 103200, fbRevenue: 29400, otherRevenue: 15600,
    roomsSold: 666, roomsAvailable: 1176, arrivals: 340, departures: 330,
    stayovers: 460, noShows: 12, cancellations: 28, walkIns: 35,
    averageLOS: 1.9, goppar: 42,
    totalNightsAvailable: 1176, totalNightsSold: 666,
    trevpar: 126, cpor: 64, laborCostRatio: 34, energyCostRatio: 11,
    guestSatisfactionScore: 8.7, onlineReviewScore: 4.4,
    repeatGuestRate: 30, directBookingRate: 46, otaBookingRate: 38,
  },
];

export const currentMonthKPI = monthlyKPIs[monthlyKPIs.length - 1];
export const previousMonthKPI = monthlyKPIs[monthlyKPIs.length - 2];
