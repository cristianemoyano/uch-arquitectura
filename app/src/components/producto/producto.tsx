import { useState, useEffect } from 'react';
import axios from 'axios';


const addProduct = async (data: any) => {
  const response = await axios.post("/api/products/", data);
  return response.data;
}

const deleteProduct = async (id: string) => {
  const response = await axios.delete(`/api/products/${id}`);
  return response.data.result;
}

const getProducts = async () => {
  const response = await axios.get("/api/products/");
  return response.data.result;
}


export default function Producto() {
    const [products, setProducts] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [productID, setProductID] = useState("Gyxs3fa0Gzy2qZUrHoxI")
  
    const [inputText, setInputText] = useState('');
    const [nameField, setNameFieldText] = useState('');
    const [descriptionField, setDescriptionFieldText] = useState('');
    const [stockField, setStockFieldText] = useState('');
    const [priceField, setPriceFieldText] = useState('');
  
    const onAddProductHandler = async () => {
      const productData = {
        name: nameField,
        description: descriptionField,
        stock: stockField,
        price: priceField,
      }
      const data = await addProduct(productData);
  
      console.log("Documento creado: ", data.id)
      setProductID(`${data.id}`)
    }
  
    const onDeleteProductHandler = async () => {
      const res = await deleteProduct(inputText);
      setProductID(inputText)
    }
  
    useEffect(() => {
      const getData = async () => {
        const data: any = await getProducts()
        setProducts(data)
        setLoading(false)
      }
      getData();
      return () => {
        // here you can clean the effect in case the component gets unmonth before the async function ends
      }
    }, [productID])
  
    if (loading) {
      return <>loading...</>
    }
    return (
    <>
        <hr />
      <br />
      Product ID: {productID}
      <br />
      <label className="m-3 block text-sm font-bold mb-2">
        Nombre
      </label>
      <input className="m-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' onChange={e => setNameFieldText(e.target.value)} value={nameField} />
      <br />
      <label className="m-3 block text-sm font-bold mb-2">
        Descripción
      </label>
      <input className="m-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' onChange={e => setDescriptionFieldText(e.target.value)} value={descriptionField} />
      <br />
      <label className="m-3 block text-sm font-bold mb-2">
        Stock
      </label>
      <input className="m-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' onChange={e => setStockFieldText(e.target.value)} value={stockField} />
      <br />
      <label className="m-3 block text-sm font-bold mb-2">
        Precio
      </label>
      <input className="m-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' onChange={e => setPriceFieldText(e.target.value)} value={priceField} />
      <br />
      <button className="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onAddProductHandler}>Agregar producto</button>
      <hr />
      <br />
      <label className="m-3 block text-sm font-bold mb-2">
        PRODUCT ID
      </label>
      <input className="m-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type='text' onChange={e => setInputText(e.target.value)} value={inputText} />
      <br />

      <button className="m-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onDeleteProductHandler}>Eliminar producto</button>
      <hr />
      <br />
      Products List
      <hr />
      <div className='text-center p-5'>
      <table >
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>DESCRIPTION</th>
          <th>STOCK</th>
          <th>PRICE</th>
        </tr>
        {
          products.map((product: any, index:any) => {
            return (
              <tr key={`product-${index}`}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
              </tr>
            )
          })
        }
      </table>
      </div>
      <hr /> 
    </>
  )

}