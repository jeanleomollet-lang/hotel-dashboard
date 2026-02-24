import { NextRequest, NextResponse } from "next/server";
import { requireHotelAccess } from "@/lib/auth-helpers";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { hotelId: string } }
) {
  try {
    await requireHotelAccess(params.hotelId);

    const searchParams = req.nextUrl.searchParams;
    const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    const records = await prisma.financialRecord.findMany({
      where: {
        hotelId: params.hotelId,
        date: { gte: startDate, lt: endDate },
      },
      orderBy: { date: "asc" },
    });

    // Transform to match the existing frontend format
    const financials = records.map((r) => ({
      date: r.date.toISOString().split("T")[0],
      revenue: {
        rooms: r.revenueRooms,
        foodAndBeverage: r.revenueFoodBeverage,
        spa: r.revenueSpa,
        events: r.revenueEvents,
        parking: r.revenueParking,
        minibar: r.revenueMinibar,
        laundry: r.revenueLaundry,
        other: r.revenueOther,
        total: r.revenueTotal,
      },
      expenses: {
        salaries: r.expenseSalaries,
        utilities: r.expenseUtilities,
        maintenance: r.expenseMaintenance,
        supplies: r.expenseSupplies,
        marketing: r.expenseMarketing,
        commissions: r.expenseCommissions,
        insurance: r.expenseInsurance,
        taxes: r.expenseTaxes,
        depreciation: r.expenseDepreciation,
        other: r.expenseOther,
        total: r.expenseTotal,
      },
      profit: {
        grossProfit: r.grossProfit,
        operatingProfit: r.operatingProfit,
        netProfit: r.netProfit,
        grossMargin: r.grossMargin,
        operatingMargin: r.operatingMargin,
        netMargin: r.netMargin,
        ebitda: r.ebitda,
      },
      cashflow: {
        opening: r.cashflowOpening,
        inflows: r.cashflowInflows,
        outflows: r.cashflowOutflows,
        closing: r.cashflowClosing,
        bankBalance: r.bankBalance,
      },
    }));

    const currentMonth = financials[financials.length - 1] || null;

    return NextResponse.json({
      records: financials,
      currentMonth,
    });
  } catch (error) {
    console.error("Financial fetch error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données financières" },
      { status: 500 }
    );
  }
}
