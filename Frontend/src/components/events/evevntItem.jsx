import React from 'react'

const EventItem =({event})=>{
    return(
        <React.Fragment>
            <div className='event-item' >
                <span>{event.sport.name}</span>
                <div>
                    {event.description}
                </div>
                <div>
                    <span>required level: {event.levelRequire}</span>
                    <div>
                        <span>{event.date.split('T')[0]}</span>
                        <span>{event.time}</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EventItem