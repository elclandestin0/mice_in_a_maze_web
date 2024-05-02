import React, { useEffect } from 'react';
import {Button, Stack} from '@chakra-ui/react';
import {useAuth} from "@/contexts/AuthContext";
import { useUnity } from '@/hooks/useUnity';

const GoogleSignIn: React.FC = () => {
    const {signIn, player} = useAuth();
    const handleSignIn = async () => {
        try {
            signIn();
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <Stack spacing={4}>
            <Button colorScheme="blue" onClick={handleSignIn} size="lg">
                Sign Up with Google
            </Button>
        </Stack>
    );
};

export default GoogleSignIn;
