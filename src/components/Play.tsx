import React, { useCallback, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Unity } from 'react-unity-webgl';
import { useUnity } from '@/hooks/useUnity';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { useItems } from '@/contexts/ItemsContext';
import { usePlayer } from '@/contexts/PlayerContext';
import { Item } from '@/types/Item';

export function Play() {

    const { unityProvider, isLoaded, sendMessage, addEventListener, removeEventListener } = useUnity();
    const { player } = useAuth();
    const { gameObjectName, methodName, objectParameter, setMethodName, setGameObjectName, setObjectParameter } = useGame();
    const { items, loadAllItems } = useItems();
    const { discoverItem } = usePlayer();

    useEffect(() => {
        console.log("Unity is loaded: ", isLoaded);
        if (isLoaded && player) {
            sendMessage("PlayerManager", "LoadPlayerData", JSON.stringify(player));
            loadAllItems();
        }
    }, [isLoaded, player]);


    const handleDiscoverItem = useCallback((item: any) => {
        // to-do: sanitize the shit out of this
        const itemObject = item as Item;
        console.log(player);
        discoverItem(itemObject.id, player);
    }, [player]);


    useEffect(() => {
        if (items && Object.keys(items).length > 0) {
            console.log(items);
            sendMessage("ItemsManager", "ReceiveItemData", JSON.stringify({ items: items }));
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

    useEffect(() => {
        addEventListener("DiscoverItem", handleDiscoverItem);
        return () => {
            removeEventListener("DiscoverItem", handleDiscoverItem);
        };
    }, [addEventListener, removeEventListener, handleDiscoverItem]);

    return (
        <>
            <Unity unityProvider={unityProvider} style={{ width: '90%', height: '90%' }} />
            {/* <Button p={5} colorScheme='teal' onClick={handleClickEnterFullscreen}>Enter Fullscreen</Button> */}
        </>
    );
}