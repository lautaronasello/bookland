import { GridItem, Image, Modal, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ProfileModalPost from './ProfileModalPost';

export default function ProfilePost({
  title,
  review,
  qualy,
  description,
  image,
  actualUser,
  author,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <GridItem
        w={['6rem', '10rem', '15rem']}
        h={['6rem', '10rem', '15rem']}
        shadow='sm'
        cursor='pointer'
        _hover={{
          shadow: 'md',
        }}
        onClick={onOpen}
      >
        <Image w='100%' h='100%' src={image} />
      </GridItem>
      <Modal
        size={['sm', 'sm', 'xl']}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ProfileModalPost
          actualUser={actualUser}
          title={title}
          author={author}
          description={description}
          url={image}
          review={review}
          qualy={qualy}
          onClose={onClose}
        />
      </Modal>
    </>
  );
}
