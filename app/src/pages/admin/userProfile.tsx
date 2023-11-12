import axios from 'axios'
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useProfileContext} from "@/pages/admin/profileContext";
import {UserCircleIcon} from "@heroicons/react/24/solid";

export default function UserProfile() {
    const [error, setError] = useState<any>();
    const userProfile = useProfileContext();
    const router = useRouter()

    const getProfile = async () => {
        try {
            const response = await axios.get('/api/profile')
            return response.data
        } catch (error) {
            setError(error)
            return ''
        }
    }

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout')
            userProfile.clearOnSignOut;
        } catch (error) {
            console.error(error)
        }
        router.push('/login')
    }

    useEffect(() => {
        const getData = async () => {
            const response: any = await getProfile()
            userProfile.addProfile(response);
        }
        getData();
        return () => {
            // here you can clean the effect in case the component gets unmonth before the async function ends
        }
    }, [])

    return (<div className="bg-white text-black ">
        <br/>
        <>
            <hr/>
            <br/>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-base font-semibold leading-7 text-gray-900">Perfil Usuario</h1>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Nombre
                                    Usuario</label>
                                <div className="mt-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900"
                                           placeholder="Username">{userProfile.profile && userProfile.profile.username}</label>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre completo
                                </label>
                                <div className="mt-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900"
                                           placeholder="Display Name">{userProfile.profile && userProfile.profile.displayName}</label>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Email
                                    address</label>
                                <div className="mt-2">
                                    <label
                                        placeholder="Email">{userProfile.profile && userProfile.profile.email}</label>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Phone
                                    Number</label>
                                <div className="mt-2">
                                    <label
                                        placeholder="Phone Number">{userProfile.profile && userProfile.profile.phoneNumber}</label>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo URL
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true"/>
                                    <div className="mt-2">
                                        <label
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                            placeholder="URL de la Foto"
                                        >{userProfile.profile && userProfile.profile.photoURL}</label>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="rol" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rol
                                </label>
                                <div className="mt-2">
                                    <label
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                        placeholder="Rol"
                                    >{userProfile.profile && userProfile.profile.role}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={logout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold  py-2 px-4 rounded">Logout
                </button>
            </div>
        </>


    </div>)
}
