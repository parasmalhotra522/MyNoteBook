import { Container, Spinner, Text, SimpleGrid, Flex, Heading } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import Note from './Note';
import NotesContext from '../context/notes/notes.context';
import AddNote from './AddNote';


const Notes = () => {
  const { notes, isPending, isError } = useContext(NotesContext);

  useEffect(() => {
    console.log('notes', notes);
  }, [])


  if (isError) return
  return (
    <Container maxW='container.2xl' p={4}>
      <Flex justifyContent='center'>
        <AddNote />
      </Flex>

      {
        isPending &&
        (<Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          h="100vh" // Ensures the container takes the full viewport height
          w="100%"  // Ensures the container takes the full width of its parent
          position="absolute" // Use absolute positioning if needed to overlay content
          top="0"
          left="0"
          zIndex="999" // Ensure it appears above other content
        >
          <Spinner size='xl' color='red' />
        </Flex>)
      }
      {
        isError &&
        (<Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          h="100vh" // Ensures the container takes the full viewport height
          w="100%"  // Ensures the container takes the full width of its parent
          position="absolute" // Use absolute positioning if needed to overlay content
          top="0"
          left="0"
          zIndex="999" // Ensure it appears above other content
        >
          <Text>Error fetching notes</Text>;
        </Flex>)
      }

      {notes &&
        <>
          <Flex justifyContent='center'><Heading>Notes</Heading></Flex>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            margin='2rem'
            spacing={15} >

            {
              // console.log('--CHeck notes', notes)
              notes.map((note) => (
                <Note key={note._id} note={note} />
              )
              )
            }
          </SimpleGrid>
        </>
      }


    </Container>
  )
}

export default Notes
