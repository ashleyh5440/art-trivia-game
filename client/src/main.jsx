import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

import Game from './pages/Game';
import Scores from './pages/Scores';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/game',
        element: <Game />,
      },
      {
        path: '/scores',
        element: <Scores />,
      },
      {
        path: '/login',
        element: <LogIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <RouterProvider router={router} />
);
