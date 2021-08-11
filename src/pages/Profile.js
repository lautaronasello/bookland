import { Center } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
import ProfileGrid from '../components/ProfileGrid';
import ProfileHeader from '../components/ProfileHeader';
import firebase from 'firebase/app';
import { useState } from 'react';

export default function Profile() {
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
      <Navbar />
      <ProfileHeader actualUser={actualUser} />
      <Center mt='5rem' my='3rem'>
        <hr style={{ color: '#dbdbdb', width: '70%' }} />
      </Center>
      <ProfileGrid actualUser={actualUser && actualUser} />
    </>
  );
}
