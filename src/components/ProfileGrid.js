import { Flex, GridItem, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

export default function ProfileGrid() {
  return (
    <Flex mb='3rem' alignContent='center' justify='center'>
      <SimpleGrid minW='5rem' columns={[1, 3]} gap={10}>
        <GridItem w='15rem' h='15rem' bg='tomato'></GridItem>
        <GridItem w='15rem' h='15rem' bg='tomato'></GridItem>
        <GridItem w='15rem' h='15rem' bg='tomato'></GridItem>
        <GridItem w='15rem' h='15rem' bg='tomato'></GridItem>
        <GridItem w='15rem' h='15rem' bg='tomato'></GridItem>
        <GridItem w='15rem' h='15rem' bg='tomato'></GridItem>
      </SimpleGrid>
    </Flex>
  );
}
