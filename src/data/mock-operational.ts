import { OperationalData } from "@/types/hotel";

export const todayOperational: OperationalData = {
  date: "2026-02-23",
  housekeeping: {
    roomsCleaned: 18,
    roomsPending: 8,
    roomsInspected: 15,
    averageCleanTime: 32,
    staffOnDuty: 6,
    lateCheckouts: 3,
    earlyCheckins: 2,
  },
  maintenance: {
    openTickets: 7,
    closedToday: 4,
    avgResolutionTime: 4.2,
    preventiveTasks: 3,
    urgentIssues: 1,
    roomsOutOfOrder: 2,
  },
  staff: {
    totalEmployees: 38,
    onDutyToday: 24,
    onLeave: 4,
    overtime: 12,
    satisfaction: 7.8,
    turnoverRate: 8.5,
    departments: [
      { name: "Réception", headcount: 8, onDuty: 3, cost: 18400 },
      { name: "Housekeeping", headcount: 10, onDuty: 6, cost: 16200 },
      { name: "F&B / Restaurant", headcount: 8, onDuty: 5, cost: 14800 },
      { name: "Maintenance", headcount: 4, onDuty: 3, cost: 9200 },
      { name: "Spa & Bien-être", headcount: 3, onDuty: 2, cost: 7400 },
      { name: "Administration", headcount: 3, onDuty: 3, cost: 12800 },
      { name: "Direction", headcount: 2, onDuty: 2, cost: 15200 },
    ],
  },
  inventory: {
    linens: { name: "Linge de lit & serviettes", currentStock: 280, minimumStock: 200, status: "ok", lastOrdered: "2026-02-10", monthlyCost: 2800 },
    toiletries: { name: "Produits d'accueil", currentStock: 150, minimumStock: 180, status: "low", lastOrdered: "2026-02-05", monthlyCost: 1200 },
    minibarItems: { name: "Minibar", currentStock: 320, minimumStock: 250, status: "ok", lastOrdered: "2026-02-15", monthlyCost: 1800 },
    cleaningSupplies: { name: "Produits d'entretien", currentStock: 45, minimumStock: 60, status: "low", lastOrdered: "2026-02-01", monthlyCost: 900 },
    fbSupplies: { name: "F&B / Cuisine", currentStock: 85, minimumStock: 100, status: "low", lastOrdered: "2026-02-18", monthlyCost: 4200 },
  },
};
