// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { serializeJWT, signIn, signJWT } from '@/services/auth';

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
        // Signed in 
        const user = userCredential.user;
        const data = {
            uid: user.uid,
            displayName: user.displayName,
            email:  user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
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
