import { CHECK_SESSION } from "../actions/session";

const initialSessionCol = {
    sid: '',
    uid: ''
}

export const sessionReducer = (state = initialSessionCol, action) => {
    switch (action) {
        case CHECK_SESSION: return reduceCheckSession(state, action);
        default: return state;
    }
}

const reduceCheckSession = (state, action) => {
    return state;
}