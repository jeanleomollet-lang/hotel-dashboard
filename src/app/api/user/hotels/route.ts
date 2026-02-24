import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ hotels: [] }, { status: 401 });
    }

    const memberships = await prisma.hotelMember.findMany({
      where: { userId: user.id },
      include: {
        hotel: {
          include: {
            subscription: true,
            _count: { select: { members: true } },
          },
        },
      },
    });

    const hotels = memberships.map((m) => ({
      id: m.hotel.id,
      name: m.hotel.name,
      slug: m.hotel.slug,
      city: m.hotel.city,
      stars: m.hotel.stars,
      totalRooms: m.hotel.totalRooms,
      role: m.role,
      memberCount: m.hotel._count.members,
      plan: m.hotel.subscription?.plan || "STARTER",
      subscriptionStatus: m.hotel.subscription?.status || "TRIALING",
    }));

    return NextResponse.json({ hotels });
  } catch (error) {
    console.error("Hotels fetch error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des hôtels" },
      { status: 500 }
    );
  }
}
