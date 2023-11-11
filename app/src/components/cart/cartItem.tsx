import React, {useContext}from 'react'
import { CartContext } from './cartContext'



export default function CartItem({item}:any){
    const cart = useContext(CartContext);

    function removeElement(){
        //console.log(item.id) Pasa Ok
        cart.remove(item.id);
    }
    return <>
         <tr>
           <th scope="row">1</th>
            <td>{item.code}</td>
            <td>{item.name}</td>
            <td>{item.cant}</td>
            <td>${item.monto}</td>
            <td> 
                <button className="flex-no-shrink bg-red-500 px-3 m-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full" type="submit" onClick={removeElement}> Remove </button>
            </td>
        </tr>
    </>
}
