import { Center, Divider } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
import ProfileGrid from '../components/ProfileGrid';
import ProfileHeader from '../components/ProfileHeader';

export default function Profile() {
  return (
    <>
      <Navbar />
      <ProfileHeader />
      <Center mt='5rem' my='3rem'>
        <Divider w='70%' />
      </Center>
      <ProfileGrid />
    </>
  );
}
