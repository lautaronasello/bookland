import { Box, Button, HStack, Icon, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaCircle } from 'react-icons/fa';

export default function ProfileHeader() {
  return (
    <>
      <HStack ms={[null, '10rem']} mt='3rem' spacing='10px'>
        <Box w='25rem' textAlign='center'>
          <Icon
            color='#f1e5cb'
            as={FaCircle}
            w={['8rem', '10rem']}
            h={['8rem', '10rem']}
          />
        </Box>
        <VStack align='start' spacing='1rem'>
          <HStack w='fit-content' spacing='1rem'>
            <Box fontSize={['13px', '3rem']} fontWeight='medium'>
              launasello
            </Box>
            <Button
              color='blackAlpha.700'
              colorScheme='whiteAlpha'
              fontSize='1rem'
              rounded='sm'
              border='1px'
              borderColor='gray.200'
              fontWeight='light'
              w='4rem'
              h='fit-content'
              py='0.2rem'
            >
              Editar
            </Button>
          </HStack>
          <Box w='18rem'>
            <Box my='0.5rem'>Lautaro Nasello</Box>
            <Box>Descripcion para mostrar en tu perfil</Box>
          </Box>
        </VStack>
      </HStack>
    </>
  );
}
