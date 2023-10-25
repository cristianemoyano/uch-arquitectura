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

export const getJWTSecret = () => {
    const secret = process.env.JWT_SECRET === undefined ? 'error' : process.env.JWT_SECRET;
    if (secret === "error") {
        throw "JWT_SECRET cannot be empty";
    }
    return secret
}

export const signJWT = (data:any) => {
    const JWTtoken = jwt.sign({
        expiresAt: getJWTexpiresAt(),
        ...data
    }, getJWTSecret())
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

export const serializeEmptyJWT = () => {
    return serialize('authToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
    })
}

