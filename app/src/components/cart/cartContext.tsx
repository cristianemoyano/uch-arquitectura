import React,{useContext, useEffect, useState} from 'react'
import { CreateTracingOptions } from 'trace_events';


interface CartType{
    cart : Item[],
    add:(item:Item,qty:number) => void,
    remove:(id:string)=>void,
    clear:() => void
}

export interface Item{
    id : string,
    name : string,
    cant : number,
    monto: number
}


export const CartContext = React.createContext<CartType>({
    cart : [],
    add : () => {},
    remove: () => {},
    clear : () => {},
})

export const useCartcontext = () => useContext(CartContext);



const CartProvider = ({children,defaultCart}:any) => {
    const [cart,setCart] = useState (defaultCart);
    const [montoTotal, setTotal] = useState(0)


    function add(item:any,qty:any){

        const result = cart.filter((cart: { id: any; }) => cart.id == item.id);
        console.log(result)
       
        if(result.length != 0){
            console.log('paso por el if')

            const productosFiltrados = cart.filter(
                (cart: { id: any; }) => cart.id !== item.id
              );
           
            const nuevaCantidad = (parseFloat(result[0].cant) + parseFloat(qty));
            const nuevoMonto= item.price*nuevaCantidad;
            
            const itemModificado = {
                id: item.id,
                name:item.name,
                price:item.price,
                monto: nuevoMonto,
                cant: nuevaCantidad
            };
            
            const nuevoItemModificado = [...productosFiltrados,itemModificado];
            setCart(nuevoItemModificado);
        }else{
            const monto = item.price* qty;
            const newItem = {
                id: item.id,
                name:item.name,
                price:item.price,
                monto: monto,
                cant: qty
            };
            
            const nuevoItemAgregado = [...cart,newItem];
            setCart(nuevoItemAgregado);

        }
        alert(`Añadiste ${qty} elementos del producto ${item.id}`);
        
        console.log(cart);
    }
    

    function remove(id:any){

        const productosFiltrados = cart.filter(
            (Cart: { id: any; }) => cart.id !== id
          );
        setCart(productosFiltrados);

    }
    function clear(){
      setCart([]);
    }

    return <CartContext.Provider value = {{cart,add,remove,clear}}>
        {children}
    </CartContext.Provider>
}

export default CartProvider;