import type { NextApiRequest, NextApiResponse } from 'next'

type Message = {
    text: string
}

const handler = async(request: NextApiRequest, response: NextApiResponse<Message>) => {
    let producId = request.query.id;

    //Get a product.
    if (request.method == "GET") {
        const getProduct = await fetch("/api/product/${producId}", {});
        const product = await getProduct.json();

        response.status(200).json(product)

        return response.json({ text: "Success!" })
    }
    
    return response.status(400).json({ text: "Failure!" })
}

export default handler;