import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import AuthReducer from './Slices/AuthSlice'



const store = configureStore({
    reducer:{Auth:AuthReducer,},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),

})

export default store






