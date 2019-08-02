import { HOLE_REQUEST, HOLE_SUCCESS, HOLE_FAIL } from '../actions/HoleAction'
const initialState = {
    rooms:{},
    error: '',
    isFetching: false,
}
export function holesReducer(state=initialState, action) {
    switch (action.type) {
        case HOLE_REQUEST:
            return { ...state, isFetching: true, error: '' }
        case HOLE_SUCCESS:
            return { ...state, isFetching: false, rooms: {...action.payload} }
        case HOLE_FAIL:
            return { ...state, isFetching: false, error: action.payload }
        default:
            return state
    }
}