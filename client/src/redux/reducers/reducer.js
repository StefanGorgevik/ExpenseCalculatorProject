const initState = {
    products: [],
    secondUserProducts: [],
    mergedProducts: [],
    tablesMerged: false,
    totalPrice: '',
    secondUserTotalPrice: '',
    productToEdit: '',
    editProductClicked: '',
    expensesClicked: false,
    tableUpdated: false,
    userName: '',
    addAccountClicked: false,
    secondUserSigned: false,
    filterBy: null,
    secondSignOutClicked: false
}

export function reducer(state = initState, action) {
    switch (action.type) {
        case "GET_PRODUCTS": {
            return {
                ...state, products: action.payload
            }
        }
        case "SECOND_USER_GET_PRODUCTS": {
            return {
                ...state, secondUserProducts: action.payload
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
        case "SECOND_USER_GET_TOTAL_PRICE": {
            return { ...state, secondUserTotalPrice: action.payload }
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
        case "SAVE_USER_NAME": {
            return { ...state, userName: action.userName }
        }
        case "ADD_ACCOUNT_CLICKED": {
            return { ...state, addAccountClicked: action.payload }
        }
        case "SECOND_USER_SIGNED": {
            return { ...state, secondUserSigned: action.payload }
        }
        case "MERGE_TABLES": {
            return {
                ...state, mergedProducts:
                    state.products.concat(state.secondUserProducts).sort((a, b) =>
                        (a[action.filterOption] > b[action.filterOption]) ? 1 : ((b[action.filterOption] > a[action.filterOption]) ? -1 : 0)),
                tablesMerged: action.payload
            }
        }
        case "FILTER_BY": {
            return {
                ...state, filterBy: action.payload
            }
        }
        case "SECOND_SIGNOUT_CLICKED": {
            return {
                ...state, secondSignOutClicked: action.payload
            }
        }
        default:
            return state;
    }
}