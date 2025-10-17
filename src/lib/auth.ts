import { createAuthClient } from "better-auth/react";

export const { signUp, signIn, signOut, getSession, useSession } =
  createAuthClient({
    baseURL: `${import.meta.env.VITE_URL}`,
    fetchOptions: { credentials: "include" },
  });
