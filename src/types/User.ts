type EquippedItems = {
    [key: string]: any;
  };
  
  type Inventory = {
    [key: string]: any;
  };
  
  export interface User {
    username: string;
    email: string;
    lastSignedIn: string; // ISO date string
    metatmaskAddress: string;
    authToken: string;
    equippedItems: EquippedItems[];
    inventory: Inventory[];
  }
  
  