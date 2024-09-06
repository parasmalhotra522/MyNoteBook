import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import About from './components/About';
import AuthComponent from './components/auth/AuthComponent';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import axios from 'axios';
import { useCookies } from './components/auth/useCookies';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

function App() {


const { removeCookies } = useCookies();
const navigate = useNavigate();
const toast = useToast();
// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the response
    return response;
  },
  (error) => {
    // Check if the error is due to an expired token
    if (error.response.status === 401) {
      // Clear cookies or token from local storage
      removeCookies('token'); 

      // Redirect to login page
      navigate('/login');

      // Optionally, show a toast or notification to inform the user
      toast({
        title: 'Session expired',
        description: 'Please login again.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }

    return Promise.reject(error); // Forward the error to the component
  }
);




  return (    
    <Routes>
      
      <Route path='/auth' exact={true} element={<AuthComponent/>}/> 
      <Route path='/' element={<Layout/>}> 
        <Route index path='/home' element={<HomeComponent/>}/>
        <Route path='/about' element={<About/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}/>
      
    </Routes>
  
  );
}

export default App;
