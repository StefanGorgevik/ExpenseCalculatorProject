import React from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'

import { expensesClicked, mergeTables, secondSignOutClicked } from '../../redux/actions/productAction'
import {addAccountClicked,secondUserSigned} from '../../redux/actions/userAction'
import store from '../../redux/store'
import SignOut from '../SignOut/SignOut'
import SecondUserSignOut from '../SecondUser/SecondUserSignOut/SecondUserSignOut'
import { Redirect } from 'react-router-dom'
import Profile from '../../assets/images/small_profile.png'
import { connect } from 'react-redux'
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expensesClicked: false,
            signOut: false,
            signOutClicked: false,
            name: this.props.userName
        }
    }

    componentDidMount() {
        const user = localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name');
        this.setState({name: user})
    }

    expensesClicked = () => {
        store.dispatch(expensesClicked(!this.state.expensesClicked))
    }

    productsClicked = () => {
        store.dispatch(expensesClicked(this.state.expensesClicked))
    }

    signOutClicked = () => {
        this.setState({ signOutClicked: true })
    }

    hideSignOut = () => {
        this.setState({ signOutClicked: false })
    }

    signOutAccepted = () => {
        store.dispatch(mergeTables(false))
        store.dispatch(secondUserSigned(false))
        store.dispatch(addAccountClicked(false))
        localStorage.clear()
        this.setState({ signOut: true })
    }

    addAccount = () => {
        store.dispatch(addAccountClicked(true))
    }

    secondHideSignOutHandler = () => {
        store.dispatch(secondSignOutClicked(false))
    }

    signOutSecondUser = () => {
        let keysToRemove = ["second-jwt", "second-first_name", "second-last_name", "second-email", "second-userid"];
        keysToRemove.forEach(k => {
            localStorage.removeItem(k);
        })
        store.dispatch(secondUserSigned(false))
        store.dispatch(addAccountClicked(false))
        store.dispatch(secondSignOutClicked(false))
    }
    
    render() {
        return (
            <div className="header-div">
                {!localStorage.getItem('jwt') ? <Redirect to='/' /> : null}
                <header>
                    <nav className="nav">
                        <div className="buttons">
                            <NavLink to='/products' className='btn-links' onClick={this.productsClicked}> Products</NavLink>
                            <NavLink to='/expenses' className='btn-links' onClick={this.expensesClicked}> Expenses</NavLink>
                        </div>
                        <div className="right-side">
                            <img id="profile-image" src={Profile} alt="profile" />
                            <p id='name-p'>{this.state.name}</p>
                            <p className="user-info"><Link to='/user-info'>Your Info</Link></p>
                            <p className={this.props.secondUserSigned || this.props.expensesClicked ? 'disabled-link' : 'user-info'} onClick={this.addAccount}><Link to='#'>Add Account</Link></p>
                            <p className="sign-out"><Link to='#' onClick={this.signOutClicked}>Sign Out</Link></p>
                        </div>
                    </nav>
                </header>
                {this.props.secondSignOutClicked ? <SecondUserSignOut hide={this.secondHideSignOutHandler}
                    signOutAccepted={this.signOutSecondUser}
                /> : null}
                {this.state.signOutClicked ? <SignOut hide={this.hideSignOut}
                    signOutAccepted={this.signOutAccepted}
                /> : null}
                
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userName: state.userName,
        secondUserSigned: state.secondUserSigned,
        expensesClicked: state.expensesClicked,
        secondSignOutClicked: state.secondSignOutClicked
    }
}

export default connect(mapStateToProps)(Header)