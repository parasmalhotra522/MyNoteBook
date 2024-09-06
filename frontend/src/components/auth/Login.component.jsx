import React, { useContext, useState } from 'react'

import {
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useToast,
  Spinner,
  Box
} from '@chakra-ui/react'



import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import NoteContext from '../../context/notes/notes.context';
import { useCookies } from './useCookies';

export default function Login() {

  const [formData, SetFormData] = useState({
    emailId: '',
    password: '',
  });
  const [error, setError] = useState({
    emailIdError: '',
    passwordError: '',
  });

  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { logUser } = useContext(NoteContext);
  const { setCookies } = useCookies();

  // console.log("checkign form data", formData);

  const handleOnChange = async (property, value) => {
    SetFormData({ ...formData, [property]: value });
    validateField(property, value);
  }

  const handleOnShow = () => {
    setShow(!show);
  }

  const validateField = (property, value) => {
    let updatedErrors = { ...error };

    switch (property) {
      case 'emailId':
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        updatedErrors.emailIdError = emailRegex.test(value.trim()) ? '' : '* Please Enter a Valid Email';
        break;
      default:
        break;
    }
    setError(updatedErrors);
  }

  const handleLogInMutation = () => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logIn`, formData,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }


  const mutation = useMutation({
    mutationFn: handleLogInMutation,
    onSuccess: async({ data }) => {

      toast({
        title: "LogIn Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
      console.log("Checking the data getting after login...", data);
      
      // Setting up the User in the cookie and updating current user as the one logged In
      
      await setCookies(data);
      await logUser(data);
       
      // localStorage.setItem('user', JSON.stringify(data));
      navigate('/home');
    },

    onError: (error) => {
      console.error("Error creating post:", error);
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    },
  },
  )
  const handleOnSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(); // Triggering the mutation 
  }

  return (
    <Box>
      {
        mutation.isPending &&
        (<Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="rgba(255, 255, 255, 0.8)"
          zIndex="overlay"
        >
          <Spinner size="xl" />
        </Box>)
      }

      <VStack
        spacing={4}
        align='stretch'>
        <FormControl isRequired id='emailId'>
          <FormLabel>Email</FormLabel>
          <Input placeholder='enter your Email Id'
            id="emailID"
            value={formData.emailId}
            onChange={(e) => { handleOnChange('emailId', e.target.value) }} />

          {
            error.emailIdError && (
              <FormHelperText color={'red'}>
                {/* {console.log('!!!!!!!inside label', error.emailIdError)} */}
                {error.emailIdError}
              </FormHelperText>
            )
          }


        </FormControl>

        <FormControl isRequired id='password'>
          <FormLabel>Password</FormLabel>
          <InputGroup>

            <Input placeholder='Enter your Password'
              value={formData.password}
              type={show ? 'text' : 'password'}
              id="loginpassword"
              onChange={(e) => { handleOnChange('password', e.target.value) }} />

            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleOnShow}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>

          </InputGroup>

          {
            error.passwordError && (
              <FormHelperText color={'red'}>
                {error.passwordError}
              </FormHelperText>
            )
          }
        </FormControl>

        {mutation.isLoading ? <Spinner /> : ''}


        {/* {console.log('----Check--', Object.values(formData).every(e=>e !== ''))} */}
        <Button
          isLoading={mutation.isPending}
          loadingText='Submitting'
          onClick={handleOnSubmit}
          isDisabled={!Object.values(formData).every(e => e !== '')}
          variant='outline'
          colorScheme='teal'

        >
          LogIn
        </Button>

        <Button
          onClick={() => {
            SetFormData({
              emailId: "guest@example.com",
              password: "Guest$123"
            })
          }}
          colorScheme='red'
          width='100%'
          variant='solid'
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </Box>
  )
}
