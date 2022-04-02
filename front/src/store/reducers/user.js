import { LOAD_USER_DATA } from "../actions/user";

const initialUserState = {
    id: '',
    name: '',
    surname: '',
    patronymic: '',
    faculty: '',
    regDate: null
};

export const userCollection = (state = initialUserState, action) => {
    switch (action.type) {
        case LOAD_USER_DATA:
            return reduceUserDataLoad(state, action);
        default: return state;
    }
}

const reduceUserDataLoad = (state, action) => {
    const { id, name, surname, patronymic, faculty, regDate } = action.payload;
    return {...state, id, name, surname, patronymic, faculty, regDate}
}