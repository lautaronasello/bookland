import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
  Textarea,
  FormControl,
  VStack,
  Box,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

export default function ModalPost(onClose) {
  const [iconColor, setIconColor] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  var changeIconColor = (index) => {
    console.log(index);
    let clickStates = [...iconColor];
    for (let i = 0; i < 5; i++) {
      if (i <= index) clickStates[i] = true;
      else clickStates[i] = false;
    }
    setIconColor(clickStates);
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Publicacion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems='start' spacing='1rem'>
            <FormControl isRequired>
              <Input placeholder='título del libro' />
            </FormControl>
            <FormControl isRequired>
              <Input placeholder='título de la reseña' />
            </FormControl>
            <Box textAlign='left'>
              <Text>Puntuacion:</Text>
              <StarIcon
                color={iconColor[0] ? 'gold' : 'gray.300'}
                cursor='pointer'
                onClick={() => changeIconColor(0)}
              />
              <StarIcon
                color={iconColor[1] ? 'gold' : 'gray.300'}
                cursor='pointer'
                onClick={() => changeIconColor(1)}
              />
              <StarIcon
                color={iconColor[2] ? 'gold' : 'gray.300'}
                cursor='pointer'
                onClick={() => changeIconColor(2)}
              />
              <StarIcon
                color={iconColor[3] ? 'gold' : 'gray.300'}
                cursor='pointer'
                onClick={() => changeIconColor(3)}
              />
              <StarIcon
                color={iconColor[4] ? 'gold' : 'gray.300'}
                cursor='pointer'
                onClick={() => changeIconColor(4)}
              />
            </Box>
            <FormControl isRequired>
              <Textarea placeholder='descripcion' />
            </FormControl>
            <Text>Imagen jpg, png o jpeg</Text>
            <input type='file' />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Publicar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}
