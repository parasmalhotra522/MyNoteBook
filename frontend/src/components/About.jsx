import React from 'react'
import { Text, Flex } from '@chakra-ui/react';

const About = () => {
   
  return (
    <>  
      <Flex
      mt='20%'
        justifyContent='center'
      alignSelf='center'
      >
        <Text ml='3rem' mr='3rem'>
          This is the Notes Application, where the user can Create, Update, Delete the notes. These all notes are private to the user itself. Only the notes created by one user will be visible to themselves.
          We value privacy, so no data is visible outside the scope of the application to any other user.
        </Text>
      </Flex> 
      </>
  )
}

export default About
