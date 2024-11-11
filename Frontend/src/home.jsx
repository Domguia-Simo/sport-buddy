import React ,{useContext ,useLayoutEffect} from "react"
import UserContext from './providers/userProvider'
import {useNavigate} from 'react-router-dom'
import Header from "./header"
import Event from "./components/events/events"

const Home = () => {

    const navigate = useNavigate()
    const {user ,setUser} = useContext(UserContext)

    return(
        <React.Fragment>
            <Header/>

            <div>
                <Event/>
            </div>

        </React.Fragment>
    )
}

export default Home