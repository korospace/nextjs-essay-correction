"use client";

// nextjs
import { signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function DashboardPage() {
  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <main className="">
      <h2>Hai, {session?.user.full_name} username: {session?.user.username} id_role: {session?.user.id_user_role}</h2>
      <p>dashboard</p>
      <Button color="danger" onClick={() => signOut()}>logout</Button>
    </main>
  );
}