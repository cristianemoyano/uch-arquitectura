import {useState, useEffect} from 'react';
import axios from 'axios';

const addOrder = async (data: any) => {
    const response = await axios.post("/api/order/", data);
    return response.data;
}

const deleteOrder = async (id: string) => {
    const response = await axios.delete(`/api/order/${id}`);
    return response.data.result;
}

const getOrders = async () => {
    const response = await axios.get("/api/order/");
    return response.data.result;
}
export default function OrdersBackendTest() {
    const [orders, setOrders] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [orderID, setOrderID] = useState("Gyxs3fa0Gzy2qZUrHoxI")
    const [orderIdToDelete, setOrderIdToDelete] = useState('');
    const [address, setAdress] = useState("");

    const onAddOrderHandler = async () => {

        
        const orderData = {
            "date": new Date(Date.now()).toUTCString(),
            "userData": {
                "userName": "Ani",
                "phone": 23333333,
                "email": "user@user.com",
                "address": "Colon 422, Mendoza"
            },
            "items": [
                {
                    "productData": {
                        "codigo": "FNOX8w7jA88ZNayfMhOY",
                        "name": "productName",
                        "description": "product description",
                        "quantity": 2,
                        "price": 1500
                    }
                },
                {
                    "productData": {
                        "codigo": "FNOX8w7jA88ZNayfMhOY",
                        "name": "productName",
                        "description": "product description",
                        "quantity": 1,
                        "price": 1500
                    }
                }
            ],
            "totalAmount": 10000
        }
        const data = await addOrder(orderData);

        console.log("Documento creado: ", data.id)
        setOrderID(`${data.id}`)

        
    }

    const onDeleteOrderHandler = async () => {
        const res = await deleteOrder(orderIdToDelete);
        setOrderID(orderIdToDelete)
        
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
    }, [orderID])

    if (loading) {
        return <>loading...</>
    }
    return (
        <>
            <hr/>
            <label className="m-3 block text-sm font-bold mb-2">
                Generar una orden
            </label>
            <button className="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                    onClick={onAddOrderHandler}>Checkout 
            </button>
            <hr/>
            <br/>
            <label className="m-3 block text-sm font-bold mb-2">
                ORDER ID
            </label>

            <input
                className="m-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type='text' onChange={e => setOrderIdToDelete(e.target.value)} value={orderIdToDelete}/>
            <br/>
            <button className="m-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onDeleteOrderHandler}>Eliminar orden
            </button>
            <hr/>
            <div className="bg-gray-700 p-8 rounded-md w-full">
                <label className="m-3 block text-sm font-bold mb-2">
                    Lista de ordenes
                </label>
                <hr/>
            {orders.map((product: any, index: any) => {
                return (
                    <>
                        <label className="m-3 block text-sm font-bold mb-2">
                            Order ID
                        </label>
                        <label className="m-3 block text-sm font-bold mb-2" key={`order-${index}`}>
                            {product.id}
                        </label>
                        <label className="m-3 block text-sm font-bold mb-2">
                            Date
                        </label>
                        <label className="m-3 block text-sm font-bold mb-2" key={`order-${index}`}>
                            {product.date}
                        </label>
                        <label className="m-3 block text-sm font-bold mb-2">
                            Nombre usuario
                        </label>

                        {/* <label className="m-3 block text-sm font-bold mb-2" key={`order-${index}`}>
                            {product.userData.userName}
                        </label> */}
                        <label className="m-3 block text-sm font-bold mb-2">
                            Phone
                        </label>
                        {/* <label className="m-3 block text-sm font-bold mb-2" key={`order-${index}`}>
                            {product.userData.phone}
                        </label> */}
                        <label className="m-3 block text-sm font-bold mb-2">
                            Adress
                        </label>
                        <label className="m-3 block text-sm font-bold mb-2" key={`order-${index}`}>
                            {product.totalAmount}
                        </label>
                        <label className="m-3 block text-sm font-bold mb-2" key={`order-${index}`}>
                            {product.items.name}
                        </label>
                        <hr/>
                    </>
                )
            })
            }

            </div>
        </>
    )

}