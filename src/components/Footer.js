import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

export default function Footer() {
  return (
    <Flex align='center' h='4rem' justify='center' bg='#fafafa' w='100%'>
      <Box color='gray.300' fontWeight='medium'>
        Lautaro Nasello 2021
      </Box>
    </Flex>
  );
}
