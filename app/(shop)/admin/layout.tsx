import { auth } from "@/src/auth.config";
import { redirect } from "next/navigation";

import React from "react";


export default async function AdminLayout({children}:{children:React.ReactNode}){

    const session = await auth()
    if(session?.user.role !=='admin'){
        redirect('/login')
    }
    return(
        <>
          <div className=" sm:w-full">
             {children}
          </div>
          
        </>
    )
}