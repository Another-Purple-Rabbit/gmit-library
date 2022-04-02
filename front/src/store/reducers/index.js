import loc from '../loc/en.js';

import {
    LOGIN_ERROR,
    ERASE_ERR_MES
} from '../actions';

export const initialState = {
    book: {
        id: null,
        title: '',
        author: '',
        category: null,
        amount: null,
        year: null,
        publisher: '',
        reg_date: Date.now(),
    },
    loc,
    displayError: null,
};

export const generalAppData = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ERROR:
            return reduceShowError(state, action)
        case ERASE_ERR_MES:
            return reduceErrorErase(state, action);
        default: return state;
    }
};

const reduceShowError = (state, action) => {
    const { error } = action.payload;
    let displayError;
    switch (error) {
        case 'UNF': displayError = loc.errors.userNotFound; break;
        case 'UIP': displayError = loc.errors.userInvalidPass; break;
        default: break;
    }
    return {...state, displayError};
}

const reduceErrorErase = (state, action) => {
    return {...state, error: null}
}