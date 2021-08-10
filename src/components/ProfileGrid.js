import { Flex, SimpleGrid } from '@chakra-ui/react';
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
      .collection(`${actualUser && actualUser.uid}`)
      .doc('/userPost')
      .collection(`${actualUser && actualUser.displayName}`);
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

  return (
    <Flex mb='3rem' alignContent='center' justify='center'>
      <SimpleGrid minW='5rem' columns={[3]} gap={[3, 5, 10]}>
        {post &&
          post.map((data, i) => {
            return (
              <ProfilePost
                actualUser={actualUser}
                key={i}
                title={data.title}
                description={data.description}
                review={data.reseña}
                qualy={data.qualy}
                image={data.image}
              />
            );
          })}
      </SimpleGrid>
    </Flex>
  );
}
