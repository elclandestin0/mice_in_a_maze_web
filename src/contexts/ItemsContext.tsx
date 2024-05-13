// src/contexts/ItemsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '@/services/firebase';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Item } from '../types/Item';
import { Player } from '@/types/Player';

interface ItemsContextType {
    equippedItems: Item[];
    items: Item[];
    hasNewDiscoveries: boolean;
    loadClaimedItems: (userIds: string[]) => void;
    loadAllItems: () => void;
    updateDiscoveredBy: (itemId: string, player: Player | null) => void;
    updateClaimedBy: (itemId: string, player: Player | null) => void;
    setHasNewDiscoveries: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [equippedItems, setEquippedItems] = useState<Item[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [hasNewDiscoveries, setHasNewDiscoveries] = useState(false);

    const loadClaimedItems = async (userIds: string[]) => {
        const q = query(collection(db, "items"), where("claimedBy", "array-contains-any", userIds));
        const querySnapshot = await getDocs(q);
        const itemsArray: Item[] = [];
        querySnapshot.forEach((doc) => {
            itemsArray.push(doc.data() as Item);
        });
        setEquippedItems(itemsArray);
    };

    const loadAllItems = async () => {
        const q = collection(db, "items");
        const querySnapshot = await getDocs(q);
        const itemsArray: Item[] = [];
        querySnapshot.forEach((doc) => {
            itemsArray.push(doc.data() as Item);
            console.log(doc.data());
        });
        setItems(itemsArray);
    };

    const updateDiscoveredBy = async (itemId: string, player: Player | null) => {
        if (!player) return;
        const itemRef = doc(db, "items", itemId);
        await updateDoc(itemRef, {
            discoveredBy: arrayUnion(player.id),
        }).then(() => {
            setHasNewDiscoveries(true);
        });
    }


    const updateClaimedBy = async (itemId: string, player: Player | null) => {
        if (!player) return;
        const itemRef = doc(db, "items", itemId);
        await updateDoc(itemRef, {
            claimedBy: arrayUnion(player.id),
        });
    }


    return (
        <ItemsContext.Provider value={{ equippedItems, items, hasNewDiscoveries, loadClaimedItems, loadAllItems, updateDiscoveredBy, updateClaimedBy, setHasNewDiscoveries }}>
            {children}
        </ItemsContext.Provider>
    );
};

export const useItems = () => {
    const context = useContext(ItemsContext);
    if (!context) {
        throw new Error('useItems must be used within an ItemsProvider');
    }
    return context;
};
