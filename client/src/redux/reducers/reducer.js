const initState = {
    products: [],
    totalPrice: '',
    productToEdit: '',
    editProductClicked: '',
    expensesClicked: false,
    tableUpdated: false,
    nameUpdated: null
}

export function reducer(state = initState, action) {
    switch (action.type) {
        case "GET_PRODUCTS": {
            return {
                ...state, products: action.payload
            }
        }
        
        case "DELETE_PRODUCT": {
            let newProducts = state.products.filter(product => {
                return action.payload._id !== product._id
            })
            return { ...state, products: newProducts }
        }

        case "GET_TOTAL_PRICE": {
            return { ...state, totalPrice: action.payload }
        }

        case "EDIT_PRODUCT": {
            return { ...state, productToEdit: action.product }
        }

        case "EDIT_PRODUCT_CLICKED": {
            return { ...state, editProductClicked: action.editProductClicked }
        }

        case "EXPENSES_CLICKED": {
            return { ...state, expensesClicked: action.expensesClicked }
        }

        case "TABLE_UPDATED": {
            return { ...state, tableUpdated: action.tableUpdated }
        }

        case "NAME_UPDATED": {
            return { ...state, nameUpdated: action.nameUpdated }
        }

        default:
            return state
    }
}