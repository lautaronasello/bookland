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
  useToast,
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
  const [image, setImage] = useState('');
  const [qualy, setQualy] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [file, setFile] = useState();
  const [author, setAuthor] = useState('');
  const toast = useToast();

  var handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  var handleChangeReseña = (e) => {
    setReseña(e.target.value);
  };
  var handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  var handleChangeAuthor = (e) => {
    setAuthor(e.target.value);
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

  var toastAppears = () => {
    toast({
      title: 'Publicado!',
      description: 'La publicacion se ha subido satisfactoriamente.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  var handleUpload = (e) => {
    var files = e.target.files[0];
    setFile(files.name);
    var storageRef = storage
      .ref('post')
      .child(`${actualUser.displayName}/${files.name}`);

    storageRef.put(files).on(
      'state_changed',
      (snapshot) => {
        let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadValue(percent);
      },
      (err) => {
        console.log('error progreso: ', err);
      }
    );

    setLoadingProgress(true);
  };

  useEffect(() => {
    let mounted = true;
    if (uploadValue === 100) {
      storage
        .ref('post')
        .child(`${actualUser.displayName}/${file}`)
        .getDownloadURL()
        .then((url) => {
          if (mounted) setImage(url);
          console.log('se pudo');
        })
        .catch((e) => {
          console.log('algo paso, ', e);
        });
    }

    return () => (mounted = false);
  }, [uploadValue, actualUser, file]);

  useEffect(() => {
    if (uploadValue === 100) setLoadingProgress(false);
  }, [uploadValue]);

  var f = new Date();
  var handleSubmit = (e) => {
    e.preventDefault();
    var title = e.target[1].value;
    var author = e.target[2].value;
    var reseña = e.target[3].value;
    var description = e.target[4].value;
    var userUid = actualUser.uid;
    var date = f.getDate() + '/' + (f.getMonth() + 1) + '/' + f.getFullYear();

    db.collection('/database')
      .doc('/post')
      .collection(`/${userUid}_${actualUser && actualUser.displayName}`)
      .doc(`${title}`)
      .set({
        title: `${title}`,
        author: `${author}`,
        reseña: `${reseña}`,
        description: `${description}`,
        image: `${image}`,
        qualy: `${qualy}`,
        date: `${date}`,
      })
      .then(() => {
        setTitle('');
        setReseña('');
        setDescription('');
        setUploadValue(0);
        onClose();
        toastAppears();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    db.collection('/database')
      .doc('/allPost')
      .collection('/docs')
      .doc(`${title}_${actualUser.displayName}`)
      .set({
        user: actualUser.displayName,
        userPhoto: actualUser.photoURL,
        title: `${title}`,
        author: `${author}`,
        reseña: `${reseña}`,
        description: `${description}`,
        image: `${image}`,
        qualy: `${qualy}`,
        date: `${date}`,
      })
      .then((docRef) => {
        setTitle('');
        setAuthor('');
        setReseña('');
        setDescription('');
        setUploadValue(0);
        onClose();
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
                  onChange={handleChangeAuthor}
                  value={author}
                  placeholder='autor'
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
                <Input
                  onChange={handleChangeReseña}
                  value={reseña}
                  placeholder='titulo de reseña'
                />
              </FormControl>
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
