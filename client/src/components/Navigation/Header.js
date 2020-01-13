import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

import { expensesClicked } from '../../redux/actions/productAction'
import store from '../../redux/store'
import SignOut from '../SignOut/SignOut'
import { Redirect } from 'react-router-dom'
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            expensesClicked: false,
            signOut: false,
            signOutClicked: false,
            nameUpdated: false,
            name: localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name')
        }
    }

    expensesClicked = () => {
        this.setState({ active: true })
        store.dispatch(expensesClicked( !this.state.expensesClicked))
    }

    productsClicked = () => {
        this.setState({ active: false, expensesClicked: false })
        store.dispatch(expensesClicked( this.state.expensesClicked))
    }

    signOutClicked = () => {
        this.setState({ signOutClicked: true })
    }

    hideSignOut = () => {
        this.setState({ signOutClicked: false })
    }

    signOutAccepted = () => {
        localStorage.clear()
        localStorage.removeItem('jwt')
        this.setState({ signOut: true })
    }

    render() {
       
        return (
            <React.Fragment>
                {!localStorage.getItem('jwt') ? <Redirect to='/' /> : null}
                <header>
                    <nav className="nav">
                        <div className="buttons">
                            <Link to='/products'><button className={!this.state.active ? 'main-buttons active-btn' : 'main-buttons'} onClick={this.productsClicked}>Products</button></Link>
                            <Link to='/expenses'><button className={this.state.active ? ' main-buttons active-btn' : 'main-buttons'} onClick={this.expensesClicked}>Expenses</button></Link>
                        </div>
                        <div className="right-side">
                            <img id="profile-image" src="../../assets/images/small_profile.png" alt="profile-image" />
                            <p id='name-p'>{this.state.name}</p>
                            <p className="user-info"><Link to='/user-info'>Your Info</Link></p>
                            <p className="sign-out"><Link to='#' onClick={this.signOutClicked}>Sign Out</Link></p>
                        </div>
                    </nav>
                </header>
                {this.state.signOutClicked ? <SignOut hide={this.hideSignOut}
                    signOutAccepted={this.signOutAccepted}
                /> : null}
            </React.Fragment>
        )
    }
}

 export default Header