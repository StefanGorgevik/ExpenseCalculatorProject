import React from 'react'
import { Link } from 'react-router-dom'

const TableTools = (props) => {
    return ( <td>
        <Link to="/edit-product">
            <button id="edit-button" onClick={props.editProduct} ><i className="far fa-edit"></i></button>
        </Link>
        <button onClick={props.deleteProduct} id="delete-button"><i className="far fa-trash-alt"></i></button>
    </td>)
}

export default TableTools