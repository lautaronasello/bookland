import { Box, Icon, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function BtnNav({ actualUser }) {
  const [styleHome, setStyleHome] = useState('#f1e5cb');
  const [styleProfile, setStyleProfile] = useState(null);

  var location = window.location.pathname;

  useEffect(() => {
    if (location === '/home') {
      setStyleHome('#f1e5cb');
      setStyleProfile(null);
    } else if (location === '/profile') {
      setStyleHome(null);
      setStyleProfile('#f1e5cb');
    }
  }, [location]);

  return (
    <>
      <Link to='/home'>
        <Box
          me='0.5rem'
          h='4rem'
          cursor='pointer'
          borderBottom='4px'
          borderColor={styleHome ? styleHome : '#f0f1f4'}
        >
          <Icon
            as={FaHome}
            w='4rem'
            h='2.5rem'
            pos={[null, 'relative']}
            top={[null, '1rem']}
          />
        </Box>
      </Link>
      <Link to='/profile'>
        <Box
          h='4rem'
          w='4rem'
          align='center'
          cursor='pointer'
          borderBottom='4px'
          borderColor={styleProfile ? styleProfile : '#f0f1f4'}
        >
          <Image
            src={actualUser && actualUser.photoURL}
            w='2.5rem'
            h='2.5rem'
            rounded='full'
            pos={[null, 'relative']}
            top={[null, '1rem']}
          />
        </Box>
      </Link>
    </>
  );
}
