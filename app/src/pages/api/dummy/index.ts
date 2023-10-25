// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addDummy, getDummies } from '@/services/dummy';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    switch (req.method) {
        case "GET":
            const dummies = await getDummies()
            res.status(200).json(dummies)
            break;
        case "POST":
            const body = req.body;
            const dummy = await addDummy(body)
            res.status(200).json(dummy)
            break;
        default:
            res.status(405).end(); //Method Not Allowed
            break;
    }
}
