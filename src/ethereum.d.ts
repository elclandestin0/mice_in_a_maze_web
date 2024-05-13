import { ExternalProvider } from 'ethers/providers';

declare global {
    interface Window {
        ethereum?: ExternalProvider;
    }
}

export { }; 