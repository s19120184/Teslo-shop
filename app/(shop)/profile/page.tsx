import Tittle from "@/components/ui/title/Tittle";
import { auth } from "@/src/auth.config";
import { redirect } from "next/navigation";

import React from "react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect("/");
  }

  return (
    <div>
      <Tittle title="Perfil" />
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
    </div>
  );
}
