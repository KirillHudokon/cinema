import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_REQUEST,

    GET_FILMS_FAIL,
    GET_FILMS_REQUEST,
    GET_FILMS_SUCCESS,

    SORT_FILMS
} from '../actions/FilmsAction'
const initialState = {
    categories:[],
    viewContent:[],
    sort:[]
}
export function filmsReducer(state=initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_REQUEST:
            return { ...state, error: '' }
        case GET_CATEGORIES_SUCCESS:
            return { ...state, categories:action.payload, error: '' }
        case GET_CATEGORIES_FAIL:
            return { ...state,  error: action.payload }

        case GET_FILMS_REQUEST:
            return { ...state, error: '' }
        case GET_FILMS_SUCCESS:
            return { ...state, viewContent:action.payload, error: '' }
        case GET_FILMS_FAIL:
            return { ...state,  error: action.payload }

        case SORT_FILMS:
            return { ...state, sort:action.payload }

        default:
            return state
    }
}