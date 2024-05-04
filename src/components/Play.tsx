import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Unity } from 'react-unity-webgl';
import { useUnity } from '@/hooks/useUnity';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { useItems } from '@/contexts/ItemsContext';

export function Play() {

    const { unityProvider, isLoaded, sendMessage } = useUnity();
    const { player } = useAuth();
    const { gameObjectName, methodName, objectParameter, setMethodName, setGameObjectName, setObjectParameter } = useGame();
    const { items, loadAllItems } = useItems();

    useEffect(() => {
        console.log("Unity is loaded: ", isLoaded);
        if (isLoaded && player) {
            sendMessage("PlayerManager", "LoadPlayerData", JSON.stringify(player));
            loadAllItems();
        }
    }, [isLoaded, player]);

    useEffect(() => {
        if (items && Object.keys(items).length > 0) {
            console.log(items);
            sendMessage("Canvas", "ReceiveItemData", JSON.stringify(items));
        }
    }, [items]);

    useEffect(() => {
        if (gameObjectName !== "" && methodName !== "") {
            sendMessage(gameObjectName, methodName, objectParameter);
            setGameObjectName("");
            setMethodName("");
            setObjectParameter("");
        }
    }, [gameObjectName, methodName, objectParameter]); // Dependencies that trigger this effect


    return (
        <>
            <Unity unityProvider={unityProvider} style={{ width: '75%', height: '75%' }} />
            {/* <Button p={5} colorScheme='teal' onClick={handleClickEnterFullscreen}>Enter Fullscreen</Button> */}
        </>
    );
}