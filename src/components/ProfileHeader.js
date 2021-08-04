import {
  Box,
  Button,
  HStack,
  Img,
  Modal,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { db } from '..';
import ProfileModalEdit from './ProfileModalEdit';

export default function ProfileHeader({ actualUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [webSite, setWebSite] = useState('');
  const [userName, setUserName] = useState('');
  const [description, setDescription] = useState('');

  if (actualUser) {
    db.collection(`${actualUser.displayName}`).onSnapshot((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        setUserName(doc.data().name);
        setWebSite(doc.data().website);
        setDescription(doc.data().bio);
      })
    );
  }
  return (
    <>
      <HStack ms={[null, '10rem']} mt='3rem' spacing='10px'>
        <Box w='25rem'>
          <Img
            mx='auto'
            color='#f1e5cb'
            src={actualUser && actualUser.photoURL}
            rounded='full'
            w={['8rem', '10rem']}
            h={['8rem', '10rem']}
          />
        </Box>
        <VStack align='start' spacing='1rem'>
          <HStack w='fit-content' spacing='1rem'>
            <Box fontSize={['13px', '3rem']} fontWeight='medium'>
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
          </HStack>
          <Box w='20rem'>
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
            >
              {webSite}
            </Box>
          </Box>
        </VStack>
      </HStack>
      <Modal size='xl' isCentered isOpen={isOpen} onClose={onClose}>
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
