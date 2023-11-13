import {useState, useEffect} from 'react';
import axios from 'axios';
import { useProfileContext } from './admin/profileContext';

export default function Historial() {


	

	const profile = useProfileContext();
console.log(profile);
	const [orders, setOrders] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [orderID, setOrderID] = useState("Gyxs3fa0Gzy2qZUrHoxI")
    const [orderIdToDelete, setOrderIdToDelete] = useState('');


	const getOrders = async () => {
		const userID = profile.profile.uid;
		try {
			const response = await axios.get('/api/order', {
				params: {
					userID: userID
				}
			});
			return response.data.result;
		} catch (error) {
			console.error("Error al obtener órdenes:", error);
			return [];
		}
	}


	useEffect(() => {
        const getData = async () => {
            const data: any = await getOrders()
            setOrders(data)
            setLoading(false)
        }
        getData();
        return () => {
            // here you can clean the effect in case the component gets unmonth before the async function ends
        }
    }, [profile.profile.uid])

    if (loading) {
        return <>loading...</>
    }


    return (
       <>
       
       
       
       
       <div className="bg-white p-8 rounded-md w-full " >
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-600 font-semibold">Historial de ordenes</h2>
		</div>
		<div className="flex items-center justify-between">
			<div className="flex bg-gray-50 items-center p-2 rounded-md">
				
			
          </div>
				<div className="lg:ml-40 ml-10 space-x-8">
					
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
									ID-Pedido
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Fecha
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Total
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Detalle
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Status
								</th>
							</tr>




							{orders.filter((product: any)=>product.userID===profile.profile.uid).map((product: any) => {
  const orderKey = product.id;
  return (
    <tr key={orderKey} className="border-b-2 border-gray-200">
      <th><label className="m-3 block text-sm font-bold mb-2 text-black">{product.id}</label></th>
      <th><label className="m-3 block text-sm font-bold mb-2 text-black">{product.date}</label></th>
      <th><label className="m-3 block text-sm font-bold mb-2 text-black">${product.totalAmount}</label></th>
      <th>
        <label className="m-3 block text-sm font-bold mb-2 text-black">
          {Array.isArray(product.items) ? (
            product.items.map((p: any, idx: number) => (
              <div key={`${orderKey}-${idx}`}>
                <p>{p.name}</p>
                <p>ID: {p.id}</p>
                <p>Cantidad: {p.cant} unidad/es</p>
                <p>Precio total: ${p.monto}</p>
                <p>----------------------------------------------</p>
              </div>
            ))
          ) : (
            <p>No hay información de artículos</p>
          )}
        </label>
      </th>
      <th>
        <label className="flex-no-shrink bg-green-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-500 text-white rounded-full">
          Entregado
        </label>
      </th>
    </tr>
  );
})}

						</thead>
						<tbody>
						
						</tbody>
					</table>
					
				</div>
			</div>
		</div>
	</div>
   
       
       
       
       
       </>
    )
  }