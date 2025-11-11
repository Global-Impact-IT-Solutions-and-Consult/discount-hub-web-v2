import { create } from "zustand";
import axios from "axios";
import { error } from "@/helpers/Alert";

type ApiError = Error & {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
};

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  imagea: string;
  // ... other product fields
}

interface Category {
  _id: string;
  name: string;
  productCount: number;
}

interface Store {
  allProducts: Product[];
  allCategories: Category[];
  setAllProducts: (products: Product[]) => void;
  setAllCategories: (categories: Category[]) => void;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  allProducts: [],
  allCategories: [],
  setAllProducts: (products) => set({ allProducts: products }),
  setAllCategories: (categories) => set({ allCategories: categories }),
  fetchProducts: async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        set({ allProducts: response.data.data });
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      error(apiError.response?.data?.message || apiError.response?.data?.error);
    }
  },
  fetchCategories: async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/categories/product-count`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        set({ allCategories: response.data.data });
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      error(apiError.response?.data?.message || apiError.response?.data?.error);
    }
  },
}));
