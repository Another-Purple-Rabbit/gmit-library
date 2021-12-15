import {
    USER_LOGIN_REQUEST,
} from '../actions';

export const initialState = {

};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return reduceLogin(state, action);
        default: return state;
    }
};

const reduceLogin = (state, action) => {
    
}