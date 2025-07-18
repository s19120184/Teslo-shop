import Footer from "@/components/footer/Footer";
import SideBarMenu from "@/components/ui/sidebar/SideBarMenu";
import TopMenu from "@/components/ui/top-menu/TopMenu";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title:{
    template:'%s - Teslo | shop ',
    default: 'Home - Teslo | shop'
  } ,
  description: "Tienda virtual de productos",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
   

  return (
      <main className="bg-gray-100 h-screen">
          <TopMenu/>

          <SideBarMenu/>
          
          <div className="px-0 sm:px-5">
                {children}
          </div>
         
         <Footer/>
      </main>
  );
}