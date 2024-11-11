import React ,{useState ,useEffect} from "react";
import {useNavigate ,Link} from 'react-router-dom'
import Header from "../../header";


const levels = ["beginner" ,"intermediate" ,"advanced"]
const CreateEvent =()=>{

    const navigate = useNavigate()
    const [info ,setInfo] = useState({description:'' ,date:'' ,time:'' ,level:'' ,sport:''})
    const [sports ,setSports] = useState([])
    const [loading ,setLoading] = useState(false)
    const [loadSport ,setLoadSport] = useState(false)
    const [error ,setError] = useState('')

    useEffect(()=>{
        async function getSports(){
            try{
                setLoadSport(true)
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
            }finally{
                setLoadSport(false)
            }
        }
        getSports()
    },[0])

    async function createSport(e){
        e.preventDefault()
            console.log(info);
        let {description ,date ,time ,level ,sport} = info
        if(!description || !date || !time || !level || !sport){return setError('Please fill the entire form')}
        try{
            setLoading(true)
            setError('')
            const response = await fetch('http://localhost:5000/api/event/create-event' ,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(info)
            }) 
            const data = await response.json()
            console.log(data);
            if(response.ok){
                navigate("/")
            }else{
                setError(data.error)
            }
        }
        catch(e){
            console.error(e.message)
            setError(e.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <React.Fragment>
            <Header/>

            <div style={{display:'flex' ,justifyContent:"center" ,width:'70%' ,margin:'30px auto 0px auto'}}>
                    <span>Event creation form </span>
                </div>

            <div className="form-container" >
                <form onSubmit={e=>createSport(e)}>

                    <div className="form-group" >
                        <span>Sport</span>
                        <select value={info.sport} onChange={e=>setInfo({...info ,sport:e.target.value})}>
                            <option value={null}>Choose a sport</option>
                            {sports && sports.length != 0 && sports.map((sport ,i)=><option value={sport._id} key={i} >{sport.name}</option>)}
                        </select>
                    </div>

                    <div className="form-group" >
                        <span>Description</span>
                        <textarea placeholder="Briefly describe the sport event" rows={5} 
                        value={info.description} onChange={e=>setInfo({...info ,description:e.target.value})}></textarea>
                    </div>

                    <div className="form-group" >
                        <span>Date</span>
                        <input type="date" value={info.date} onChange={e=>setInfo({...info ,date:e.target.value})} />
                    </div>

                    <div className="form-group">
                        <span>Time</span>
                        <input type="time" value={info.time} onChange={e=>setInfo({...info ,time:e.target.value})} />
                    </div>

                    <div className="form-group">
                        <span>Level</span>
                        <select value={info.level} onChange={e=>setInfo({...info ,level:e.target.value})} >
                            <option value={null}>Select the required level </option>
                            {levels.map((l ,i) => <option key={i} value={l} >{l}</option>)}
                        </select>
                    </div>

                    {error && <div style={{color:'crimson'}} >{error}</div>}

                    <button>create event</button>

                </form>
            </div>

        </React.Fragment>
    )
}

export default CreateEvent