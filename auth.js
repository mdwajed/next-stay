import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoClientPromise from "@/lib/client";

import { jwtDecode } from "jwt-decode";
async function refreshAccessToken(token) {
  console.log("Refreshing access token", token);
  try {
    console.log("Beaarer token", `Bearer ${token.refreshToken}`);
    if (token.provider === "google") {
      // Refresh Google tokens
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.AUTH_GOOGLE_ID,
          client_secret: process.env.AUTH_GOOGLE_SECRET,
          refresh_token: token.refreshToken,
          grant_type: "refresh_token",
        }),
      });

      const refreshedTokens = await response.json();

      if (!response.ok) {
        console.error("Failed to refresh token:", refreshedTokens);
        throw refreshedTokens;
      }
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpire: Date.now() + refreshedTokens.expires_in * 1000,
        refreshToken: refreshedTokens.refresh_token || token.refreshToken,
      };
    } else if (token.provider === "credentials") {
      // Refresh tokens for credentials provider
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.refreshToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log(response);

      const newTokens = await response.json();

      console.log(newTokens);

      if (!response.ok) {
        throw newTokens;
      }

      return {
        ...token,
        accessToken: newTokens.accessToken,
        accessTokenExpire: Date.now() + (newTokens.expiresIn || 3600) * 1000,
        refreshToken: newTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
      };
    }
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            },
          );
          if (!res.ok) {
            return null;
          }
          const parseResponse = await res.json();

          const accessToken = parseResponse.accessToken;
          const refreshToken = parseResponse.refreshToken;
          const userInfo = parseResponse.userInfo;
          return {
            accessToken,
            refreshToken,
            name: userInfo?.name,
            email: userInfo?.email,
            image: userInfo?.image || null,
          };
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      console.log(`In jwt callback - Token is ${JSON.stringify(token)}`);

      if (account && user) {
        console.log(`In jwt callback - User is ${JSON.stringify(user)}`);
        console.log(`In jwt callback - Account is ${JSON.stringify(account)}`);
        // Check if it's a Google provider
        if (account.provider === "google") {
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token || token.refreshToken,
            accessTokenExpire: Date.now() + account.expires_in * 1000,
            provider: account.provider,
            user: {
              name: user.name,
              email: user.email,
              image: user.image,
            },
          };
          // Handle other providers like "credentials"
        } else if (account.provider === "credentials") {
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            accessTokenExpire: Date.now() + 15 * 60 * 1000,
            provider: account.provider,
            user: user.user || user,
          };
        }
      }
      // Skip decoding for non-JWT tokens
      if (token.provider === "google" || !token.accessToken.includes(".")) {
        if (Date.now() < token.accessTokenExpire) {
          return token;
        }
        return await refreshAccessToken(token);
      }

      // Decode JWT for other providers
      try {
        const decodedToken = jwtDecode(token.accessToken);
        token.accessTokenExpire = decodedToken?.exp * 1000;
      } catch (error) {
        console.error("Failed to decode access token:", error);
        token.error = "InvalidAccessToken";
      }

      if (Date.now() < token.accessTokenExpire) {
        return token;
      }
      return await refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      console.log(`In session callback - Token is ${JSON.stringify(token)}`);
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.error = token.error;
      }

      return session;
    },
  },
});
