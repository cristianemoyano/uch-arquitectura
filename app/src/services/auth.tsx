// https://firebase.google.com/docs/auth/web/start

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { firebaseApp } from "./config";
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'; 
import { addUserWithID } from "./user";
import axios from "axios";

const auth = getAuth(firebaseApp);

const AUTH_COOKIE_NAME = 'authToken'

type UserProfile = {
    role: string,
    username: string,
    displayName : string,
    phoneNumber: string,
    photoURL: string
}

export async function signUp(email: string, password: string, profile: UserProfile) {
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   const uid = userCredential.user.uid
   const newUser = await addUserWithID({uid: uid, email: email, ...profile}, uid)
   console.log(newUser)
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
    const tokenSerialized = serialize(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'strict',
        maxAge: maxAge,
        path: '/'
    })
    return tokenSerialized
}

export const serializeEmptyJWT = () => {
    return serialize(AUTH_COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
    })
}

