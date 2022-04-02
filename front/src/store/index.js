import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { locCollection } from './reducers/loc';
import { userCollection } from './reducers/user';
import { booksCollection } from './reducers/books';


const reducers = combineReducers({
    booksCollection, 
    userCollection,
    locCollection
});

const blahblahblah = storeAPI => next => action => {
    console.log(storeAPI.getState());
    return next(action);
}

const middleware = composeWithDevTools(applyMiddleware(blahblahblah));

const store = createStore(
    reducers, 
    middleware);      

export default store;