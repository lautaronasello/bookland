import {
  Box,
  Center,
  Divider,
  HStack,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import StarReview from './StarReview';
import useWindowDimensions from './useWindowDimensions';

export default function ProfileModalPost({
  title,
  review,
  qualy,
  description,
  url,
  actualUser,
}) {
  const { width } = useWindowDimensions();
  return (
    <>
      <ModalOverlay />
      {width >= 768 && (
        <>
          <ModalCloseButton
            _hover={{ bg: 'transparent' }}
            color='#fff'
            size='lg'
            zIndex='10001'
            cursor='pointer'
          />
        </>
      )}
      <ModalContent
        minW={['100%', '90%', '40rem']}
        maxW='50rem'
        h={['100vh', 'fit-content', 'auto']}
        mx='auto'
        p='0'
        rounded='none'
      >
        {width < 768 && <ModalCloseButton />}
        <ModalBody
          p='0'
          minH={['10rem', '3rem', null]}
          maxh={[null, null, '10rem']}
          shadow='sm'
        >
          <Stack direction={['column', 'row', 'row']}>
            <Box w={['100%', '55%', '55%']} bg='#f1e5cb'>
              <Image src={url} w='100%' maxH={['31.5rem', '100%', '100%']} />
            </Box>
            <Box w={['100%', '45%', '45%']}>
              <Box px='0.5rem'>
                <HStack py='0.5rem' spacing='1rem'>
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
                  <StarReview qualy={qualy} />
                  <Box maxH={['100%', '80%', '8rem']} overflow='auto'>
                    {description}
                  </Box>
                </VStack>
              </Center>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </>
  );
}
