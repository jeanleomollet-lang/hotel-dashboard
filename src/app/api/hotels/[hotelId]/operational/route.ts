import { NextRequest, NextResponse } from "next/server";
import { requireHotelAccess } from "@/lib/auth-helpers";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { hotelId: string } }
) {
  try {
    await requireHotelAccess(params.hotelId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const record = await prisma.operationalRecord.findUnique({
      where: {
        hotelId_date: {
          hotelId: params.hotelId,
          date: today,
        },
      },
    });

    // Get hotel for department info
    const hotel = await prisma.hotel.findUnique({
      where: { id: params.hotelId },
    });

    if (!record) {
      return NextResponse.json({ data: null, hotel });
    }

    return NextResponse.json({
      data: {
        date: record.date.toISOString().split("T")[0],
        housekeeping: {
          roomsCleaned: record.roomsCleaned,
          roomsPending: record.roomsPending,
          roomsInspected: record.roomsInspected,
          averageCleanTime: record.averageCleanTime,
          staffOnDuty: record.hkStaffOnDuty,
          lateCheckouts: record.lateCheckouts,
          earlyCheckins: record.earlyCheckins,
        },
        maintenance: {
          openTickets: record.openTickets,
          closedToday: record.closedTickets,
          avgResolutionTime: record.avgResolutionTime,
          preventiveTasks: record.preventiveTasks,
          urgentIssues: record.urgentIssues,
          roomsOutOfOrder: record.roomsOutOfOrder,
        },
        staff: {
          totalEmployees: record.totalEmployees,
          onDutyToday: record.onDutyToday,
          onLeave: record.onLeave,
          overtime: record.overtime,
          satisfaction: record.staffSatisfaction,
          turnoverRate: record.turnoverRate,
        },
      },
      hotel,
    });
  } catch (error) {
    console.error("Operational fetch error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données opérationnelles" },
      { status: 500 }
    );
  }
}
