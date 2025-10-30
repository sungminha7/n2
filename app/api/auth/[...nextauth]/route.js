import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user name" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        console.log("---------------------------------");
        console.log("credentials: ", credentials);
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
