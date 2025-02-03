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

export const fetchProductById = async ({ queryKey }: any) => {
  const [_, id] = queryKey;
  console.log(_);
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

export const searchProducts = async (term: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/search/v1?term=${term}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data;
};

// **************** //
// ***** TAGS ***** //
// **************** //
// All tags
export const fetchTags = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/tags/all`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Tag by Id
export const getTagById = async (tagId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/tags/one?tagId=${tagId}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Products by tagId
export const getProductsByTag = async (tagId: string) => {
  console.log("tagId: ", tagId);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/tags/by-tag?tagId=${tagId}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log("tagged products: ", response.data.data);
  return response.data.data;
};

// All featured items
export const getFeaturedItems = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/tags/featured/all`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data?.data?.[0] || null;
};

export const getFeaturedCategories = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/categories/featured`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data?.data?.[0];
};

// **************** //
// ***** BRANDS ***** //
// **************** //
// All brands
export const fetchBrands = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/brands/all`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data;
};

// Products by brandId
export const getProductsByBrand = async ({ queryKey }: any) => {
  const [_, id] = queryKey;
  console.log(_);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/brands/products-by-brand?brandId=${id}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return response.data.data;
};

// // subscribe to newsletter
// export const subscribeToNewsletter = async ({ queryKey }: any) => {
//   const [_, email] = queryKey;
//   console.log(_);
//   const response = await axios.post(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/user/newsletter`,
//     {
//       email,
//     },
//     {
//       headers: {
//         "content-type": "application/json",
//       },
//     }
//   );
//   console.log("RESPONSE: ", response.data.data?.email);
//   return response.data.data;
// };

// subscribe to newsletter
export const subscribeToNewsletter = async ({ email }: { email: string }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/newsletter`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("RESPONSE: ", response.data.data?.email);
    return response.data.data;
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    throw new Error("Subscription failed. Please try again.");
  }
};
