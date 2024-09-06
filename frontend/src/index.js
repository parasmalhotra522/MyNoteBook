import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom';
import NoteState from './context/notes/notes.state.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
      <NoteState>
        <App />
      </NoteState>
      </QueryClientProvider>
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);


