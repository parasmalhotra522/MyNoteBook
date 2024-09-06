import React, { useContext } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    Button,
    Box,
    Text,
    Radio,
    RadioGroup,
    Stack,
    Spinner,
    Flex,
    useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import NoteContext from '../context/notes/notes.context'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from './auth/useCookies';


const AddNote = () => {

    const [note, setNote] = useState({ title: '', description: '', tag: '' });
    const { getCookies } = useCookies();
    const token = getCookies().token;
    const { notes, setNotes } = useContext(NoteContext);
    const toast = useToast();
    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    }
    const handleTagChange = (val) => {
        setNote((prevNote) => ({
            ...prevNote,
            tag: val
        }))
    }

    const addNewNote = async () => {
        // localhost:8081/api/v1/notes/createNote
        const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/notes/createNote`, note,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return data;
    }


    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate();

    }
   

    const mutation = useMutation({
        mutationFn: addNewNote,
        onSuccess: ({ data }) => {
            toast({
                title: data.message,
                // description: "New Note Added to Database",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
            // console.log("0---- Checking the data form api call", data.notes);
            setNotes([...notes, data.notes]);
            setNote({
                title: '',
                description: '',
                tag: ''
            });
        },
        onError: (error) => {
            toast({
                title: 'Error Occured !',
                description: error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
        }
    })


    return (
        <>
            <VStack
                maxW='100%'
                w={['100%', '40rem']}
                margin={['0.2rem', '2rem']}
                p={['2rem', '2rem']}
            >
                <Box
                    d='flex'
                    justifyContent="center"
                    p={3}
                    bg='white'
                    w='100%'
                    m="40px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                >
                    <Text fontSize="4xl" fontFamily='Work sans'
                        textAlign={"center"}
                        color="black"> Create a new Note </Text>
                </Box>

                <Box
                    d='flex'
                    flexDirection="column"
                    alignItems="center"
                    p={['3rem', '3rem']}
                    bg='white'
                    w='100%'
                    m="0px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                >
                    {/* Ensure Spinner visibility */}
                    {mutation.isPending && <Flex
                        align="center"
                        justify="center"
                        w='100%'
                        h='100%'  // Ensure it has a height
                        mb={4}

                    >
                        <Spinner size='xl' color='red' />
                    </Flex>
                    }
                    <FormControl m={2}>
                        <FormLabel>Title</FormLabel>
                        <Input type='text'
                            name='title'
                            id='title'
                            value={note.title}
                            onChange={handleChange}
                        />
                        {/* <FormHelperText>Title for the Note</FormHelperText> */}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder='Description for Notes'
                            name='description'
                            id='description'
                            value={note.description}
                            onChange={handleChange}
                        />
                        {/* <FormHelperText>Desc for the Note</FormHelperText> */}
                    </FormControl>

                    <RadioGroup
                        m='2rem'
                        name='tag'
                        onChange={handleTagChange}
                        value={note.tag}
                    >
                        <Stack direction='row'>
                            <Radio value='Private'>Private</Radio>
                            <Radio value='Public'>Public</Radio>
                            <Radio value='Others'>Others</Radio>
                        </Stack>
                    </RadioGroup>

                    <Button
                        m={['2rem', '3rem']}
                        bgColor='white'
                        color='gray.800'
                        border={['1px solid #1A202C']}
                        borderRadius='53px'
                        _hover={{
                            color: 'white',
                            bgColor: 'gray.800',
                            transform: 'scale(1.2)',
                            transition: '.6s all ease-in-out',
                        }}
                        onClick={handleClick}
                    >
                        Submit
                    </Button>
                </Box>
            </VStack>

        </>
    )
}

export default AddNote
