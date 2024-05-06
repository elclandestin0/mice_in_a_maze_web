// src/contexts/PlayerContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { db } from "@/services/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Player } from "../types/Player";
import { useAuth } from "./AuthContext";

interface PlayerContextType {
  discoverItem: (itemId: string, player: Player | null) => Promise<void>;
  equipCosmetic: (itemId: string, player: Player | null) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {


  const discoverItem = async (itemId: string, player: Player | null) => {
    console.log(player);
    if (!player) return;
    const playerRef = doc(db, "players", player.id);
    await updateDoc(playerRef, {
      discoveredItems: arrayUnion(itemId),
    }).then((x) => {
      console.log(x);
    });
  };

  const equipCosmetic = async (itemId: string, player: Player | null) => {
    if (!player) return;
    const playerRef = doc(db, "players", player.id);
    await updateDoc(playerRef, {
      equippedItems: arrayUnion(itemId),
    });
  };

  return (
    <PlayerContext.Provider
      value={{ discoverItem, equipCosmetic }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
