import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Unity } from 'react-unity-webgl';
import { useUnity } from '@/hooks/useUnity';
import { useAuth } from '@/contexts/AuthContext';


export function Play() {

    const { unityProvider, requestFullscreen, isLoaded, sendMessage } = useUnity();
    const { player } = useAuth();

    function handleClickEnterFullscreen() {
        requestFullscreen(true);
    }

    useEffect(() => {
        console.log("isLoaded index: ", isLoaded);
        if (isLoaded && player) {
            console.log("sending message .. ");
            sendMessage("PlayerManager", "LoadPlayerData", JSON.stringify(player));
        }
    }, [player, isLoaded]); // Dependencies on player and isLoaded to trigger the effect


    return (
        <>
            <Unity style={{ visibility: isLoaded ? "visible" : "hidden" }} unityProvider={unityProvider} style={{ width: '75%', height: '75%' }} />
            <Button p={5} colorScheme='teal' onClick={handleClickEnterFullscreen}>Enter Fullscreen</Button>
        </>
    );
}