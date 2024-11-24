import React ,{useState ,useEffect, useContext} from "react";
import {useNavigate ,Link} from 'react-router-dom'
import Header from "../../header";
import UserContext from "../../providers/userProvider";
import '../../assets/styles/eventStyles.css'

const levels = ["beginner" ,"intermediate" ,"advanced"]
const ManageLocation =()=>{

    const navigate = useNavigate()
    const {user} = useContext(UserContext)

    const [name ,setName] = useState()
    const [locations ,setLocations] = useState()
    const [id ,setId] = useState()
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')

    const [createActive ,setCreateActive] = useState(false)
    

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

    useEffect(()=>{
        getLocations()
    },[0])

    async function createLocation(e){
        e.preventDefault()
        
        if(!name){return setError('Please fill the entire form')}
        try{
            setLoading(true)
            setError('')
            const response = await fetch('http://localhost:5000/api/location/create-location' ,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({name})
            }) 
            const data = await response.json()
            console.log(data);
            if(response.ok){
                setCreateActive(false)
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

    async function updateLocation(){
        try{    
            const resopnse = await fetch(`http://localhost:5000/api/location/update-location/${id}` ,{
                method:'put',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({name:name})
            })
        }catch(e){
            console.log(e)
        }finally{setId(null)}
    }

    async function deleteLocation(id){
        try{    
            const resopnse = await fetch(`http://localhost:5000/api/location/delete-location/${id}` ,{
                method:'delete',
            })
        }catch(e){
            console.log(e)
        }
    }

    if(createActive){
        return(
            <React.Fragment>
                <Header/>
    
                <div style={{display:'flex' ,justifyContent:"space-between" ,width:'70%' ,margin:'30px auto 0px auto'}}>
                        <span>Location creation form </span>
                        <button onClick={()=>setCreateActive(false)} >View location list </button>

                    </div>
    
                <div className="form-container" >
                    <form onSubmit={e=> id ? updateLocation(): createLocation(e)}>
    
                        <div className="form-group" >
                            <span>Location</span>
                            <input value={name} onChange={e=>setName(e.target.value)} placeholder="ex: new delhi" />
                        </div>
    
                        {error && <div style={{color:'crimson'}} >{error}</div>}
    
                        <button>{ id ? 'update location':'create location'}</button>
    
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
                        <span>Location List </span>
                        <button onClick={()=>setCreateActive(true)} >Create location </button>
                </div>
                <div style={{margin:'auto' ,width:'fit-content' ,marginTop:'20px'}} >
                    <table border='1' >
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                        <tbody>
                            {
                                locations && locations.length != 0 ?
                                locations.map((loc ,index) => {
                                    return (
                                    <tr key={index} >
                                        <td>{loc.name}</td> 
                                        <td>
                                            <button onClick={()=>{
                                                setId(loc._id)
                                                setName(loc.name);setCreateActive(true)
                                            }} >update</button>
                                            <button onClick={()=>deleteLocation(loc._id)} >delete</button> </td>
                                    </tr>)
                                })
                                :
                                <tr ><td colSpan={5} style={{textAlign:'center'}} >No location found</td></tr>
                            }
                        </tbody>
                    </table>
                </div>

            </React.Fragment>
        )
    }
}

export default ManageLocation