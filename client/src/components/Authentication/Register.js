import React from 'react'
import '../../assets/styles/Authentication.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Redirect } from 'react-router-dom'

import store from '../../redux/store'
import { saveUserName } from '../../redux/actions/userAction'
import Input from '../Input/Input'

class Register extends React.Component {
        constructor(props) {
                super(props)
                this.state = {
                        userInfo: {
                                first_name: null,
                                last_name: null,
                                email: null,
                                date_of_birth: null,
                                telephone: null,
                                country: null,
                                password: null
                        },
                        signed: false,
                        error: null
                }
        }

        componentDidMount() {
                localStorage.clear()
        }

        saveUserToState = (event) => {
                this.setState({ ...this.state.userInfo, userInfo: { ...this.state.userInfo, [event.target.id]: event.target.value } });
        }

        redirectToMain = () => {
                if (this.state.signed) {
                        return <Redirect to='/products' />
                }
        }

        saveUser = (event) => {
                if (this.state.userInfo.first_name == null || this.state.userInfo.last_name == null ||
                        this.state.userInfo.email == null || this.state.userInfo.date_of_birth == null ||
                        this.state.userInfo.telephone == null || this.state.userInfo.country == null || this.state.userInfo.password == null) {
                        event.preventDefault()
                        alert('Please input correct data!')
                } else if (this.state.userInfo.first_name !== null && this.state.userInfo.last_name !== null &&
                        this.state.userInfo.email !== null && this.state.userInfo.date_of_birth !== null &&
                        this.state.userInfo.telephone !== null && this.state.userInfo.country !== null && this.state.userInfo.password !== null) {
                        event.preventDefault()
                        axios.post('https://stark-island-29614.herokuapp.com/app/v1/auth/register', {
                                first_name: this.state.userInfo.first_name,
                                last_name: this.state.userInfo.last_name,
                                email: this.state.userInfo.email,
                                password: this.state.userInfo.password,
                                date_of_birth: this.state.userInfo.date_of_birth,
                                telephone: this.state.userInfo.telephone,
                                country: this.state.userInfo.country,
                                _created: new Date(),
                        })
                                .then(res => {
                                        axios.post('https://stark-island-29614.herokuapp.com/app/v1/auth/login',
                                                {
                                                        email: this.state.userInfo.email,
                                                        password: this.state.userInfo.password
                                                })
                                                .then(res => {
                                                        localStorage.setItem('jwt', res.data.jwt);
                                                        localStorage.setItem('email', res.data.email);
                                                        localStorage.setItem('first_name', res.data.first_name);
                                                        localStorage.setItem('last_name', res.data.last_name);
                                                        store.dispatch(saveUserName(res.data.first_name, res.data.last_name))
                                                        this.setState({ signed: true, error: false })
                                                })
                                                .catch(err => {
                                                        console.log(err)
                                                });
                                })
                                .catch(err => {
                                        console.log(err)
                                })
                }
        }

        render() {
                var labels = ["First Name", "Last Name", "Email", "Date of Birth", "Telephone", "Country", "Password"]
                var inputs = Object.keys(this.state.userInfo).map((info, index) => {
                        return (
                                <Input key={index} htmlFor={info} labelName={labels[index]} inputId={info} saveUser={this.saveUserToState} />
                        )
                })

                return (
                        <React.Fragment>
                                {this.redirectToMain()}
                                <div className="box" id="register">
                                        <form>
                                                {inputs}
                                                <button className="primary-btn" type="submit" onClick={this.saveUser}>Register</button>
                                        </form>
                                </div>

                                <div className="textDiv">
                                        <p>Or if you already have an account, <Link className="additional-info" to="/">Sign in</Link></p>
                                </div>
                        </React.Fragment>
                )
        }
}

export default Register
