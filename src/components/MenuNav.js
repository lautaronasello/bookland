import React from 'react';
import {
  Box,
  Divider,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaPlus, FaSortDown } from 'react-icons/fa';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';

export default function MenuNav({ onOpen, actualUser }) {
  var handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.pathname = '/';
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Menu size='sm'>
        <MenuButton
          as={IconButton}
          aria-label='add-post'
          ms='0.5rem'
          rounded='full'
          bg='#dfc690'
          icon={<FaPlus />}
          onClick={onOpen}
        />
      </Menu>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='add-post'
          mx='0.5rem'
          rounded='full'
          icon={<FaSortDown />}
        />
        <MenuList zIndex='10001' m='0' p='0'>
          <Link to='/profile'>
            <MenuItem h='5rem'>
              <Image
                src={actualUser && actualUser.photoURL}
                w='2.5rem'
                h='2.5rem'
                rounded='full'
              />
              <Box mx='1rem'>{actualUser && actualUser.displayName}</Box>
            </MenuItem>
          </Link>
          <Divider />
          <MenuItem onClick={handleLogout}>Salir</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
