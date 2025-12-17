/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://api.discountshub.co";

console.log("🚀 ~ API BASE_URL:", BASE_URL);

export const fetchProducts = async () => {
  console.log("🚀 ~ fetchProducts ~ URL:", `${BASE_URL}/product`);
  const response = await axios.get(`${BASE_URL}/product`, {
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("🚀 ~ fetchProducts ~ response:", response.data);
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
  console.log("🚀 ~ fetchCategories ~ URL:", `${BASE_URL}/category`);
  const response = await axios.get(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/product/categories/product-count`,
    `${BASE_URL}/category`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log("🚀 ~ fetchCategories ~ response:", response.data);
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
  // console.log("tagged products: ", response.data.data);
  return response.data.data;
};

// All featured items
export const getFeaturedItems = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tag/featured`,
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/category/featured`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  // console.log({ response });
  // return response.data?.data?.[0];
  return response.data?.data;
};

// **************** //
// ***** BRANDS ***** //
// **************** //
// All brands
export const fetchBrands = async () => {
  console.log("🚀 ~ fetchBrands ~ URL:", `${BASE_URL}/brand`);
  const response = await axios.get(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/product/brands/all`,
    `${BASE_URL}/brand`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log("🚀 ~ fetchBrands ~ response:", response.data);
  return response.data.data;
};

// Products by brandId
export const getProductsByBrand = async ({ queryKey }: any) => {
  const [_, id] = queryKey;
  console.log(_);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/brand/${id}/products`,
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

    // console.log("RESPONSE: ", response.data.data?.email);
    return response.data.data;
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    throw new Error("Subscription failed. Please try again.");
  }
};

// ******* AI CHAT TYPES ******** //
interface AIChat {
  id: string;
  _id: string;
  userId: string;
  messages: Array<{
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// ******* AI CHAT FUNCTIONS ******** //
// export const createAIChat = async ({ userId }: { userId: string }) => {
export const createAIChat = async () => {
  try {
    // console.log("Creating new chat for user:", userId);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/chat`;
    console.log("API URL:", url);

    const response = await axios.post(
      url,
      // { userId },
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Chat created successfully: ", response.data);
    return response.data._id;
  } catch (error) {
    console.error("Couldn't create chat: ", error);
    if (axios.isAxiosError(error)) {
      console.error("Error response:", error.response?.data);
      console.error("Status code:", error.response?.status);
    }
    throw new Error("Couldn't create chat. Please try again.");
  }
};

export const getAIChat = async ({ chatId }: { chatId: string }) => {
  try {
    console.log("getAIChat: ", chatId);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/chat/${chatId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("getAIChat response: ", response.data);
    return response.data.messages;
  } catch (error) {
    console.error("Couldn't fetch chat: ", error);
    throw new Error("Couldn't fetch chat. Please try again.");
  }
};

interface SendAIChatMessageParams {
  chatId: string;
  message: string;
}

export const sendAIChatMessage = async ({
  chatId,
  message,
}: SendAIChatMessageParams) => {
  try {
    console.log("Sending message to chat: ", {
      chatId,
      message: message.substring(0, 50) + "...",
    });
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/chat/${chatId}/message`;
    // const url = `${process.env.NEXT_PUBLIC_BASE_URL}/chat/68a71d741cb10c7f47f91715/message`;
    // console.log("API URL:", url);

    const response = await axios.post(
      url,
      { content: message },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Message sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Couldn't send chat message: ", error);
    if (axios.isAxiosError(error)) {
      console.error("Error response:", error.response?.data);
      console.error("Status code:", error.response?.status);
    }
    throw new Error("Couldn't send chat message. Please try again.");
  }
};
