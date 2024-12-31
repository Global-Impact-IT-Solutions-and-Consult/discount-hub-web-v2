import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return response.data.data;
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/categories/product-count`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return response.data.data;
    },
  });
};
