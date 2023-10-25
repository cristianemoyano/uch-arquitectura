// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {verify} from 'jsonwebtoken'

type Data = {
  email: string,
  username: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {authToken} = req.cookies
  
  if (authToken) {
    const user = verify(authToken, process.env.JWT_SECRET)
    return res.status(200).json({username: user.username, email: user.email})
  }
  return res.status(401).json({ email: '', username: '' })
}
