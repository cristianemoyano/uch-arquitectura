// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {verify} from 'jsonwebtoken'



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {authToken} = req.cookies
  
  if (authToken) {
    const user: Object = verify(authToken, process.env.JWT_SECRET)
    return res.status(200).json({...user})
  }
  return res.status(401).json({ email: '', username: '' })
}
