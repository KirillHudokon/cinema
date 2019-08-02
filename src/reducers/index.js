import {combineReducers} from 'redux'
import {userReducer} from './user'
import {holesReducer} from "./hole";
export const rootReducer = combineReducers({
    user:userReducer,
    holes:holesReducer
})