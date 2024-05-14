"use client";

import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Text,
  VStack,
  Button,
  ChakraProvider,
  Spacer,
  Badge
} from "@chakra-ui/react";
import { Play } from "../components/Play";
import SignInModal from "@/components/PlayerModal";
import { useUnity } from "@/hooks/useUnity";
import { useAuth } from "@/contexts/AuthContext";
import { useGame } from "@/contexts/GameContext";
import { useItems } from "@/contexts/ItemsContext";


export default function Home() {
  const [activeComponent, setActiveComponent] = useState("play");
  const { isLoaded } = useUnity();
  const { sendCommand, gameStarted } = useGame();
  const { player } = useAuth();
  const { hasNewDiscoveries, setHasNewDiscoveries } = useItems();

  useEffect(() => {
    if (isLoaded) console.log("isloaded");
    if (player != null) console.log("sending item data");
  }, [player, isLoaded]);

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

  const navigateToPlay = () => {
    setActiveComponent("play");
    sendCommand("CanvasMain", "NavigateToPlay")
  }


  const navigateToDiscover = () => {
    setActiveComponent("discover");
    sendCommand("CanvasMain", "NavigateToDiscover")
  }

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
              onClick={() => activeComponent === "play" ? {} : navigateToPlay()}
            >
              Play
            </Button>
            <Button
              isDisabled={gameStarted ? true : false}
              {...getButtonStyles("discover")}
              onClick={() => {
                activeComponent === "discover" ? {} : navigateToDiscover();
                setHasNewDiscoveries(false);
              }}
            >
              Discover {hasNewDiscoveries && <Badge colorScheme='red'>New</Badge>}
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
          {<Play />}
        </VStack>
      </Box>
    </ChakraProvider >
  );
}
