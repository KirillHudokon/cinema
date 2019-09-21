import {
    BLOCK_PLACES_FAIL,
    BLOCK_PLACES_REQUEST,
    BLOCK_PLACES_SUCCESS,
    BLOCK_QUEUE_SUCCESS,
    USER_BLOCK_PLACES_SUCCESS,
    GET_USER_BLOCK_PLACES_FAIL,
    GET_USER_BLOCK_PLACES_REQUEST,
    GET_USER_BLOCK_PLACES_SUCCESS,
    UPDATE_USER_BLOCK_PLACES_FAIL,
    UPDATE_USER_BLOCK_PLACES_REQUEST,
    UPDATE_USER_BLOCK_PLACES_SUCCESS,
    UPDATE_HOLE_BLOCK_PLACES_FAIL,
    UPDATE_HOLE_BLOCK_PLACES_REQUEST,
    UPDATE_HOLE_BLOCK_PLACES_SUCCESS,
    UPDATE_QUEUE,
    RESET_USER_BLOCK_PLACES
} from '../actions/HoleAction'
const initialState = {
    rooms:{},
    error: '',
    queue:[],
    userBlocks:[],
    userQueue:[],
    isFetching: false,
    userBooked:[]
}
export function holesReducer(state=initialState, action) {
    switch (action.type) {
        case UPDATE_QUEUE:
            return { ...state, queue:action.payload }

        case BLOCK_PLACES_REQUEST:
            return { ...state, error: '' }
        case BLOCK_PLACES_SUCCESS:
            return { ...state, error: '' }
        case BLOCK_PLACES_FAIL:
            return { ...state, error: action.payload }

        case BLOCK_QUEUE_SUCCESS:
            return {...state, queue: action.payload}

        case USER_BLOCK_PLACES_SUCCESS:
            return { ...state, userQueue: action.payload}

        case GET_USER_BLOCK_PLACES_REQUEST:
            return { ...state, error: '' }
        case GET_USER_BLOCK_PLACES_SUCCESS:
            return { ...state, error: '', userBooked:action.payload }
        case GET_USER_BLOCK_PLACES_FAIL:
            return { ...state, error: action.payload }

        case UPDATE_USER_BLOCK_PLACES_REQUEST:
            return { ...state, error: '' }
        case UPDATE_USER_BLOCK_PLACES_SUCCESS:
            return { ...state, error: '', userBooked: action.payload, userQueue:initialState.userQueue }
        case UPDATE_USER_BLOCK_PLACES_FAIL:
            return { ...state, error: action.payload }


        case RESET_USER_BLOCK_PLACES:
            return {...initialState}

        default:
            return state
    }
}