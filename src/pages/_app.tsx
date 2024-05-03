import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import { MetaMaskProvider } from '@/contexts/MetaMaskContext';
import { GameProvider } from '@/contexts/GameContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <GameProvider>
                <MetaMaskProvider>
                    <AuthProvider>
                        <Component {...pageProps} />
                    </AuthProvider>
                </MetaMaskProvider>
            </GameProvider>
        </ChakraProvider>
    );
}