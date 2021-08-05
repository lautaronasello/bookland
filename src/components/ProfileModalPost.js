import { StarIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

export default function ProfileModalPost({
  title,
  review,
  qualy,
  description,
  url,
  actualUser,
}) {
  var starReview = (numberStars) => {
    console.log(numberStars);

    if (numberStars === '1')
      return (
        <>
          <StarIcon color='gold' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
        </>
      );
    if (numberStars === '2')
      return (
        <>
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
        </>
      );
    if (numberStars === '3')
      return (
        <>
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
        </>
      );
    if (numberStars === '4')
      return (
        <>
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gray.300' />
        </>
      );
    return (
      <>
        <StarIcon color='gold' />
        <StarIcon color='gold' />
        <StarIcon color='gold' />
        <StarIcon color='gold' />
        <StarIcon color='gold' />
      </>
    );
  };

  return (
    <>
      <>
        <ModalOverlay />
        <ModalCloseButton
          _hover={{ bg: 'transparent' }}
          color='#fff'
          size='lg'
          zIndex='10001'
          cursor='pointer'
        />
        <ModalContent minW='55rem' minH='rem' mx='auto' p='0' rounded='none'>
          <ModalBody p='0' minH='30rem' shadow='sm'>
            <Flex minH='30rem'>
              <Box w='55%' bg='#f1e5cb'>
                <Image src={url} w='100%' minH='100%' />
              </Box>
              <Box w='45%'>
                <Box p='0.5rem'>
                  <HStack spacing='1rem'>
                    <Image
                      src={actualUser && actualUser.photoURL}
                      rounded='full'
                      w='3rem'
                      h='3rem'
                    />
                    <Text align='initial' fontWeight='medium' fontSize='0.9em'>
                      {actualUser.displayName}{' '}
                    </Text>
                  </HStack>
                </Box>
                <Divider w='100%' />
                <Center h='80%'>
                  <VStack p='1rem' align='start' spacing='0.5rem'>
                    <Text>
                      <strong>{title}</strong> - {review}
                    </Text>
                    <Text>{starReview(qualy)}</Text>
                    <Box maxH='10rem' overflow='auto'>
                      {description}
                    </Box>
                  </VStack>
                </Center>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </>
    </>
  );
}
