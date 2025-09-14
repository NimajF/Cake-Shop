import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: "Admin", role: "Admin" };

        // const res = await fetch(`http://localhost:3000/api/auth/login`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   // credentials: "include",
        //   body: JSON.stringify(credentials),
        // });
        // const userData = await res.json();

        // if (res.ok && userData) {
        //   return userData;
        // }
        // return null;

        if (
          credentials.password === process.env.NEXTAUTH_PASS &&
          credentials.username === process.env.NEXTAUTH_USER
        ) {
          console.log("Bienvenido");
          return user;
        } else {
          console.log("Error de autenticacion");
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 30 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user; // Setting token in session
      return session;
    },
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (user) {
  //       token.accessToken = user.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET || "kjwdhakjhdwkajdhah",
  // session: {
  //   strategy: "jwt",
  //   maxAge: 30 * 60,
  // },
});
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const user = {
//           password: process.env.NEXTAUTH_PASS,
//         };
//         if (credentials.password === user.password) {
//           console.log("HOLA");
//           return user;
//         } else {
//           console.log("waska");
//           return null;
//         }
//       },
//     }),
//   ],
//   //   callbacks: {
//   //     jwt: ({ token, user }) => {
//   //       if (user) {
//   //         token.id = user.id;
//   //       }
//   //       return token;
//   //     },
//   //     session: ({ session, token }) => {
//   //       if (token) {
//   //         session.id = token.id;
//   //       }
//   //       return session;
//   //     },
//   //   },
//   //   secret: "test",
//   //   jwt: {
//   //     secret: "test",
//   //   },
//   callbacks: {
//     async jwt({ token, account }) {
//       // Persist the OAuth access_token to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
//       // Send properties to the client, like an access_token from a provider.
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 60,
//   },
// });
