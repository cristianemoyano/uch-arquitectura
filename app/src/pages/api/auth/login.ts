// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { serializeJWT, signIn, signJWT } from '@/services/auth';
import { getUser } from '@/services/user';

type Data = {
    msg: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { email, password } = req.body;

    try {
        const userCredential = await signIn(email, password);
        const uid = userCredential.user.uid;
        const {result} = await getUser(uid);
        // Signed in 
        const authUser = userCredential.user;
        const data = {
            uid: authUser.uid,
            displayName: authUser.displayName,
            email:  authUser.email,
            emailVerified: authUser.emailVerified,
            phoneNumber: authUser.phoneNumber,
            photoURL: authUser.photoURL,
            ...result
        }
        const token = signJWT(data);
        const tokenSerialized = serializeJWT(token)
        res.setHeader('Set-Cookie', tokenSerialized)
        return res.status(200).json({ msg: 'Login successfull' })
    } catch (error) {
        console.error(error)
        return res.status(401).json({ msg: 'Invalid email or password' })
    }
}
