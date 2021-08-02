import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaCircle } from 'react-icons/fa';

export default function HomeCard() {
  return (
    <Box w='90%' h='fit-content' border='1px' borderColor='#f6f7f8'>
      <Flex align='center' px='1rem' my='0.5rem'>
        <Icon w='3rem' h='3rem' me='2rem' as={FaCircle} />
        <VStack spacing='0.1rem'>
          <Box fontWeight='bold' fontSize='1rem'>
            launasello
          </Box>
          <Box>29/07/2021</Box>
        </VStack>
      </Flex>
      <Box bg='tomato' h='30rem'></Box>
      <Box p='1rem'>
        <VStack align='left' spacing='0.5rem'>
          <Box>
            <Box>
              <strong>El Gran Gatsby</strong> - Novela de F.Scott Fitzgerald
            </Box>
            <Box>
              <StarIcon color='gold' />
              <StarIcon color='gold' />
              <StarIcon color='gold' />
              <StarIcon color='gold' />
              <StarIcon color='gray.300' />
            </Box>
          </Box>
          <Box fontWeight='medium'>Launasello</Box>
          <Box>
            El gran Gatsby es una novela de 1925 escrita por el autor
            estadounidense F. Scott Fitzgerald que sigue a un grupo de
            personajes que viven en la ciudad ficticia de West Egg en la
            próspera Long Island, en el verano de 1922.
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
