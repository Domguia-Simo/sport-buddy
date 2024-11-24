import React from 'react'

const EventItem =({event})=>{
    return(
        <React.Fragment>
            <div className='event-item' >
                <span style={{fontWeight:'bold' ,paddingBottom:'5px'}} >{event.sport.name}</span>
                <div>
                    {event.description}
                </div>
                <div>
                    <span>required level: {event.levelRequired}</span>
                <div style={{marginTop:'10px' ,fontWeight:'lighter' ,fontSize:'small'}} >
                    <span>The {event.date.split('T')[0]}</span>
                    <span> at {event.time}</span>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EventItem