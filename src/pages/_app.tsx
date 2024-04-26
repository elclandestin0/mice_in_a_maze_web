import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { app, analytics } from '../services/firebase';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}