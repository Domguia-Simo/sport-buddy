import React ,{useState ,useEffect ,useLayoutEffect} from 'react'
import EventItem from './evevntItem'

const Event =()=>{


    const [events ,setEvents] = useState([])
    const [error ,setError] = useState('')
    const [loading ,setLoading] = useState(false)

    useLayoutEffect(()=>{
        async function getEvents(){
            setLoading(true)
            try{
                const response = await fetch('http://localhost:5000/api/event/get-events')
                const data = await response.json()
                console.log(data);
                if(response.ok){
                    setEvents(data.events)
                }else{
                    console.log(data.error);
                    alert(data.error)
                }

            }
            catch(e){
                console.log(e.message);
                console.log(e.message);
            }finally{
                setLoading(false)
            }
        }
        getEvents()
    } ,[0])

    return(
        <React.Fragment>
            <div className='event-container'>
                {events.map((event ,index) => <EventItem key={index} event={event} />)}
            </div>
        </React.Fragment>
    )
}

export default Event