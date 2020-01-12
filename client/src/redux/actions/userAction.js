export const saveUserName = (first_name, last_name) => {
    return {
        type: "SAVE_USER_NAME",
        userName: {
            first_name: first_name,
            last_name: last_name
        }
    }
}

export const nameUpdated = (nameUpdated) => {
    return {
        type: "NAME_UPDATED",
        nameUpdated
    }
}


