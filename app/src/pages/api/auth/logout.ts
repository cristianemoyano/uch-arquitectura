// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {verify} from 'jsonwebtoken'
import { serialize } from 'cookie';   

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
        verify(authToken, process.env.JWT_SECRET)
        const tokenSerialized = serialize('authToken', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        })
        res.setHeader('Set-Cookie', tokenSerialized)
        return res.status(200).json({ msg: 'Logout successfull' })
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token' })
    }
}
