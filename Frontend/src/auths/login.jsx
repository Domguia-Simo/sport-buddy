import React ,{useState ,useContext} from "react";
import {Link ,useNavigate} from 'react-router-dom'
import UserContext from "../providers/userProvider";

const Login = () => {

    const navigate = useNavigate()
    const {user ,setUser} = useContext(UserContext)
    const [info ,setInfo] = useState({email:'' ,password:''})
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')

const submitForm =async(e)=>{
    e.preventDefault()

        let {email ,password} = info
        if(!email || !password){alert("Fill the entire form");return}
    try{
        setLoading(true)
        setError('')
        const response = await fetch('http://localhost:5000/api/user/login', {
            method:'post',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(info)
        })
        const data = await response.json()
        if(response.ok){
            setUser(data.user)
            localStorage.setItem('sport-user' ,JSON.stringify(data.user))
            navigate("/")
        }else{
            console.log((data.error));
            setError(data.error)
        }

    }
    catch(e){
        console.log(e.message);
        setError(e.message)
    }finally{
        setLoading(false)
    }
}

    return (
        <React.Fragment>

        <div>

            <form onSubmit={(e)=>submitForm(e)} >

                <div className="form-group">
                    <span>Email</span>
                    <input 
                        type="text" 
                        value={info.email} 
                        onChange={e=>setInfo({...info ,email:e.target.value})} 
                        placeholder="ex: simo@gmail.com" 
                    />
                </div>

                <div className="form-group">
                    <span>Password</span>
                    <input 
                        type="password" 
                        value={info.password} 
                        onChange={e=>setInfo({...info ,password:e.target.value})} 
                        placeholder="........"
                    />

                </div>

                {error && <div style={{color:'crimson'}} >{error}</div>}

                <button>Sign-in</button>

                <div>
                    <Link to="/auth/register" >No account ? </Link>
                </div>

            </form>
        </div>

        </React.Fragment>
    )
}

export default Login