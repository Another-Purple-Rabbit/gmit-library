import { configureStore } from '@reduxjs/toolkit';

import langCollection from '../components/LanguageSelector/languageSlice';
import userCollection from '../components/LoginForm/usersSlice';

const store = configureStore({
    reducer: {
        langCollection,
        userCollection
    }
});      

export default store;