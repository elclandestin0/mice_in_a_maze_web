// src/components/MetaMaskConnect.tsx
import {Button} from '@chakra-ui/react';
import {useMetaMask} from '../contexts/MetaMaskContext';

const MetaMaskConnect: React.FC = () => {
    const {account, connectWallet, signIn} = useMetaMask();

    return (
        <Button colorScheme="teal" onClick={() => {
            connectWallet().then(() => {
                signIn().catch(err => console.log(err));
            }).catch(err => console.log(err))
        }} isDisabled={account != null} size="lg">
            {account ? 'Connected' : 'Connect to MetaMask'}
        </Button>
    );
};

export default MetaMaskConnect;
