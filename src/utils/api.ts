/**
 * Centralized API configuration
 * All API calls should use BASE_URL from this file
 *
 * In development, we use Next.js API routes as a proxy to avoid CORS issues
 * In production, we call the API directly (assuming CORS is properly configured)
 */
const API_BASE_URL = "https://api.discountshub.co";

// In development, use Next.js API proxy to avoid CORS
// In production, call the API directly (API should have CORS configured)
export const BASE_URL =
  typeof window !== "undefined" && process.env.NODE_ENV === "development"
    ? "/api/proxy" // Use Next.js API route proxy in development
    : API_BASE_URL; // Use direct API in production

// Log in development to help with debugging
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log("🚀 ~ API Configuration:");
  console.log("   Environment:", process.env.NODE_ENV);
  console.log("   Using proxy:", BASE_URL === "/api/proxy");
  console.log("   API Base URL:", API_BASE_URL);
}

// Export the actual API URL for server-side use
export const API_URL = API_BASE_URL;
