import React from 'react';
import { Box, VStack, Center, Button, Divider, Text } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
  return (
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
            as={'a'}
            href='/home'
            w='100%'
            h='3.5em'
            shadow='0 10px 10px 0 rgba(0,0,0,0.5)'
            colorScheme='telegram'
            rounded='md'
            color='whitesmoke'
          >
            Entrar
          </Button>
          <Box py='1rem'>
            <Divider color='gray.200' orientation='horizontal' mt='1rem' />
            <Text fontSize='0.7rem'>
              Es necesario tener una cuenta de Google para poder continuar.
            </Text>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}