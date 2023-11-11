import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import InputForm from '../shared/InputForm';
import { addProduct, editProduct, deleteProduct, getProducts } from './productsFunctions';
import useForm from '@/hooks/useForm';

interface FormType {
    code: number,
    name: string,
    description: string,
    stock: number,
    price: number
}

const formInputs = [
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
    const [products, setProducts] = useState<any>({});
    const [loading, setLoading] = useState(true);
    let [productId, setProductId] = useState("Gyxs3fa0Gzy2qZUrHoxI");
    const router = useRouter();
    const [stopLoop, setStopLoop] = useState(false);

    let submitState = 0;

    const getProductId = router.query;

    const productsData = {
        code: 0,
        name: "",
        description: "",
        stock: 0,
        price: 0
    }
    
    const { formData, updateFormData } = useForm(productsData);

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        switch (submitState) {
            case 0:
                addProduct(formData);
                router.push("/admin/productsList");
                break;
            case 1:
                deleteProduct(String(getProductId.sendProductId));
                setProductId(String(getProductId.sendProductId));
                router.push("/admin/productsList");
                break;
            case 2:
                router.push("/admin/productsList");
                break;
        }
    }

    return (
        <>
            <section className="h-screen bg-gray-100/95 ">
                <form className="container max-w-2xl mx-auto shadow-md md:w-3/4" onSubmit={handleSubmit}>
                    {
                        formInputs.map((input) => (
                            <InputForm key={input.name} label={input.label} placeholder={input.placeholder} name={input.name} onChange={e => updateFormData(e.target.name, e.target.value)} type={input.type} />
                        ))

                    }
                    <div className="items-right w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <div className='max-w-sm mx-auto space-y-5 md:w-1/3'>
                            <div className=' px-4 pb-4 ml-auto'>
                                <button type="submit" className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={() => submitState = 0}>
                                    Guardar
                                </button>
                            </div>
                        </div>
                        <div className='max-w-sm mx-auto md:w-1/3'>
                            <div className='relative'>
                                <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={() => submitState = 2}>
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