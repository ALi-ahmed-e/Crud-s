import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './Slices/AuthSlice'
import ThemeReducer from './Slices/Themeslice'
import AddbuttonReducer from './Slices/AddTaskSlice'



const store = configureStore({
    reducer:{Auth:AuthReducer,Theme:ThemeReducer,Add:AddbuttonReducer,},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),

})

export default store






