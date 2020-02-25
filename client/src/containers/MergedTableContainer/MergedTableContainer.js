import React from 'react'
import MergedTable from '../../components/MergedTable/MergedTable/MergedTable'
import './MergedTableContainer.css'
import store from '../../redux/store'
import {mergeTables} from '../../redux/actions/productAction'

class MergedTableContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterOption: 'name'
        }
    }

    componentDidUpdate() {
        if(this.state.filterOption === 'name') {
            store.dispatch(mergeTables(true, this.state.filterOption))
        }
        if(this.state.filterOption === 'price') {
            store.dispatch(mergeTables(true, this.state.filterOption))
        }
    }

    filterHandler = (event) => {
        this.setState({filterOption: event.target.value})
    }

    goBackHandler = () => {
        store.dispatch(mergeTables(false));
    }
    
    render() {
        return (
            <div className="merged-table-container">
                <h1 className="merged-h1">Merged Products for {localStorage.getItem('first_name')} and {localStorage.getItem('second-first_name')}</h1>
                <div className="merged-select-div">
                    <label htmlFor="merged-sort">Filter by:</label>
                    <select id="merged-sort" className="merged-select" onChange={this.filterHandler}>
                        <option value="name" className="merged-options">Name</option>
                        <option value="price" className="merged-options">Price</option>
                    </select>
                </div>
                <button className="go-back-btn" onClick={this.goBackHandler}>Go back</button>
                <MergedTable/>
            </div>
        )
    }
}

export default MergedTableContainer;