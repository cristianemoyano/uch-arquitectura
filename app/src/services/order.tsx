import { addDocument, deleteDocument, getDocument, getDocuments } from "./db";

const ORDERS_COLLECTION = 'order';

export const getOrder = async (id: string) => {
    return await getDocument(ORDERS_COLLECTION, id)
}

export const addOrder= async (data: any) => {
    return await addDocument(ORDERS_COLLECTION, data)
}

export const deleteOrder= async (id: string) => {
    return await deleteDocument(ORDERS_COLLECTION, id)
}

export const getOrders = async () => {
    return await getDocuments(ORDERS_COLLECTION)
}