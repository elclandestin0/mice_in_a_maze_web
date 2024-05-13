import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import RweStudios from '@/utils/abis/RweStudios1155.json'; // Adjust the path as necessary
import { rweStudios1155Address } from '@/utils/contractAddresses';

export const useContract = () => {
    const [rweStudios1155, setRweStudios1155] = useState<Contract | null>(null);

    useEffect(() => {
        const initializeContracts = async () => {
            console.log("initializing...");
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const rweStudios1155 = new ethers.Contract(
                        rweStudios1155Address,
                        RweStudios.abi,
                        signer
                    );

                    setRweStudios1155(rweStudios1155);
                    console.log("initialized!");
                } catch (error) {
                    console.error('Error initializing contracts:', error);
                }
            } else {
                console.error('MetaMask is not installed!');
            }
        };

        initializeContracts();
    }, []);

    // Return the contract instance
    return { rweStudios1155 };
};
