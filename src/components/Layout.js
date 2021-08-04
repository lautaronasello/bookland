import { Box } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <Box bg='#fafafa'>
      {children}
      <Footer />
    </Box>
  );
}
