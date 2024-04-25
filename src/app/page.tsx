"use client";

import React, { useState } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { Flex, Box, Text, VStack, Button, ChakraProvider, Image } from '@chakra-ui/react';
import { Play } from '../components/play';
import { FaUserCircle } from 'react-icons/fa';

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
      size: "lg",
      colorScheme: "teal",
      fontWeight: isActive ? "bold" : "normal",
      transition: 'background-color 0.2s' // Smooth background color transition on hover
    };
  };

  return (
    <ChakraProvider>
      <Flex justify="space-between" align="center" p={4} boxShadow="md" bg="white">
        {/* Logo and Title */}
        <Box>
          <Image src="/cheese.gif" boxSize="50px" mr={2} />
          <span>Mice in a Maze</span>
        </Box>

        {/* Navigation Buttons */}
        <Flex gap="2">
          <Button
            {...getButtonStyles('play')}
            onClick={() => setActiveComponent('play')}
          >
            Play
          </Button>
          <Button
            {...getButtonStyles('buy')}
            onClick={() => setActiveComponent('buy')}
          >
            Shop
          </Button>
          <Button
            {...getButtonStyles('discover')}
            onClick={() => setActiveComponent('discover')}
          >
            Discover
          </Button>
        </Flex>

        {/* User Avatar Icon */}
        <IconButton
          aria-label="User account"
          icon={<FaUserCircle size="24" />}
          isRound={true}
          size="lg"
        />
      </Flex>
    </ChakraProvider>
  );
}