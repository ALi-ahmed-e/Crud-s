import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './Slices/AuthSlice'
import ThemeReducer from './Slices/Themeslice'



const store = configureStore({
    reducer:{Auth:AuthReducer,Theme:ThemeReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),

})

export default store






