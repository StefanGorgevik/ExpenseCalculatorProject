import React from 'react'
import './SecondUser.css'
import SecondUserTable from '../../components/SecondUser/SecondUserTable/SecondUserTable'
import store from '../../redux/store'
import { mergeTables, secondSignOutClicked } from '../../redux/actions/productAction'
class SecondUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    signOutClickedHandler = () => {
        store.dispatch(secondSignOutClicked(true))
    }
    mergeTables = () => {
        store.dispatch(mergeTables(true, "name"));
    }

    render() {
        const name = localStorage.getItem('second-first_name') + ' ' + localStorage.getItem('second-last_name')
        return (
            <div className="second-user">
                <div className="second-user-header">
                    <h1>{name}</h1>
                    <button onClick={this.signOutClickedHandler} className="second-user-sign-out-btn">Sign Out</button>
                    <button onClick={this.mergeTables} className="merge-tables-btn">Merge Tables</button>
                </div>
                <SecondUserTable />
            </div>
        )
    }
}

export default SecondUser;