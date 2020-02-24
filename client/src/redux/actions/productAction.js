export const getProducts = (data) => {
    return {
        type: 'GET_PRODUCTS',
        payload: data
    }
}
export const getProductsSecond = (data) => {
    return {
        type: 'SECOND_USER_GET_PRODUCTS',
        payload: data
    }
}

export const deleteProduct = (product) => {
    return {
        type: "DELETE_PRODUCT",
        payload: product
    }
}

export const getTotalPrice = (price) => {
    return {
        type: "GET_TOTAL_PRICE",
        payload: price
    }
}

export const getTotalPriceSecond = (price) => {
    return {
        type: "SECOND_USER_GET_TOTAL_PRICE",
        payload: price
    }
}

export const editProduct = (product) => {
    return {
        type: "EDIT_PRODUCT",
        product
    }
}

export const editProductClicked = (editProductClicked) => {
    return {
        type: "EDIT_PRODUCT_CLICKED",
        editProductClicked
    }
}

export const expensesClicked = (expensesClicked) => {
    return {
        type: "EXPENSES_CLICKED",
        expensesClicked
    }
}

export const tableUpdated = (tableUpdated) => {
    return {
        type: "TABLE_UPDATED",
        tableUpdated
    }
}

export const mergeTables = (tablesMerged, filterOption) => {
    return {
        type: "MERGE_TABLES",
        payload: tablesMerged,
        filterOption: filterOption
    }
}

export const filterBy = (filter) => {
    return {
        type: "FILTER_BY",
        payload: filter
    }
}

export const secondSignOutClicked = (bool) => {
    return {
        type: "SECOND_SIGNOUT_CLICKED",
        payload: bool
    }
} 