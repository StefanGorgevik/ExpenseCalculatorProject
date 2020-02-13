import React from 'react'

const Input = (props) => {
    return (
        <p className="input-container">
            <label className="text-field-input" id="first-name-label" htmlFor={props.htmlFor}>{props.labelName}</label>
            <input onChange={props.saveUser} className="text-field" 
            type={props.htmlFor === 'date_of_birth' ? 'date' : 'text' && props.htmlFor === 'password' ? 'password' : 'text'} 
            id={props.inputId} />
        </p>
    )
}

export default Input;