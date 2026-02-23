import { FinancialData } from "@/types/hotel";

// Données N-1 (janvier 2024 — février 2025) + données actuelles (mars 2025 — février 2026)
export const monthlyFinancials: FinancialData[] = [
  // === ANNÉE N-1 ===
  {
    date: "2024-01-01",
    revenue: { rooms: 78400, foodAndBeverage: 22800, spa: 5200, events: 3200, parking: 2000, minibar: 1800, laundry: 900, other: 3500, total: 117800 },
    expenses: { salaries: 52000, utilities: 15800, maintenance: 6800, supplies: 4800, marketing: 5000, commissions: 11600, insurance: 2800, taxes: 8400, depreciation: 7800, other: 3800, total: 119000 },
    profit: { grossProfit: 28800, operatingProfit: -1200, netProfit: -2400, grossMargin: 24.4, operatingMargin: -1.0, netMargin: -2.0, ebitda: 6600 },
    cashflow: { opening: 95000, inflows: 117800, outflows: 119000, closing: 93800, bankBalance: 93800 },
  },
  {
    date: "2024-02-01",
    revenue: { rooms: 88200, foodAndBeverage: 25200, spa: 6000, events: 3800, parking: 2200, minibar: 2100, laundry: 1000, other: 4000, total: 132500 },
    expenses: { salaries: 53000, utilities: 15200, maintenance: 7200, supplies: 5200, marketing: 5200, commissions: 13000, insurance: 2800, taxes: 9200, depreciation: 7800, other: 4000, total: 122600 },
    profit: { grossProfit: 39200, operatingProfit: 9900, netProfit: 7200, grossMargin: 29.6, operatingMargin: 7.5, netMargin: 5.4, ebitda: 17700 },
    cashflow: { opening: 93800, inflows: 132500, outflows: 122600, closing: 103700, bankBalance: 103700 },
  },
  {
    date: "2024-03-01",
    revenue: { rooms: 108600, foodAndBeverage: 30800, spa: 7200, events: 4800, parking: 2700, minibar: 2400, laundry: 1200, other: 4800, total: 162500 },
    expenses: { salaries: 54000, utilities: 13400, maintenance: 7800, supplies: 5600, marketing: 5400, commissions: 16200, insurance: 2800, taxes: 10800, depreciation: 7800, other: 4200, total: 128000 },
    profit: { grossProfit: 68200, operatingProfit: 34500, netProfit: 25200, grossMargin: 42.0, operatingMargin: 21.2, netMargin: 15.5, ebitda: 42300 },
    cashflow: { opening: 103700, inflows: 162500, outflows: 128000, closing: 138200, bankBalance: 138200 },
  },
  {
    date: "2024-04-01",
    revenue: { rooms: 145200, foodAndBeverage: 33600, spa: 8600, events: 6200, parking: 3100, minibar: 2800, laundry: 1400, other: 5600, total: 206500 },
    expenses: { salaries: 57000, utilities: 12800, maintenance: 8400, supplies: 6200, marketing: 5800, commissions: 19600, insurance: 2800, taxes: 12800, depreciation: 7800, other: 4600, total: 137800 },
    profit: { grossProfit: 98000, operatingProfit: 68700, netProfit: 50400, grossMargin: 47.5, operatingMargin: 33.3, netMargin: 24.4, ebitda: 76500 },
    cashflow: { opening: 138200, inflows: 206500, outflows: 137800, closing: 206900, bankBalance: 206900 },
  },
  {
    date: "2024-05-01",
    revenue: { rooms: 172800, foodAndBeverage: 39200, spa: 10800, events: 7600, parking: 3600, minibar: 3300, laundry: 1700, other: 6200, total: 245200 },
    expenses: { salaries: 60800, utilities: 12200, maintenance: 9400, supplies: 6800, marketing: 6400, commissions: 23200, insurance: 2800, taxes: 14800, depreciation: 7800, other: 4800, total: 149000 },
    profit: { grossProfit: 126400, operatingProfit: 96200, netProfit: 70600, grossMargin: 51.5, operatingMargin: 39.2, netMargin: 28.8, ebitda: 104000 },
    cashflow: { opening: 206900, inflows: 245200, outflows: 149000, closing: 303100, bankBalance: 303100 },
  },
  {
    date: "2024-06-01",
    revenue: { rooms: 210000, foodAndBeverage: 43800, spa: 13200, events: 9000, parking: 4200, minibar: 3600, laundry: 1900, other: 7200, total: 292900 },
    expenses: { salaries: 66000, utilities: 13400, maintenance: 10200, supplies: 7600, marketing: 7200, commissions: 27600, insurance: 2800, taxes: 16800, depreciation: 7800, other: 5400, total: 164800 },
    profit: { grossProfit: 158800, operatingProfit: 128100, netProfit: 94000, grossMargin: 54.2, operatingMargin: 43.7, netMargin: 32.1, ebitda: 135900 },
    cashflow: { opening: 303100, inflows: 292900, outflows: 164800, closing: 431200, bankBalance: 431200 },
  },
  {
    date: "2024-07-01",
    revenue: { rooms: 268800, foodAndBeverage: 54600, spa: 16200, events: 11200, parking: 4800, minibar: 4600, laundry: 2400, other: 8800, total: 371400 },
    expenses: { salaries: 72000, utilities: 15400, maintenance: 11000, supplies: 8400, marketing: 7600, commissions: 34000, insurance: 2800, taxes: 20400, depreciation: 7800, other: 6200, total: 185600 },
    profit: { grossProfit: 218800, operatingProfit: 185800, netProfit: 136400, grossMargin: 58.9, operatingMargin: 50.0, netMargin: 36.7, ebitda: 193600 },
    cashflow: { opening: 431200, inflows: 371400, outflows: 185600, closing: 617000, bankBalance: 617000 },
  },
  {
    date: "2024-08-01",
    revenue: { rooms: 290400, foodAndBeverage: 58200, spa: 17400, events: 11800, parking: 5200, minibar: 4900, laundry: 2600, other: 9400, total: 399900 },
    expenses: { salaries: 76000, utilities: 16800, maintenance: 11600, supplies: 8800, marketing: 8000, commissions: 37200, insurance: 2800, taxes: 21600, depreciation: 7800, other: 6600, total: 197200 },
    profit: { grossProfit: 236000, operatingProfit: 202700, netProfit: 148800, grossMargin: 59.0, operatingMargin: 50.7, netMargin: 37.2, ebitda: 210500 },
    cashflow: { opening: 617000, inflows: 399900, outflows: 197200, closing: 819700, bankBalance: 819700 },
  },
  {
    date: "2024-09-01",
    revenue: { rooms: 192000, foodAndBeverage: 40800, spa: 12000, events: 8400, parking: 3800, minibar: 3400, laundry: 1800, other: 6800, total: 269000 },
    expenses: { salaries: 62000, utilities: 13000, maintenance: 9800, supplies: 7200, marketing: 6800, commissions: 25200, insurance: 2800, taxes: 15600, depreciation: 7800, other: 5200, total: 155400 },
    profit: { grossProfit: 144200, operatingProfit: 113600, netProfit: 83400, grossMargin: 53.6, operatingMargin: 42.2, netMargin: 31.0, ebitda: 121400 },
    cashflow: { opening: 819700, inflows: 269000, outflows: 155400, closing: 933300, bankBalance: 933300 },
  },
  {
    date: "2024-10-01",
    revenue: { rooms: 151200, foodAndBeverage: 33000, spa: 8800, events: 6400, parking: 3200, minibar: 2900, laundry: 1500, other: 5400, total: 212400 },
    expenses: { salaries: 58000, utilities: 12600, maintenance: 8800, supplies: 6400, marketing: 6200, commissions: 21000, insurance: 2800, taxes: 13600, depreciation: 7800, other: 4800, total: 142000 },
    profit: { grossProfit: 100800, operatingProfit: 70400, netProfit: 51700, grossMargin: 47.5, operatingMargin: 33.1, netMargin: 24.3, ebitda: 78200 },
    cashflow: { opening: 933300, inflows: 212400, outflows: 142000, closing: 1003700, bankBalance: 1003700 },
  },
  {
    date: "2024-11-01",
    revenue: { rooms: 94800, foodAndBeverage: 27200, spa: 6400, events: 4400, parking: 2400, minibar: 2200, laundry: 1100, other: 4100, total: 142600 },
    expenses: { salaries: 55000, utilities: 13800, maintenance: 7600, supplies: 5200, marketing: 5800, commissions: 14000, insurance: 2800, taxes: 9800, depreciation: 7800, other: 4000, total: 125800 },
    profit: { grossProfit: 48000, operatingProfit: 16800, netProfit: 12300, grossMargin: 33.7, operatingMargin: 11.8, netMargin: 8.6, ebitda: 24600 },
    cashflow: { opening: 1003700, inflows: 142600, outflows: 125800, closing: 1020500, bankBalance: 1020500 },
  },
  {
    date: "2024-12-01",
    revenue: { rooms: 122400, foodAndBeverage: 31200, spa: 8000, events: 11000, parking: 2800, minibar: 2600, laundry: 1300, other: 5500, total: 184800 },
    expenses: { salaries: 57000, utilities: 15000, maintenance: 8200, supplies: 5800, marketing: 6600, commissions: 17800, insurance: 2800, taxes: 11800, depreciation: 7800, other: 4600, total: 137400 },
    profit: { grossProfit: 78600, operatingProfit: 47400, netProfit: 34800, grossMargin: 42.5, operatingMargin: 25.6, netMargin: 18.8, ebitda: 55200 },
    cashflow: { opening: 1020500, inflows: 184800, outflows: 137400, closing: 1067900, bankBalance: 1067900 },
  },
  {
    date: "2025-01-01",
    revenue: { rooms: 82800, foodAndBeverage: 23400, spa: 5600, events: 3400, parking: 2100, minibar: 1900, laundry: 1000, other: 3700, total: 123900 },
    expenses: { salaries: 53000, utilities: 16200, maintenance: 7000, supplies: 4800, marketing: 5200, commissions: 12200, insurance: 2800, taxes: 8800, depreciation: 7800, other: 3800, total: 121600 },
    profit: { grossProfit: 32000, operatingProfit: 2300, netProfit: 1700, grossMargin: 25.8, operatingMargin: 1.9, netMargin: 1.4, ebitda: 10100 },
    cashflow: { opening: 1067900, inflows: 123900, outflows: 121600, closing: 1070200, bankBalance: 1070200 },
  },
  {
    date: "2025-02-01",
    revenue: { rooms: 92400, foodAndBeverage: 26000, spa: 6400, events: 4000, parking: 2300, minibar: 2200, laundry: 1100, other: 4200, total: 138600 },
    expenses: { salaries: 54000, utilities: 15400, maintenance: 7400, supplies: 5200, marketing: 5400, commissions: 13800, insurance: 2800, taxes: 9400, depreciation: 7800, other: 4000, total: 125200 },
    profit: { grossProfit: 42800, operatingProfit: 13400, netProfit: 9800, grossMargin: 30.9, operatingMargin: 9.7, netMargin: 7.1, ebitda: 21200 },
    cashflow: { opening: 1070200, inflows: 138600, outflows: 125200, closing: 1083600, bankBalance: 1083600 },
  },
  // === ANNÉE COURANTE ===
  {
    date: "2025-03-01",
    revenue: { rooms: 124800, foodAndBeverage: 35200, spa: 8200, events: 5600, parking: 3100, minibar: 2800, laundry: 1400, other: 5600, total: 186700 },
    expenses: { salaries: 58400, utilities: 14200, maintenance: 8600, supplies: 6200, marketing: 5800, commissions: 18700, insurance: 3200, taxes: 12400, depreciation: 8500, other: 4800, total: 140800 },
    profit: { grossProfit: 86200, operatingProfit: 45900, netProfit: 33500, grossMargin: 46.2, operatingMargin: 24.6, netMargin: 17.9, ebitda: 54400 },
    cashflow: { opening: 125000, inflows: 186700, outflows: 140800, closing: 170900, bankBalance: 170900 },
  },
  {
    date: "2025-04-01",
    revenue: { rooms: 166800, foodAndBeverage: 38400, spa: 9800, events: 7200, parking: 3600, minibar: 3200, laundry: 1600, other: 6400, total: 237000 },
    expenses: { salaries: 62000, utilities: 13800, maintenance: 9200, supplies: 7000, marketing: 6200, commissions: 22400, insurance: 3200, taxes: 14800, depreciation: 8500, other: 5200, total: 152300 },
    profit: { grossProfit: 114200, operatingProfit: 84700, netProfit: 62300, grossMargin: 48.2, operatingMargin: 35.7, netMargin: 26.3, ebitda: 93200 },
    cashflow: { opening: 170900, inflows: 237000, outflows: 152300, closing: 255600, bankBalance: 255600 },
  },
  {
    date: "2025-05-01",
    revenue: { rooms: 196200, foodAndBeverage: 44800, spa: 12400, events: 8800, parking: 4200, minibar: 3800, laundry: 1900, other: 7200, total: 279300 },
    expenses: { salaries: 65800, utilities: 13200, maintenance: 10400, supplies: 7800, marketing: 7000, commissions: 26400, insurance: 3200, taxes: 16800, depreciation: 8500, other: 5600, total: 164700 },
    profit: { grossProfit: 144800, operatingProfit: 114600, netProfit: 84200, grossMargin: 51.8, operatingMargin: 41.0, netMargin: 30.1, ebitda: 123100 },
    cashflow: { opening: 255600, inflows: 279300, outflows: 164700, closing: 370200, bankBalance: 370200 },
  },
  {
    date: "2025-06-01",
    revenue: { rooms: 237600, foodAndBeverage: 49800, spa: 15200, events: 10400, parking: 4800, minibar: 4200, laundry: 2200, other: 8400, total: 332600 },
    expenses: { salaries: 72000, utilities: 14600, maintenance: 11200, supplies: 8600, marketing: 7800, commissions: 31200, insurance: 3200, taxes: 19200, depreciation: 8500, other: 6200, total: 182500 },
    profit: { grossProfit: 182400, operatingProfit: 150100, netProfit: 110200, grossMargin: 54.8, operatingMargin: 45.1, netMargin: 33.1, ebitda: 158600 },
    cashflow: { opening: 370200, inflows: 332600, outflows: 182500, closing: 520300, bankBalance: 520300 },
  },
  {
    date: "2025-07-01",
    revenue: { rooms: 302400, foodAndBeverage: 62100, spa: 18600, events: 12800, parking: 5400, minibar: 5200, laundry: 2800, other: 10200, total: 419500 },
    expenses: { salaries: 78400, utilities: 16800, maintenance: 12000, supplies: 9400, marketing: 8200, commissions: 38400, insurance: 3200, taxes: 22800, depreciation: 8500, other: 7000, total: 204700 },
    profit: { grossProfit: 248200, operatingProfit: 214800, netProfit: 157600, grossMargin: 59.2, operatingMargin: 51.2, netMargin: 37.6, ebitda: 223300 },
    cashflow: { opening: 520300, inflows: 419500, outflows: 204700, closing: 735100, bankBalance: 735100 },
  },
  {
    date: "2025-08-01",
    revenue: { rooms: 326400, foodAndBeverage: 65800, spa: 19800, events: 13600, parking: 5800, minibar: 5600, laundry: 3000, other: 10800, total: 450800 },
    expenses: { salaries: 82000, utilities: 18200, maintenance: 12800, supplies: 10000, marketing: 8600, commissions: 42000, insurance: 3200, taxes: 24400, depreciation: 8500, other: 7400, total: 217100 },
    profit: { grossProfit: 268400, operatingProfit: 233700, netProfit: 171400, grossMargin: 59.5, operatingMargin: 51.8, netMargin: 38.0, ebitda: 242200 },
    cashflow: { opening: 735100, inflows: 450800, outflows: 217100, closing: 968800, bankBalance: 968800 },
  },
  {
    date: "2025-09-01",
    revenue: { rooms: 218400, foodAndBeverage: 46200, spa: 13800, events: 9600, parking: 4400, minibar: 3900, laundry: 2100, other: 7800, total: 306200 },
    expenses: { salaries: 68000, utilities: 14000, maintenance: 10800, supplies: 8200, marketing: 7400, commissions: 28800, insurance: 3200, taxes: 18000, depreciation: 8500, other: 5800, total: 172700 },
    profit: { grossProfit: 166400, operatingProfit: 133500, netProfit: 98000, grossMargin: 54.3, operatingMargin: 43.6, netMargin: 32.0, ebitda: 142000 },
    cashflow: { opening: 968800, inflows: 306200, outflows: 172700, closing: 1102300, bankBalance: 1102300 },
  },
  {
    date: "2025-10-01",
    revenue: { rooms: 172800, foodAndBeverage: 37800, spa: 10200, events: 7400, parking: 3700, minibar: 3400, laundry: 1800, other: 6200, total: 243300 },
    expenses: { salaries: 64000, utilities: 13600, maintenance: 9800, supplies: 7400, marketing: 6800, commissions: 24000, insurance: 3200, taxes: 15600, depreciation: 8500, other: 5400, total: 158300 },
    profit: { grossProfit: 118600, operatingProfit: 85000, netProfit: 62400, grossMargin: 48.7, operatingMargin: 34.9, netMargin: 25.6, ebitda: 93500 },
    cashflow: { opening: 1102300, inflows: 243300, outflows: 158300, closing: 1187300, bankBalance: 1187300 },
  },
  {
    date: "2025-11-01",
    revenue: { rooms: 109200, foodAndBeverage: 31200, spa: 7400, events: 5200, parking: 2800, minibar: 2600, laundry: 1300, other: 4800, total: 164500 },
    expenses: { salaries: 60000, utilities: 14800, maintenance: 8400, supplies: 6000, marketing: 6400, commissions: 16200, insurance: 3200, taxes: 11200, depreciation: 8500, other: 4600, total: 139300 },
    profit: { grossProfit: 58800, operatingProfit: 25200, netProfit: 18500, grossMargin: 35.7, operatingMargin: 15.3, netMargin: 11.2, ebitda: 33700 },
    cashflow: { opening: 1187300, inflows: 164500, outflows: 139300, closing: 1212500, bankBalance: 1212500 },
  },
  {
    date: "2025-12-01",
    revenue: { rooms: 140400, foodAndBeverage: 36000, spa: 9200, events: 12800, parking: 3200, minibar: 3000, laundry: 1500, other: 6400, total: 212500 },
    expenses: { salaries: 62000, utilities: 16200, maintenance: 9000, supplies: 6800, marketing: 7200, commissions: 20400, insurance: 3200, taxes: 13600, depreciation: 8500, other: 5200, total: 152100 },
    profit: { grossProfit: 94400, operatingProfit: 60400, netProfit: 44300, grossMargin: 44.4, operatingMargin: 28.4, netMargin: 20.8, ebitda: 68900 },
    cashflow: { opening: 1212500, inflows: 212500, outflows: 152100, closing: 1272900, bankBalance: 1272900 },
  },
  {
    date: "2026-01-01",
    revenue: { rooms: 92400, foodAndBeverage: 26400, spa: 6200, events: 3800, parking: 2400, minibar: 2200, laundry: 1100, other: 4200, total: 138700 },
    expenses: { salaries: 58000, utilities: 17600, maintenance: 7800, supplies: 5400, marketing: 5600, commissions: 13800, insurance: 3200, taxes: 9800, depreciation: 8500, other: 4200, total: 133900 },
    profit: { grossProfit: 38000, operatingProfit: 4800, netProfit: 3500, grossMargin: 27.4, operatingMargin: 3.5, netMargin: 2.5, ebitda: 13300 },
    cashflow: { opening: 1272900, inflows: 138700, outflows: 133900, closing: 1277700, bankBalance: 1277700 },
  },
  {
    date: "2026-02-01",
    revenue: { rooms: 103200, foodAndBeverage: 29400, spa: 7200, events: 4600, parking: 2600, minibar: 2500, laundry: 1200, other: 4800, total: 155500 },
    expenses: { salaries: 59000, utilities: 16400, maintenance: 8200, supplies: 5800, marketing: 6000, commissions: 15600, insurance: 3200, taxes: 10600, depreciation: 8500, other: 4400, total: 137700 },
    profit: { grossProfit: 51200, operatingProfit: 17800, netProfit: 13100, grossMargin: 32.9, operatingMargin: 11.4, netMargin: 8.4, ebitda: 26300 },
    cashflow: { opening: 1277700, inflows: 155500, outflows: 137700, closing: 1295500, bankBalance: 1295500 },
  },
];

