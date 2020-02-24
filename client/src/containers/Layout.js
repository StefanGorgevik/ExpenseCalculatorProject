import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from '../components/Navigation/Header'
import Expenses from '../components/Calculator/Expenses'
import Products from '../components/Calculator/Products'
import Product from '../components/Product/Product'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
import Table from '../components/Table/Table'
import UserInfo from '../components/UserInfo/UserInfo'

class Layout extends Component {
    render() {
        return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/products" render={() =><Products header={Header} table={Table}/>} />
                <Route exact path="/expenses" render={() => <Expenses header={Header} table={Table}/>} />
                <Route exact path="/new-product" render={() => <Product header={Header} />} />
                <Route exact path="/edit-product" render={() => <Product header={Header} />} />
                <Route exact path="/user-info" render={() => <UserInfo header={Header} />} />
            </Switch>
        </BrowserRouter>
        )
    }
}

export default Layout