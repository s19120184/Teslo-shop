"use client"

import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";
import MenuItemSideBar from "./MenuItemSideBar";
import { useUIStore } from "@/src/store/ui/ui-store";
import clsx from "clsx";


export default function SideBarMenu() {

    const isSideMenuOpen = useUIStore(state=> state.isSideMenuOpen)
    const closeMenu = useUIStore(state => state.closeSideMenu)
   
  return (
    <div>

        {isSideMenuOpen && (
            <>
               {/* backgroun black */}
              <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>

               {/* blur */}
              <div onClick={closeMenu} className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm "></div>

            </>
        )}
       
        {/* sidebar */}
        <nav 
        //todo: efeto de slide
        className={
            clsx("fixed p-5 right-0  top-0  w-2/3 sm:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                {
                  "translate-x-full": !isSideMenuOpen
                }
            )}>

         <IoCloseOutline
            size={50}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={closeMenu}
         />
         {/* input */}
         <div className="relative mt-14">
            <IoSearchOutline  size={20} className="absolute top-2 left-2" />
             <input 
                placeholder="Buscar"
                type="text" 
                className="w-full bg-gray-50 pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500" />

         </div>

         {/* menu */}
    
            <MenuItemSideBar title="Perfil" icon={<IoPersonOutline size={30}/>} href="/"/>
            <MenuItemSideBar title="Ordenes" icon={<IoTicketOutline size={30}/>} href="/"/>
            <MenuItemSideBar title="Ingresar" icon={<IoLogInOutline size={30}/>} href="/"/>
            <MenuItemSideBar title="Salir" icon={<IoLogOutOutline size={30}/>} href="/"/>

          {/* LIne separator */}
          <div className="w-full h-px bg-gray-200 mt-10 mb-10"></div>

            <MenuItemSideBar title="Productos" icon={<IoShirtOutline size={30}/>} href="/"/>
            <MenuItemSideBar title="Ordenes" icon={<IoTicketOutline size={30}/>} href="/"/>
            <MenuItemSideBar title="Usuarios" icon={<IoPeopleOutline size={30}/>} href="/"/>


        </nav>
    </div>
  )
}
