// Doc: https://firebase.google.com/docs/firestore/manage-data/add-data

import { getFirestore, doc, collection, setDoc, getDoc, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import { firebaseApp } from "./config";


const db = getFirestore(firebaseApp)


export async function setDocument(colllection: string, id:string, data: any) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, colllection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}


export async function addDocument(colllection: string, data: any) {
  let result = null;
  let error = null;

  try {
      result = await addDoc(collection(db, colllection), data);
  } catch (e) {
      error = e;
  }

  return { result, error };
}

export async function getDocument(collection: string, id: string) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        result = docSnap.data();
      } else {
        error = {msg: "El documento solicitado no existe."}
      }

  } catch (e) {
      error = e;
  }

  return { result, error };
}


export async function deleteDocument(collection: string, id: string) {
  let result = null;
  let error = null;

  try {
      result = await deleteDoc(doc(db, collection, id));
  } catch (e) {
      error = e;
  }

  return { result, error };
}


export async function getDocuments(coll: string) {
  let result: any = [];
  let error = null;

  try {
      const querySnapshot = await getDocs(collection(db, coll));

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let data : any = doc.data()
        let obj : Object = {
          ...data, id: doc.id
        }
        result.push(obj)
      });      
  } catch (e) {
      error = e;
  }

  return { result, error };
}
