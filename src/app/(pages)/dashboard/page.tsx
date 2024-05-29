"use client";

// nextjs
import { signOut, useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <main className="bg-red-300">
      {/* <h2>
        Hai, {session?.user.full_name} username: {session?.user.username}{" "}
        id_role: {session?.user.id_user_role}
      </h2> */}
    </main>
  );
}
