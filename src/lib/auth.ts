import NextAuth, { NextAuthOptions } from 'next-auth';
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import { db } from './db';
import Google from 'next-auth/providers/google';

const getCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_ID');
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_SECRET');
  }

  return { clientId, clientSecret };
};

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Google({
      clientId: getCredentials().clientId,
      clientSecret: getCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const existingUser = (await db.get(`user:${token.id}`)) as User | null;

      if (!existingUser) {
        token.id = user!.id;

        return token;
      }

      return {
        name: existingUser.name,
        email: existingUser.email,
        picture: existingUser.image,
        id: existingUser.id,
      };
    },

    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.id = token.id;
      }

      return session;
    },

    redirect() {
      return '/home';
    },
  },
};
