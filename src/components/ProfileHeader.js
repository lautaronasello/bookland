import {
  Box,
  Button,
  FormControl,
  HStack,
  Img,
  Input,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

export default function ProfileHeader({ actualUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [webSite, setWebSite] = useState('');
  const [userName, setUserName] = useState('');
  const [description, setDescription] = useState('');

  var handleChangeUser = (e) => {
    setUserName(e.target.value);
  };

  var handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  var handleChangeWebSite = (e) => {
    setWebSite(e.target.value);
  };

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
              fontSize='1rem'
              rounded='sm'
              border='1px'
              borderColor='gray.200'
              fontWeight='light'
              w='4rem'
              h='fit-content'
              py='0.2rem'
              onClick={onOpen}
            >
              Editar
            </Button>
          </HStack>
          <Box w='20rem'>
            <Box wordBreak='break-word' my='0.5rem'>
              {userName}
            </Box>
            <Box
              textDecor='underline'
              _hover={{ textDecor: 'none' }}
              target='_blank'
              as={'a'}
              href={webSite}
            >
              {webSite}
            </Box>
            <Box>{description}</Box>
          </Box>
        </VStack>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing='1rem'>
              <FormControl>
                <InputLeftAddon children='Nombre' />
                <Input
                  onChange={(e) => handleChangeUser(e)}
                  placeholder={userName}
                />
              </FormControl>
              <FormControl>
                <InputLeftAddon children='Website' />
                <Input
                  onChange={(e) => handleChangeWebSite(e)}
                  placeholder={webSite}
                />
              </FormControl>
              <FormControl>
                <InputLeftAddon children='Bio' />

                <Textarea
                  onChange={(e) => handleChangeDescription(e)}
                  placeholder={description}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
