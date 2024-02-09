import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "@/app/firebase";

export const authOptions = {
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        return await signInWithEmailAndPassword(auth, credentials.email || '', credentials.password || '')
          .then(userCredential => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch(error => (console.log(error)))
      }
    })
  ],
}

export default NextAuth(authOptions)

//Slightly edited version of https://github.com/jimbeck/nextjs-firebase-username-password/tree/main/src/app