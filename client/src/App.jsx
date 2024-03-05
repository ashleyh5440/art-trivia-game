import { useState } from 'react';
// import './App.css';
import { Outlet } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

function App() {

  return (
   <main>
    <Outlet />
   </main>
  )
}

export default App;
