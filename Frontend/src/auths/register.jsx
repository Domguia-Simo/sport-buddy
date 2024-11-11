import React ,{useState} from "react";
import {Link ,useNavigate} from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()
    const [info ,setInfo] = useState({email:'' ,password:'' ,confirm:''})
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')

const submitForm =async(e)=>{
    e.preventDefault()

        let {email ,password ,confirm} = info
        if(!email || !password || !confirm){alert("Fill the entire form");return}
    try{
        setLoading(true)
        setError('')
        console.log("sending data");
        const response = await fetch('http://localhost:5000/api/user/register', {
            method:'post',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(info)
        })
        const data = await response.json()
        
        console.log(data);
        if(response.ok){
            navigate("/auth/login")
        }else{
            console.log(data.error);
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

                <div className="form-group" >
                    <span>Email</span>
                    <input 
                        type="text" 
                        value={info.email} 
                        onChange={e=>setInfo({...info ,email:e.target.value})} 
                        placeholder="ex: simo@gmail.com" 
                    />
                </div>

                <div className="form-group" >
                    <span>Password</span>
                    <input 
                        type="password" 
                        value={info.password} 
                        onChange={e=>setInfo({...info ,password:e.target.value})} 
                        placeholder="........"
                    />

                </div>

                <div className="form-group" >
                    <span>Confirm password</span>
                    <input 
                        type="password" 
                        value={info.confirm} 
                        onChange={e=>setInfo({...info ,confirm:e.target.value})} 
                        placeholder="........"
                    />

                </div>

                {error && <div style={{color:'crimson'}}>{error}</div>}

                <button>Sign-in</button>

                <div>
                    <Link to="/auth/login" >Already have an account ?</Link>
                </div>

            </form>
        </div>

        </React.Fragment>
    )
}

export default Register