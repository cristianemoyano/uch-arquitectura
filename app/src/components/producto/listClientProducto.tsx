import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import BtnCart from '../cart/btnCart';
import ProductCount from './productoCount';

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

export default function ListClientProducto() {
    const [products, setProducts] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [productID, setProductID] = useState("Gyxs3fa0Gzy2qZUrHoxI")
  
    const [inputText, setInputText] = useState('');
    const [nameField, setNameFieldText] = useState('');
    const [descriptionField, setDescriptionFieldText] = useState('');
    const [stockField, setStockFieldText] = useState('');
    const [priceField, setPriceFieldText] = useState('');

    const[cant,setCant]= useState(null);
  
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
       
<div className="bg-white p-8 rounded-md w-full">
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-600 font-semibold">Productos</h2>
		</div>
		<div className="flex items-center justify-between">
			<div className="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd" />
				</svg>
			<input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..."/>
          </div>
				
			</div>
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Cod.
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Producto
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Descripción
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Precio
								</th>
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									{/* Espacio Añadir al carrito							 */}
								</th>
							</tr>
						</thead>
						<tbody>
						{
						products.map((product: any, index:any) => {
            				return (
							<tr key={`product-${index}`}>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div className="flex items-center">
										<div className="ml-3">
												<p className="text-gray-900 whitespace-no-wrap">
													{product.id}
												</p>
											</div>
										</div>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										{product.description}
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
									<span className="relative">{product.price}</span>
									</span>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <ProductCount
                                        stock={product.stock}
                                        initial={0}
                                        onAdd = {(valor: SetStateAction<null>) => setCant(valor)}
                                    /> 
									<BtnCart>
                                        item={product}
                                        cant={cant}
                                    </BtnCart>
								</td>
							</tr>
							)
						})}
						</tbody>
					</table>
					<div
						className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
						<div className="inline-flex mt-2 xs:mt-0">
							<button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
							&nbsp; &nbsp;
							<button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    </>
  )

}