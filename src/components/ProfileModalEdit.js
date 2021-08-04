import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { db } from '..';

export default function ProfileModalEdit({
  description,
  url,
  userName,
  actualUser,
  onClose,
}) {
  const [name, setName] = useState(`${userName && userName}`);
  const [webSite, setWebSite] = useState(`${url && url}`);
  const [bio, setBio] = useState(`${description && description}`);

  var handleChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  var handleChangeWebSite = (e) => {
    e.preventDefault();
    setWebSite(e.target.value);
  };
  var handleChangeBio = (e) => {
    e.preventDefault();
    setBio(e.target.value);
  };

  var handleSubmit = (e) => {
    e.preventDefault();
    var name = e.target[0].value;
    var bio = e.target[1].value;
    var website = e.target[2].value;

    db.collection(`${actualUser.displayName}`)
      .doc('/profile')
      .set(
        {
          name: name,
          website: website,
          bio: bio,
        },
        { merge: true }
      )
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.log('F: ', err);
      });
  };

  return (
    <div>
      <ModalOverlay />
      <ModalCloseButton
        _hover={{ bg: 'transparent' }}
        color='#fff'
        size='lg'
        zIndex='10001'
        cursor='pointer'
      />
      <ModalContent>
        <ModalHeader>Editar perfil</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Stack spacing='1rem'>
              <FormControl>
                <InputGroup>
                  <InputLeftAddon
                    bg='transparent'
                    border='none'
                    children='Nombre'
                  />
                  <Box w='100%'>
                    <Input onChange={handleChangeName} value={name} />
                    <FormHelperText
                      color='#8e8e8e'
                      mt='0.5rem'
                      ms='0.5rem'
                      fontSize='0.7rem'
                    >
                      Escribe el nombre por el que te conozca la gente, o el que
                      quieras!
                    </FormHelperText>
                  </Box>
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftAddon
                    bg='transparent'
                    border='none'
                    children='Bio'
                    w='6.2rem'
                  />
                  <Textarea
                    roundedStart='none'
                    onChange={handleChangeBio}
                    value={bio}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftAddon
                    bg='transparent'
                    border='none'
                    children='Website'
                  />
                  <Input
                    onChange={handleChangeWebSite}
                    value={webSite}
                    placeholder='https://tusitio.com/'
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button h='3rem' type='submit' colorScheme='blue' mr={3}>
              Editar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </div>
  );
}
