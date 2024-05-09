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
    const { items, loadAllItems, updateDiscoveredBy } = useItems();
    const { discoverItem, equipCosmetic, unequipCosmetic } = usePlayer();

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


    const handleDiscoverItem = useCallback((item: any) => {
        // to-do: sanitize the shit out of this
        const itemObject = JSON.parse(item) as Item;
        discoverItem(itemObject.id, player);
        updateDiscoveredBy(itemObject.id, player);
        loadAllItems();
    }, [player]);


    useEffect(() => {
        addEventListener("DiscoverItem", handleDiscoverItem);
        addEventListener("EquipItem", handleEquipItem);
        addEventListener("UnequipItem", handleUnequipItem);
        return () => {
            removeEventListener("DiscoverItem", handleDiscoverItem);
            removeEventListener("EquipItem", handleEquipItem);
            removeEventListener("UnequipItem", handleUnequipItem);
        };
    }, [addEventListener, removeEventListener, handleDiscoverItem]);


    const handleEquipItem = useCallback((item: any) => {
        // to-do: sanitize the shit out of this
        const itemObject = JSON.parse(item) as Item;
        console.log(itemObject);
        equipCosmetic(itemObject.id, player);
    }, [player]);

    const handleUnequipItem = useCallback((item: any) => {
        // to-do: sanitize the shit out of this
        const itemObject = JSON.parse(item) as Item;
        console.log(itemObject);
        unequipCosmetic(itemObject.id, player);
    }, [player]);




    return (
        <>
            <Unity unityProvider={unityProvider} style={{ width: '90%', height: '90%' }} />
            {/* <Button p={5} colorScheme='teal' onClick={handleClickEnterFullscreen}>Enter Fullscreen</Button> */}
        </>
    );
}