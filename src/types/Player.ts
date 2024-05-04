import { Item } from "firebase/analytics";

type EquippedItems = {
  [key: string]: Item;
};

type DiscoveredItems = {
  [key: string]: Item;
}

type Inventory = {
  [key: string]: Item;
};

export interface Player {
  [key: string]: any;
  username: string;
  id: string;
  email: string;
  lastSignedIn: string; // ISO date string
  metatmaskAddress: string;
  authToken: string;
  equippedItems: EquippedItems[];
  inventory: Inventory[];
  discoveredItems: DiscoveredItems[];
}
