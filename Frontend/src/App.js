import React from "react";
import {UserProvider} from "./providers/userProvider";
import Home from "./home";
import Login from "./auths/login";
import Register from "./auths/register";
import {RouterProvider ,createBrowserRouter ,createRoutesFromElements ,Route} from 'react-router-dom'
import AuthLayout from "./auths/authLayout";
import SportList from "./components/sports/sportList";
import CreateSport from "./components/forms/createSport";
import ManageEvent from "./components/forms/manageEvents";
import MatchUser from "./components/forms/matchUsers";
import ManageLocation from "./components/forms/manageLocation";

const App =() =>{

const router = createBrowserRouter(createRoutesFromElements(
    [
        <Route path="/" element={<Home/>} />,

        <Route path="/sport-list" element={<SportList/>} /> ,
        <Route path="/create-sport" element={<CreateSport/>} /> ,
        <Route path="/manage-event" element={<ManageEvent/>} />,
        <Route path="/manage-location" element={<ManageLocation/>} />,


        <Route path="/match-users" element={<MatchUser/>} />,


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