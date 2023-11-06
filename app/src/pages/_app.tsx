import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/layout'
import 'tailwindcss/tailwind.css'
import CartProvider from '@/components/cart/cartContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider defaultCart={[]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}
