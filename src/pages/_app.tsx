import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { app, analytics } from '../services/firebase';
import { GoogleAuthProvider } from '@/contexts/GoogleAuthContext';
import { MetaMaskProvider } from '@/contexts/MetaMaskContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <MetaMaskProvider>
                <GoogleAuthProvider>
                    <Component {...pageProps} />
                </GoogleAuthProvider>
            </MetaMaskProvider>
        </ChakraProvider>
    );
}