// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteDummy, getDummy } from '@/services/dummy';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { id } = req.query;
    let dummy;
    switch (req.method) {
        case "GET":
            dummy = await getDummy(String(id))
            res.status(200).json(dummy)
            break;
        case "DELETE":
            dummy = await deleteDummy(String(id))
            res.status(200).json(dummy)
            break;
        default:
            res.status(405).end(); //Method Not Allowed
            break;
    }
}
