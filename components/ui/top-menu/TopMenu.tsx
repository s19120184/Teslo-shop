"use client"

import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/src/store/ui/ui-store";
import Link from "next/link";

import {IoCartOutline, IoSearchOutline} from 'react-icons/io5'

export default function TopMenu() {
   
   const openMenu= useUIStore( state => state.openSideMenu)

  return (
    <nav className="flex px-5 py-4 justify-between items-center w-full ">
      {/* logo */}
      <div>
        <Link href={"/"} >
          <span className={`${titleFont.className}  antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* center menu */}
      <div className="hidden sm:block">
         <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 " href={'/gender/men'}>Hombres</Link>
         <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 " href={'/gender/women'}>Mujeres</Link>
         <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 " href={'/gender/kid'}>Niños</Link>
      </div>
      {/* Search, cart, menu */}
      <div className="flex items-center">
          <Link href='/search' className="mx-2" >
             <IoSearchOutline className="w-5 h-5" />
          </Link>
          <Link href='/cart' className="mx-2">
              <div className="relative">
                   <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white ">1</span>
                  <IoCartOutline className="w-5 h-5" />
              </div>
          </Link>

          <button onClick={openMenu} className="mr-2 p-2 rounded-md transition-all hover:bg-gray-100">
             Menú
          </button>

      </div>

    </nav>
  );
}
