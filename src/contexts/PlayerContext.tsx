// src/contexts/PlayerContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { db } from "@/hooks/useUnity";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Player } from "../types/Player";

interface PlayerContextType {
  player: Player | null;
  discoverItem: (itemId: string) => Promise<void>;
  equipCosmetic: (itemId: string) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{
  children: ReactNode;
  player: Player | null;
}> = ({ children, player }) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(player);

  useEffect(() => {
    setCurrentPlayer(player);
  }, [player]);

  const discoverItem = async (itemId: string) => {
    if (!currentPlayer) return;
    const playerRef = doc(db, "players", currentPlayer.email); // Assuming email as a unique identifier
    await updateDoc(playerRef, {
      inventory: arrayUnion(itemId),
    });
  };

  const equipCosmetic = async (itemId: string) => {
    if (!currentPlayer) return;
    const playerRef = doc(db, "players", currentPlayer.email);
    await updateDoc(playerRef, {
      equippedItems: arrayUnion(itemId),
    });
  };

  return (
    <PlayerContext.Provider
      value={{ player: currentPlayer, discoverItem, equipCosmetic }}
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
