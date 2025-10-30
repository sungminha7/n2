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

        const res = await fetch(`http://localhost:8080/api/accounts/signin`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        console.log("---------------------------------");
        console.log("res: ", res);

        const user = await res.json();
        console.log("---------------------------------");
        console.log("user: ", user);

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("jwt params : jwt--------------------");
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.nickname;

        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = Date.now() + 1000 * 60 * 60;
      }

      return token;
    },

    async session({ session, token }) {
      console.log("session--------------------");
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.nickname;

      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.expiresAt = Date.now() + 1000 * 60 * 60;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
