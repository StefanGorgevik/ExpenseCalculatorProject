import React from 'react'
import './UserInfo.css'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { saveUserName } from '../../redux/actions/userAction'
import store from '../../redux/store'
import Input from '../Input/Input'

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                first_name: '',
                last_name: '',
                email: '',
                date_of_birth: '',
                country: '',
                telephone: ''
            },
            address: '',
            id: '',
            addressCheckbox: false,
            redirect: false
        }
    }

    saveUserInfo = (event) => {
        this.setState({ ...this.state.userInfo, userInfo: { ...this.state.userInfo, [event.target.id]: event.target.value } })
    }

    saveUserAddress = (event) => {
        this.setState({[event.target.id]: event.target.value })
    }

    checkboxClickedHandler = (event) => {
        this.setState({ addressCheckbox: event.target.checked })
    }

    componentDidMount() {
        axios.post('https://stark-island-29614.herokuapp.com/app/v1/auth/user-info',
            {
                email: localStorage.getItem('email')
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => {
                this.setState({
                    ...this.state.userInfo, userInfo: {
                        first_name: res.data[0].first_name,
                        last_name: res.data[0].last_name,
                        email: res.data[0].email,
                        date_of_birth: res.data[0].date_of_birth.toString().slice(0, 10),
                        country: res.data[0].country,
                        telephone: res.data[0].telephone
                    },
                    address: res.data[0]._address,
                    id: res.data[0]._id
                })
            })
            .catch(err => { })
    }

    updateUserInfo = (event) => {
        if (this.state.userInfo.first_name.length === 0 && this.state.userInfo.last_name.length === 0 &&
            this.state.userInfo.email.length === 0 && this.state.userInfo.date_of_birth.length === 0 && this.state.userInfo.country.length === 0 && this.state.userInfo.telephone.length === 0) {
            alert('Please fill the fields!')
            event.preventDefault()
        } else {
            axios.put(`https://stark-island-29614.herokuapp.com/app/v1/auth/user-info/${this.state.id}`, {
                first_name: this.state.userInfo.first_name,
                last_name: this.state.userInfo.last_name,
                email: this.state.userInfo.email,
                date_of_birth: this.state.userInfo.date_of_birth,
                country: this.state.userInfo.country,
                telephone: this.state.userInfo.telephone,
                _address: this.state.address
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
                .then(res => {
                    this.setState({ redirect: true })
                    localStorage.setItem('email', this.state.userInfo.email)
                    localStorage.setItem('first_name', this.state.userInfo.first_name)
                    localStorage.setItem('last_name', this.state.userInfo.last_name)
                    const name = this.state.userInfo.first_name + ' ' + this.state.userInfo.last_name
                    store.dispatch(saveUserName(name))
                })
                .catch((err) => {})
        }
    }

    render() {
        var labels = ["First Name", "Last Name", "Email", "Date of Birth", "Country", "Telephone"]
        var inputs = Object.keys(this.state.userInfo).map((info, index) => {
            return (
                <Input key={index} htmlFor={info} labelName={labels[index]}
                    inputId={info} saveUser={this.saveUserInfo}
                    value={this.state.userInfo[info]}
                />
            )
        })
        return (
            <div>
                <this.props.header />
                <h1 className="general-h1">General Account Settings</h1>
                <main className="user-info-main">
                    <div className="user-form-box">
                        <form>
                            {inputs}
                            <p className="address-p">
                                <label htmlFor="addressCheckbox" className="val-label">If you want to add an address, select: </label>
                                <input onChange={this.checkboxClickedHandler} type="checkbox" name="addressCheckbox" id="addressCheckbox" />
                            </p>
                            {this.state.addressCheckbox ?
                                <p className="input-container">
                                    <label htmlFor="address" className="val-label">Address: </label>
                                    <input onChange={this.saveUserAddress} defaultValue={this.state.address} className="val-input" type="text" name="address" id="address" />
                                </p> : null}
                            <Link to="/products">
                                <button className="save-btn" onClick={this.updateUserInfo}>Save Settings</button>
                            </Link>
                        </form>
                    </div>
                    <div className="user-info-div" style={this.state.addressCheckbox ? { height: "740px" } : null}>
                        <span><i className="fas fa-plus-circle"></i></span>
                        <h3>You are changing your user account settings</h3>
                    </div>
                </main>
            </div>
        )
    }
}

export default UserInfo