import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';
import { db } from '..';

export default function ToReadList({ actualUser }) {
  const [titleToAdd, setTitleToAdd] = useState('');
  const [list, setList] = useState([]);

  var handleCheck = (id) => {
    var docStyle = document.getElementsByClassName(id);
    var decoration = docStyle[0].style.textDecoration;
    if (decoration === 'line-through') docStyle[0].style.textDecoration = '';
    if (decoration === '') docStyle[0].style.textDecoration = 'line-through';

    console.log(docStyle[0].style);
  };

  var handleChange = (e) => {
    setTitleToAdd(e.target.value);
  };

  var handleUpload = (e) => {
    e.preventDefault();
    db.collection(`${actualUser.displayName}`)
      .doc('list')
      .collection('/titles')
      .add({
        title: titleToAdd,
        textDecoration: '',
      })
      .then(() => {
        setTitleToAdd('');
      });
  };

  const dbRef = db
    .collection(`${actualUser && actualUser.displayName}`)
    .doc('/list')
    .collection('/titles');

  useEffect(() => {
    let mounted = true;

    dbRef.onSnapshot((querySnapshot) => {
      var post = [];
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
                  <Checkbox
                    key={i}
                    className={data.title}
                    onChange={() => handleCheck(data.title)}
                  >
                    {data.title}
                  </Checkbox>
                );
              })}
          </CheckboxGroup>
        </Stack>
        <InputGroup>
          <Input
            m='0'
            px='2rem'
            _focus={{ outline: 'none' }}
            bg='#fff'
            rounded='none'
            placeholder='Quiero leer'
            value={titleToAdd}
            onChange={handleChange}
          />
          <InputRightElement w='7rem'>
            <Button
              rounded='none'
              colorScheme='blue'
              w='100%'
              onClick={handleUpload}
            >
              Agregar
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
    </Box>
  );
}
