import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import React from 'react';

export default function Home() {
  return (
    <Flex fontFamily='Montserrat' align='center' justify='center'>
      <Center minH='100vh'>
        <SimpleGrid columns={[1, 2]} spacingX={[null, '1rem']}>
          <Box my='auto' ml='10rem' textAlign='center'>
            <Heading color='#dfc690' fontSize='5rem'>
              Book Society
            </Heading>
            <Text fontSize='1.5rem' fontWeight='light' textAlign='center'>
              Bienvenido a la red social de los amantes de los libros.
            </Text>
          </Box>
          <Box
            h='20rem'
            w='23rem'
            rounded='2xl'
            justify='center'
            align='center'
            boxShadow='lg'
            px='2rem'
            border='0.5px'
            borderColor='#707070'
            mx='auto'
          >
            <VStack spacing='5rem'>
              <Center pos='relative' top='3rem'>
                <FaGoogle color='#707070' size='5rem' />
              </Center>
              <Box>
                <Button
                  w='100%'
                  h='3rem'
                  colorScheme='telegram'
                  shadow='lg'
                  rounded='md'
                  color='whitesmoke'
                >
                  Entrar
                </Button>
                <Box py='1rem'>
                  <Divider
                    color='gray.200'
                    orientation='horizontal'
                    mt='1rem'
                  />
                  <Text fontSize='0.7rem'>
                    Es necesario tener una cuenta de Google para poder
                    continuar.
                  </Text>
                </Box>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Center>
    </Flex>
  );
}
