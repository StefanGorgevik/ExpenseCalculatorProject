import React from 'react'
import '../../assets/styles/Pop-up.css'

const signOut = (props) => {
    return (
        <div id="alert" className='log-out'>
        <div id="alert-container">
            <div id="alert-text-container">
                <h1>You are signing out</h1>
                <p>You are about to sign out. Are you sure ?</p>
            </div>
            <div id="alert-buttons">
                <button className="alert-btn" id="cancel-alert-btn" onClick={props.hide}
                >CANCEL</button>
                <button className="alert-btn" id="delete-alert-btn" onClick={props.signOutAccepted}
                >SIGN OUT</button>
            </div>
        </div>
    </div>
    )
}

export default signOut;