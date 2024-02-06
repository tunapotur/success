import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectMongoDB } from "@/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        await connectMongoDB();

        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) throw new Error("This email is not recorded!");

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      token.user = userByEmail;
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
