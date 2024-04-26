"use client";

import React, { useState } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { Flex, Box, Text, VStack, Button, ChakraProvider, Image, IconButton, Spacer, useBreakpointValue } from '@chakra-ui/react';
import { Play } from '../components/Play';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from '@chakra-ui/react';
import GoogleSignIn from '@/components/GoogleSignIn';

export default function Home() {
  const { breakpoints } = useTheme();
  const [activeComponent, setActiveComponent] = useState('play');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'play':
        return <Play />;
      case 'buy':
        // Placeholder for your Buy component
        return <Text>Buy Component</Text>;
      case 'discover':
        // Placeholder for your Discover component
        return <Text>Discover Component</Text>;
      default:
        // Default case can be your home view or an empty state
        return <Text>Welcome to Mice in a Maze!</Text>;
    }
  };

  const getButtonStyles = (name: string) => {
    const isActive = activeComponent === name;
    return {
      variant: "link",
      size: "lg",
      colorScheme: "teal",
      fontWeight: isActive ? "bold" : "normal",
      transition: 'background-color 0.2s' // Smooth background color transition on hover
    };
  };

  return (
    <ChakraProvider>
      <Box>
        <Flex align="center" p={4} boxShadow="md" bg="white">
          <Box>
            <Text fontSize="3xl" fontWeight='bold' color='black'>Mice in a Maze</Text>
          </Box>
          <Flex as="nav" gap="6" ml={8}>
            {/* Desktop navigation buttons */}
            <Button {...getButtonStyles('play')} onClick={() => setActiveComponent('play')}>
              Play
            </Button>
            <Button isDisabled {...getButtonStyles('discover')} onClick={() => setActiveComponent('discover')}>
              Discover
            </Button>
            <Button isDisabled {...getButtonStyles('buy')} onClick={() => setActiveComponent('buy')}>
              Shop
            </Button>
          </Flex>
          <Spacer />

          {/* User Avatar Icon */}
          <IconButton
            aria-label="User account"
            icon={<FontAwesomeIcon icon={faUser} />}
            isRound={true}
            size="lg"
          />
          {/* <GoogleSignIn /> */}
        </Flex>
        <VStack spacing={4} justify="center" align="center" width="100%" height="calc(100vh - 64px)">
          {renderComponent()}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}