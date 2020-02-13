import React from 'react'
import './Products.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Alert from '../Alert/Alert'
import store from '../../redux/store'
import { editProductClicked, getProducts, tableUpdated } from '../../redux/actions/productAction'
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
            axios.get(`https://stark-island-29614.herokuapp.com/app/v1/products?sort=${this.state.filterOption}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
                .then(res => {
                    store.dispatch(getProducts(res.data));

                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    newProductHandler = () => {
        this.setState({ newProdClicked: true })
        store.dispatch(editProductClicked(this.state.newProdClicked))
    }

    filterHandler = (event) => {
        this.setState({ filterOption: event.target.value })
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
            .catch(err => {
                console.log(err)
            })
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
            />
        }
        return (
            <React.Fragment>
                <this.props.header />
                <div className="main-div">
                    <h1 className="hehe">Products</h1>
                    <div className="select-filter-div">
                        <label htmlFor="sort">Filter by:
                    <select name="filterOption" className='select-filter' id="sort" onChange={this.filterHandler}>
                                <option value="date:desc">Last Purchase</option>
                                <option value="date:asc">First Purchase</option>
                                <option value="price:desc">Highest Price</option>
                                <option value="price:asc">Lowest Price</option>
                            </select>
                        </label>
                    </div>
                    <button onClick={this.deleteButtonClicked} className="delete-all-btn">Delete all!</button>
                </div>
                <this.props.table />
                <Link to="/new-product"><button className="new-btn" onClick={this.newProductHandler}>New Product</button></Link>
                {alert}
            </React.Fragment>
        )
    }
}

export default Products