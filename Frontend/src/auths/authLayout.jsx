import React from "react";
import {Outlet} from 'react-router-dom'
import '../assets/styles/authStyles.css'

const AuthLayout = () => {
    return(
        <React.Fragment>
            <div className="form-container" >
                <Outlet/>
            </div>
        </React.Fragment>
    )
}

export default AuthLayout