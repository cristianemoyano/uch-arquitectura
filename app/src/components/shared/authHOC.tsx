import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";


export const checkIsLogged = async () => {
    try {
        const response = await axios.get('/api/profile')
        const data = response.data
        const isLogged = String(data?.uid).length > 0
        return { isLogged: isLogged, user: data }
    } catch (error) {
        return { isLogged: false, user: null }
    }
}

export const isAdmin = (role: string) => {
    return role === "admin"
}




const withAuth = (WrappedComponent: NextPage, adminRequired: boolean = false) => {
    const WithAuthWrapper = (props: React.JSX.IntrinsicAttributes) => {
        const router = useRouter();
        const [isForbidden, setIsForbidden] = useState(false);

        const validateAuth = async () => {
            const response = await checkIsLogged()

            if (response.isLogged === true) {
                if (adminRequired === true && !isAdmin(response.user.role)) {
                    setIsForbidden(true)
                }
                return
            }
            router.push("/login")
        }

        useEffect(() => {
            validateAuth()
            return () => { };
        }, []);

        return (
            <>
                {isForbidden ? "No tienes permiso para acceder a este sitio." : <WrappedComponent {...props} />}
            </>
        )

    }

    return WithAuthWrapper;
};

export default withAuth;