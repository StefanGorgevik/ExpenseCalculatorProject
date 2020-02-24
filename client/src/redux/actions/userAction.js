export const saveUserName = (name) => {
    return {
        type: "SAVE_USER_NAME",
        userName: name
    }
}

export const addAccountClicked = (boolean) => {
    return {
        type: 'ADD_ACCOUNT_CLICKED',
        payload: boolean
    }
}
export const secondUserSigned = (boolean) => {
    return {
        type: 'SECOND_USER_SIGNED',
        payload: boolean
    }
}