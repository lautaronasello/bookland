import {
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fs } from '..';
import Login from '../components/Login';
import useWindowDimensions from '../components/useWindowDimensions';

export default function Landing() {
  const [actualUser, setActualUser] = useState();
  const { width } = useWindowDimensions();

  fs.auth().onAuthStateChanged((user) => {
    if (user) {
      setActualUser(user);
    }
  });

  useEffect(() => {
    let isMounted = true;
    if (actualUser && isMounted) window.location.pathname = '/home';
    return () => {
      isMounted = false;
    };
  }, [actualUser]);

  return (
    <Flex fontFamily='Montserrat' align='center' justify='center'>
      <Center minH='100vh'>
        <SimpleGrid
          columns={[1, 2, 2]}
          minW='100%'
          spacingX={[null, null, '1rem']}
        >
          <VStack
            align='center'
            justify='center'
            my={[null, null, 'auto']}
            mb={['1rem', '1rem', null]}
            ml={[null, null, '10%', '20%']}
            textAlign='center'
          >
            <Heading
              display='inline-block'
              color='#dfc690'
              fontSize={['3.5rem', '3rem', '3rem', '5rem']}
            >
              Bookgrand
            </Heading>
            {width > 800 && (
              <Text
                display='inline-block'
                fontSize='1.5rem'
                fontWeight='light'
                textAlign='center'
              >
                Bienvenido a la red social de los amantes de los libros.
              </Text>
            )}
          </VStack>
          <Login />
        </SimpleGrid>
      </Center>
    </Flex>
  );
}
