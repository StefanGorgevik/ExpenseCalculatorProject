import React from 'react'
import './Product.css'

import { tableUpdated } from '../../redux/actions/productAction'
import store from '../../redux/store'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
class NewProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.editProductClicked ? this.props.productToEdit.name : '',
            type: this.props.editProductClicked ? this.props.productToEdit.type : '',
            description: this.props.editProductClicked ? this.props.productToEdit.description : '',
            date: this.props.editProductClicked ? this.props.productToEdit.date : '',
            price: this.props.editProductClicked ? this.props.productToEdit.price : '',
            tableUpdated: false
        }
    }

    saveProduct = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    createProduct = (event) => {
        if (this.state.name == '' || this.state.type == '' ||
            this.state.description == '' || this.state.date == '' || this.state.price == '') {
            event.preventDefault();
            alert('Fill out the fields correctly!')
        } else if (this.state.name !== '' || this.state.type !== '' ||
            this.state.description !== '' || this.state.date !== '' || this.state.price !== '') {   
            store.dispatch(tableUpdated(!this.state.tableUpdated))
            axios.post('https://stark-island-29614.herokuapp.com/app/v1/products/',
                {
                    name: this.state.name,
                    type: this.state.type,
                    description: this.state.description,
                    date: this.state.date,
                    price: this.state.price,
                    _created: new Date()
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
                .then(res => res)
                .catch(err => console.log(err))
        }
    }

    editProduct = (event) => {
        if (this.state.name === '' || this.state.type === '' ||
            this.state.description === '' || this.state.date === '' || this.state.price === '') {
            alert('Please fill the fields!')
            event.preventDefault()
        } else {
            store.dispatch(tableUpdated(!this.state.tableUpdated))
            axios.put(`https://stark-island-29614.herokuapp.com/app/v1/products/${this.props.productToEdit._id}`,
                {
                    name: this.state.name,
                    type: this.state.type,
                    description: this.state.description,
                    date: this.state.date,
                    price: this.state.price,
                    _modified: new Date()
                }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <this.props.header />
                {this.props.editProductClicked ? <h3 id="new-products-h3">Edit Product</h3> : <h3 id="new-products-h3">New Product</h3>}
                <main id="main-box">
                    <div className="box-container">
                        <div className="form-box">
                            <form>
                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="name">Product Name</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.name : ''}
                                        onChange={this.saveProduct}
                                        className="text-field" type="text" name="name" id="name" />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="description">Product Description</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.description : ''}
                                        onChange={this.saveProduct}
                                        className="text-field" type="text" name="description" id="description" />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="type">Product Type</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.type : ''}
                                        onChange={this.saveProduct}
                                        className="text-field" type="text" name="type" id="type" />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="date">Product Date</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.date.toString().slice(0, 10) : ''}
                                        onChange={this.saveProduct}
                                        className="text-field" type="date" name="date" id="date" />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="price">Product Price</label>
                                    <input defaultValue={this.props.editProductClicked ? Number(this.props.productToEdit.price) : ''}
                                        onChange={this.saveProduct}
                                        className="text-field" type="text" name="price" id="price" />
                                </p>
                                <Link to='/products'>
                                    {this.props.editProductClicked ?
                                        <button onClick={this.editProduct} id="primary-button" className="primary-btn" type="submit"> Edit Product</button> :
                                        <button onClick={this.createProduct} id="primary-button" className="primary-btn" type="submit"> Create Product</button>}
                                </Link>
                            </form>
                        </div>
                    </div>
                    <div className="new-product-div">
                        <span><i className="fas fa-plus-circle"></i></span>
                        {this.props.editProductClicked ? <h3>You are editing a product</h3> : <h3>You are creating a new product</h3>}

                    </div>
                </main>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        productToEdit: state.productToEdit,
        editProductClicked: state.editProductClicked
    }
}

export default connect(mapStateToProps)(NewProduct)