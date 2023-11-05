// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addOrder, getOrders } from '@/services/order';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    switch (req.method) {
        case "GET":
            const orders = await getOrders()
            res.status(200).json(orders)
            break;
        case "POST":
            const body = req.body;
            const order = await addOrder(body)
            res.status(200).json({id: order.result?.id})
            break;
        default:
            res.status(405).end(); //Method Not Allowed
            break;
    }
}
