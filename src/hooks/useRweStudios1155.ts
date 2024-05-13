import { useCallback } from 'react';
import { useContract } from './useContract'; // Import your useContracts hook
import { useMetaMask } from '@/contexts/MetaMaskContext';

const useRweStudios1155 = () => {
    const { rweStudios1155 } = useContract();
    const { account } = useMetaMask(); // Get the current account from MetaMask

    const enhance = useCallback(async (proof: any, tokenId: any) => {
        if (!rweStudios1155) {
            console.error("Contract not initialized or invalid parameters.");
            return;
        }

        try {
            const transaction = await rweStudios1155.enhance(proof, tokenId);
            await transaction.wait(); // Wait for the transaction to be mined
            console.log('Claimed successfully');
        } catch (err) {
            console.error('Error claiming:', err);
        }
    }, [rweStudios1155, account]);

    return { enhance };
};

export default useRweStudios1155;