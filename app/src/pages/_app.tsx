import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from '@/components/layout/layout'
import 'tailwindcss/tailwind.css'
import CartProvider from '@/components/cart/cartContext'
import ProfileProvider from "@/pages/admin/profileContext";

export default function App({Component, pageProps}: AppProps) {
    return (
        <ProfileProvider defaultProfile={{}}>
            <CartProvider defaultCart={[]}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </CartProvider>
        </ProfileProvider>
    )
}
