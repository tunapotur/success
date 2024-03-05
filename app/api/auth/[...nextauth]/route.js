import NextAuth from "next-auth/next";

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials, req) {
        try {
          await connectMongoDB();

          const { email, password } = credentials;
          const user = await User.findOne({ email });

          if (!user) throw new Error("This email is not recorded!");

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password,
          );

          if (!isPasswordMatched) throw new Error("Invalid password");

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      token.user = {
        id: userByEmail._id,
        email: userByEmail.email,
        name: userByEmail.name,
        role: userByEmail.role,
        theme: userByEmail.theme,
      };
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
