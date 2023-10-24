import type { NextApiRequest, NextApiResponse } from 'next'

type Message = {
    text: string
}

const handler = async(request: NextApiRequest, response: NextApiResponse<Message>) => {
    //Create product.
    if (request.method == "POST") {
        await fetch("/api/product/", {
            method: "POST",
            body: request.body
        });

        return response.status(200).json({ text: "Success!" })
    }

    //Get all products.
    if (request.method == "GET") {
        const getProducts = await fetch("/api/product/", {});
        const products = await getProducts.json();

        response.status(200).json(products)

        return response.json({ text: "Success!" })
    }
    
    return response.status(400).json({ text: "Failure!" })
}

export default handler;