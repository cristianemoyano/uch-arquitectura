import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'
import InputForm from '../shared/InputForm';
import { addProduct, editProduct, deleteProduct, getProducts } from './productsFunctions';
import { getProduct } from '@/services/products';

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

    let submitState = 0;

    const [formData, setFormData] = useState<FormType>({
        code: 0,
        name: '',
        description: '',
        stock: 0,
        price: 0,
    })

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        switch (submitState) {
            case 0:
                addProduct(formData);
                router.push("/admin/productsList");
                break;
            case 1:
                deleteProduct(productId);
                setProductId(productId);
                router.push("/admin/productsList");
                break;
            case 2:
                router.push("/admin/productsList");
                break;
        }
    }

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [evt.target.name]: evt.target.value
        }))
    }

    useEffect(() => {
        const getProductData = async () => {
            if (router.isReady && router.query != undefined) {
                const getProductId = router.query;
                console.log("productId: ");
                console.log(getProductId);
                const getProductData: any = await getProduct(String(getProductId));
                console.log("productData: ");
                console.log(getProductData);
            }
        }

        const getData = async () => {
            const data: any = await getProducts();
            setProducts(data);
            setLoading(false);
        }
        getData();
        getProductData();
        return () => {}
    }, []);

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
                                <button type="submit" className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={() => submitState = 0}>
                                    Guardar
                                </button>
                                <button type="submit" className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={() => submitState = 1}>
                                    Eliminar
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