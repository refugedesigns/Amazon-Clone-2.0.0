import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectDb } from "../../../lib/db";
import mongoose from "mongoose";
import User from "../../../models/user";
import { verifyPassword } from "../../../lib/bcrypt";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(loginInfo) {
        try {
          await connectDb();
        } catch (err) {
          throw new Error("Failed to connect to database!");
        }

        const user = await User.findOne({ email: loginInfo.email });
        if (!user) {
          await mongoose.disconnect();
          throw new Error("No user found!");
        }
        console.log(loginInfo)
        console.log(user)
        const isValid = await verifyPassword(loginInfo.password, user.password);

        if (!isValid) {
          await mongoose.disconnect();
          throw new Error("Invalid credentials!");
        }

        await mongoose.disconnect();
        return { email: user.email, name: user.name };
      },
    }),
  ],
});
