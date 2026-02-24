import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { requireAuth } from "@/lib/auth-helpers";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { hotelId } = await req.json();

    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: { subscription: true },
    });

    if (!hotel?.subscription?.stripeCustomerId) {
      return NextResponse.json(
        { error: "Aucun abonnement trouvé" },
        { status: 404 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: hotel.subscription.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/parametres`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'accès au portail de facturation" },
      { status: 500 }
    );
  }
}
