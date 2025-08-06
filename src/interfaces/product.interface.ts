export interface Product {
    id:string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes:Size[]  ;
    slug: string;
    tags: string[] ;
    title: string;
    //todo:type: ValidTypes;
    gender: Category
    categoryId?:string
    ProductImage?: {
        id: number;
        url: string;
    }[];
    imagesUp?:FileList
}


export interface CartProduct {
    id:string,
    slug:string,
    title:string,
    price:number,
    quantity:number,
    size:Size
    image:string
}

export type Category = 'men'|'women'|'kid'|'unisex'
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
// todo type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';