import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import { MetaMaskProvider } from '@/contexts/MetaMaskContext';
import { GameProvider } from '@/contexts/GameContext';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>        
        <Head>
            <title> Mice in a Maze </title>
        </Head>
            <ChakraProvider>
                <GameProvider>
                    <MetaMaskProvider>
                        <AuthProvider>
                            <Component {...pageProps} />
                        </AuthProvider>
                    </MetaMaskProvider>
                </GameProvider>
            </ChakraProvider>
        </>

    );
}