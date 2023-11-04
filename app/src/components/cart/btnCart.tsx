import React,{useContext, useState} from 'react'
import { CartContext } from './cartContext'
import Link from 'next/link'



function BtnCart ({item,cant}:any){
    const [text,setText]=useState(null);

    const cart = useContext(CartContext);
   

    function addToCart(){
       cart.add(item,cant)       
    }
    

  
    return <>   
            <button  onClick={addToCart} className="flex-no-shrink bg-green-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-500 text-white rounded-full">
                    <p className="m-1">Añadir</p>
            </button>
            {text}
    </>
}

export default BtnCart