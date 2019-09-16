import {combineReducers} from 'redux'
import {userReducer} from './user'
import {holesReducer} from "./hole";
import {filmsReducer} from "./films";
export const rootReducer = combineReducers({
    user:userReducer,
    holes:holesReducer,
    films:filmsReducer
})