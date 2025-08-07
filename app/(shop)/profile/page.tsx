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
  const {name} = session.user

  return (
    <div className="m-10">
      <Tittle title="Perfil" />
      
      <h2 className="text-4xl font-bold uppercase">{name}</h2>


    </div>
  );
}
