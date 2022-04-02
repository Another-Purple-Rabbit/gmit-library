export const LOGIN_ERROR = 'LOGIN_ERROR';
export const ERASE_ERR_MES = 'ERASE_ERR_MES';

export const loginError = (err) => {
    return {
        type: LOGIN_ERROR,
        payload: err
    }
}

export const eraseError = () => {
    return {
        type: ERASE_ERR_MES,
        payload: null
    }
}