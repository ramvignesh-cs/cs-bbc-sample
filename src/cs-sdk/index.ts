import contentstack from "@contentstack/delivery-sdk";
import { Stack } from "@contentstack/delivery-sdk/dist/types/src/lib/stack";

// Get the environment variables from the .env file.
// If project Created with Vite, below is the way to get it.
const {
  VITE_CONTENTSTACK_API_KEY,
  VITE_CONTENTSTACK_DELIVERY_TOKEN,
  VITE_CONTENTSTACK_ENVIRONMENT,
  VITE_CONTENTSTACK_BRANCH,
} = import.meta.env;

// If project Created with create-react-app, below is the way to get it.
// const {
//   REACT_APP_CONTENTSTACK_API_KEY,
//   REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
//   REACT_APP_CONTENTSTACK_ENVIRONMENT,
//   REACT_APP_CONTENTSTACK_BRANCH,
// } = process.env;

export const hasValidKey = (): Boolean => {
  return (
    !VITE_CONTENTSTACK_API_KEY ||
    !VITE_CONTENTSTACK_DELIVERY_TOKEN ||
    !VITE_CONTENTSTACK_ENVIRONMENT
  );
};

export const bootstrapContentStackSDK = (): Stack => {
  if (!hasValidKey)
    throw new Error(
      "Missing required environment variables for ContentStack. Please set these values in .env file."
    );

  const stack = contentstack.stack({
    apiKey: VITE_CONTENTSTACK_API_KEY as string,
    deliveryToken: VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: VITE_CONTENTSTACK_ENVIRONMENT as string,
    branch: VITE_CONTENTSTACK_BRANCH as string, // Optional
  });

  return stack;
};
