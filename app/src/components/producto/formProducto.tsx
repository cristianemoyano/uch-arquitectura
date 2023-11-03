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

export default function FormProducto() {
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
      
    <section className="h-screen bg-gray-100/95 ">
        <form className="container max-w-2xl mx-auto shadow-md md:w-3/4">
            <div className="p-4 border-t-2 border-indigo-400 rounded-lg bg-gray-100/5 ">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
                <h1 className="text-gray-600">
                    Producto
                </h1>
            </div>
            </div>
            </div>
            <div className="space-y-6 bg-white">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">
                Código de Producto
            </h2>
            <div className="max-w-sm mx-auto md:w-2/3">
                <div className=" relative ">
                    <input type="text" id="Cod" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Cod"/>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <div className='max-w-sm mx-auto md:w-1/3'>
                <div className=" relative ">
                    <h2 className="w-full py-4  flex-1">
                        Nombre
                    </h2>
                </div>
                <div className=" relative ">
                    <h2 className="w-full py-4   flex-1">
                        Descripción
                    </h2>
                </div>

            </div>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
            <div>
                <div className=" relative ">
                    <input type="text" id="user-info-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Nombre"/>
                    </div>
                </div>
                <div>
                    <div className=" relative ">
                        <input type="text" id="user-info-phone" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Descripción"/>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <div className='max-w-sm mx-auto md:w-1/3'>
                <div className=" relative ">
                    <h2 className="w-full py-4  flex-1">
                        Cantidad disponible
                    </h2>
                </div>
                <div className=" relative ">
                    <h2 className="w-full py-4   flex-1">
                        Precio
                    </h2>
                </div>

            </div>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
            <div>
                <div className=" relative ">
                    <input type="text" id="user-info-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Cantidad disponible"/>
                    </div>
                </div>
                <div>
                    <div className=" relative ">
                        <input type="text" id="user-info-phone" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Precio"/>
                        </div>
                    </div>
                </div>
            </div>

                <hr/>
                <div className="items-right w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                   
                    <div className='max-w-sm mx-auto space-y-5 md:w-1/3'>
                        <div className=' px-4 pb-4 ml-auto'>
                             {/* Aca se tiene que mostrar uno u otro */}
                            <button type="submit" className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Guardar
                            </button>
                            <button type="submit" className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Eliminar
                            </button>
                        </div>
                    </div>  
                    <div className='max-w-sm mx-auto md:w-1/3'> 
                        <div className='relative'>

                            <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Volver
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>

    </>
  )

}