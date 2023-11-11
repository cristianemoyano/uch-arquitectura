import { getUser, deleteUser } from '@/services/user';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { id } = req.query;
    let user;
    switch (req.method) {
        case "GET":
            user = await getUser(String(id))
            res.status(200).json(user)
            break;
        case "DELETE":
            user = await deleteUser(String(id))
            res.status(200).json(user)
            break;
        default:
            res.status(405).end(); //Method Not Allowed
        break;
}
}