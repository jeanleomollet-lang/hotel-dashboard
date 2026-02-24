import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, PlanKey } from "@/lib/stripe";
import { requireAuth } from "@/lib/auth-helpers";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { plan, hotelId } = await req.json();

    if (!plan || !hotelId) {
      return NextResponse.json({ error: "Plan et hôtel requis" }, { status: 400 });
    }

    const planConfig = PLANS[plan as PlanKey];
    if (!planConfig) {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    // Get hotel with subscription
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: { subscription: true },
    });

    if (!hotel) {
      return NextResponse.json({ error: "Hôtel non trouvé" }, { status: 404 });
    }

    let customerId = hotel.subscription?.stripeCustomerId;

    // Create Stripe customer if needed
    if (!customerId || customerId.startsWith("pending_")) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          hotelId: hotel.id,
          userId: user.id,
        },
      });
      customerId = customer.id;

      // Update subscription with real Stripe customer ID
      if (hotel.subscription) {
        await prisma.subscription.update({
          where: { id: hotel.subscription.id },
          data: { stripeCustomerId: customerId },
        });
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        hotelId: hotel.id,
        plan,
      },
      subscription_data: {
        metadata: {
          hotelId: hotel.id,
          plan,
        },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du checkout" },
      { status: 500 }
    );
  }
}
