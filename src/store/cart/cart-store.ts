import { CartProduct } from "@/src/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSumaryInformation: () => {
    subsTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  uptdatedProductQuantity: (quantity: number, product: CartProduct) => void;
  removeProduct: (product: CartProduct) => void;
  cleaarCart:()=>void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSumaryInformation: () => {
        const { cart } = get();

        const subsTotal = cart.reduce(
          (total, item) => item.quantity * item.price + total,
          0
        );

        const tax = subsTotal * 0.15;
        const total = subsTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subsTotal,
          tax,
          total,
          itemsInCart
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        //1. revisar si el poroducto existe en le carrito con la talla seleccinada
        const productIncart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        //si no esta en el carrito lo insertamos
        if (!productIncart) {
          //actualizamos el carrito
          set({ cart: [...cart, product] });
          return;
        }

        //2. Se que el producto existe por talla ..debemos incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity
            };
          }

          return item;
        });
        set({
          cart: updatedCartProducts
        });
      },
      uptdatedProductQuantity: (
        quantity: number,
        product: CartProduct | undefined
      ) => {
        const { cart, getTotalItems } = get();

        const updatedCart = cart.map((item) => {
          if (item.id === product?.id && item.size === product.size) {
            return {
              ...item,
              quantity: quantity
            };
          }
          return item;
        });

        getTotalItems();
        set({
          cart: updatedCart
        });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCardt = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({
          cart: updatedCardt
        });
      },

      cleaarCart:()=>{
          set({
            cart:[]
          })
      },
      
    }),

    

    {
      //nombre para el local storage
      name: "shopping-cart"
    }
  )
);

// persist(

//      ...logica
//     ,{
//         name:'shopping-cart'
//     }
// )get()
