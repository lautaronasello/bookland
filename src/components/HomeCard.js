import { Box, Flex, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import StarReview from './StarReview';

export default function HomeCard({
  user,
  userPhoto,
  title,
  reseña,
  qualy,
  description,
  image,
  date,
}) {
  return (
    <Box bg='#fff' w='95%' h='fit-content' border='1px' borderColor='#dbdbdb'>
      <Flex align='center' px='1rem' my='0.5rem'>
        <Image w='3rem' h='3rem' me='2rem' rounded='full' src={userPhoto} />
        <VStack spacing='0.1rem'>
          <Box fontWeight='bold' fontSize='1rem'>
            {user}
          </Box>
          <Box>{date}</Box>
        </VStack>
      </Flex>
      <Image src={image} alt='post image' />
      <Box p='1rem'>
        <VStack align='left' spacing='0.5rem'>
          <Box>
            <Box>
              <strong>{title}</strong> - {reseña}
            </Box>
            <Box>
              <StarReview qualy={qualy} />
            </Box>
          </Box>
          <Box>{description}</Box>
        </VStack>
      </Box>
    </Box>
  );
}
