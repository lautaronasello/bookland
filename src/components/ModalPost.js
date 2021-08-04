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
  Progress,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { db, storage } from '..';
import { useEffect } from 'react';

export default function ModalPost({ actualUser, onClose }) {
  const [iconColor, setIconColor] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  const [uploadValue, setUploadValue] = useState(0);
  const [title, setTitle] = useState('');
  const [reseña, setReseña] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();
  const [qualy, setQualy] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(false);

  var handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  var handleChangeReseña = (e) => {
    setReseña(e.target.value);
  };
  var handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    var valueStars = (e) => {
      return e === true;
    };
    setQualy(iconColor.filter(valueStars).length);
  }, [iconColor]);

  var changeIconColor = (index) => {
    let clickStates = [...iconColor];
    for (let i = 0; i < 5; i++) {
      if (i <= index) clickStates[i] = true;
      else clickStates[i] = false;
    }
    setIconColor(clickStates);
  };

  var handleUpload = (e) => {
    var file = e.target.files[0];
    var storageRef = storage.ref(`fotos/${file.name}`);
    var task = storageRef.put(file);

    task.on('state_changed', (snapshot) => {
      let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadValue(percent);
    });

    setLoadingProgress(true);
    storageRef.getMetadata().then((metadata) => {
      console.log(metadata.name);
      setImage(metadata.name);
    });
  };

  useEffect(() => {
    if (uploadValue === 100) setLoadingProgress(false);
  }, [uploadValue]);

  var handleSubmit = (e) => {
    e.preventDefault();

    var title = e.target[1].value;
    var reseña = e.target[2].value;
    var description = e.target[3].value;
    var userName = actualUser.displayName;
    db.collection(`${userName}`)
      .doc('/post')
      .collection('/docs')
      .add({
        title: `${title}`,
        reseña: `${reseña}`,
        description: `${description}`,
        image: `${image}`,
        qualy: `${qualy}`,
      })
      .then((docRef) => {
        setTitle('');
        setReseña('');
        setDescription('');
        setUploadValue(0);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  return (
    <>
      <ModalOverlay />
      <form onSubmit={(e) => handleSubmit(e)}>
        <ModalCloseButton
          _hover={{ bg: 'transparent' }}
          color='#fff'
          size='lg'
          zIndex='10001'
          cursor='pointer'
        />
        <ModalContent mt='7rem'>
          <ModalHeader>Crear Publicacion</ModalHeader>
          <ModalBody>
            <VStack alignItems='start' spacing='1rem'>
              <FormControl isRequired>
                <Input
                  onChange={handleChangeTitle}
                  value={title}
                  placeholder='título del libro'
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  onChange={handleChangeReseña}
                  value={reseña}
                  placeholder='titulo de reseña'
                />
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
                <Textarea
                  onChange={handleChangeDescription}
                  value={description}
                  placeholder='descripcion'
                />
              </FormControl>
              <Text>Imagen jpg, png o jpeg</Text>
              <Progress
                hasStripe
                w='20rem'
                colorScheme='whatsapp'
                value={uploadValue}
                max='100'
              />
              <FormControl isRequired>
                <input type='file' onChange={handleUpload} />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            {loadingProgress ? (
              <Button isLoading type='submit' colorScheme='blue' mr={3}>
                Publicar
              </Button>
            ) : (
              <Button type='submit' colorScheme='blue' mr={3}>
                Publicar
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </form>
    </>
  );
}
