import React from 'react';
import {Button, Input, Stack} from '@chakra-ui/react';
import {useGoogleAuth} from "@/contexts/AuthContext";

const GoogleSignIn: React.FC = () => {
    const {signIn} = useGoogleAuth();
    const handleSignIn = async () => {
        try {
            await signIn();
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <Stack spacing={4}>
            {/* <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
                color="white"
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
                color="white"
            /> */}
            <Button colorScheme="blue" onClick={handleSignIn} size="lg">
                Sign Up with Google
            </Button>
        </Stack>
    );
};

export default GoogleSignIn;
