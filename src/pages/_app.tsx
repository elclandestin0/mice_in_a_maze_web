import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { app, analytics } from '../hooks/useUnity';
import { AuthProvider } from '@/contexts/AuthContext';
import { MetaMaskProvider } from '@/contexts/MetaMaskContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <MetaMaskProvider>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </MetaMaskProvider>
        </ChakraProvider>
    );
}