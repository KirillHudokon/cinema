export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

const onLogRequest = () => ({
    type: LOGIN_REQUEST,
})

const onLogSuccess=(username)=>({
    type: LOGIN_SUCCESS,
    payload: username,
})
const onLogError=(error)=>({
    type: LOGIN_FAIL,
    error: true,
    payload: error,
})
export default function handleLogin() {
    return dispatch =>{
        dispatch(onLogSuccess('kirill'))
    }
}