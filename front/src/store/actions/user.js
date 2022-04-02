export const LOAD_USER_DATA = 'LOAD_USER_DATA'

export const loadUserData = (data) => {
    return {
        type: LOAD_USER_DATA,
        payload: data
    }
};