import { addDocument, deleteDocument, getDocument, getDocuments, setDocument} from "./db";

const USER_COLLECTION = 'user';

export const getUser = async (id: string) => {
  return await getDocument(USER_COLLECTION, id)
}

export const addUser = async (data: any) => {
  return await addDocument(USER_COLLECTION, data)
}

export const addUserWithID = async (data: any, id: string) => {
    return await setDocument(USER_COLLECTION, id, data)
}

export const deleteUser = async (id: string) => {
  return await deleteDocument(USER_COLLECTION, id)
}

export const getUsers = async () => {
  return await getDocuments(USER_COLLECTION)
}
