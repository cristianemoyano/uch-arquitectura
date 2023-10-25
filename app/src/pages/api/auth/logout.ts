// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {verify} from 'jsonwebtoken'
import { serialize } from 'cookie';   
import { getJWTSecret, serializeEmptyJWT } from '@/services/auth';

type Data = {
    msg: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {authToken} = req.cookies;

    if (!authToken) {
        return res.status(401).json({ msg: 'No token found' })
    }
    try {
        verify(authToken, getJWTSecret())
        const tokenSerialized = serializeEmptyJWT()
        res.setHeader('Set-Cookie', tokenSerialized)
        return res.status(200).json({ msg: 'Logout successfull' })
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token' })
    }
}
