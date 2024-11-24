import React ,{useState ,useEffect, useContext} from "react";
import {useNavigate ,Link} from 'react-router-dom'
import Header from "../../header";
import UserContext from "../../providers/userProvider";
import '../../assets/styles/eventStyles.css'

const levels = ["beginner" ,"intermediate" ,"advanced"]
const ManageEvent =()=>{

    const navigate = useNavigate()
    const {user} = useContext(UserContext)

    const [info ,setInfo] = useState({ location:'',description:'' ,date:'' ,time:'' ,level:'' ,sport:''})
    const [sports ,setSports] = useState([])
    const [events ,setEvents] = useState()
    const [locations ,setLocations] = useState()
    const [loading ,setLoading] = useState(false)
    const [loadSport ,setLoadSport] = useState(false)
    const [error ,setError] = useState('')

    const [createActive ,setCreateActive] = useState(false)
    
    // Getting  the lists of sports
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

    // getting the list of locations
    async function getLocations(){
        try{
            const response = await fetch(`http://localhost:5000/api/location/get-locations`)
            const data = await response.json()
            if(response.ok){
                setLocations(data.locations)
            }
        }
        catch(e){
            console.log(e)
        }
    }


    async function getCreatedEvents(){
        try{
            // console.log(user)
            const response = await fetch(`http://localhost:5000/api/event/get-user-events/${user._id}`)
            const data = await response.json()
            console.log(data)
            if(response.ok){
                setEvents(data.events)
            } 
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getSports()
        getCreatedEvents()
        getLocations()
    },[0])

    async function createSport(e){
        e.preventDefault()
            console.log(info);
        let {description ,date ,time ,level ,sport ,location} = info
        if(!description || !date || !time || !level || !sport || !location){return setError('Please fill the entire form')}
        try{
            setLoading(true)
            setError('')
            const response = await fetch('http://localhost:5000/api/event/create-event' ,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({...info ,userId:user._id})
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

    async function deleteEvent(id){
        try{
            const response = await fetch(`http://localhost:5000/api/event/delete-event/${id}` ,{
                method:'delete'
            })
            const data = await response.json()
            if(response.ok){
                alert('event deleted')
            }else{
                alert(data.error)
            }
        }
        catch(e){   
            console.log(e)
            alert(e.message)
        }
    }

    if(createActive){
        return(
            <React.Fragment>
                <Header/>
    
                <div style={{display:'flex' ,justifyContent:"space-between" ,width:'70%' ,margin:'30px auto 0px auto'}}>
                        <span>Event creation form </span>
                        <button onClick={()=>setCreateActive(false)} >View created events list </button>

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
                            <span>Location</span>
                            <select value={info.location} onChange={e=>setInfo({...info ,location:e.target.value})}>
                                <option value={null}>Choose a sport</option>
                                {locations && locations.length != 0 && locations.map((loc ,i)=><option value={loc._id} key={i} >{loc.name}</option>)}
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
    else{
        return(
            <React.Fragment>
                <Header/>
    
                <div style={{display:'flex' ,justifyContent:"space-between" ,width:'70%' ,margin:'30px auto 0px auto'}}>
                        <span>Created Event List </span>
                        <button onClick={()=>setCreateActive(true)} >Create events </button>
                </div>
                <div style={{margin:'auto' ,width:'fit-content' ,marginTop:'20px'}} >
                    <table border='1' >
                        <tr>
                            <th>Sport</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Required_level</th>
                            <th>Action</th>
                        </tr>
                        <tbody>
                            {
                                events && events.length != 0 ?
                                events.map((event ,index) => {
                                    return (
                                    <tr key={index} >
                                        <td>{event.sport.name}</td> 
                                        <td>{event.location && event.location.name || '--'}</td>
                                        {/* <td>{ event.description.length > 50 ? event.description.slice(50)+'...': event.description}   </td>  */}
                                        <td>{event.date.split('T')[0]}</td> 
                                        <td>{event.time}</td> 
                                        <td>{event.levelRequired}</td> 
                                        <td>
                                            {/* <button 
                                            onClick={()=>{
                                                console.log("selected events: " ,event)
                                                let newInfo ={
                                                    level:event.levelRequired ,sport:'event.sport.name' ,date:event.date,
                                                    location:event.location.name ,description:event.description ,
                                                    time:event.time}
                                                    console.log("updating : " ,newInfo)
                                                setInfo(newInfo);
                                                setCreateActive(true)}} >
                                            update</button>  */}
                                            <button onClick={()=>deleteEvent(event._id)} >delete</button>
                                        </td>

                                    </tr>)
                                })
                                :
                                <tr ><td colSpan={5} style={{textAlign:'center'}} >No Event found</td></tr>
                            }
                        </tbody>
                    </table>
                </div>

            </React.Fragment>
        )
    }
}

export default ManageEvent