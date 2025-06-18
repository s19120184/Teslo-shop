import { titleFont } from "@/config/fonts";


export default function Home() {
  return (
       <>
          <h1 className="text-4xl font-extrabold" >hola</h1>
          <h2 className={`${titleFont.className} text-3xl`}>hola2</h2>
       </>
  );
}
