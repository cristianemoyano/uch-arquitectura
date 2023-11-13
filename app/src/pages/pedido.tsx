import { CartContext } from "@/components/cart/cartContext";
import CartItem from "@/components/cart/cartItem";
import React, { FormEvent, useContext, useMemo} from "react";
import {useState, useEffect} from 'react';
import axios, { formToJSON } from 'axios';
import { ProfileContext } from "./admin/profileContext";


const addOrder = async (data: any) => {
    const response = await axios.post("/api/order/", data);
    return response.data;
}

export default function Pedido(this: any) {
  
  const cart = useContext(CartContext);

  const profile = useContext(ProfileContext);

  const totalPrice = useMemo(() => {
    return cart.cart.reduce((acc, current) => current.monto + acc, 0);
  }, [cart]);
  
  

  
  const [orders, setOrders] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [orderID, setOrderID] = useState("Gyxs3fa0Gzy2qZUrHoxI")
  const [orderIdToDelete, setOrderIdToDelete] = useState('');
  const [address, setAdress] = useState("");
  
  const onAddOrderHandler = async () => {

    const submitContact = async (event: { preventDefault: () => void; target: { name: { value: any; }; }; }) => {
      event.preventDefault();
    };
    
    const direccion = document.getElementById("direccion") as HTMLInputElement;
  const cardNumber = document.getElementById("cardNumber") as HTMLInputElement;
  const mesVen = document.getElementById("mesVen") as HTMLSelectElement;
  const anoVen = document.getElementById("anoVen") as HTMLSelectElement;
  const codSeg = document.getElementById("codSeg") as HTMLInputElement;
  const cardName = document.getElementById("cardName") as HTMLInputElement;
        
  const userID = profile.profile.uid;

  const items = cart.cart.map((item: any, index: number) => ({
    id: item.id,
    name: item.name,
    cant: item.cant,
    monto: item.monto
})); 

    const orderData = {
        "date": new Date(Date.now()).toUTCString(),
        "userID": userID,
        "direccion": direccion.value,
        "cardNumber": cardNumber.value,
        "mesVen": mesVen.value,
        "anoVen": anoVen.value,
        "codSeg": codSeg.value,
        "cardName": cardName.value,
        "items": items,
        "totalAmount": totalPrice
    }

    

    

    const data = await addOrder(orderData);

    console.log("Documento creado: ", data.id)
    setOrderID(`${data.id}`)

    window.location.href = '/historial';
    
}



  

  return (
     <>
     
     

     


     <div className="relative mx-auto w-full ">
  <div className="grid min-h-screen grid-cols-10">
    <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="relative text-2xl font-medium text-white sm:text-3xl">Checkout<span className="mt-2 block h-1 w-10 bg-indigo-600 sm:w-20"></span></h1>
        
        <form   action="" className="mt-10 flex flex-col space-y-4">
        <div><label htmlFor="direccion" className="text-xs font-semibold text-gray-500">Direccion de envio</label><input   type="direccion" id="direccion" name="direccion" placeholder="Calle falsa 123" className="mt-1 block w-full rounded border-gray-300 bg-black py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500" /></div>
          <div className="relative"><label htmlFor="cardNumber" className="text-xs font-semibold text-gray-500">Numero de tarjeta</label><input  type="text" id="cardNumber" name="cardNumber" placeholder="1234-5678-XXXX-XXXX" className="block w-full rounded border-gray-300 bg-black py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500" /></div>
          <div>
            <p className="text-xs font-semibold text-gray-500">Fecha de vencimiento</p>
            <div className="mr-6 flex flex-wrap">
              <div className="my-1">
                <label htmlFor="mesVen" className="sr-only">Mes de vencimiento</label
                ><select   name="mesVen" id="mesVen" className="cursor-pointer rounded border-gray-300 bg-black py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500">
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="my-1 ml-3 mr-6">
                <label htmlFor="anoVen" className="sr-only">Año de vencimiento</label
                ><select   name="anoVen" id="anoVen" className="cursor-pointer rounded border-gray-300 bg-black py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500">
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                </select>
              </div>
              <div className="relative my-1"><label htmlFor="codSeg" className="sr-only">Codigo de seguridad</label><input   type="text" id="codSeg" name="codSeg" placeholder="Codigo de seguridad" className="block w-360 rounded bg-black border-gray-300 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500" /></div>
            </div>
          </div>
          <div><label htmlFor="cardName" className="text-xs font-semibold text-gray-500">Nombre en la tarjeta</label><input   type="text" id="cardName" name="cardName" placeholder="Juan Perez" className="mt-1 block w-full rounded border-gray-300 bg-black py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500" /></div>
        </form>
        
        <button type="submit" onClick={onAddOrderHandler} className="mt-4 inline-flex w-full items-center justify-center rounded hover:bg-indigo-500 bg-indigo-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-indigo-500 sm:text-lg">Confirmar pedido</button>
      </div>
    </div>
    <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
      <h2 className="sr-only">Order summary</h2>
      <div>
        
        <div className="absolute inset-0 h-full w-full z-[-1] bg-gradient-to-t from-indigo-800 to-indigo-400 opacity-95"></div>
      </div>
      <div className="relative">
        <ul className="space-y-5">
          
          {cart.cart.map((item: any, index:number) => (
              <CartItem key={index} item={item} />
          ))}


          
        </ul>
        <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
        <div className="space-y-2">
          <p className="flex justify-between text-lg font-bold text-white"><span>Total:</span><span>${totalPrice}</span></p>
          
        </div>
      </div>
      <div className="relative mt-10 text-white">
        <h3 className="mb-5 text-lg font-bold">Support</h3>
        <p className="text-sm font-semibold">+01 234 567 890 </p>
        <p className="mt-1 text-sm font-semibold">support@gmail.com </p>
        
      </div>
      
    </div>
  </div>
</div>







     </>
     
  )
}