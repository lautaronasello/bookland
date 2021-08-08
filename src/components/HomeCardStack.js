import { VStack } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '..';
import HomeCard from '../components/HomeCard';

export default function HomeCardStack() {
  const [card, setCard] = useState([]);
  const dbRef = db.collection('/database').doc('/allPost').collection('/docs');

  useEffect(() => {
    let mounted = true;
    dbRef.onSnapshot((querySnapshot) => {
      var cardHome = [];
      querySnapshot.forEach((doc) => {
        cardHome.push(doc.data());
      });
      if (mounted) {
        setCard(cardHome);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, [dbRef]);

  return (
    <VStack w={[null, null, null, '60%']} spacing='5rem'>
      {card &&
        card.map((data, i) => {
          return (
            <HomeCard
              key={i}
              date={data.date}
              user={data.user}
              userPhoto={data.userPhoto}
              title={data.title}
              reseña={data.reseña}
              qualy={data.qualy}
              image={data.image}
              description={data.description}
            />
          );
        })}
    </VStack>
  );
}
