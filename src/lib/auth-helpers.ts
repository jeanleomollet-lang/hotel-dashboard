import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  memberships: {
    hotelId: string;
    hotelName: string;
    hotelSlug: string;
    role: string;
  }[];
  currentHotelId?: string;
}

export async function getSession() {
  return getServerSession(authOptions);
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session?.user) return null;
  return session.user as unknown as SessionUser;
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  return user;
}

export async function requireHotelAccess(hotelId: string) {
  const user = await requireAuth();

  if (user.role === "SUPER_ADMIN") return user;

  const membership = user.memberships.find((m) => m.hotelId === hotelId);
  if (!membership) {
    redirect("/select-hotel");
  }

  return { ...user, hotelRole: membership.role };
}

export async function getUserHotels(userId: string) {
  const memberships = await prisma.hotelMember.findMany({
    where: { userId },
    include: {
      hotel: {
        include: {
          subscription: true,
          _count: { select: { members: true, roomTypes: true } },
        },
      },
    },
  });

  return memberships.map((m) => ({
    ...m.hotel,
    role: m.role,
    memberCount: m.hotel._count.members,
    roomTypeCount: m.hotel._count.roomTypes,
  }));
}

export function canAccessModule(
  plan: string | undefined,
  module: string
): boolean {
  const publicModules = ["dashboard", "parametres"];
  if (publicModules.includes(module)) return true;

  const planModules: Record<string, string[]> = {
    STARTER: ["dashboard", "financier", "saisie", "parametres"],
    PROFESSIONAL: [
      "dashboard", "financier", "operationnel", "revenue",
      "guests", "saisie", "integrations", "parametres",
    ],
    ENTERPRISE: [
      "dashboard", "financier", "operationnel", "revenue",
      "guests", "saisie", "integrations", "parametres", "admin",
    ],
  };

  const allowed = planModules[plan || "STARTER"] || planModules.STARTER;
  return allowed.includes(module);
}
