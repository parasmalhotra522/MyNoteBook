import React, { useState } from 'react'
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
    Box,
    Spinner
} from '@chakra-ui/react'
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export default function SignUp() {

    const [show, setShow] = useState(false);
    const [formData, SetFormData] = useState({
        name: '',
        emailId: '',
        password: '',
        confirmPassword: '',
        profilePicture: ''
    });

    const [error, setError] = useState({
        nameError: '',
        emailIdError: '',
        passwordError: '',
        confirmPasswordError: '',
        profilePictureError: ''

    });
    const toast = useToast();


    const handleOnChange = async (property, value) => {

        const updatedFormData = { ...formData, [property]: value };
        SetFormData(updatedFormData);
        validateField(property, value);

    }

    const validateField = (property, value) => {
        let updatedErrors = { ...error };

        switch (property) {
            case 'name':
                // const nameRegex = /^[a-zA-Z]{2,30}$/;
                const nameRegex = /^[a-zA-Z ]{2,30}$/;
                updatedErrors.nameError = nameRegex.test(value.trim()) ? '' : '* Name should contain only alphabetic characters and be between 2 to 30 characters long';
                break;

            case 'emailId':
                const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                updatedErrors.emailIdError = emailRegex.test(value.trim()) ? '' : '* Please Enter a Valid Email';
                break;

            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                updatedErrors.passwordError = passwordRegex.test(value) ? '' : '* Password should be Atleast 8 character long \n Should contain atleast 1 upper, 1 lower and 1 digit and should contain Special character';
                break;

            case 'confirmPassword':
                updatedErrors.confirmPasswordError = value === formData.password ? '' : '* Password and Confirm Password don\'t Match';
                break;

            default:
                break;
        }

        setError(updatedErrors);
    };

    const handleOnShow = () => setShow(!show);

    const handleSignUpMutation = async () => {

        if (formData.profilePicture) {
            const data = new FormData();
            data.append("file", formData.profilePicture);
            data.append("upload_preset", "chatApplication");
            data.append("cloud_name", "dbmvjkopn");
            const imgData = await fetch(`https://api.cloudinary.com/v1_1/dbmvjkopn/image/upload`,
                { method: "POST", body: data }
            ).then((res) => res.json())
            formData.profilePicture = imgData.url.toString();

        }

        const  {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth`,
            formData,
            {
                headers: { "Content-type": "application/json", }
            }
        );
        return data;
    }

    // ---- Handling onsubmit functionality 
    const handleOnSubmit = (e) => {
        e.preventDefault();
        mutation.mutate();
    }


    const mutation = useMutation({
        mutationFn: handleSignUpMutation,
        onSuccess:  (data) => {
            toast({
                title: "Registration Successful",
                description: "Please sign in to access the application",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
            // navigate('/');
            setTimeout(() => window.location.reload(), 1200);

        },
        onError: (error) => {
            
            toast({
                title: 'Error Occured !',
                description: error.response.data.error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
        },
        
    });


    return (

        <Box position='relative'
           >
            {
                mutation.isPending &&
                (
                    <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bg="rgba(255, 255, 255, 0.8)"
                    zIndex={9999}
                >
                    <Spinner size="xl" color='red'/>
                </Box>)
                
            }


            <VStack
                spacing={4}
                align='stretch'
            >
                <FormControl isRequired id='name' >
                    <FormLabel>Name</FormLabel>
                    <Input type='text'
                        placeholder='Name'
                        onChange={(e) => { handleOnChange('name', e.target.value) }}
                    />
                    {
                        error.nameError && (
                            <FormHelperText color={'red'}>
                               
                                {error.nameError}
                            </FormHelperText>
                        )
                    }


                </FormControl>


                <FormControl isRequired id='emailId'>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='enter your Email Id' onChange={(e) => { handleOnChange('emailId', e.target.value) }} />

                    {
                        error.emailIdError && (
                            <FormHelperText color={'red'}>
                               
                                {error.emailIdError}
                            </FormHelperText>
                        )
                    }


                </FormControl>


                <FormControl isRequired id='passwordSignUp'>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>

                        <Input placeholder='Enter your Password'
                            type={show ? 'text' : 'password'}
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

                {/* ConfirmPassword */}
                <FormControl isRequired id='password'>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>

                        <Input placeholder='Confirm Password'
                            type={show ? 'text' : 'password'}
                            onChange={(e) => { handleOnChange('confirmPassword', e.target.value) }} />

                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleOnShow}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>

                    </InputGroup>
                    {
                        error.confirmPasswordError && (
                            <FormHelperText color={'red'}>
                                
                                {error.confirmPasswordError}
                            </FormHelperText>
                        )
                    }

                </FormControl>


                <FormControl id="pic">
                    <FormLabel>Upload your Picture</FormLabel>
                    <Input
                        type="file"
                        p={1.5}
                        accept="image/*"
                        onChange={(e) => handleOnChange('profilePicture', e.target.files[0])}
                    />
                </FormControl>



                <Button colorScheme='blue'

                    isLoading={mutation.isPending}
                    // isLoading={loading}
                    isDisabled={Object.values(error).some(error => error !== '') || (
                        formData.name === '' ||
                        formData.emailId === '' ||
                        formData.password === '' ||
                        formData.confirmPassword === ''
                    )}
                    onClick={handleOnSubmit}
                >SignUp</Button>


            </VStack>
        </Box>
    )
}
