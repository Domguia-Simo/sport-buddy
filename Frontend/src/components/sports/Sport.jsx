import React from "react";

const Sport =({sport})=>{
    return(
        <React.Fragment>
            <tr>
                <td>{sport.name}</td>
                <td>{sport.muscle}</td>
                <td>{sport.description}</td>
                <td>
                    <button>update</button>
                    <button>delete</button>
                </td>
            </tr>
        </React.Fragment>
    )
}

export default Sport