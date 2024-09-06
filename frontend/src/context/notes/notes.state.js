import NoteContext from "./notes.context.js";
import { useState, useEffect } from "react";
import { useCookies } from "../../components/auth/useCookies.js";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const NoteState = (props) => {
   
    const [notes, setNotes] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const { getCookies } = useCookies();
  
   
    const fetchNotes = async() => {
       const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/notes/fetchNotes`,
        {
            headers: {
                Authorization:`Bearer ${getCookies().token}`
            }
        }
       )
        return data;
    }

    const {data, isPending, isError} = useQuery({queryKey:['notes'], queryFn:fetchNotes}) 

    useEffect(() => {
        const userFromCookies = getCookies(); 
        if (userFromCookies) {
            setCurrentUser(userFromCookies);  
        }
        // console.log("--- Checking the api data", data);
        if(data) {

             setNotes(data.notes);
            //  console.log("--- Checking the api data-- state", notes);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]); 

    const logUser = async (data) => {
        setCurrentUser(data);
    }
    
    return (
        <NoteContext.Provider value={{notes, setNotes, isPending, isError, currentUser, setCurrentUser, logUser}}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;