import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import InputForm from '../shared/InputForm';
import { addProduct, editProduct, deleteProduct, getProducts } from './productFunctions';

interface FormType {
    id: string,
    code: number,
    name: string,
    description: string,
    stock: number,
    price: number
}

const formInputs = [
    {
        label: 'Id',
        placeholder: 'Id',
        name: 'id',
        type: 'hidden'
    },
    {
        label: 'Code',
        placeholder: 'Code',
        name: 'code',
        type: 'number'
    },
    {
        label: 'Name',
        placeholder: 'Name',
        name: 'name',
        type: 'text'
    },
    {
        label: 'Description',
        placeholder: 'Description',
        name: 'description',
        type: 'text'
    },
    {
        label: 'Stock',
        placeholder: 'Stock',
        name: 'stock',
        type: 'number'
    },
    {
        label: 'Price',
        placeholder: 'Price',
        name: 'price',
        type: 'number'
    }
]

export default function FormProducto() {
    const [products, setProducts] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [productID, setProductID] = useState("Gyxs3fa0Gzy2qZUrHoxI")

    const [formData, setFormData] = useState<FormType>({
        id: '',
        code: 0,
        name: '',
        description: '',
        stock: 0,
        price: 0,
    })

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const data = await addProduct(formData);
        setProductID(`${data.id}`)
        formData.id = data.id;
    }

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [evt.target.name]: evt.target.value
        }))
    }

    const onDeleteProductHandler = async (event: any) => {
        event.preventDefault();

        if (formData.id != ''){
            const res = await deleteProduct(formData.id);
            setProductID(formData.id)
        }
    }

    useEffect(() => {
        const getData = async () => {
            const data: any = await getProducts()
            setProducts(data)
            setLoading(false)
        }
        getData();
        return () => {
            // here you can clean the effect in case the component gets unmonth before the async function ends
        }
    }, [productID])

    if (loading) {
        return <>loading...</>
    }
    return (
        <>

            <section className="h-screen bg-gray-100/95 ">
                <form className="container max-w-2xl mx-auto shadow-md md:w-3/4" onSubmit={handleSubmit}>
                    {
                        formInputs.map((input) => (
                            <InputForm key={input.name} label={input.label} placeholder={input.placeholder} name={input.name} onChange={handleChange} type={input.type} />
                        ))

                    }
                    <div className="items-right w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">

                        <div className='max-w-sm mx-auto space-y-5 md:w-1/3'>
                            <div className=' px-4 pb-4 ml-auto'>
                                {/* Aca se tiene que mostrar uno u otro */}
                                <button type="submit" className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " >
                                    Guardar
                                </button>
                                <button type="submit" className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={onDeleteProductHandler}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        <div className='max-w-sm mx-auto md:w-1/3'>
                            <div className='relative'>

                                <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Volver
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>

        </>
    )
}