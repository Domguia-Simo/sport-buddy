import React ,{useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import Header from "../../header";

const CreateSport =() => {

    const navigate = useNavigate()
    const location = useLocation()

    const [info ,setInfo] = useState({name:'' ,muscle:'' ,description:''})
    const [loading ,setLoading] = useState(false)
    const [update ,setUpdate] = useState(false)
    const [error ,setError] = useState('')

    useEffect(()=>{
        if(location.state){
            setUpdate(true)
            setInfo(location.state)
        }
    } ,[0])

    async function create(e){

        e.preventDefault()

        let {name ,description ,muscle} = info
        if(!name){return setError('Please enter the sport name')}
        try{
            setLoading(true)
            setError('')
            const response = await fetch('http://localhost:5000/api/sport/create-sport' ,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(info)
            })
            const data = await response.json()
            if(response.ok){
                navigate("/sport-list")
            }else{
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
    
    async function updateSport(e){
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:5000/api/sport/update-sport` ,{
                method:'put',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(info)
            })
            const data = await response.json()
            if(response.ok){
                alert('sport updated')
                navigate("/sport-list")
            }else{alert(data.error || 'an error occured')}
        }catch(e){
            console.log(e)
            alert(e.message)
        }finally{setUpdate(false)}
    }

    return(
        <React.Fragment>

            <Header/>

            <div style={{display:'flex' ,justifyContent:"space-between" ,width:'70%' ,margin:'30px auto 0px auto'}}>
                    <span >Sport creation form </span>
                    <button onClick={()=>navigate("/sport-list")}>View sport list</button>
                </div>

            <div className="form-container" >
                <form onSubmit={(e)=>update ? updateSport(e):create(e)} >
                    <div className="form-group" >
                        <span>Name</span>
                        <input type="text" placeholder="ex: football" value={info.name} onChange={e=>setInfo({...info ,name:e.target.value})} />
                    </div>

                    <div className="form-group" >
                        <span>Muscle</span>
                        <input type="text" placeholder="ex: legs ,arms" value={info.muscle} onChange={e=>setInfo({...info ,muscle:e.target.value})} />
                    </div>

                    <div className="form-group" >
                        <span>Desciption</span>
                        <textarea value={info.description} placeholder="Football is a collective sport which need two teams of 11 players each..." rows={10} onChange={e=>setInfo({...info ,description:e.target.value})} ></textarea>
                    </div>

                    {error && <div style={{color:'crimson'}} >{error}</div>}

                    <button disabled={loading} >{update ? 'update sport':'Create sport'}</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default CreateSport