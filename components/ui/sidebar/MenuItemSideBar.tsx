import Link from 'next/link'
import React, { JSX } from 'react'

interface Props{
  title:string
 //children:React.ReactNode
  icon:JSX.Element
  href:string
}

export default function MenuItemSideBar({title, icon, href='/'}:Props) {
  return (
     <Link
        href={href} 
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
         {icon}
        <span className="ml-3 text-xl">{title}</span>
    </Link>
  )
}
