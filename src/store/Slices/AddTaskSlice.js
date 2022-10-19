import { createSlice } from '@reduxjs/toolkit'


const initstate = { buttonShow:false}

const AddTaskSlice = createSlice({
    name: "AddTaskButton",
    initialState: initstate,
    reducers: {
        Toggle: (state, action) => {


            state.buttonShow = !state.buttonShow
           

        }
    }
})


export default AddTaskSlice.reducer
export const AddTaskAction = AddTaskSlice.actions
