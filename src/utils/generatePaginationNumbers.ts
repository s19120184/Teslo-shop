
export const generatePaginationNumbers = (curretPage:number, totalPages:number)=>{

    //si el numero total de paginas es 7 o menos
    //todas las paginas sin puntos supesivos

    if(totalPages<= 7){ 
        return Array.from({length:totalPages}, (_, i) => i +1); //[1,2,3,4]
    }

    //si la pagina actual esta entre las primers 3 paginas
    //mostrar las primeras 3 , puntos suspesivos y las ultimas 2
   if(curretPage<= 3){
     return [1,2,3,'...', totalPages-1 , totalPages]
   }


   //si la pagina actual esta en las ultimas tres paginas
   //mostrar la primeras 2 , puntos supensivos  , las ultimas 3
   if(curretPage >= totalPages -2){
     return [ 1, 2 , '...' ,  totalPages-2 , totalPages-1,  totalPages]
   }

   // si la pagina actugal esta en otrol lugar medio
   return[
    1,
    '...',
    curretPage -1,
    curretPage,
    curretPage  + 1,
    '...',
    totalPages
   ]


}