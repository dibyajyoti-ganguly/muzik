import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(params) {
      console.log(params);

      try {
        await prisma.user.create({
          data: {
            email: params.user.email ?? "",
            provider: "Google",
          },
        });
      } catch (e) {
        console.log(e);
        return false;
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
