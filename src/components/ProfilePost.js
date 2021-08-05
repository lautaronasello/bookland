import { GridItem, Image, Modal, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { storage } from '..';
import ProfileModalPost from './ProfileModalPost';

export default function ProfilePost({
  title,
  review,
  qualy,
  description,
  image,
  actualUser,
}) {
  const [url, setUrl] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    storage
      .ref(`fotos/`)
      .child(`${image}`)
      .getDownloadURL()
      .then((url) => {
        setUrl(url);
      });
  }, [image]);

  return (
    <>
      <GridItem
        w='15rem'
        h='15rem'
        shadow='sm'
        cursor='pointer'
        _hover={{
          shadow: 'md',
        }}
        onClick={onOpen}
      >
        <Image w='100%' h='100%' src={url} />
      </GridItem>
      <Modal size='xl' isCentered isOpen={isOpen} onClose={onClose}>
        <ProfileModalPost
          actualUser={actualUser}
          title={title}
          description={description}
          url={url}
          review={review}
          qualy={qualy}
        />
      </Modal>
    </>
  );
}
