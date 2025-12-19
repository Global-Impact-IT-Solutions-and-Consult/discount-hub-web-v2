import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/utils/api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/product`,
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
        `${BASE_URL}/product/categories/product-count`,
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
