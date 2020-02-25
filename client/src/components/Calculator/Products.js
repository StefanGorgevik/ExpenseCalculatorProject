import React from 'react'
import './Products.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Alert from '../Alert/Alert'
import store from '../../redux/store'
import { editProductClicked, getProducts, tableUpdated, filterBy } from '../../redux/actions/productAction'
import { connect } from 'react-redux'
import SecondLogin from '../SecondUser/SecondLogin/SecondLogin'
import SecondUser from '../../containers/SecondUser/SecondUser'
import ProductsFilter from '../ProductsFilter/ProductsFilter'
import MergedTableContainer from '../../containers/MergedTableContainer/MergedTableContainer'
class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newProdClicked: false,
            filterOption: null,
            deleteAllClicked: false
        }
    }

    componentDidUpdate() {
        if (this.state.filterOption !== null) {
            axios.get(`https://stark-island-29614.herokuapp.com/app/v1/products/?sort=${this.state.filterOption}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
                .then(res => {
                    store.dispatch(getProducts(res.data));
                })
                .catch(err => { })
        }
    }

    newProductHandler = () => {
        this.setState({ newProdClicked: true })
        store.dispatch(editProductClicked(this.state.newProdClicked))
    }

    filterHandler = (event) => {
        this.setState({ filterOption: event.target.value })
        store.dispatch(filterBy(event.target.value));
    }

    deleteAllProducts = () => {
        const userid = localStorage.getItem("userid");
        axios.delete(`https://stark-island-29614.herokuapp.com/app/v1/products/delete-all/${userid}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => {
                this.setState({ deleteAllClicked: false })
                store.dispatch(tableUpdated(true))
            })
            .catch(err => { })
    }

    hideAlert = () => {
        this.setState({ deleteAllClicked: false })
    }

    deleteButtonClicked = () => {
        this.setState({ deleteAllClicked: true })
    }

    render() {
        let alert = null;
        if (this.state.deleteAllClicked) {
            alert = <Alert hide={this.hideAlert}
                delete={this.deleteAllProducts}
                deleteAllClicked={this.state.deleteAllClicked}
                userSigned={this.props.secondUserSigned}
            />
        }
        return (
            <div className="products-div">
                {alert}
                {this.props.addAccountClicked ? <SecondLogin /> : null}
                <this.props.header />
                
                {!this.props.tablesMerged ?
                    <div>
                        <div className="added-second-user">
                            <div className="main-div">
                                <h1>Products</h1>
                                <div className="select-filter-div">
                                    <ProductsFilter filter={this.filterHandler} />
                                </div>
                                <button onClick={this.deleteButtonClicked} className="delete-all-btn">Delete all!</button>
                            </div>
                            
                            <this.props.table />
                        </div>
                        {this.props.secondUserSigned ? <SecondUser /> : null}
                        {this.props.secondUserSigned ? null : <Link to="/new-product"><button className="new-btn" onClick={this.newProductHandler}>New Product</button></Link>}
                    </div> : <MergedTableContainer />}
                    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addAccountClicked: state.addAccountClicked,
        secondUserSigned: state.secondUserSigned,
        tablesMerged: state.tablesMerged
    }
}

export default connect(mapStateToProps)(Products)