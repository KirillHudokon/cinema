import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,

    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST,

    USER_LISTENER_FAIL,
    USER_LISTENER_REQUEST,
    USER_LISTENER_SUCCESS_AUTH,
    USER_LISTENER_UNSUCCESS_AUTH,

    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_REQUEST
} from '../actions/UserAction'
const initialState = {
    cred: null,
    error: '',
    successfulMessage:''
}
export function userReducer(state=initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, error: '' }
        case LOGIN_SUCCESS:
            return { ...state, cred: action.payload,  error: ''}
        case LOGIN_FAIL:
            return { ...state, error: action.payload.message }

        case REGISTER_REQUEST:
            return { ...state, error: '' }
        case REGISTER_SUCCESS:
            return { ...state, cred: action.payload, error: ''}
        case REGISTER_FAIL:
            return { ...state, error: action.payload.message }

        case LOGOUT_REQUEST:
            return { ...state,  error: '' }
        case LOGOUT_SUCCESS:
            return { ...state,  cred: action.payload, error: '' }
        case LOGOUT_FAIL:
            return { ...state,  error: action.payload.message }

        case USER_LISTENER_REQUEST:
            return { ...state, loading:true, error: '' }
        case USER_LISTENER_SUCCESS_AUTH:
            return { ...state, loading:false,error:'', cred: action.payload}
        case USER_LISTENER_UNSUCCESS_AUTH:
            return { ...state, loading:false,error: action.payload}
        case USER_LISTENER_FAIL:
            return { ...state, loading:false, error: action.payload.message }

        case CHANGE_PASSWORD_REQUEST:
            return { ...state, error: '' }
        case  CHANGE_PASSWORD_SUCCESS:
            return { ...state,  error: '',  successfulMessage: action.payload}
        case CHANGE_PASSWORD_FAIL:
            return { ...state, error: action.payload.message,successfulMessage:'' }

        default:
            return state
    }
}