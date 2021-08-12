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
        zIndex='1100'
        pos={['fixed', null]}
        fontFamily='Montserrat'
        w='100%'
        bg='#fff'
        top='0rem'
        px={['1rem', '8rem']}
        minH='4rem'
        maxH='6rem'
        borderTop='1px'
        borderBottom='1px'
        borderColor='#dbdbdb'
        align='center'
      >
        <Link to='/home'>
          <Heading color='#dfc690' fontSize={['1.5rem', '2.3rem']}>
            Bookgrand
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
        {width < 1000 && (
          <>
            <Spacer />
            <MenuNav actualUser={actualUser} onOpen={onOpen} />
          </>
        )}
      </Flex>
      <Flex w='100%' minH='4rem'></Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalPost actualUser={actualUser} onClose={onClose} />
      </Modal>
    </>
  );
}
