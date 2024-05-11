// src/types/ItemType.ts
export enum ItemType {
    Cosmetic = "Cosmetic",
    Map = "Map",
    GameplayToken = "Gameplay Token",
}

export enum CosmeticType {
    Animation = 0,
    Helmet = 1,
    Teeth = 2,
    Whiskers = 3,
    Shoes = 4,
    Outfit = 5,
}

export interface Item {
    name: string;
    id: string;
    claimedBy: string[];    // Array of user references who have claimed the item
    contractAddress: string;  // Presumably a blockchain-related address
    discoveredBy: string[]; // Array of user references who have discovered the item
    isDiscoverable: boolean;
    isUnique: boolean;
    isToken: boolean;
    itemType: ItemType;       // Numeric identifier for the type of item
    tokenId: string;        // Identifier likely related to a blockchain token
    assetName: string;
    proof: string;
}
