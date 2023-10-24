// https://firebase.google.com/docs/auth/web/start

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { firebaseApp } from "./config";

const auth = getAuth(firebaseApp);

export async function signUp(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
