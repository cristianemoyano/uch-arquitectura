import React,{useEffect, useState} from 'react';




export default function ProductCount ({stock,initial,onAdd}:any){
   
    const [counter,setcouter] =useState(initial);
   
 
    useEffect (()=>{
        onAdd(counter)
    },[counter])

    function add(){
        if(counter<stock){    
            setcouter(counter+1);    
        }
    }

   
    function remove(){
        if(counter>initial){
            setcouter(counter-1);
        }    
    }

    
    return <>
        <div className="container p-0 ">
            <div className="row justify-content-center">
                <button className=" flex-no-shrink ml-4 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 text-white rounded-full" onClick={remove} >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"/></svg>  
                </button>
                
                <span className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" >{counter}</span>
            
                <button className=" flex-no-shrink ml-4 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 text-white rounded-full" onClick={add} >
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
                </button>
            </div>

        </div>

    </>

}

