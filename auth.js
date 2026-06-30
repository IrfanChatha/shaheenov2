import NextAuth from "next-auth"
import Facebook from "next-auth/providers/facebook"
import Instagram from "next-auth/providers/instagram"
import Google from "next-auth/providers/google"
import TikTok from "next-auth/providers/tiktok"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
      authorization: { params: { scope: "public_profile" } },
    }),
    Instagram({
      clientId: process.env.AUTH_INSTAGRAM_ID,
      clientSecret: process.env.AUTH_INSTAGRAM_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope:
            "openid profile email https://www.googleapis.com/auth/youtube.readonly",
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
    TikTok({
      clientId: process.env.AUTH_TIKTOK_ID,
      clientSecret: process.env.AUTH_TIKTOK_SECRET,
      authorization: { params: { scope: "user.info.profile" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.provider = token.provider
      return session
    },
  },
})
