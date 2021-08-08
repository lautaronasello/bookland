import { StarIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import React from 'react';

export default function StarReview({ qualy }) {
  var starReview = (numberStars) => {
    if (numberStars === '1')
      return (
        <>
          <StarIcon color='gold' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
        </>
      );
    if (numberStars === '2')
      return (
        <>
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
        </>
      );
    if (numberStars === '3')
      return (
        <>
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gray.300' />
          <StarIcon color='gray.300' />
        </>
      );
    if (numberStars === '4')
      return (
        <>
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gold' />
          <StarIcon color='gray.300' />
        </>
      );
    return (
      <>
        <StarIcon color='gold' />
        <StarIcon color='gold' />
        <StarIcon color='gold' />
        <StarIcon color='gold' />
        <StarIcon color='gold' />
      </>
    );
  };
  return <Text>{starReview(qualy)}</Text>;
}
