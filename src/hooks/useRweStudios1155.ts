import { useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContract } from './useContract';
import RweStudios from '@/utils/abis/RweStudios1155.json'; // Adjust the path as necessary
import { contractAddresses } from '@/utils/contractAddresses'; // Assuming this includes your SharpshooterPass contract address

export const useRweStudios1155 = (account: string) => {
    const contractAddress = contractAddresses.rweStudios1155;
    let rweStudios1155: any;
    let signer: any;

    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
        signer = provider.getSigner(); // Ensure you're connected to a wallet3
    })

    // Get the contract instance with a signer for minting
    rweStudios1155 = useContract(contractAddress, RweStudios.abi, signer);
    // Function to mint an NFT
    const enhance = useCallback(async (proof: string, tokenId: string) => {
        if (rweStudios1155) {
            try {
                const tx = await rweStudios1155.enhance(tokenId, proof);
                await tx.wait();
                console.log("NFT minted successfully");
            } catch (error) {
                console.error("Failed to mint NFT:", error);
            }
        }
    }, [rweStudios1155]);

    return { enhance };
};
