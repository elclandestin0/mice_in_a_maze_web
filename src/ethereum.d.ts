
declare global {
    interface Window {
        ethereum?: {
            isMetaMask?: true;
            request: (request: { method: string, params?: Array<any> }) => Promise<any>;
            on: (event: string, callback: (...args: any[]) => void) => void;
            removeListener: (event: string, callback: (...args: any[]) => void) => void;
            // Define other ethereum properties and methods you use
        };
    }
}

export { };