import { createAuthClient } from "better-auth/react";
import { requireEnv } from "../auth";

export const {signIn, signUp, signOut, useSession} = createAuthClient({baseURL: requireEnv('BETTER_AUTH_URL')})