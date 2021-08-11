import { Center, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { db } from '..';
import ProfilePost from './ProfilePost';

export default function ProfileGrid({ actualUser }) {
  const [post, setPost] = useState();

  useEffect(() => {
    let mounted = true;
    const dbRef = db
      .collection('/database')
      .doc('/post')
      .collection(
        `${actualUser && actualUser.uid}_${
          actualUser && actualUser.displayName
        }`
      );

    dbRef.onSnapshot((querySnapshot) => {
      var post = [];
      querySnapshot.forEach((doc) => {
        post.push(doc.data());
      });
      if (mounted) {
        setPost(post);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, [actualUser]);

  if (post && post.lenght === 0) {
    return (
      <Flex mb='3rem' alignContent='center' justify='center'>
        <Center>Sube una publicacion para que te aparezca en el feed!</Center>
      </Flex>
    );
  }
  return (
    <Flex mb='3rem' alignContent='center' justify='center'>
      {post === undefined || post.length === 0 ? (
        <Center>Sube una publicacion para que te aparezca en el feed!</Center>
      ) : (
        <SimpleGrid minW='5rem' columns={[3]} gap={[3, 5, 10]}>
          {post &&
            post.map((data, i) => {
              return (
                <ProfilePost
                  actualUser={actualUser}
                  key={i}
                  title={data.title}
                  author={data.author}
                  description={data.description}
                  review={data.reseña}
                  qualy={data.qualy}
                  image={data.image}
                />
              );
            })}
        </SimpleGrid>
      )}
    </Flex>
  );
}
