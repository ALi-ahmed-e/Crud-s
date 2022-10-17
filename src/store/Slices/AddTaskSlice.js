import { createSlice } from '@reduxjs/toolkit'


const initstate = { buttonShow:false}

const AddTaskSlice = createSlice({
    name: "AddTaskButton",
    initialState: initstate,
    reducers: {
        Show: (state, action) => {


            state.buttonShow = true
           

        },
        hide: (state, action) => {


            state.buttonShow = false
           

        },
    }
})


export default AddTaskSlice.reducer
export const AddTaskAction = AddTaskSlice.actions
