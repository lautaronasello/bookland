import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { db } from '..';
import StarReview from './StarReview';

export default function HomeCard({
  user,
  userPhoto,
  title,
  author,
  reseña,
  qualy,
  description,
  image,
  date,
  actualUser,
}) {
  var handleClick = (e) => {
    db.collection(`${actualUser.displayName}`)
      .doc('list')
      .collection('/titles')
      .doc(`${e.target.id}`)
      .set({
        title: e.target.id,
      })
      .then(() => {});
  };

  var upperTitle = `${title}`.toUpperCase();

  return (
    <Box bg='#fff' w='95%' h='fit-content' border='1px' borderColor='#dbdbdb'>
      <Flex align='center' px='1rem' my='0.5rem'>
        <Image w='3rem' h='3rem' me='2rem' rounded='full' src={userPhoto} />
        <VStack align='start' spacing='0.1rem'>
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
            <HStack
              w='100%'
              cursor='pointer'
              textDecoration='underline'
              onClick={(e) => handleClick(e)}
              _hover={{ textDecor: 'none' }}
            >
              <div id={title + ' - ' + author}>
                <Text
                  fontWeight='bold'
                  display='inline'
                  id={title + ' - ' + author}
                >
                  {upperTitle}
                </Text>
                <Text
                  id={title + ' - ' + author}
                  display='inline'
                  fontStyle='italic'
                >
                  {' - ' + author}
                </Text>
              </div>
            </HStack>
            <Box>
              <StarReview qualy={qualy} />
            </Box>
          </Box>
          <Box>
            <Box display='inline' fontWeight='bold'>
              {reseña}
            </Box>{' '}
            - <Box display='inline'>{description}</Box>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
