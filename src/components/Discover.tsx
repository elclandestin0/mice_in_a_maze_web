// components/Discover.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import ThreeCube from './Item';

export const Discover: React.FC = () => {
  return (
    <Box w="90vw" h="90vh" display="flex" alignItems="center" justifyContent="center">
      <ThreeCube />
    </Box>
  );
};
