import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  secret: process.env.AUTH_SECRET,

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    Credentials({
      async authorize(credentials) {
        const validated =
          await loginSchema.safeParseAsync(credentials);

        if (!validated.success) return null;

        const { email, password } = validated.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          telefono: user.telefono,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // LOGIN
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.telefono = (user as any).telefono;
        token.image = user.image;
      }

      // REFRESH DESDE DB
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.id as string,
          },
        });

        if (dbUser) {
          token.name = dbUser.name;
          token.role = dbUser.role;
          token.telefono = dbUser.telefono;
          token.image = dbUser.image;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.telefono =
          token.telefono as string | null;

        session.user.image =
          token.image as string | null;

        session.user.name =
          token.name as string;
      }

      return session;
    },
  },
});