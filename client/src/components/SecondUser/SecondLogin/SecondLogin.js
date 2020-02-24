import React from 'react'
import './SecondLogin.css'
// import { Link } from 'react-router-dom'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'

import store from '../../../redux/store'
import Input from '../../Input/Input'
import { addAccountClicked, secondUserSigned } from '../../../redux/actions/userAction'

class SecondLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                email: null,
                password: null
            },
            signed: false,
            error: null
        }
    }
    saveLoginData = (event) => {
        this.setState({ ...this.state.userInfo, userInfo: { ...this.state.userInfo, [event.target.id]: event.target.value } })
    }

    signIn = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8006/app/v1/auth/login',
            {
                email: this.state.userInfo.email,
                password: this.state.userInfo.password
            })
            .then(res => {
                localStorage.setItem('second-jwt', res.data.jwt);
                localStorage.setItem('second-email', res.data.email);
                localStorage.setItem('second-first_name', res.data.first_name);
                localStorage.setItem('second-last_name', res.data.last_name);
                localStorage.setItem('second-userid', res.data.userid);
                this.setState({ signed: true, error: false })
                store.dispatch(secondUserSigned(true))
                store.dispatch(addAccountClicked(false))
            })
            .catch(err => {
                this.setState({ error: true })
                console.log(err)
            });
    }

    cancelAddAccount = () => {
        store.dispatch(addAccountClicked(false))
    }

    render() {
        var labels = ["Email", "Password"]
        var inputs = Object.keys(this.state.userInfo).map((info, index) => {
            return (
                <Input key={index} htmlFor={info} labelName={labels[index]} inputId={info} saveUser={this.saveLoginData} />
            )
        })

        return (
            <div className="second-login">
                <div className="sec-log-box">
                    <form>
                        {inputs}
                        {this.state.error ? <p className="second-error-p">Wrong email or password!</p> : null}
                        <button className="second-primary-btn" onClick={this.signIn}>Sign in</button>
                        <button className="second-primary-btn" onClick={this.cancelAddAccount}>Cancel</button>
                    </form>
                    <div className="notif-div">
                        <p className="notif-p"><i className="fas fa-exclamation-triangle"></i>You can't modify or delete any of the products of the second user!</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SecondLogin;