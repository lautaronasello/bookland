import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { db } from '..';

export default function PorfileMenuDelete({ actualUser, title, onClose }) {
  const toast = useToast();

  var toastAppears = () => {
    toast({
      title: 'Publicacion eliminada',
      description: 'La publicacion ha sido eliminadas satisfactoriamente.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const dbRefProfile = db
    .collection('/database')
    .doc('/post')
    .collection(
      `${actualUser && actualUser.uid}_${actualUser && actualUser.displayName}`
    );
  const dbRefHome = db
    .collection('/database')
    .doc('/allPost')
    .collection('/docs');

  var handleDelete = () => {
    dbRefProfile
      .doc(`${title}`)
      .delete()
      .then(() => {
        dbRefHome
          .doc(`${title}_${actualUser.displayName}`)
          .delete()
          .then(() => {
            onClose();
            toastAppears();
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FaEllipsisH />}
        variant='ghost'
        aria-label='Options'
      />
      <MenuList>
        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
      </MenuList>
    </Menu>
  );
}
