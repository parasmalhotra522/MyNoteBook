import React from 'react'
import { Card, Flex, Stack, CardHeader, Heading, CardBody, StackDivider, Text, Box, Spacer, useDisclosure } from '@chakra-ui/react';
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  RadioGroup,
  Radio,
  useToast,
  Spinner,
  Icon
} from '@chakra-ui/react'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from './auth/useCookies';
import { useContext } from 'react';
import NoteContext from '../context/notes/notes.context';
import { format } from 'date-fns';

const Note = ({ note }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getCookies } = useCookies();
  const token = getCookies().token;
  const [currentNote, setCurrentNote] = useState(note);
  const toast = useToast();
  const { setNotes } = useContext(NoteContext);

  const handleChange = (e) => {
    setCurrentNote((prevNote) => ({
      ...prevNote,
      [e.target.name]: e.target.value
    }));
  }
  const handleTagChange = (val) => {
    setCurrentNote((prevNote) => ({
      ...prevNote,
      tag: val
    }))
  }

  const onClickUpdate = (e) => {
    // console.log("----Checking the current Note", currentNote);
    e.preventDefault();
    mutation.mutate();
  }

  const handleDelete = (e) => {
    e.preventDefault();
    mutation2.mutate();
  }

  const deleteNote = async () => {
    //  localhost:8081/api/v1/notes/deleteNote/6690384fd147c08c2c7f5ada
    const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/notes/deleteNote/${currentNote._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    // console.log("---CHecking the data...", data);
    return data;
  }
  const mutation2 = useMutation({
    mutationFn: deleteNote,
    onSuccess: ({ data }) => {

      // console.log("--- Data updated success ", data);
      toast({
        title: data.message,
        // description: "New Note Added to Database",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
      setNotes(data.notes);
      onClose();
    },
    onError: (error) => {
      // console.log(error);
      toast({
        title: 'Error!! Please check the data for Deletion',
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }

  })

  const updateNote = async () => {
    // localhost:8081/api/v1/notes/updateNote/66902b1d114e93e16285e267
    // console.log("Update note", currentNote);
    const data = await axios.put(`${process.env.REACT_APP_BASE_URL}/notes/updateNote/${currentNote._id}`,
      currentNote,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    // console.log("---CHecking the data...", data);
    return data;
  }

  const mutation = useMutation({
    mutationFn: updateNote,
    onSuccess: ({ data }) => {

      console.log("--- Data updated success ", data);
      toast({
        title: data.message,
        // description: "New Note Added to Database",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
      setNotes((prevNotes) =>
        prevNotes.map((nt) =>
          nt._id === currentNote._id ? { ...nt, ...currentNote } : nt
        )
      );
      onClose();
    },
    onError: (error) => {
      // console.log(error);
      toast({
        title: 'Error!! Please check the data for updation',
        // description: error.error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }
  })

  return (
    <>


      <Card
        width="100%"
        height="18rem"
        cursor='pointer'
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.200"
        _hover={{ boxShadow: 'md', transform: 'scale(1.02)', transition: '0.2s ease-in-out' }}
      >
        <CardHeader display="flex" alignItems="center" bg="gray.100" borderTopRadius="lg">
          <Flex width="100%" alignItems="center">
            <Heading size="md" color="blue.600">{note.title} - {format(note.date, 'dd/mm/yyyy')}</Heading>
            <Spacer />

            <Flex>
              <Icon
                as={MdEdit}
                cursor="pointer"
                boxSize="1.6rem"
                mr="0.5rem"
                onClick={onOpen}
                color="blue.600"
                _hover={{ color: 'blue.800' }}
                _active={{ color: 'blue.900' }}
              />
              <Icon
                as={MdDelete}
                cursor="pointer"
                boxSize="1.6rem"
                onClick={handleDelete}
                color="red.600"
                _hover={{ color: 'red.800' }}
                _active={{ color: 'red.900' }}
              />
            </Flex>
          </Flex>
        </CardHeader>

        <CardBody bg="gray.50">
          <Stack divider={<StackDivider />} spacing={4}>
            <Box>
              <Heading size="xs" textTransform="uppercase" color="gray.500">
                Description
              </Heading>
              <Text pt={2} fontSize="sm" color="gray.700">
                {note.description}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>



      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Note - {currentNote.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder='Title'
                value={currentNote.title}
                id='title'
                name='title'
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder='Description'
                id='description'
                name='description'
                value={currentNote.description}
                onChange={handleChange} />

            </FormControl>
            <RadioGroup
              m='2rem'
              name='tag'
              onChange={handleTagChange}
              value={currentNote.tag}
            >
              <Stack direction='row'>
                <Radio value='Private'>Private</Radio>
                <Radio value='Public'>Public</Radio>
                <Radio value='Others'>Others</Radio>
              </Stack>
            </RadioGroup>
            {mutation.isPending
              &&
              (<Flex>
                <Spinner size='xl' color='red' />
              </Flex>)}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}
              onClick={onClickUpdate}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Note
