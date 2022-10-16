import { createSlice } from '@reduxjs/toolkit'


const initstate = { theme: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).theme : '' }

const ThemeSlice = createSlice({
    name: "Theme",
    initialState: initstate,
    reducers: {
        Theme: (state, action) => {


            state.theme = action.payload
           

        },
    }
})


export default ThemeSlice.reducer
export const ThemeAction = ThemeSlice.actions
