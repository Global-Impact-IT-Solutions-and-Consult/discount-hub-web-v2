import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/product`, {
    headers: {
      "content-type": "application/json",
    },
  });
  return response.data.data;
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/product/${id}`, {
    headers: {
      "content-type": "application/json",
    },
  });
  return response.data.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/categories/product-count`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data;
};
