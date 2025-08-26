import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getServerSession } from "next-auth/next";
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
  async authorize(credentials) {
    await dbConnect();

    console.log('Credentials:', credentials);

    const user = await User.findOne({ email: credentials.email });

    console.log('User found:', user);

    if (!user) {
      console.log('User not found');
      return null;
    }

    if (bcrypt.compareSync(credentials.password, user.passwordHash)) {
      console.log('Password comparison succeeded');
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } else {
      console.log('Password comparison failed');
      return null;
    }
  },
}),
],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback - user:', user);
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      console.log('JWT callback - token:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback - token:', token);
      session.user.id = token.id;
      session.user.role = token.role;
      console.log('Session callback - session:', session);
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log('SignIn callback - user:', user);
      console.log('SignIn callback - account:', account);
      console.log('SignIn callback - profile:', profile);

      if (account.provider === 'google') {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user with default role 'user'
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            role: 'user',
          });
          user.id = newUser._id;
          user.role = newUser.role;
        } else {
          user.id = existingUser._id;
          user.role = existingUser.role;

          // Update existing user's name and image if they have changed
          if (existingUser.name !== user.name || existingUser.image !== user.image) {
            existingUser.name = user.name;
            existingUser.image = user.image;
            await existingUser.save();
          }
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to orders page for users, admin dashboard for admins
      const session = await getServerSession(authOptions);
      if (session && session.user.role === 'admin') {
        return `${baseUrl}/admin/dashboard`;
      } else {
        return `${baseUrl}/orders`;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
  handler as OPTIONS,
  handler as HEAD,
};
