import { addDocument, deleteDocument, getDocument, getDocuments } from "./db";

const DUMMY_COLLECTION = 'dummy';

export const getDummy = async (id: string) => {
  return await getDocument(DUMMY_COLLECTION, id)
}

export const addDummy = async (data: any) => {
  return await addDocument(DUMMY_COLLECTION, data)
}

export const deleteDummy = async (id: string) => {
  return await deleteDocument(DUMMY_COLLECTION, id)
}

export const getDummies = async () => {
  return await getDocuments(DUMMY_COLLECTION)
}
