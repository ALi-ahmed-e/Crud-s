import { createSlice } from '@reduxjs/toolkit'


 const initstate = {User:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):''}

const AuthSlice = createSlice({
    name: "Auth",
    initialState: initstate,
    reducers: {
        SignIn: (state, action) => {
            

            state.User = action.payload.user


        },
    }
})


export default AuthSlice.reducer
export const AuthAction = AuthSlice.actions
