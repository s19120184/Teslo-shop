
'use client'

import { logout } from '@/actions/auth/logout'
import { useUIStore } from '@/src/store/ui/ui-store'




import React, { JSX } from 'react'

interface Props{
  title:string
 //children:React.ReactNode
  icon:JSX.Element
}

export default function Logout({title, icon, }:Props) {

 const closeMenu = useUIStore((state) => state.closeSideMenu);

  const  handleOnclick =async ()=>{
    
    await logout()
    closeMenu()
    
  }

  return (
     <button
        onClick={ handleOnclick}
        className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
         {icon}
        <span className="ml-3 text-xl">{title}</span>
    </button>
  )
}
