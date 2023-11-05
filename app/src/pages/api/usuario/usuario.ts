import { addUser, getUser, addUserWithID, deleteUser, getUsers } from '@/services/user'; // Importa las funciones necesarias
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    switch (req.method) {
        case "GET":
            const users = await getUsers()
            res.status(200).json(users)
            break;
        case "POST":
            const body = req.body;
            const user = await addUser(body)
            res.status(200).json({id: user.result?.id})
            break;
        case "DELETE":
            const id = req.body.id;
            await deleteUser(id);
            res.status(200).json({message: "User deleted successfully"});
            break;
        case "PUT":
            const updatedData = req.body;
            const updatedId = await addUserWithID(updatedData, updatedData.id);
            res.status(200).json({id: updatedId});
            break;
        default:
            res.status(405).end(); //Method Not Allowed
            break;
    }
}
