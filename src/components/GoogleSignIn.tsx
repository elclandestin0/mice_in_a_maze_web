import React, {useState} from 'react';
import {Button, Input, Stack} from '@chakra-ui/react';
import {useGoogleAuth} from "@/contexts/GoogleAuthContext";

const GoogleSignIn: React.FC = () => {
    const {signInWithEmail} = useGoogleAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignIn = async () => {
        try {
            await signInWithEmail(email, password);
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <Stack spacing={4}>
            <Input
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
            />
            <Button colorScheme="blue" onClick={handleSignIn} size="lg">
                Sign in with Email
            </Button>
        </Stack>
    );
};

export default GoogleSignIn;
