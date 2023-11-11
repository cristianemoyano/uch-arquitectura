import React, { useState,useEffect, useContext, useMemo } from "react"
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { CartContext, Item } from "./cartContext";




export default function CartCounter() {
  const [count, setCount] = useState(0);

  const cart = useContext(CartContext);

  const Cantidad = useMemo(() => {
    return cart.cart.reduce((acc, current) => current.cant + acc, 0);
  }, [cart]);


  return (
    <div className="flex justify-center items-center">
      <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
      {Cantidad > 0 && (
         <span className="flex absolute -mt-5 ml-4">
         <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-pink-400 opacity-75"></span>
         <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 align-items-center justify-center">
            <span className="text-xs text-white-100 text-center">{Cantidad}</span>
         </span>
       </span>
      )}
    </div>
  );
};


