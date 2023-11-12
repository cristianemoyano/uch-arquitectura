
import { checkIsLogged } from '@/components/shared/authHOC';
import React, {useContext, useEffect, useState} from 'react'

interface ProfileType {
    profile: Item,
    addProfile: (item: any) => void,
    clearOnSignOut: () => void
}

export interface Item {
    username: string,
    displayName: '',
    email: string,
    phoneNumber: String,
    photoURL: string,
    role : string
}


export const ProfileContext = React.createContext<ProfileType>({
    profile: {
        username: '',
        displayName: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
        role: ''
    },
    addProfile: (item: Item) => {
    },
    clearOnSignOut: () => {
    },
})

export const useProfileContext = () => useContext(ProfileContext);


const ProfileProvider = ({children, defaultProfile: defaultProfile}: any) => {
    const [profile, setProfile] = useState(defaultProfile);

    const validateAuth = async () => {
        const response = await checkIsLogged()
        if (response.isLogged === true) {
            setProfile(response.user)
        } else {
            clearOnSignOut()
        }
    }

    useEffect(() => {
        validateAuth()
        return () => {};
    }, []);

    function addProfile(item: any) {
        const newProfile = {
            username: item.username,
            displayName: item.displayName,
            email: item.email,
            phoneNumber: item.phoneNumber,
            photoURL: item.photoURL,
            role : item.role
        };
        setProfile(newProfile);

        console.log(profile);
    }

    function clearOnSignOut() {
        setProfile({});
    }

    return <ProfileContext.Provider value={{profile, addProfile, clearOnSignOut}}>
        {children}
    </ProfileContext.Provider>
}

export default ProfileProvider;