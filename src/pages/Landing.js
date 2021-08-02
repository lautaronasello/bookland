import { Box, Center, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import Login from '../components/Login';

export default function Landing() {
  return (
    <Flex fontFamily='Montserrat' align='center' justify='center'>
      <Center minH='100vh'>
        <SimpleGrid columns={[1, 2]} spacingX={[null, '1rem']}>
          <Box my='auto' ml='10rem' textAlign='center'>
            <Heading color='#dfc690' fontSize='5rem'>
              Bookagram
            </Heading>
            <Text fontSize='1.5rem' fontWeight='light' textAlign='center'>
              Bienvenido a la red social de los amantes de los libros.
            </Text>
          </Box>
          <Login />
        </SimpleGrid>
      </Center>
    </Flex>
  );
}
