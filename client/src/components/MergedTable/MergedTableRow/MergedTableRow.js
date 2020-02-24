import React from 'react'

const mergedTableRow = (props) => {
    return (
        <tr className="merged-body-tr">
            <td>{props.userName}</td>
            <td>{props.name}</td>
            <td>{props.type}</td>
            <td>{props.description}</td>
            <td>{props.date.toString().slice(0, 10)}</td>
            <td>{props.price}</td>
        </tr>
    )
}



export default mergedTableRow;