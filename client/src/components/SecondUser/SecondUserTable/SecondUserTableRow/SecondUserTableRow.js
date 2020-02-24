import React from 'react'

const tableRow = (props) => {
    return (
        <tr id="second-first-tr" className="second-body-tr">
            <td>{props.name}</td>
            <td>{props.type}</td>
            <td>{props.description}</td>
            <td>{props.date.toString().slice(0, 10)}</td>
            <td>{props.price}</td>
        </tr>
    )
}

export default tableRow;