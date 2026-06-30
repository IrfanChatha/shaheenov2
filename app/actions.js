"use server"

import { signIn, signOut } from "@/auth"

export async function signInProvider(providerId) {
  await signIn(providerId, { redirectTo: "/" })
}

export async function signOutAll() {
  await signOut({ redirectTo: "/" })
}
