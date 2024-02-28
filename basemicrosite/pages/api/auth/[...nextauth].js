import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import myauth from "@/lib/myauth";
import { config } from '../../../config';
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        let params = {
          agencyid: process.env.NEXT_PUBLIC_AgencyID,
          email: credentials.email,
          password: credentials.password
        }
        try {
          var user = await axios.get(`http://localhost:3000/api/getLogin`, { params });

          if (user.data.results == 0) {
            return  null;
          }

          let ret = {
            contactid: user.data.results,
          };
  
          return ret;

        } catch (error) {
          console.error("Error fetching user:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    
    secret: process.env.NEXTAUTH_SECRET,

    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
  }
}

export default NextAuth(authOptions)