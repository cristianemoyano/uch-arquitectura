// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getProduct, deleteProduct } from '@/services/products';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { id } = req.query;
    let product;
    switch (req.method) {
        case "GET":
            product = await getProduct(String(id))
            res.status(200).json(product)
            break;
        case "DELETE":
            product = await deleteProduct(String(id))
            res.status(200).json(product)
            break;
        default:
            res.status(405).end(); //Method Not Allowed
            break;
    }
}
