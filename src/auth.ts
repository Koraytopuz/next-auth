import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";
import type { NextAuthConfig } from "next-auth";

// Extend the built-in session type to include custom fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "admin";
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const config = {
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      authorization: {
        params: {
          prompt: "login",
          scope: "openid email profile",
          // Disable password reset
          allowSignUp: false,
          allowForgotPassword: false
        }
      }
    }),
  ],
  session: { 
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        // Add custom claims from Auth0
        token.role = user.email?.endsWith("@admin.com") ? "admin" : "user";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "admin" | "user";
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);