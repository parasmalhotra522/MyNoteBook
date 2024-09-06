import React, {useContext, useEffect, useState} from 'react'
import NavigationBar from './NavigationBar';

import Notes from './Notes';
import NoteContext from '../context/notes/notes.context';
import { Outlet, useNavigate } from 'react-router';
import { Spinner, useToast } from '@chakra-ui/react';

const HomeComponent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const {currentUser} =  useContext(NoteContext);
    useEffect(() => {
        // console.log("---- Current user in home component", currentUser);
        if (currentUser === null) {
        // console.log("---- Current user in home NULL CONd", currentUser);
      
            // toast({
            //     title: "Error",
            //     description: "Please logIn first to access the application",
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            //     position: 'top-right'
            // });
            navigate('/auth');
            
        } else if(currentUser){
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return (<Spinner />)
    }
    return (
        <>
            { currentUser &&
             <>   
                <Notes m={20} />
               
                </>
              
            }   
        </>
    )
}

export default HomeComponent
