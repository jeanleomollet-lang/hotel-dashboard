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
    const range = searchParams.get("range") || "month";

    const now = new Date();
    let startDate: Date;

    switch (range) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "quarter":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const [dailyKpis, monthlyKpis] = await Promise.all([
      prisma.dailyKPI.findMany({
        where: {
          hotelId: params.hotelId,
          date: { gte: startDate },
        },
        orderBy: { date: "asc" },
      }),
      prisma.monthlyKPI.findMany({
        where: {
          hotelId: params.hotelId,
          date: { gte: new Date(now.getFullYear() - 1, now.getMonth(), 1) },
        },
        orderBy: { date: "asc" },
      }),
    ]);

    return NextResponse.json({
      daily: dailyKpis,
      monthly: monthlyKpis,
      today: dailyKpis[dailyKpis.length - 1] || null,
      yesterday: dailyKpis[dailyKpis.length - 2] || null,
    });
  } catch (error) {
    console.error("KPIs fetch error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des KPIs" },
      { status: 500 }
    );
  }
}
