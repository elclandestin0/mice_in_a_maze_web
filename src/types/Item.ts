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
    claimedBy: string[];
    contractAddress: string;
    discoveredBy: string[];
    isDiscoverable: boolean;
    isUnique: boolean;
    isToken: boolean;
    itemType: ItemType;
    tokenId: string;
    assetName: string;
    proof: string;
}
