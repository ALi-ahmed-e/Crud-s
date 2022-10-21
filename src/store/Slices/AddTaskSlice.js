import { createSlice } from '@reduxjs/toolkit'


const initstate = { buttonShow: false, update: false }

const AddTaskSlice = createSlice({
    name: "AddTaskButton",
    initialState: initstate,
    reducers: {
        Toggle: (state, action) => {


            state.buttonShow = !state.buttonShow
            state.update = false


        },
        UpdateTask: (state, action) => {
            state.update = action.payload
            state.buttonShow = true

        }
    }
})


export default AddTaskSlice.reducer
export const AddTaskAction = AddTaskSlice.actions
