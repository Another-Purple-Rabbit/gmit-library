import loc from '../loc/en.js';

import {
    EDIT_CHANGE,
    USER_LOGIN_REQUEST,
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
    user: {
        id: null,
        name: '',
        surname: '',
        patronimyc: '',
        status: null,
        login: '',
        password:'',
    },
    loc
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_CHANGE:
            return reduceChange(state, action);
        case USER_LOGIN_REQUEST:
            return reduceLogin(state, action);
        default: return state;
    }
};

const reduceLogin = (state, action) => {
    
}

const reduceChange = (state, action) => {
    const { payload: {name, value} } = action;
    switch (name) {
        case ('login'):
            return {...state, user: {...state.user, login: value}}
        case ('pass'):
            return {...state, user: {...state.user, password: value}}
        default: return state;
    }
}