import React from 'react';
import {Button, Input, Stack} from '@chakra-ui/react';
import {useAuth} from "@/contexts/AuthContext";

const GoogleSignIn: React.FC = () => {
    const {signIn} = useAuth();
    const handleSignIn = async () => {
        try {
            await signIn();
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
