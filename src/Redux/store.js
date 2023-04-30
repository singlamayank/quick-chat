import chatReducer from './chatReducer';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

export default configureStore({
    reducer: chatReducer,
    middleware: [thunk],
})