// ============================================================
// Types principaux pour le Dashboard Hôtelier
// ============================================================

export interface HotelProfile {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  stars: number;
  totalRooms: number;
  roomTypes: RoomType[];
  currency: string;
  timezone: string;
  createdAt: string;
}

export interface RoomType {
  id: string;
  name: string;
  count: number;
  basePrice: number;
  description: string;
}

// KPIs
export interface DailyKPI {
  date: string;
  occupancyRate: number;
  adr: number; // Average Daily Rate
  revpar: number; // Revenue Per Available Room
  totalRevenue: number;
  roomRevenue: number;
  fbRevenue: number; // Food & Beverage
  otherRevenue: number;
  roomsSold: number;
  roomsAvailable: number;
  arrivals: number;
  departures: number;
  stayovers: number;
  noShows: number;
  cancellations: number;
  walkIns: number;
  averageLOS: number; // Length of Stay
  goppar: number; // Gross Operating Profit Per Available Room
}

export interface MonthlyKPI extends DailyKPI {
  month: string;
  year: number;
  totalNightsAvailable: number;
  totalNightsSold: number;
  trevpar: number; // Total Revenue Per Available Room
  cpor: number; // Cost Per Occupied Room
  laborCostRatio: number;
  energyCostRatio: number;
  guestSatisfactionScore: number;
  onlineReviewScore: number;
  repeatGuestRate: number;
  directBookingRate: number;
  otaBookingRate: number;
}

// Financier
export interface FinancialData {
  date: string;
  revenue: RevenueBreakdown;
  expenses: ExpenseBreakdown;
  profit: ProfitData;
  cashflow: CashflowData;
}

export interface RevenueBreakdown {
  rooms: number;
  foodAndBeverage: number;
  spa: number;
  events: number;
  parking: number;
  minibar: number;
  laundry: number;
  other: number;
  total: number;
}

export interface ExpenseBreakdown {
  salaries: number;
  utilities: number;
  maintenance: number;
  supplies: number;
  marketing: number;
  commissions: number; // OTA commissions
  insurance: number;
  taxes: number;
  depreciation: number;
  other: number;
  total: number;
}

export interface ProfitData {
  grossProfit: number;
  operatingProfit: number;
  netProfit: number;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  ebitda: number;
}

export interface CashflowData {
  opening: number;
  inflows: number;
  outflows: number;
  closing: number;
  bankBalance: number;
}

// Opérationnel
export interface OperationalData {
  date: string;
  housekeeping: HousekeepingData;
  maintenance: MaintenanceData;
  staff: StaffData;
  inventory: InventoryData;
}

export interface HousekeepingData {
  roomsCleaned: number;
  roomsPending: number;
  roomsInspected: number;
  averageCleanTime: number; // minutes
  staffOnDuty: number;
  lateCheckouts: number;
  earlyCheckins: number;
}

export interface MaintenanceData {
  openTickets: number;
  closedToday: number;
  avgResolutionTime: number; // hours
  preventiveTasks: number;
  urgentIssues: number;
  roomsOutOfOrder: number;
}

export interface StaffData {
  totalEmployees: number;
  onDutyToday: number;
  onLeave: number;
  overtime: number;
  satisfaction: number;
  turnoverRate: number;
  departments: DepartmentStaff[];
}

export interface DepartmentStaff {
  name: string;
  headcount: number;
  onDuty: number;
  cost: number;
}

export interface InventoryData {
  linens: InventoryItem;
  toiletries: InventoryItem;
  minibarItems: InventoryItem;
  cleaningSupplies: InventoryItem;
  fbSupplies: InventoryItem;
}

export interface InventoryItem {
  name: string;
  currentStock: number;
  minimumStock: number;
  status: "ok" | "low" | "critical";
  lastOrdered: string;
  monthlyCost: number;
}

// Guests / CRM
export interface GuestData {
  totalGuests: number;
  newGuests: number;
  returningGuests: number;
  vipGuests: number;
  nationalities: NationalityBreakdown[];
  bookingChannels: BookingChannel[];
  segments: GuestSegment[];
  satisfactionTrend: SatisfactionPoint[];
  topReviews: GuestReview[];
}

export interface NationalityBreakdown {
  country: string;
  count: number;
  percentage: number;
}

export interface BookingChannel {
  name: string;
  bookings: number;
  revenue: number;
  commission: number;
  percentage: number;
}

export interface GuestSegment {
  name: string;
  count: number;
  avgSpend: number;
  avgLOS: number;
}

export interface SatisfactionPoint {
  date: string;
  score: number;
  reviews: number;
}

export interface GuestReview {
  id: string;
  guest: string;
  channel: string;
  rating: number;
  comment: string;
  date: string;
  sentiment: "positive" | "neutral" | "negative";
}

// Integrations
export interface Integration {
  id: string;
  name: string;
  type: "pms" | "bank" | "ota" | "accounting" | "pos" | "crm" | "channel_manager";
  provider: string;
  status: "connected" | "disconnected" | "error" | "syncing";
  lastSync: string;
  nextSync: string;
  icon: string;
  dataPoints: string[];
}

// AI Analysis
export interface AIInsight {
  id: string;
  category: "kpi" | "financial" | "operational" | "revenue" | "guest";
  type: "alert" | "recommendation" | "prediction" | "anomaly";
  severity: "info" | "warning" | "critical" | "success";
  title: string;
  description: string;
  metric?: string;
  value?: number;
  trend?: "up" | "down" | "stable";
  actionItems?: string[];
  createdAt: string;
}

// Manual Entry
export interface ManualEntry {
  id: string;
  category: string;
  field: string;
  value: number | string;
  date: string;
  updatedBy: string;
  updatedAt: string;
  notes?: string;
}

// Date range filter
export type DateRange = "today" | "yesterday" | "week" | "month" | "quarter" | "year" | "custom";

export interface DateFilter {
  range: DateRange;
  startDate?: string;
  endDate?: string;
}
