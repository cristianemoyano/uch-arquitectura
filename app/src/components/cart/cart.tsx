import React, { useContext, useEffect, useState, useMemo } from "react";
import { CartContext } from "./cartContext";
import CartItem from "./cartItem";
import Link from "next/link";

export default function Cart() {
//   const [total, setTotal] = useState(0);
  const cart = useContext(CartContext);

  const totalPrice = useMemo(() => {
    return cart.cart.reduce((acc, current) => current.monto + acc, 0);
  }, [cart]);
  


  function clearCart() {
    cart.clear();
  }

  return (
    <>
    <div className="bg-white p-8 rounded-md w-full text-black">
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-600 font-semibold">Carro de Compras</h2>
            <div>
          <div className="text-gray-600 font-semibold">
            <p>Total ${totalPrice}</p>
            <Link href={`/cart/checkout`}>
              <button
                disabled={totalPrice == 0}
                type="button"
                className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
		</div>
        
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
                            <tr>
							    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'scope="col">#</th>
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
									Cantidad
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Precio
								</th>
								
								<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <button
                                        className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
                                        type="submit"
                                        onClick={clearCart}
                                    >
                                        {" "}
                                        Remove all
                                    </button>
								</th>
							</tr>
						</thead>
						<tbody>
                        {cart.cart.map((item: any, index:number) => (
                            <CartItem key={index} item={item} />
                        ))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
      
        
      </div>
    </>
  );
}
