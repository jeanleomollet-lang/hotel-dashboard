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
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    const where: any = {
      hotelId: params.hotelId,
      dismissed: false,
    };

    if (category) where.category = category;
    if (type) where.type = type;

    const insights = await prisma.aIInsight.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({
      insights: insights.map((i) => ({
        id: i.id,
        category: i.category,
        type: i.type,
        severity: i.severity,
        title: i.title,
        description: i.description,
        metric: i.metric,
        value: i.value,
        trend: i.trend,
        actionItems: i.actionItems,
        createdAt: i.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Insights fetch error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des insights" },
      { status: 500 }
    );
  }
}
