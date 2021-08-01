import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaCircle, FaPlus, FaSortDown } from 'react-icons/fa';
import BtnNav from './BtnNav';
import ModalPost from './ModalPost';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        fontFamily='Montserrat'
        w='100%'
        bg='withesmoke'
        px='8rem'
        minH='4rem'
        maxH='6rem'
        borderBottom='1px'
        borderColor='#f6f7f8'
        align='center'
      >
        <Heading color='#f1e5cb' fontSize='2.5rem'>
          Bookland
        </Heading>
        <Spacer />
        <BtnNav />
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='add-post'
            mx='0.5rem'
            rounded='full'
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
          <MenuList m='0' p='0'>
            <MenuItem h='5rem'>
              <FaCircle /> <Box mx='1rem'>Lautaronasello</Box>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                window.location.pathname = '/';
              }}
            >
              Salir
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalPost onClose={onClose} />
      </Modal>
    </>
  );
}
