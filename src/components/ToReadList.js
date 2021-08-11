import {
  Box,
  Button,
  CheckboxGroup,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
        setIsLoading(false);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, [actualUser, dbRef]);

  var handleDelete = (e) => {
    setIsLoading(true);
    var docDelete = e.target.children[0].children[0].children[0].innerHTML;
    e.preventDefault();
    db.collection(`${actualUser.displayName}`)
      .doc('list')
      .collection('/titles')
      .doc(`${docDelete}`)
      .delete();
  };

  if (isLoading)
    return (
      <Box
        bg='#dfc690'
        w='30%'
        pos='fixed'
        minH='30%'
        h='fit-content'
        maxH='80%'
      >
        <Flex
          pos='relative'
          top='8rem'
          align='center'
          justify='center'
          minH='100%'
        >
          <Spinner aria-label='loading' size='md' color='white' />
        </Flex>
      </Box>
    );

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
        {list.length === 0 && (
          <Box textAlign='center' px='2rem'>
            Agrega cualquier título a tu lista de libros a leer apretando sobre
            el título en la publicación o agregándolo abajo!
          </Box>
        )}
        {list.length >= 1 && (
          <Stack px='2rem' h='70%'>
            <CheckboxGroup colorScheme='orange'>
              {list &&
                list.map((data, i) => {
                  return (
                    <form onSubmit={handleDelete} key={i}>
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
        )}
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
