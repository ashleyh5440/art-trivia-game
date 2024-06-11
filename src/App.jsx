import { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/Nav'
// import {setContext} from '@apollo/client/link/context';

function App() {
  return (
   <main>
    {/* <NavBar /> */}
    <Outlet />
   </main>
  )
}

export default App;


