import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServ } from "../../utils";

const initialState = {isAuthorised: false};

export const checkSession = createAsyncThunk('users/checkSession', async (sid, {dispatch}) => {
    const sessionInfo = await fetch(`${apiServ}/users/session/check`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sid})
    }).then(result => result.json())
    
    switch (sessionInfo.status) {
        case 'alive': dispatch(fetchUserData(sessionInfo.uid)); break;
        case 'none':
        case 'expired': localStorage.removeItem('sid'); break;
        default: break;
    }
});

export const fetchUserData = createAsyncThunk('users/fetchData', async uid => {
    const userData = await fetch(`${apiServ}/users/${uid}`);
    return userData.json();
});

export const authUser = createAsyncThunk('users/auth', async (creds, {dispatch}) => {
    const response = await fetch(`${apiServ}/users/auth`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(creds)
    }).then(result => result.json());
    
    if (response.error) return response;
    localStorage.setItem('sid', response.sid);
    dispatch(checkSession(response.sid));
})

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        userLogout(state, action) { return { isAuthorised: false } },
    },
    extraReducers: builder => {
        builder
            .addCase(authUser.fulfilled, (state, action) => {
                return action.payload ? {...state, error: action.payload.error} : {...state}
            })
            .addCase(checkSession.rejected, (state, action) => {
                console.log(action.error);
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                return {...state, ...action.payload, isAuthorised: !state.isAuthorised, error:null}
            })
    }
});

export const { userLogout } = usersSlice.actions;

export default usersSlice.reducer;