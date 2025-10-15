import { createAuthClient } from "better-auth/react";

export const { signUp, signIn, signOut } = createAuthClient({
  baseURL: `${import.meta.env.VITE_URL}`, // Adjust the URL as needed
});
