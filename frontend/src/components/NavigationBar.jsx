import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Avatar, Menu, MenuButton, MenuList, MenuItem,
  Button, Flex, Heading, IconButton,
   useDisclosure,
  useToast,
} from '@chakra-ui/react';


import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'
import { useEffect, useContext } from 'react';
import NoteContext from '../context/notes/notes.context';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useCookies } from './auth/useCookies';
function NavigationBar() {


  const {pathname} = useLocation();
  // console.log('Checking path', pathname);

  const { currentUser, setCurrentUser } = useContext(NoteContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { removeCookies } = useCookies(); 
  const toast = useToast();

  useEffect(() => { }, [currentUser]);

  const handleLogOut = async () => {
    await removeCookies();
    await setCurrentUser(null);
    await toast({
        title: "Log Out Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    navigate('/auth');
  }

  const onClickProfile = () => {
    onOpen() 
  }

  const toggleMenu = () => isOpen ? onClose() : onOpen();
  
  return (
      <>
    <Box bg="gray.800" color="white">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        p={4}
        mx="auto"
        maxW="container.lg"
      >
        <Flex align="center">
          <Heading as="h1" size="lg" >
            <NavLink to="/home">INoteBook</NavLink>
          </Heading>
        </Flex>
        <Flex>
          <IconButton
            align='flex-end'
            aria-label="Toggle Navigation"
            icon={<HamburgerIcon />}
            onClick={toggleMenu}
            display={{ base: 'block', md: 'none' }}
            ml={4}
          />

        </Flex>

        <Flex
          as="nav"
          direction={{ base: 'column', md: 'row' }}
          align="center"
          display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          mt={{ base: 4, md: 0 }}
        >
          <NavLink
            to="/home"
            style={{ textDecoration: 'none' }}
            className={pathname === '/home' ? 'active' : ''}
          >
            <Button variant="link" color="white" ml={4}>
              Home
            </Button>
          </NavLink>

          <NavLink
            to="/about"
            style={{ textDecoration: 'none' }}
            className={pathname === '/about' ? 'active' : ''}
          >
            <Button variant="link" color="white" ml={4}>
              About
            </Button>
          </NavLink>

          {currentUser && (
            <Menu>
              <MenuButton
               as={Button}
                rightIcon={<ChevronDownIcon />}
                color="white"
                bgColor="gray.800"
                _hover={{ bgColor: "gray.800" }}
                _active={{ bgColor: "gray.800" }}
                ml={4}
              >
                <Avatar size="sm" name={currentUser.name} src={currentUser.profilePicture} />
              </MenuButton>
              <MenuList color='gray.800' >
                <MenuItem
                  onClick={onClickProfile}>My Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <Stack>
              {
                currentUser && 
                <Flex flexDir='column'
                    justifyContent='center'
                    alignSelf='center'
                
                  >
              <Image
                src={currentUser.profilePicture}
                alt={currentUser.name}
                    borderRadius='50%'
                    height={['100%', '14rem']}
                    width={['100%', '14rem']}
                  /> 
              <Text mt='2rem'><b>Name:</b>{currentUser.name} </Text>
              <Text><b>Email Id:</b>{currentUser.emailId} </Text>
              </Flex>
            }
             
            </Stack>
            
           
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3}
              onClick={onClickUpdate}
            >
              Save
            </Button> */}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  );
}

export default NavigationBar;