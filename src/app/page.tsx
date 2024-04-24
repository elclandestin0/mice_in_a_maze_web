"use client";

import React, { useState } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { Flex, Box, Text, VStack, Button, ChakraProvider } from '@chakra-ui/react';
import { Play } from '../components/play';

export default function Home() {

  const [activeComponent, setActiveComponent] = useState('play');

  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/webgl.loader.js",
    dataUrl: "Build/webgl.data",
    frameworkUrl: "Build/webgl.framework.js",
    codeUrl: "Build/webgl.wasm",
  });

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
      size:"lg",
      colorScheme: "teal",
      fontWeight: isActive ? "bold" : "normal",
      transition: 'background-color 0.2s' // Smooth background color transition on hover
    };
  };

  return (
    <ChakraProvider>
      <Flex direction="column" align="center" justify="start" p={12} bg="white">
        <Flex justify="space-between" align="center" w="100%">
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="black">Mice in a Maze</Text>
          </Box>
          <Flex gap={30}>
            {/* Buttons to switch components */}
            <Button {...getButtonStyles('play')} onClick={() => setActiveComponent('play')}>
              Play
            </Button>
            <Button {...getButtonStyles('buy')} onClick={() => setActiveComponent('buy')}>
              Buy
            </Button>
            <Button {...getButtonStyles('discover')} onClick={() => setActiveComponent('discover')}>
              Discover
            </Button>
          </Flex>
        </Flex>
        {/* Render the active component */}
        <VStack spacing={4} justify="center" align="center" width="100%" height="calc(100vh - 64px)">
          {renderComponent()}
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}