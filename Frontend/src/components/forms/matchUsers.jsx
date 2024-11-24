import React, { useEffect, useState ,useContext } from "react";
import Header from "../../header";
import UserContext from "../../providers/userProvider";
const levels = ["beginner" ,"intermediate" ,"advanced"]

const MatchUser = () => {

    const {user} = useContext(UserContext)

    const [info,setInfo] = useState({sport:'' ,level:''})
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')
    const [matches ,setMatches] = useState()
    const [sports ,setSports] = useState([])


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
            console.log(e.message);
            setError(e.message)
        }
    }
    useEffect(()=>{
        getSports()
    },[0])

    const findMatch=async(e)=>{
            e.preventDefault()
            console.log(info);
            // return 
        try{
            setLoading(true)
            const response = await fetch(`http://localhost:5000/api/user/find-match/${user._id}` ,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({...info })
            })
            const data = await response.json()
            console.log(data)
            if(response.ok){
                let temp = data.users.filter(match => match._id != user._id)
                setMatches(temp)
            }else{
                alert(data.error)
            }
        }
        catch(e){
            console.log(e)
            alert(e.message)
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <React.Fragment>
            <Header/>
            <div className="form-container" >
                <form onSubmit={(e)=>findMatch(e)}  >
                    <div className="form-group" >
                        <span>Choose your  desire sport</span>
                        <select value={info.sport} onChange={e=>setInfo({...info ,sport:e.target.value})}>
                            <option value={null}>Choose a sport</option>
                            {sports && sports.length != 0 && sports.map((sport ,i)=><option value={sport._id} key={i} >{sport.name}</option>)}
                        </select>
                    </div>

                    <div className="form-group" >
                        <span>Provide your actual level</span>
                        <select value={info.level} onChange={e=>setInfo({...info ,level:e.target.value})} >
                            <option value={null}>Select the required level </option>
                            {levels.map((l ,i) => <option key={i} value={l} >{l}</option>)}
                        </select>
                    </div>

                    <div>
                        <button>Find a match</button>
                    </div>

                </form>
            </div><br/>

            <center>{loading ? 'loading ...':  matches && matches.length == 0  && 'No result found'}</center>

            {/* the list of matched users */}
            <div style={{border:'solid 0px red' ,width:'70%' ,margin:'auto'}} >   
                {matches.map((match ,index) => {
                    return (
                        <div key={index} style={{display:"flex" ,flexDirection:'column' ,border:'solid 1px rgb(0,0,0,0.1)' ,
                        width:'fit-content' ,padding:'10px' ,borderRadius:'10px' }}  >
                            <strong>{match.name || match.email}</strong>
                            <span>sport:{ match.sports.name.name }</span>
                            <span>level: { match.sports.level }</span>
                        </div>
                    )
                })}
            </div>

        </React.Fragment>
    )
}

export default MatchUser