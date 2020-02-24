import React from 'react'

import MergedTableRow from '../MergedTableRow/MergedTableRow'
import './MergedTable.css'

import { connect } from 'react-redux'

class Table extends React.Component {
    render() {
        const products = this.props.mergedProducts;
        
        var secondUserTotalPrice = 0;
        for(var i = 0; i < products.length; i++) {
            secondUserTotalPrice += products[i].price;
        }

        var mergedTableRow = null;
        if (products) {
            mergedTableRow = products.map(product => {
                return (<MergedTableRow key={product.name + Math.random()} 
                    name={product.name}
                    type={product.type}
                    description={product.description}
                    date={product.date}
                    price={product.price}
                    userName={product.userName}
                />)
            })
        }

        return (
            <React.Fragment>
                <main className="merged-main-box-table">
                    <table className="merged-table">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Product Description</th>
                                <th>Purchase Date</th>
                                <th>Product Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="merged-emptyTd"></td>
                            </tr>
                            {mergedTableRow}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total price:</td>
                                <td id="merged-price-td">{secondUserTotalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        mergedProducts: state.mergedProducts
    }
}


export default connect(mapStateToProps)(Table)