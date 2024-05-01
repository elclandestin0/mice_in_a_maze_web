"use client";

import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  VStack,
  Button,
  ChakraProvider,
  Image,
  IconButton,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Play } from "../components/Play";
import { Discover } from "../components/Discover";
import { useTheme } from "@chakra-ui/react";
import SignInModal from "@/components/PlayerModal";

export default function Home() {
  const { breakpoints } = useTheme();
  const [activeComponent, setActiveComponent] = useState("play");

  const renderComponent = () => {
    switch (activeComponent) {
      case "play":
        return <Play />;
      case "buy":
        return <Text>Discover Component</Text>;
        return <Discover />;
      case "discover":
        return <Discover />;
      default:
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
      transition: "background-color 0.2s", // Smooth background color transition on hover
    };
  };

  return (
    <ChakraProvider>
      <Box>
        <Flex align="center" p={4} boxShadow="md" bg="white">
          <Box>
            <Text fontSize="3xl" fontWeight="bold" color="black">
              Mice in a Maze
            </Text>
          </Box>
          <Flex as="nav" gap="6" ml={8}>
            <Button
              {...getButtonStyles("play")}
              onClick={() => setActiveComponent("play")}
            >
              Play
            </Button>
            <Button
              // isDisabled
              {...getButtonStyles("discover")}
              onClick={() => setActiveComponent("discover")}
            >
              Discover
            </Button>
            <Button
              isDisabled
              {...getButtonStyles("buy")}
              onClick={() => setActiveComponent("buy")}
            >
              Shop
            </Button>
          </Flex>
          <Spacer />
          <SignInModal />
        </Flex>
        <VStack
          spacing={4}
          justify="center"
          align="center"
          width="100%"
          height="calc(100vh - 64px)"
        >
          {renderComponent()}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
