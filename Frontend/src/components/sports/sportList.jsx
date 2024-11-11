import React ,{useLayoutEffect ,useState} from "react";
import {useNavigate} from 'react-router-dom'
import Sport from "./Sport";
import Header from "../../header";

const SportList =() =>{

    const navigate = useNavigate()
    const [sports,setSports] = useState([])
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')

useLayoutEffect(()=>{
    async function getSports(){
        try{
            const response = await fetch('http://localhost:5000/api/sport/get-sports')
            const data = await response.json()
            if(response.ok){
                setSports(data.sports)
            }else{
                setError(data.error)
            }
        }
        catch(e){
            console.log(e.message)
            setError(e.message)
        }
        finally{
            setLoading(false)
        }
    }
    getSports()
} ,[0])

    return(
        <React.Fragment>
            <Header/>
            <div className="sport-container">
                <div style={{display:'flex' ,justifyContent:"space-between" ,width:'70%' ,margin:'30px auto 0px auto'}}>
                    <span>List of sports ({sports.length})</span>
                    <button onClick={()=>navigate("/create-sport")}>create sport</button>
                </div>
                <table border={1} style={{margin:'20px auto'}} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Muscle</th>
                            <th>Dscription</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                        {sports.map((sport , index) => <Sport key={index} sport={sport} />)}

                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default SportList