import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Appointment from './Pages/Appointment.jsx'
import Login from './Pages/Login.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import Teams from './Pages/Teams.jsx'
import Home from './Pages/Home.jsx'
import Signup from './Pages/Signup.jsx'
import BookingForm from './Pages/BookingForm.jsx'
import AuthLayout from './Components/AuthLayout.jsx'
import CouncellorAuth from './Components/CouncellorAuth.jsx'
import Councellor from './Pages/Councellor.jsx'
import CouncellorLogin from './Components/CouncellorLogin.jsx'





const router = createBrowserRouter([
    {
      path: "/",
      element: <App />, // Main layout component that wraps all other components
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/appo",
          element: (
          <AuthLayout authentication >
          <Appointment />
          </AuthLayout>),
        },
        {
          path: "/appo/:Enroll", // Dynamic path for the appointment with name
          element: <BookingForm />,
        },
        {
          path: "/teams",
          element: <Teams />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
            path: "/councellor",
            element: (
            <CouncellorAuth authentication = {true}>
            <Councellor />
            </CouncellorAuth>
        ),
          },
          {
            path: "/councellor/login",
            element: (
                <CouncellorAuth >
            <CouncellorLogin />
            </CouncellorAuth>
            ),

          },
      ],
    },
  ]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
