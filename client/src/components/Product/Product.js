import React from 'react'
import './Product.css'

import { tableUpdated } from '../../redux/actions/productAction'
import store from '../../redux/store'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Input from '../Input/Input'
class NewProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.editProductClicked ? this.props.productToEdit.name : '',
            type: this.props.editProductClicked ? this.props.productToEdit.type : '',
            description: this.props.editProductClicked ? this.props.productToEdit.description : '',
            date: this.props.editProductClicked ? this.props.productToEdit.date : '',
            price: this.props.editProductClicked ? this.props.productToEdit.price : ''
        }
    }

    saveProduct = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    createProduct = (event) => {
        console.log(this.state)
        if (this.state.name === '' || this.state.type === '' ||
            this.state.description === '' || this.state.date === '' || this.state.price === '') {
            event.preventDefault();
            alert('Fill out the fields correctly!')
        } else if (this.state.name !== '' || this.state.type !== '' ||
            this.state.description !== '' || this.state.date !== '' || this.state.price !== '') {   
            store.dispatch(tableUpdated(true))
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
                .then(res => {})
                .catch(err => {})
        }
    }

    editProduct = (event) => {
        if (this.state.name === '' || this.state.type === '' ||
            this.state.description === '' || this.state.date === '' || this.state.price === '') {
            alert('Please fill the fields!')
            event.preventDefault()
        } else {
            store.dispatch(tableUpdated(true))
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
                .then(res => { })
                .catch(err => { })
        }
    }

    render() {
        var labels = ["Product Name", "Product Type", "Product Description", "Product Date", "Product Price"];

        var inputs = Object.keys(this.state).map((info, index) => {
           return ( <Input key={index} htmlFor={info} labelName={labels[index]}
            inputId={info} saveUser={this.saveProduct}
            value={this.props.editProductClicked ? this.props.productToEdit[info] : '' }/>
            )
        })
        return (
            <React.Fragment>
                <this.props.header />
                {this.props.editProductClicked ? <h3 id="new-products-h3">Edit Product</h3> : <h3 id="new-products-h3">New Product</h3>}
                <main id="main-box">
                    <div className="box-container">
                        <div className="form-box">
                            <form>
                                {inputs}
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