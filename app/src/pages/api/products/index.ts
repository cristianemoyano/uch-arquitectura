// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addProduct, getProducts } from '@/services/products';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    switch (req.method) {
        case "GET":
            const products = await getProducts()
            res.status(200).json(products)
            break;
        case "POST":
            const body = req.body;
            const product = await addProduct(body)
            res.status(200).json({id: product.result?.id})
            break;
        default:
            res.status(405).end(); //Method Not Allowed
            break;
    }
}
