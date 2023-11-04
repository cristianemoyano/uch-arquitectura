import axios from 'axios'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Profile = {
  uid: string,
  username: string,
  displayName: string,
  email: string,
  emailVerified: string,
  phoneNumber: string,
  photoURL: string,
}

export default function Admin() {

  const [profile, setProfile] = useState<Profile>({
    uid: "",
    username: "",
    displayName: "",
    email: "",
    emailVerified: "",
    phoneNumber: "",
    photoURL: ""
  })
  const [error, setError] = useState<any>()

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
    } catch (error) {
      console.error(error)
    }
    router.push('/login')
  }

  useEffect(() => {
    const getData = async () => {
      const response: any = await getProfile()
      setProfile(response)
    }
    getData();
    return () => {
      // here you can clean the effect in case the component gets unmonth before the async function ends
    }
  }, [])

  return (
    <div className="bg-white text-black ">
      <br />
      <br />
      <br />
      <h1>Admin Dashboard</h1>
      <h1>Hola, que tal {error != undefined ? error.response?.statusText : `${profile?.username} <${profile?.email}> - ${profile?.uid}`}!</h1>
      <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
    </div>
  )
}
