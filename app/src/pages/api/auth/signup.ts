// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { signUp } from '@/services/auth';

type Data = {
    msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {email, password} = req.body;
    try {
        await signUp(email, password)
        return res.status(200).json({ msg: 'Signup successfull' })
    } catch (error:any) {
        const errorMessage = error.message;
        console.error(error)
        return res.status(401).json({ msg: errorMessage })
    }

}
