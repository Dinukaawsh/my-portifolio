import NextAuth, { Session } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import GitHubProvider from "next-auth/providers/github";

import LinkedInProvider from "next-auth/providers/linkedin";

import FacebookProvider from "next-auth/providers/facebook";



interface ExtendedSession extends Session {

  provider?: string;

}



interface ExtendedToken {

  provider?: string;

}



const handler = NextAuth({

  secret: process.env.NEXTAUTH_SECRET,

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

    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET
      ? [
          FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
          }),
        ]
      : []),
  ],

  callbacks: {

    async signIn({ account, profile }) {

      const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS

        ?.split(",")

        .map((e) => e.trim().toLowerCase())

        .filter(Boolean);



      if (!allowedEmails?.length) return true;



      const email = (profile?.email || "").toLowerCase();

      if (!email || !allowedEmails.includes(email)) {

        return false;

      }



      void account;

      return true;

    },

    async redirect({ url, baseUrl }) {

      if (url.startsWith("/")) {

        return `${baseUrl}${url}`;

      }

      try {

        const target = new URL(url);

        if (target.origin === baseUrl) {

          return url;

        }

      } catch {

        // ignore invalid URL

      }

      return `${baseUrl}/contact`;

    },

    async session({ session, token }) {

      if ((token as ExtendedToken).provider) {

        (session as ExtendedSession).provider = (

          token as ExtendedToken

        ).provider;

      }

      return session;

    },

    async jwt({ token, account, profile }) {

      if (account) {

        (token as ExtendedToken).provider = account.provider;

        void profile;

      }

      return token;

    },

  },

  pages: {

    signIn: "/contact",

    error: "/contact",

  },

  session: {

    strategy: "jwt",

  },

});



export { handler as GET, handler as POST };

