import React from "react";

const Sport =({sport ,deleteSport ,updateSport })=>{
    return(
        <React.Fragment>
            <tr>
                <td>{sport.name}</td>
                <td>{sport.muscle}</td>
                {/* <td>{sport.description}</td> */}
                <td>
                    <button onClick={()=>updateSport(sport)} >update</button>{' '}
                    <button onClick={()=>deleteSport(sport._id)} >delete</button>
                </td>
            </tr>
        </React.Fragment>
    )
}

export default Sport