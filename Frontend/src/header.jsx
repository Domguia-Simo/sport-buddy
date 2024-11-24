import React ,{useContext , useLayoutEffect} from "react";
import {Link ,useNavigate} from 'react-router-dom'
import UserContext from "./providers/userProvider";

const Header = () => {

    const navigate = useNavigate()
    const {user ,setUser} = useContext(UserContext)

    useLayoutEffect(()=>{
        async function getLocalUser(){
            const user = await localStorage.getItem('sport-user')
            if(!user){
                navigate("/auth/login")
            }else{
                let temp =await JSON.parse(user) 
                setUser(temp)
            }
        }
        
        if(!user){
            getLocalUser()
        }
    },[0])

    async function logout(){
        setUser(null)
        localStorage.removeItem('sport-user')
        window.location.pathname = ""

    }

    return(
        <div 
            style=
            {{
                display:"flex" ,justifyContent:'space-between' ,padding:'15px',
                border:'solid 1px grey' ,alignItems:'baseline'
            }} 
        >
            <span style={{fontSize:'xx-large' ,cursor:'pointer'}} onClick={()=>navigate("/")}>Sport Buddy</span>
            <div style={{display:'flex' ,gap:'20px'}} >
                <Link to="/manage-event" ><span> event</span></Link>
                <Link to="/match-users"><span>Match with users</span></Link>
                {user && user.accountType && user.accountType =='admin' && <Link to="/sport-list" > sport </Link>}
                {user && user.accountType && user.accountType =='admin' && <Link to="/manage-location" > location </Link>}

                <span  style={{cursor:'pointer' }} onClick={logout}>Logout</span>

            </div>
        </div>
    )
}

export default Header