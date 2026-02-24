import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      memberships: {
        hotelId: string;
        hotelName: string;
        hotelSlug: string;
        role: string;
      }[];
      currentHotelId?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    memberships: {
      hotelId: string;
      hotelName: string;
      hotelSlug: string;
      role: string;
    }[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    memberships: {
      hotelId: string;
      hotelName: string;
      hotelSlug: string;
      role: string;
    }[];
    currentHotelId?: string;
  }
}
