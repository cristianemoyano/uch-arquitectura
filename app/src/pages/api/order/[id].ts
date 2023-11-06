// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getOrder, deleteOrder} from '@/services/order';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { id } = req.query;
    let order;
    switch (req.method) {
        case "GET":
            order = await getOrder(String(id))
            res.status(200).json(order)
            break;
        case "DELETE":
            order = await deleteOrder(String(id))
            res.status(200).json(order)
            break;
        default:
            res.status(405).end(); //Method Not Allowed
            break;
    }
}
