import {ethers} from 'ethers';
import {useMemo} from 'react';

export const useContract = (address, ABI, signerOrProvider) => {
    const contract = useMemo(() => {
        try {
            // Create a new ethers contract instance
            const contract = new ethers.Contract(address, ABI, signerOrProvider);
            return contract;
        } catch (error) {
            console.error('Failed to get contract', error);
            return null;
        }
    }, [address, ABI, signerOrProvider]);

    // Return the contract instance
    return contract;
};
