import React from 'react'
import './Input.css'

const Input = (props) => {
    return (
        <p className="input-container">
            <label className="text-field-input" id="first-name-label" htmlFor={props.htmlFor}>{props.labelName}</label>
            <input onChange={props.saveUser} className="text-field"
                type={props.htmlFor === 'date_of_birth' ? 'date' : 'text' && props.htmlFor === 'date' ? 'date' : 'text' && props.htmlFor === 'password' ? 'password' : 'text'}
                id={props.inputId}
                defaultValue={props.value ?  props.htmlFor === 'date' ? props.value.toString().slice(0, 10) : props.value : null}
            />
        </p>
    )
}

export default Input;