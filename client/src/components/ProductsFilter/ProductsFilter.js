import React from 'react'
import './ProductsFilter.css'

const ProductsFilter = (props) => {
    return (
        <label htmlFor="sort">Filter by:
             <select name="filterOption" className='select-filter' id="sort" onChange={props.filter}>
                <option value="date:desc">Last Purchase</option>
                <option value="date:asc">First Purchase</option>
                <option value="price:desc">Highest Price</option>
                <option value="price:asc">Lowest Price</option>
            </select>
        </label>
    )
}

export default ProductsFilter;