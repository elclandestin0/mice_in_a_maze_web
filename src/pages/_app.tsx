import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import { MetaMaskProvider } from '@/contexts/MetaMaskContext';
import { GameProvider } from '@/contexts/GameContext';
import Head from 'next/head';
import { ItemsProvider } from '@/contexts/ItemsContext';
import { PlayerProvider } from '@/contexts/PlayerContext';

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
                            <PlayerProvider>
                                <ItemsProvider>
                                    <Component {...pageProps} />
                                </ItemsProvider>
                            </PlayerProvider>
                        </AuthProvider>
                    </MetaMaskProvider>
                </GameProvider>
            </ChakraProvider>
        </>

    );
}