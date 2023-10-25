// https://firebase.google.com/docs/auth/web/start

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { firebaseApp } from "./config";
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'; 

const auth = getAuth(firebaseApp);

const AUTH_COOKIE_NAME = 'authToken'

export async function signUp(email: string, password: string) {
   return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
}

const getJWTexpiresAt = ()=> {
    return Math.floor(Date.now()/1000) +  60 * 60 * 24 * 30
}

export const signJWT = (data:any) => {
    const JWTtoken = jwt.sign({
        expiresAt: getJWTexpiresAt(),
        ...data
    }, process.env.JWT_SECRET)
    return JWTtoken
}

export const serializeJWT = (token: any) => {
    const maxAge = 1000 * 60 * 60 * 24 * 30;// 30 days 
    const tokenSerialized = serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'strict',
        maxAge: maxAge,
        path: '/'
    })
    return tokenSerialized
}
