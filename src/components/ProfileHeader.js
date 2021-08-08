import {
  Box,
  Button,
  Img,
  Modal,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '..';
import ProfileModalEdit from './ProfileModalEdit';

export default function ProfileHeader({ actualUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [webSite, setWebSite] = useState('');
  const [userName, setUserName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    let mounted = true;
    if (actualUser) {
      db.collection(`${actualUser.displayName}`).onSnapshot((querySnapshot) =>
        querySnapshot.forEach((doc) => {
          if (mounted) {
            setUserName(doc.data().name);
            setWebSite(doc.data().website);
            setDescription(doc.data().bio);
          }
        })
      );
    }
    return () => {
      mounted = false;
    };
  }, [actualUser]);

  return (
    <>
      <Stack
        direction={['column', 'column', 'row']}
        ms={[null, null, '10rem']}
        mt='3rem'
        spacing='10px'
      >
        <Box w={['100%', '100%', '25rem']}>
          <Img
            mx='auto'
            color='#f1e5cb'
            src={actualUser && actualUser.photoURL}
            rounded='full'
            w={['8rem', '10rem']}
            h={['8rem', '10rem']}
          />
        </Box>
        <VStack align={['center', 'center', 'start']} spacing='1rem'>
          <Stack w='fit-content' spacing='1rem'>
            <Box fontSize={['1rem', '3rem']} fontWeight='medium'>
              {actualUser && actualUser.displayName}
            </Box>
            <Button
              color='blackAlpha.700'
              colorScheme='whiteAlpha'
              fontSize='0.8rem'
              rounded='md'
              border='1px'
              p='0.3rem'
              h='fit-content'
              borderColor='gray.200'
              fontWeight='light'
              onClick={onOpen}
            >
              Editar perfil
            </Button>
          </Stack>
          <Box w={['100%', '20rem']} textAlign={['center', null, 'start']}>
            <Box
              wordBreak='break-word'
              fontSize='1rem'
              fontWeight='semibold'
              my='0.5rem'
            >
              {userName}
            </Box>
            <Box>{description}</Box>

            <Box
              textDecor='underline'
              _hover={{ textDecor: 'none' }}
              target='_blank'
              color='#00376b'
              fontWeight='medium'
              as={'a'}
              href={webSite}
              px={[2, 0, 0]}
            >
              {webSite}
            </Box>
          </Box>
        </VStack>
      </Stack>
      <Modal size={['sm', 'xl']} isCentered isOpen={isOpen} onClose={onClose}>
        <ProfileModalEdit
          url={webSite}
          userName={userName}
          description={description}
          actualUser={actualUser}
          onClose={onClose}
        />
      </Modal>
    </>
  );
}
