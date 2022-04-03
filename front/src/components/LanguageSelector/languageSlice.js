import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const defaultLang = localStorage.getItem('lang') || process.env.REACT_APP_LANG;
const initialState = require(`./loc/${defaultLang}.js`).loc;

export const setLang = createAsyncThunk('languages/setLang', async lang => {
    const lang_collection = await import(`./loc/${lang}.js`);
    return lang_collection.loc;
})

const languagesSlice = createSlice({
    name: 'languages',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(setLang.fulfilled, (state, action) => {
                localStorage.setItem('lang', action.payload.lang)
                return {...action.payload}
            })
    }
})

export default languagesSlice.reducer;