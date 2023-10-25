import { useState, useEffect } from 'react';
import axios from 'axios';

const addDummy = async (data: any) => {
  const response = await axios.post("/api/dummy/", data);
  return response.data.result;
}

const deleteDummy = async (id: string) => {
  const response = await axios.delete(`/api/dummy/${id}`);
  return response.data.result;
}

const getDummies = async () => {
  const response = await axios.get("/api/dummy/");
  return response.data.result;
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
    const data = await addDummy(dummyData);
    console.log("Documento creado: ", data.id)
    setDummyID(`${data.id}`)
  }

  const onDeleteDummyHandler = async () => {
    const res = await deleteDummy(inputText);
    setDummyID(inputText)
  }

  useEffect(() => {
    const getData = async () => {
      const data: any = await getDummies()
      setDummies(data)
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
  debugger
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
          dummies.map((dummy: any, index:any) => {
            return (
              <tr key={`dummy-${index}`}>
                <td>{dummy.id}</td>
                <td>{dummy.name}</td>
                <td>{dummy.value}</td>
              </tr>
            )
          })
        }
      </table>
      </div>
      <hr />

    </div>

  )
}
