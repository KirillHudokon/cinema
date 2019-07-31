import { ROOM_REQUEST, ROOM_SUCCESS, ROOM_FAIL } from '../actions/RoomAction'
const initialState = {
    rooms:{},
    error: '',
    isFetching: false,
}
export function roomReducer(state=initialState, action) {
    switch (action.type) {
        case ROOM_REQUEST:
            return { ...state, isFetching: true, error: '' }
        case ROOM_SUCCESS:
            return { ...state, isFetching: false, rooms: {...action.payload} }
        case ROOM_FAIL:
            return { ...state, isFetching: false, error: action.payload }
        default:
            return state
    }
}