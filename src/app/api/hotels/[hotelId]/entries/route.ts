import { NextRequest, NextResponse } from "next/server";
import { requireHotelAccess } from "@/lib/auth-helpers";
import prisma from "@/lib/prisma";
import { z } from "zod";

const entrySchema = z.object({
  category: z.string(),
  field: z.string(),
  value: z.string(),
  date: z.string(),
  notes: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { hotelId: string } }
) {
  try {
    await requireHotelAccess(params.hotelId);

    const entries = await prisma.manualEntry.findMany({
      where: { hotelId: params.hotelId },
      include: {
        user: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({
      entries: entries.map((e) => ({
        id: e.id,
        category: e.category,
        field: e.field,
        value: e.value,
        date: e.date.toISOString().split("T")[0],
        notes: e.notes,
        updatedBy: `${e.user.firstName} ${e.user.lastName}`,
        updatedAt: e.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Entries fetch error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des saisies" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { hotelId: string } }
) {
  try {
    const user = await requireHotelAccess(params.hotelId);
    const body = await req.json();
    const data = entrySchema.parse(body);

    const entry = await prisma.manualEntry.create({
      data: {
        hotelId: params.hotelId,
        userId: (user as any).id,
        category: data.category,
        field: data.field,
        value: data.value,
        date: new Date(data.date),
        notes: data.notes,
      },
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Entry create error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la saisie" },
      { status: 500 }
    );
  }
}
