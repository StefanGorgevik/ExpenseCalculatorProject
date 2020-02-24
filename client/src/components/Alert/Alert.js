import React from 'react'
import '../../assets/styles/Pop-up.css'

const alert = (props) => {
    return (
        <div id="alert" className={props.deleteAllClicked ? 'delete' : 'delete-second'}>
            <div id="alert-container">
                <div id="alert-text-container">
                    <h1>Delete Product</h1>
                    {props.deleteAllClicked ?
                        <p>You are about to delete ALL products. Are you sure you wish to continue ?</p> :
                        <p>You are about to delete this product. Are you sure you wish to continue ?</p>}
                </div>
                <div id="alert-buttons">
                    <button className="alert-btn" id="cancel-alert-btn" onClick={props.hide}
                    >CANCEL</button>
                    <button className="alert-btn" id="delete-alert-btn" onClick={props.delete}
                    >DELETE</button>
                </div>
            </div>
        </div>
    )
}
export default alert;