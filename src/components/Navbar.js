import { Flex, Heading, Modal, Spacer, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import BtnNav from './BtnNav';
import MenuNav from './MenuNav';
import ModalPost from './ModalPost';
import useWindowDimensions from './useWindowDimensions';
import firebase from 'firebase/app';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width } = useWindowDimensions();
  const [actualUser, setActualUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setActualUser(user);
    } else {
      console.log('no hay nadie');
    }
  });

  return (
    <>
      <Flex
        zIndex='10001'
        pos={['fixed', null]}
        fontFamily='Montserrat'
        w='100%'
        bg='#fafafa'
        top='0rem'
        px={['1rem', '8rem']}
        minH='4rem'
        maxH='6rem'
        borderBottom='1px'
        borderColor='#f6f7f8'
        align='center'
      >
        <Link to='/home'>
          <Heading color='#f1e5cb' fontSize='2.3rem'>
            Bookagram
          </Heading>
        </Link>
        {width >= 1000 && (
          <>
            <Spacer />
            <BtnNav actualUser={actualUser} />
            <Spacer />
            <MenuNav actualUser={actualUser} onOpen={onOpen} />
          </>
        )}
      </Flex>
      <Flex w='100%' minH='4rem'></Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalPost onClose={onClose} />
      </Modal>
    </>
  );
}