// Helper : retrouver les données d'un mois donné
export function getFinancialByMonthYear(month: number, year: number): FinancialData | undefined {
  return monthlyFinancials.find((m) => {
    const d = new Date(m.date);
    return d.getMonth() + 1 === month && d.getFullYear() === year;
  });
}

// Helper : mois N-1 (même mois, année précédente)
export function getN1Financial(month: number, year: number): FinancialData | undefined {
  return getFinancialByMonthYear(month, year - 1);
}

// Helper : cumul depuis le début de l'exercice comptable (jan → mois sélectionné)
export function getCumulFiscalYear(month: number, year: number): FinancialData | undefined {
  const months = monthlyFinancials.filter((m) => {
    const d = new Date(m.date);
    return d.getFullYear() === year && d.getMonth() + 1 <= month;
  });
  if (months.length === 0) return undefined;
  return sumFinancials(months);
}

// Helper : cumul exercice N-1 jusqu'au même mois
export function getCumulFiscalYearN1(month: number, year: number): FinancialData | undefined {
  return getCumulFiscalYear(month, year - 1);
}

// Sommer plusieurs FinancialData
function sumFinancials(items: FinancialData[]): FinancialData {
  const revenue = {
    rooms: items.reduce((s, m) => s + m.revenue.rooms, 0),
    foodAndBeverage: items.reduce((s, m) => s + m.revenue.foodAndBeverage, 0),
    spa: items.reduce((s, m) => s + m.revenue.spa, 0),
    events: items.reduce((s, m) => s + m.revenue.events, 0),
    parking: items.reduce((s, m) => s + m.revenue.parking, 0),
    minibar: items.reduce((s, m) => s + m.revenue.minibar, 0),
    laundry: items.reduce((s, m) => s + m.revenue.laundry, 0),
    other: items.reduce((s, m) => s + m.revenue.other, 0),
    total: items.reduce((s, m) => s + m.revenue.total, 0),
  };
  const expenses = {
    salaries: items.reduce((s, m) => s + m.expenses.salaries, 0),
    utilities: items.reduce((s, m) => s + m.expenses.utilities, 0),
    maintenance: items.reduce((s, m) => s + m.expenses.maintenance, 0),
    supplies: items.reduce((s, m) => s + m.expenses.supplies, 0),
    marketing: items.reduce((s, m) => s + m.expenses.marketing, 0),
    commissions: items.reduce((s, m) => s + m.expenses.commissions, 0),
    insurance: items.reduce((s, m) => s + m.expenses.insurance, 0),
    taxes: items.reduce((s, m) => s + m.expenses.taxes, 0),
    depreciation: items.reduce((s, m) => s + m.expenses.depreciation, 0),
    other: items.reduce((s, m) => s + m.expenses.other, 0),
    total: items.reduce((s, m) => s + m.expenses.total, 0),
  };
  const grossProfit = items.reduce((s, m) => s + m.profit.grossProfit, 0);
  const operatingProfit = items.reduce((s, m) => s + m.profit.operatingProfit, 0);
  const netProfit = items.reduce((s, m) => s + m.profit.netProfit, 0);
  const ebitda = items.reduce((s, m) => s + m.profit.ebitda, 0);
  const profit = {
    grossProfit,
    operatingProfit,
    netProfit,
    grossMargin: revenue.total > 0 ? (grossProfit / revenue.total) * 100 : 0,
    operatingMargin: revenue.total > 0 ? (operatingProfit / revenue.total) * 100 : 0,
    netMargin: revenue.total > 0 ? (netProfit / revenue.total) * 100 : 0,
    ebitda,
  };
  const lastItem = items[items.length - 1];
  const cashflow = {
    opening: items[0].cashflow.opening,
    inflows: items.reduce((s, m) => s + m.cashflow.inflows, 0),
    outflows: items.reduce((s, m) => s + m.cashflow.outflows, 0),
    closing: lastItem.cashflow.closing,
    bankBalance: lastItem.cashflow.bankBalance,
  };
  return { date: lastItem.date, revenue, expenses, profit, cashflow };
}

// Mois/années disponibles pour le sélecteur (uniquement les mois courants : mars 2025 - fév 2026)
export function getAvailableMonths(): { month: number; year: number; label: string }[] {
  const seen = new Set<string>();
  return monthlyFinancials
    .filter((m) => {
      const d = new Date(m.date);
      // Uniquement à partir de mars 2025
      return d >= new Date("2025-03-01");
    })
    .map((m) => {
      const d = new Date(m.date);
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      const key = `${year}-${month}`;
      if (seen.has(key)) return null;
      seen.add(key);
      const label = d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
      return { month, year, label };
    })
    .filter(Boolean) as { month: number; year: number; label: string }[];
}

export const currentMonthFinancial = monthlyFinancials[monthlyFinancials.length - 1];
