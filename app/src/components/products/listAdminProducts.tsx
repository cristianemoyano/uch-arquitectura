import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { addProduct, deleteProduct, getProducts } from './productsFunctions';
import { editProduct } from '../../services/products';
import { send } from 'process';
import { Product } from '@/types/products.types';
import useForm from '@/hooks/useForm';


export default function ListAdminProducto() {
	const [products, setProducts] = useState<any>({});
	const [loading, setLoading] = useState(true);
	const [productId, setProductId] = useState("Gyxs3fa0Gzy2qZUrHoxI");
	const [currentProductEditId, setCurrentProductEditId] = useState<string | null>(null)
	const router = useRouter();

	const productsData = {
		code: 0,
		name: "",
		description: "",
		stock: 0,
		price: 0
	}

	const { formData, updateFormData, resetForm } = useForm(productsData);

	function createData() {
		router.push("/admin/productForm");
	}

	function sendData(sendProductId: any) {
		router.push({
			pathname: "/admin/productForm",
			query: { sendProductId }
		});
	}

	function eraseData(productId: any) {
		deleteProduct(productId);
		setProductId(productId);
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			const getData = async () => {
				const data: any = await getProducts()
				setProducts(data)
				setLoading(false)
			}
			getData();
		},1000)

		return () => clearTimeout(timeout)
	}, [productId, currentProductEditId])

	// const updateProduct = async(product: Product) => {
	// 	try {
	// 		const response = await editProduct(product.id, formData);
	// 		console.log("Hola");
	// 		console.log(response);
	// 		setCurrentProductEditId(null);
	// 	} catch(err) {
	// 		console.error(err);
	// 	}
	// }

	/* Función maldita
	const updateProduct = async() => {
		try{
			const productsData = {
				code: 0,
				name: "hijoputa",
				description: "",
				stock: 2323,
				price: 0
			}
			
			const responce = await editProduct("uez2jEkmQLWd522BmD10", productsData);
			console.log('holla');
			console.log(responce);
			setCurrentProductEditId(null);
		}
		catch(err){
			console.log(err)
		}
	}

	useEffect(() => {
		updateProduct();
	},[])

	*/
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
						<div className="lg:ml-40 ml-10 space-x-8">
							<button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={createData}>Create</button>
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
											Unidades
										</th>
										<th
											className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Precio
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											{/* Espacio Editar								 */}
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											{/* Espacio Delete								 */}
										</th>
									</tr>
								</thead>
								<tbody>
									{
										products.map((product: Product, index: number) => {
											const isCurrentProductEdit = currentProductEditId === product.id
											function key(value: string, index: number, array: string[]): unknown {
												throw new Error('Function not implemented.');
											}

											return (
												<tr key={`product-${index}`}>
													{
														isCurrentProductEdit ?
															<>
																{
																	Object.keys(product).map((key) => {

																		if (key !== 'id') {
																			return (
																				<td  key={key} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
																					<input className='border p-3 rounded-lg text-black' type="text" placeholder={String(product[key as keyof Product])} name={key} onChange={e => updateFormData(e.target.name, e.target.value)} />
																				</td>
																			);
																		}

																		return null;
																	})
																}
																<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
																	<button className="flex-no-shrink bg-green-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-500 text-white rounded-full" onClick={() => (addProduct(formData), deleteProduct(product.id), setCurrentProductEditId(null))}>Aceptar</button>
																</td>
																<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
																	<button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full" onClick={() => (resetForm(), setCurrentProductEditId(null))}>Cancelar</button>
																</td> 
															</>
															:
															<>
																<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
																	<p className="text-gray-900 whitespace-no-wrap">{product.code}</p>
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
																	<p className="text-gray-900 whitespace-no-wrap">
																		{product.stock}
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
																	<button className="flex-no-shrink bg-green-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-500 text-white rounded-full" onClick={() => (setCurrentProductEditId(product.id))}>Editar</button>
																</td>
																<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
																	<button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full" onClick={() => eraseData(product.id)}>Eliminar</button>
																</td>
															</>
													}
												</tr>
											)
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}