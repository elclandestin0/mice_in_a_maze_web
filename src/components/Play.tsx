import React, { useCallback, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Unity } from 'react-unity-webgl';
import { useUnity } from '@/hooks/useUnity';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { useItems } from '@/contexts/ItemsContext';
import { usePlayer } from '@/contexts/PlayerContext';
import { Item } from '@/types/Item';
import useRweStudios1155 from '@/hooks/useRweStudios1155';
import { useMetaMask } from '@/contexts/MetaMaskContext';

export function Play() {
    const { unityProvider, isLoaded, sendMessage, addEventListener, removeEventListener } = useUnity();
    const { player } = useAuth();
    const { gameObjectName, methodName, objectParameter, setGameStarted, setMethodName, setGameObjectName, setObjectParameter } = useGame();
    const { items, loadAllItems, updateDiscoveredBy, updateClaimedBy } = useItems();
    const { discoverItem, equipCosmetic, unequipCosmetic, updateInventory } = usePlayer();
    const { account, connectWallet } = useMetaMask();
    const { enhance } = useRweStudios1155();


    const handleDiscoverItem = useCallback((item: any) => {
        // to-do: sanitize the shit out of this
        const itemObject = JSON.parse(item) as Item;
        discoverItem(itemObject.id, player);
        updateDiscoveredBy(itemObject.id, player);
        loadAllItems();
    }, [player]);

    const handleEquipItem = useCallback((item: any) => {
        // to-do: sanitize the shit out of this
        const itemObject = JSON.parse(item) as Item;
        equipCosmetic(itemObject.id, player);
    }, [player]);

    const handleUnequipItem = useCallback((item: any) => {
        // to-do: sanitize the shit out of this
        const itemObject = JSON.parse(item) as Item;
        unequipCosmetic(itemObject.id, player);
    }, [player]);

    const handleEnhanceItem = useCallback((item: any) => {
        // to-do: sanitize the shit out of this
        if (account == null) {
            connectWallet();
        } else {
            const itemObject = JSON.parse(item) as Item;
            enhance(itemObject.proof, "1").then(() => {
                updateClaimedBy(itemObject.id, player);
                updateInventory(itemObject.id, player);
                loadAllItems();
            });
        }
    }, [player]);

    const handleStartGame = useCallback(() => {
        setGameStarted(true);
    }, [])

    const handleEndGame = useCallback(() => {
        setGameStarted(false);
    }, [])

    useEffect(() => {
        addEventListener("DiscoverItem", handleDiscoverItem);
        addEventListener("EquipItem", handleEquipItem);
        addEventListener("UnequipItem", handleUnequipItem);
        addEventListener("EnhanceItem", handleEnhanceItem);
        addEventListener("StartGame", handleStartGame);
        return () => {
            removeEventListener("DiscoverItem", handleDiscoverItem);
            removeEventListener("EquipItem", handleEquipItem);
            removeEventListener("UnequipItem", handleUnequipItem);
            removeEventListener("EnhanceItem", handleEnhanceItem);
            removeEventListener("StartGame", handleStartGame);
        };
    }, [addEventListener,
        removeEventListener,
        handleDiscoverItem,
        handleEquipItem,
        handleUnequipItem,
        handleEnhanceItem]);

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

    return (
        <>
            <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100%' }} />
        </>
    );
}