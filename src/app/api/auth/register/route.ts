import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  hotelName: z.string().min(1, "Nom de l'hôtel requis"),
  hotelCity: z.string().optional(),
  hotelStars: z.number().min(1).max(5).optional(),
  hotelRooms: z.number().min(1).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un compte existe déjà avec cet email" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Create slug from hotel name
    const slug = data.hotelName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Ensure unique slug
    let finalSlug = slug;
    let counter = 1;
    while (await prisma.hotel.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    // Create user, hotel, and membership in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });

      // Create subscription (trial)
      const subscription = await tx.subscription.create({
        data: {
          stripeCustomerId: `pending_${user.id}`,
          plan: "STARTER",
          status: "TRIALING",
          trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
        },
      });

      // Create hotel
      const hotel = await tx.hotel.create({
        data: {
          name: data.hotelName,
          slug: finalSlug,
          city: data.hotelCity || "",
          country: "France",
          stars: data.hotelStars || 3,
          totalRooms: data.hotelRooms || 0,
          subscriptionId: subscription.id,
        },
      });

      // Create membership (owner)
      await tx.hotelMember.create({
        data: {
          userId: user.id,
          hotelId: hotel.id,
          role: "OWNER",
        },
      });

      return { user, hotel, subscription };
    });

    return NextResponse.json(
      {
        message: "Compte créé avec succès",
        user: {
          id: result.user.id,
          email: result.user.email,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
        },
        hotel: {
          id: result.hotel.id,
          name: result.hotel.name,
          slug: result.hotel.slug,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du compte" },
      { status: 500 }
    );
  }
}
