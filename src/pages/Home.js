import { Box, Container, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import HomeCart from '../components/HomeCard';
import Navbar from '../components/Navbar';
import useWindowDimensions from '../components/useWindowDimensions.js';
import firebase from 'firebase/app';
import { useState } from 'react';
export default function Home() {
  const [userId, setUserId] = useState([]);
  const { width } = useWindowDimensions();

  return (
    <>
      <Navbar userId={userId} />
      <Container mb='3rem' mt='5rem' maxW='container.xl'>
        <Flex>
          <VStack w={[null, null, null, '60%']} spacing='5rem'>
            <HomeCart />
            <HomeCart />
            <HomeCart />
            <HomeCart />
            <HomeCart />
          </VStack>
          {width >= 900 && (
            <Box>
              <Box zIndex='10000' h='fit-content' w='30%' bg='blue' pos='fixed'>
                hola
              </Box>
            </Box>
          )}
        </Flex>
      </Container>
    </>
  );
}
