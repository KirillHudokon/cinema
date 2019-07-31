import {combineReducers} from 'redux'
import {userReducer} from './user'
import {roomReducer} from "./room";
export const rootReducer = combineReducers({
    user:userReducer,
    room:roomReducer
})