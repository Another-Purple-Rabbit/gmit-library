export const USER_LOGIN_REQUEST = 'USER_LOGIN';

export const EDIT_CHANGE = 'EDIT_CHANGE';

export const editChange = (name, value) => {
    return {
        type: EDIT_CHANGE,
        payload: {name, value}
    }
}

export const userLoginRequest = () => {
    return {
        type: USER_LOGIN_REQUEST,
        payload: {}
    }
}