// src/contexts/ItemsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Item } from '../types/Item';

interface ItemsContextType {
    items: Item[];
    loadClaimedItems: (userIds: string[]) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Item[]>([]);

    const loadClaimedItems = async (userIds: string[]) => {
        const q = query(collection(db, "items"), where("claimedBy", "array-contains-any", userIds));
        const querySnapshot = await getDocs(q);
        const itemsArray: Item[] = [];
        querySnapshot.forEach((doc) => {
            itemsArray.push(doc.data() as Item);
        });
        setItems(itemsArray);
    };

    return (
        <ItemsContext.Provider value={{ items, loadClaimedItems }}>
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
