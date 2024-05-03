import React, { createContext, useContext, useState, ReactNode, SetStateAction } from 'react';

// Define an interface for the context value
interface GameContextType {
    gameObjectName: string;
    methodName: string;
    sendCommand: (gameObjectName: string, methodName: string) => void;
    setGameObjectName: (gameObjectName: string) => void;
    setMethodName: (gameObjectName: string) => void;
}

// Create the context with an initial undefined type, then define the default value
const GameContext = createContext<GameContextType | null>(null);

export function useGame(): GameContextType {
    const context = useContext(GameContext);
    if (!context) {
        // This will throw an error if the context is used outside of a provider
        // Alternatively, you can return a default context here to avoid throwing errors
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}

// Define props type for GameProvider to accept ReactNode children
interface GameProviderProps {
    children: ReactNode;
}

// GameProvider component with types
export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [gameObjectName, setGameObjectName] = useState<string>('');
    const [methodName, setMethodName] = useState<string>('');

    // Function to update the command, strongly typed
    const sendCommand = (gameObjectName: string, methodName: string) => {
        setGameObjectName(gameObjectName);
        setMethodName(methodName);
    };

    return (
        <GameContext.Provider value={{ gameObjectName, methodName, sendCommand, setGameObjectName, setMethodName }}>
            {children}
        </GameContext.Provider>
    );
};
