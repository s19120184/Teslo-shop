import TopMenu from "@/components/ui/top-menu/TopMenu";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Teslo | shop",
  description: "Tienda virtual de productos",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="bg-gray-300 min-h-screen">
          <TopMenu/>
          <div className="px-0 sm:px-5">
                {children}
          </div>
         
      </main>
  );
}