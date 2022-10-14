import { createSlice } from '@reduxjs/toolkit'


 const initstate = {User:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):'',credential:localStorage.getItem('credential')?JSON.parse(localStorage.getItem('credential')):''}

const AuthSlice = createSlice({
    name: "Auth",
    initialState: initstate,
    reducers: {
        SignIn: (state, action) => {
            

            state.User = action.payload.user
            state.credential = action.payload.credential

        },
    }
})


export default AuthSlice.reducer
export const AuthAction = AuthSlice.actions
