import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address;
  setAddress: (address: Address) => void;
}

interface Address {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
}

export const useAddressStore = create<State>()(
  persist(
    (set, ) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
        rememberAddress: false
      },
      setAddress: (address: Address) => {
         set({
            address: address
         })
      }
    }),
    {
      name: "address-storage"
    }
  )
);
