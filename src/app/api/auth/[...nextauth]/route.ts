import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import { sendDiscordNotification } from "@/lib/discord";

// Extend the Session type to include provider
interface ExtendedSession extends Session {
  provider?: string;
}

// Extend the JWT token type
interface ExtendedToken {
  provider?: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      // OIDC configuration to align with "Sign In with LinkedIn using OpenID Connect"
      issuer: "https://www.linkedin.com/oauth",
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: { params: { scope: "openid profile email" } },
      profile(profile) {
        const p = profile as {
          sub?: string;
          id?: string;
          name?: string;
          given_name?: string;
          family_name?: string;
          picture?: string;
          email?: string;
        };
        return {
          id: p.sub || p.id || "",
          name:
            p.name ||
            [p.given_name, p.family_name].filter(Boolean).join(" ") ||
            "LinkedIn User",
          email: p.email,
          image: p.picture,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add provider information to session
      if ((token as ExtendedToken).provider) {
        (session as ExtendedSession).provider = (
          token as ExtendedToken
        ).provider;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // Store provider information in token
      if (account) {
        (token as ExtendedToken).provider = account.provider;

        // Send Discord notification for new registration
        try {
          await sendDiscordNotification({
            type: "registration",
            data: {
              registration: {
                name: profile?.name || "Unknown",
                email: profile?.email || "No email",
                provider: account.provider,
                image:
                  (profile as { picture?: string; avatar_url?: string })
                    ?.picture ||
                  (profile as { picture?: string; avatar_url?: string })
                    ?.avatar_url,
                timestamp: new Date().toLocaleString(),
              },
            },
          });
        } catch (error) {
          console.error("Failed to send registration notification:", error);
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/", // Redirect to home page after login
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
