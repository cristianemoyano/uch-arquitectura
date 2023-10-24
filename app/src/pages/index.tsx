import { useState, useEffect } from 'react';

import { addDocument, deleteDocument, getDocument, getDocuments } from "@/services/db"

const DUMMY_COLLECTION = 'dummy';

async function getDummy(id: string) {
  return await getDocument(DUMMY_COLLECTION, id)
}

async function addDummy(data: any) {
  return await addDocument(DUMMY_COLLECTION, data)
}

async function deleteDummy(id: string) {
  return await deleteDocument(DUMMY_COLLECTION, id)
}

async function getDummies() {
  return await getDocuments(DUMMY_COLLECTION)
}

export default function Home() {
  const [dummies, setDummies] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [dummyID, setDummyID] = useState("Gyxs3fa0Gzy2qZUrHoxI")

  const [inputText, setInputText] = useState('');

  const onAddDummyHandler = async () => {
    const dummyData = {
      name: "Dummy",
      value: 1,
    }
    const res = await addDummy(dummyData);
    console.log("Documento creado: ", res!.result!.id)
    setDummyID(`${res!.result!.id}`)
  }

  const onDeleteDummyHandler = async () => {
    const res = await deleteDummy(inputText);
    setDummyID(inputText)
  }

  useEffect(() => {
    const getData = async () => {
      const data: any = await getDummies()
      setDummies(data.result)
      setLoading(false)
    }
    getData();
    return () => {
      // here you can clean the effect in case the component gets unmonth before the async function ends
    }
  }, [dummyID])

  if (loading) {
    return <>loading...</>
  }
  return (
    <div>
      <h1>Home</h1>
      <hr />
      <br />
      Dummy ID: {dummyID}
      <br />

      <br />
      <button className="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onAddDummyHandler}>AGREGAR DUMMY</button>
      <hr />
      <br />
      <label className="m-3 block text-sm font-bold mb-2">
        Dummy ID
      </label>
      <input className="m-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' onChange={e => setInputText(e.target.value)} value={inputText} />
      <br />

      <button className="m-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onDeleteDummyHandler}>Eliminar DUMMY</button>
      <hr />
      <br />
      Dummies List
      <hr />
      <div className='text-center p-5'>
      <table >
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Value</th>
        </tr>
        {
          dummies.map((dummy: any) => {
            return (
              <tr>
                <td>{dummy.id}</td>
                <td>{dummy.name}</td>
                <td>{dummy.value}</td>
              </tr>
            )
          })
        }
      </table>
      </div>
      
    </div>

  )
}
