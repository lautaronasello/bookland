import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import StarReview from './StarReview';
import useWindowDimensions from './useWindowDimensions';
import ProfileMenuDelete from './PorfileMenuDelete';
export default function ProfileModalPost({
  title,
  author,
  review,
  qualy,
  description,
  url,
  actualUser,
  onClose,
}) {
  const { width } = useWindowDimensions();
  return (
    <>
      <ModalOverlay />
      {width >= 768 && (
        <ModalCloseButton
          borderRadius='none'
          _hover={{ bg: 'transparent', outline: 0 }}
          _active={{ boxShadow: 'none' }}
          _focus={{ boxShadow: 'none' }}
          outline='none'
          color='#fff'
          size='lg'
          zIndex='10001'
          cursor='pointer'
        />
      )}
      <ModalContent
        minW={['100%', '90%', '40rem']}
        maxW='50rem'
        h={['100vh', 'fit-content', 'auto']}
        mx='auto'
        p='0'
        rounded='none'
      >
        {width < 768 && (
          <ModalCloseButton _focus={{ outline: 'none', boxShadow: 'none' }} />
        )}
        <ModalBody p='0' minH={['10rem', '5rem', null]} shadow='sm'>
          <Stack spacing='0' direction={['column', 'row', 'row']}>
            <Box w={['100%', '55%', '55%']} bg='#f1e5cb'>
              <Image src={url} w='100%' maxH={['31.5rem', '100%', '100%']} />
            </Box>
            <Box w={['100%', '45%', '45%']}>
              <Box borderBottom='1px' borderColor='#dbdbdb'>
                <Box px='0.5rem'>
                  <HStack py='0.5rem' spacing='1rem'>
                    <Image
                      src={actualUser && actualUser.photoURL}
                      rounded='full'
                      w='3rem'
                      h='3rem'
                    />
                    <Text align='initial' fontWeight='medium' fontSize='0.9em'>
                      {actualUser.displayName}
                    </Text>
                    <Spacer />
                    <Box align='initial' fontWeight='medium' fontSize='0.9em'>
                      <ProfileMenuDelete
                        actualUser={actualUser}
                        onClose={onClose}
                        title={title}
                      />
                    </Box>
                  </HStack>
                </Box>
              </Box>
              <Center h='80%'>
                <VStack p='1rem' align='start' spacing='0.5rem'>
                  <Text>
                    <Text fontWeight='bold' display='inline'>
                      {title}
                    </Text>{' '}
                    -{' '}
                    <Text display='inline' fontStyle='italic'>
                      {author}
                    </Text>
                  </Text>
                  <StarReview qualy={qualy} />
                  <Text fontWeight='medium'>{review}</Text>
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
