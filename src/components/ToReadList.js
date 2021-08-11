import {
  Box,
  Button,
  CheckboxGroup,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '..';

export default function ToReadList({ actualUser }) {
  const [titleToAdd, setTitleToAdd] = useState('');
  const [list, setList] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dbRef = db
    .collection(`${actualUser && actualUser.displayName}`)
    .doc('/list')
    .collection('/titles');

  useEffect(() => {
    if (titleToAdd.length !== 0) {
      setIsButtonDisabled(false);
    } else setIsButtonDisabled(true);
  }, [titleToAdd]);

  var handleChange = (e) => {
    setTitleToAdd(e.target.value);
  };

  var handleUpload = (e) => {
    e.preventDefault();
    db.collection(`${actualUser.displayName}`)
      .doc('list')
      .collection('/titles')
      .doc(`${titleToAdd}`)
      .set({
        title: titleToAdd,
      })
      .then(() => {
        setTitleToAdd('');
      });
  };

  useEffect(() => {
    let mounted = true;
    dbRef.onSnapshot((querySnapshot) => {
      let post = [];
      querySnapshot.forEach((doc) => {
        post.push(doc.data());
      });
      if (mounted) {
        setList(post);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, [actualUser, dbRef]);

  var handleSubmit = (e) => {
    var docDelete = e.target.children[0].children[0].children[0].innerHTML;
    e.preventDefault();
    db.collection(`${actualUser.displayName}`)
      .doc('list')
      .collection('/titles')
      .doc(`${docDelete}`)
      .delete();
  };

  return (
    <Box bg='#dfc690' w='30%' pos='fixed' h='fit-content' maxH='80%'>
      <VStack align='start' spacing='1rem'>
        <Box
          w='100%'
          textAlign='center'
          px='2rem'
          h='15%'
          fontSize='2rem'
          fontWeight='medium'
        >
          Libros a leer
        </Box>
        <Stack px='2rem' h='70%'>
          <CheckboxGroup colorScheme='orange'>
            {list &&
              list.map((data, i) => {
                return (
                  <form onSubmit={handleSubmit} key={i}>
                    <HStack>
                      <Box>
                        <Text display='inline'>{data.title}</Text>
                        <Button
                          size='sm'
                          mx='0.5rem'
                          bg='transparent'
                          type='submit'
                          _hover={{ bg: 'transparent' }}
                          _focus={{ outline: 'none' }}
                        >
                          x
                        </Button>
                      </Box>
                    </HStack>
                  </form>
                );
              })}
          </CheckboxGroup>
        </Stack>
        <InputGroup>
          <Input
            m='0'
            px='1rem'
            _focus={{ outline: 'none' }}
            bg='#fff'
            rounded='none'
            placeholder='Quiero leer'
            value={titleToAdd}
            onChange={handleChange}
          />
          <InputRightElement w='7rem'>
            {isButtonDisabled ? (
              <Button disabled rounded='none' colorScheme='blue' w='100%'>
                Agregar
              </Button>
            ) : (
              <Button
                rounded='none'
                colorScheme='blue'
                w='100%'
                onClick={handleUpload}
              >
                Agregar
              </Button>
            )}
          </InputRightElement>
        </InputGroup>
      </VStack>
    </Box>
  );
}
