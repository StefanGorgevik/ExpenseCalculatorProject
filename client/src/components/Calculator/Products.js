import React from 'react'
import './Products.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

import store from '../../redux/store'
import { editProductClicked, getProducts } from '../../redux/actions/productAction'
class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clicked: false,
            filterOption: null
        }
    }

    componentDidUpdate() {
        if(this.state.filterOption !== null) {
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
                .catch(err => {
                    console.log(err);
                })
        }
    }

    newProductHandler = () => {
        this.setState({clicked: true})
        store.dispatch(editProductClicked(this.state.clicked))
    }

    filterHandler = (event) => {
        this.setState({ filterOption: event.target.value })
    }

    render() {
        return (
            <React.Fragment>
                <this.props.header />
                <div className="main-div">
                    <h3>Products</h3>
                    <label htmlFor="sort">Filter by:
                <select name="filterOption" id="sort" onChange={this.filterHandler}>
                            <option value="date:desc">Last Purchase</option>
                            <option value="date:asc">First Purchase</option>
                            <option value="price:desc">Highest Price</option>
                            <option value="price:asc">Lowest Price</option>
                        </select>
                    </label>
                </div>
                <this.props.table />
                <Link to="/new-product"><button className="new-btn" onClick={this.newProductHandler}>New Product</button></Link>
            </React.Fragment>
        )
    }
}

export default Products