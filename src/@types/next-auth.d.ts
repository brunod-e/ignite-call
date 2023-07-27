import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: number
    name: string
    username: string
    email: string
    avatar_url: string
  }
}
