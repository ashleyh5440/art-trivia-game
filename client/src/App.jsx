import { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/Nav'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

function App() {

  return (
   <main>
    <NavBar />
    <Outlet />
   </main>
  )
}

export default App;
