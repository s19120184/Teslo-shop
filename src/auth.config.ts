import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account"
  },

  callbacks:{
    jwt({token, user}){

      if(user){
        token.data = user
      }
 
      return token
    },
    session({session, token}){

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.data as any
      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        if(!parsedCredentials.success) return null

        const {email, password} = parsedCredentials.data        
        

        //buscar el correo
        const user = await prisma.user.findUnique({where:{email:email.toLowerCase()}})
 
        if(!user) return null

        //comparar las contrasenias
        if(!bcrypt.compareSync(password ,user.password)) return null


        //regresar el usuario sin el password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password:_ , ...rest} = user
        console.log({rest})
        return rest;
      }
    })
  ]
};

//exportamos las funciones para :
export const {signIn, signOut, auth , handlers } = NextAuth(authConfig)

//los handler tienen los metodos de get y post