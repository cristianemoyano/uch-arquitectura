import { useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link'

import axios from 'axios'


export default function SignUpPage() {

    const [credentials, setCredentials] = useState<any>({
        email: '',
        password: '',
        username: '',
        displayName : '',
        phoneNumber: '',
        photoURL: '',
        })

    const router = useRouter()

    const handleChange = (evt: any) => {
        setCredentials({
            ...credentials,
            [evt.target.name]: evt.target.value
        })
    }

    const handleSubmit = async (evt: any) => {
        evt.preventDefault();
        try {
            await axios.post('/api/auth/signup', {
                ...credentials,
                role: "client"
            })
            router.push('/login')
        } catch (error: any) {
            console.error(error)
            alert(error.response.statusText)
        }
    }


    return (
        <div className='bg-white'>

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registro</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Nombre de usuario</label>
                            <div className="mt-2">
                                <input onChange={handleChange} id="username" name="username" type="username" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium leading-6 text-gray-900">Nombre completo</label>
                            <div className="mt-2">
                                <input onChange={handleChange} id="displayName" name="displayName" type="displayName" autoComplete="displayName" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                            <div className="mt-2">
                                <input onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={handleChange} id="phoneNumber" name="phoneNumber" type="text"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="photoURL" className="block text-sm font-medium leading-6 text-gray-900">Photo URL</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={handleChange} id="photoURL" name="photoURL" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrarme</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Ya tienes cuenta?  <Link className="font-semibold text-indigo-600 hover:text-indigo-500" href="/login">Inicia Sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
