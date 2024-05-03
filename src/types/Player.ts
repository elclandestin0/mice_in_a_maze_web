type EquippedItems = {
  [key: string]: any;
};

type Inventory = {
  [key: string]: any;
};

export interface Player {
  [key: string]: any;
  username: string;
  email: string;
  lastSignedIn: string; // ISO date string
  metatmaskAddress: string;
  authToken: string;
  equippedItems: EquippedItems[];
  inventory: Inventory[];
}
