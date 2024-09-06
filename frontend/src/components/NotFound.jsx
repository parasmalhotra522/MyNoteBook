import { Spinner, Box, Text } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'

const NotFound = () => {

    const navigate = useNavigate();
    const [secondsLeft, setSecondsLeft] = useState(2);
    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev-1)
        }, 2000);
        if (secondsLeft === 0) {
            navigate('/auth');
        }
        return () => clearInterval(interval);
    }
    )

  return (
   <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          textAlign="center"
          marginTop='20%'
        >
            <Text mt={4}>
                The route is not correct. Redirecting to home in {secondsLeft} second{secondsLeft !== 1 && 's'}...
            <Spinner size="xl" color="red" zIndex="9999" />
            </Text>
        </Box>
  )
}

export default NotFound
