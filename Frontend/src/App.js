import React from "react";
import {UserProvider} from "./providers/userProvider";
import Home from "./home";
import Login from "./auths/login";
import Register from "./auths/register";
import {RouterProvider ,createBrowserRouter ,createRoutesFromElements ,Route} from 'react-router-dom'
import AuthLayout from "./auths/authLayout";
import SportList from "./components/sports/sportList";
import CreateSport from "./components/forms/createSport";
import CreateEvent from "./components/forms/createEvents";

const App =() =>{

const router = createBrowserRouter(createRoutesFromElements(
    [
        <Route path="/" element={<Home/>} />,

        <Route path="/sport-list" element={<SportList/>} /> ,
        <Route path="/create-sport" element={<CreateSport/>} /> ,
        <Route path="/create-event" element={<CreateEvent/>} />,

        <Route path="/auth" element={<AuthLayout/>} >
            <Route index path="login" element={<Login/>} />,
            <Route path="register" element={<Register/>} />
        </Route>,


    ]
))

    return(
        <React.Fragment>
            <UserProvider>

                <RouterProvider router={router} />

            </UserProvider>
        </React.Fragment>
    )
}

export default App