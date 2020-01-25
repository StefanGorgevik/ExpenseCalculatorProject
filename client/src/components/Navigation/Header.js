import React from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'

import { expensesClicked } from '../../redux/actions/productAction'
import store from '../../redux/store'
import SignOut from '../SignOut/SignOut'
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
        localStorage.clear()
        this.setState({ signOut: true })
    }
    

    render() {
        return (
            <React.Fragment>
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
function mapStateToProps(state) {
    return {
        userName: state.userName
    }
}

export default connect(mapStateToProps)(Header)