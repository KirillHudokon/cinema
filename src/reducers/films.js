import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_REQUEST,

    GET_FILMS_FAIL,
    GET_FILMS_REQUEST,
    GET_FILMS_SUCCESS,

    SORT_FILMS,

    ACTIVE_FILM_CONTENT,
    FULL_FILM,
    RESET_TO_MAIN_MENU,
    ACTIVE_CATEGORY,

    UPDATE_COMMENTS_FAIL,
    UPDATE_COMMENTS_SUCCESS,
    UPDATE_COMMENTS_REQUEST
} from '../actions/FilmsAction'
const initialState = {
    categories:[],
    viewContent:[],
    sort:[],
    activeFilm:undefined,
    activeFilter:undefined,
    fullFilm:[],
    error:'',
}
export function filmsReducer(state=initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES_REQUEST:
            return { ...state, error: '' }
        case GET_CATEGORIES_SUCCESS:
            return { ...state, categories:action.payload, error: '' }
        case GET_CATEGORIES_FAIL:
            return { ...state,  error: action.payload.message }

        case GET_FILMS_REQUEST:
            return { ...state, error: '' }
        case GET_FILMS_SUCCESS:
            return { ...state, viewContent:action.payload, error: '' }
        case GET_FILMS_FAIL:
            return { ...state,  error: action.payload.message }

        case SORT_FILMS:
            return { ...state, sort:action.payload }

        case ACTIVE_FILM_CONTENT:
            return { ...state, activeFilm:action.payload.activeFilm, activeFilter:action.payload.activeCategory  }

        case FULL_FILM:
            return { ...state, fullFilm:action.payload  }
        case ACTIVE_CATEGORY:
            return { ...state, activeFilter:action.payload  }

        case RESET_TO_MAIN_MENU:
            return { ...state, sort:initialState.sort,activeFilm:initialState.activeFilm, activeFilter:initialState.activeFilter, fullFilm:initialState.fullFilm}

        case UPDATE_COMMENTS_REQUEST:
            return { ...state, error: '' }
        case UPDATE_COMMENTS_SUCCESS:
            return { ...state, error: '' }
        case UPDATE_COMMENTS_FAIL:
            return { ...state, error: action.payload.message}




        default:
            return state
    }
}