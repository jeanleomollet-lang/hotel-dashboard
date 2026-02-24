import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-helpers";

export default async function Home() {
  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/landing");
  }
}
