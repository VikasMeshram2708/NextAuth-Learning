import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prismaInstance } from "./PrismaInstance";
import { compare } from "bcryptjs";
// const LOGIN_URI = process.env.BASE_URI;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaInstance),
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const existingUser = await prismaInstance.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existingUser) {
          return null;
        }

        // Compare the password
        const matchedPassword = await compare(
          credentials.password, 
          existingUser.password
        );

        if (!matchedPassword) {
          return null;
        }
        return {
          // id: existingUser.id + "", // Converting to string
          id: `${existingUser.id}`, // Converting to string
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  }
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true;
  //   },
  //   async session({ session, user, token }) {
  //     console.log("session-user", user);
  //     if (session && session?.user) {
  //       session.user.email = user.email;
  //       session.user.name = user.name;
  //     }
  //     return session;
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return token;
  //   },
  // },
};
