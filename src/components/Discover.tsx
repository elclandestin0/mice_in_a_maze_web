// components/Discover.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import ThreeCube from './Item';

export const Discover: React.FC = () => {
  return (
    <Box w="75vw" h="75vh" display="flex" alignItems="center" justifyContent="center">
      <ThreeCube />
    </Box>
  );
};
