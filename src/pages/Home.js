import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { fs } from '..';
import HomeCardStack from '../components/HomeCardStack';
import Navbar from '../components/Navbar';
import useWindowDimensions from '../components/useWindowDimensions.js';
export default function Home() {
  const { width } = useWindowDimensions();
  const [actualUser, setActualUser] = useState();

  fs.auth().onAuthStateChanged((user) => {
    if (user) {
      setActualUser(user);
    } else {
      console.log('no hay nadie');
    }
  });

  return (
    <>
      <Navbar />
      <Container mb='3rem' mt='5rem' maxW='container.lg'>
        <Flex>
          <HomeCardStack actualUser={actualUser} />
          {width >= 900 && (
            <Box>
              <Box h='fit-content' w='30%' bg='blue' pos='fixed'>
                hola
              </Box>
            </Box>
          )}
        </Flex>
      </Container>
    </>
  );
}
