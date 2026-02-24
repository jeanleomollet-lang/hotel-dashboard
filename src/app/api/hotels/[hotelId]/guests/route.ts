import { NextRequest, NextResponse } from "next/server";
import { requireHotelAccess } from "@/lib/auth-helpers";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { hotelId: string } }
) {
  try {
    await requireHotelAccess(params.hotelId);

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);

    const [guestRecord, reviews] = await Promise.all([
      prisma.guestRecord.findFirst({
        where: {
          hotelId: params.hotelId,
          date: { gte: startDate },
        },
        orderBy: { date: "desc" },
      }),
      prisma.guestReview.findMany({
        where: { hotelId: params.hotelId },
        orderBy: { date: "desc" },
        take: 20,
      }),
    ]);

    return NextResponse.json({
      record: guestRecord,
      reviews: reviews.map((r) => ({
        id: r.id,
        guest: r.guest,
        channel: r.channel,
        rating: r.rating,
        comment: r.comment,
        date: r.date.toISOString().split("T")[0],
        sentiment: r.sentiment,
      })),
    });
  } catch (error) {
    console.error("Guests fetch error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données clients" },
      { status: 500 }
    );
  }
}
