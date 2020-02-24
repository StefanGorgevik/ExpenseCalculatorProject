import React from 'react'
import './SecondUserSignOut.css'

const SecondUserSignOut = (props) => {
    return (
        <div className='second-log-out'>
            <div className="second-alert-container">
                <div className="second-alert-text-container">
                    <h1>You are signing out the second user</h1>
                    <p>You are about to sign out the second user. Are you sure ?</p>
                </div>
                <div className="second-alert-buttons">
                    <button className="second-alert-btn" id="second-cancel-alert-btn" onClick={props.hide}
                    >CANCEL</button>
                    <button className="second-alert-btn" id="second-delete-alert-btn" onClick={props.signOutAccepted}
                    >SIGN OUT</button>
                </div>
            </div>
        </div>
    )
}

export default SecondUserSignOut;