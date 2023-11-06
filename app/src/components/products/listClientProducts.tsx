import { useState, useEffect, SetStateAction } from 'react';
import BtnCart from '../cart/btnCart';
import ProductCount from './productoCount';
import { useRouter } from 'next/router';
import { getProducts } from './productsFunctions';


export default function ListClientProducto() {
	const [products, setProducts] = useState<any>({});
	const [loading, setLoading] = useState(true);
	const[cant,setCant]= useState(null);
	const [productId, setProductId] = useState("Gyxs3fa0Gzy2qZUrHoxI");
	const router = useRouter();

	useEffect(() => {
		const getData = async () => {
			const data: any = await getProducts()
			setProducts(data)
			setLoading(false)
		}
		getData();
		return () => { }
	}, [productId])

	if (loading) {
		return <>loading...</>
	}
	return (
		<>
			<div className="bg-white p-8 rounded-md w-full">
				<div className=" flex items-center justify-between pb-6">
					<div>
						<h2 className="text-gray-600 font-semibold">Catalogo</h2>
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
										<th
											className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Acción
										</th>
									</tr>
								</thead>
								<tbody>
									{
										products.map((product: any, index: any) => {
											return (
												<tr key={`product-${index}`}>
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
														<ProductCount
															stock={product.stock}
															initial={0}
															onAdd={(valor: SetStateAction<null>) => setCant(valor)}
														/>
														<BtnCart
															item={product}
															cant={cant}
														/>
													</td>
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