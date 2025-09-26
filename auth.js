import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/mongodb";
import { User } from "./models/User";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email;
        const password = credentials.password;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        await connectDB();
        const user = await User.find({ email }).select("+password");

        if (!user || user.length === 0) {
          throw new CredentialsSignin("Invalid email or password");
        }

        if (!user[0].password) {
          throw new CredentialsSignin("Invalid email or password");
        }

        const isMatched = await bcrypt.compare(password, user[0].password);
        if (!isMatched) {
          throw new CredentialsSignin("Invalid email or password");
        }

        const userData = {
          name: user[0].name,
          email: user[0].email,
          id: user[0]._id.toString(),
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error : "/signin"
  },
  callbacks: {
    async session({ session, token }) {
      // Attach the user ID to the session object
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Attach the user ID to the JWT token
      if (user) {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });
          if (existingUser) {
            token.id = existingUser._id.toString(); // Use the database `_id`
          }
        } catch (error) {
          console.error("Error in JWT callback:", error);
        }
      }
      return token;
    },
  },
});
