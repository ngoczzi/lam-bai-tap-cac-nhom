import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  try {
    console.log(">>> [NEXTAUTH] Attempting to refresh access token...");
    
    // In a real application, you would make a POST request to your backend:
    // const response = await fetch("https://api.example.com/auth/refresh", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ refreshToken: token.refreshToken }),
    // });
    // const refreshedTokens = await response.json();

    // Mocking a successful refresh
    const refreshedTokens = {
      accessToken: "access_token_" + Math.random().toString(36).substring(7),
      accessTokenExpires: Date.now() + 60 * 1000, // 60 seconds
      refreshToken: token.refreshToken, // Usually backend returns a new refresh token too
    };

    console.log(">>> [NEXTAUTH] Refresh successful!");

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: refreshedTokens.accessTokenExpires,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fallback to old refresh token
    };
  } catch (error) {
    console.error(">>> [NEXTAUTH] Refresh failed:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        // Mock authentication logic
        if (password === "123456") {
          if (username === "student") {
            return {
              id: "1",
              name: "student",
              email: "student@example.com",
              role: "ROLE_STUDENT",
              accessToken: "initial_access_token_student",
              refreshToken: "refresh_token_student",
            };
          } else if (username === "advisor") {
            return {
              id: "2",
              name: "advisor",
              email: "advisor@example.com",
              role: "ROLE_ADVISOR",
              accessToken: "initial_access_token_advisor",
              refreshToken: "refresh_token_advisor",
            };
          }
        }
        
        // If authentication fails
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        console.log(">>> [NEXTAUTH] Initial login detected. Storing tokens.");
        return {
          accessToken: user.accessToken,
          accessTokenExpires: Date.now() + 60 * 1000, // 60 seconds from now
          refreshToken: user.refreshToken,
          role: user.role,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        // console.log(">>> [NEXTAUTH] Token still valid...");
        return token;
      }

      // Access token has expired, try to update it
      console.log(">>> [NEXTAUTH] Token expired at", new Date(token.accessTokenExpires).toLocaleTimeString());
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.role = token.role;
      session.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "any-secret-is-fine-for-demo",
});
